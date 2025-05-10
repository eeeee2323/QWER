import { useState, useCallback, useEffect } from 'react';
import { showSuccess, showError } from '@/utils/toast';

export interface PasswordOptions {
  length: number;
  includeUppercase: boolean;
  includeLowercase: boolean;
  includeNumbers: boolean;
  includeSymbols: boolean;
  excludeAmbiguous: boolean; // New option
}

const DEFAULT_OPTIONS: PasswordOptions = {
  length: 16,
  includeUppercase: true,
  includeLowercase: true,
  includeNumbers: true,
  includeSymbols: true,
  excludeAmbiguous: true, // Default to true for better readability
};

const CHAR_SETS_BASE = {
  uppercase: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
  lowercase: 'abcdefghijklmnopqrstuvwxyz',
  numbers: '0123456789',
  symbols: '!@#$%^&*()_+-=[]{}|;:,.<>?',
};

const AMBIGUOUS_CHARS = /[Il1O0|]/g; // Characters to exclude if option is set

export type PasswordStrength = 'Very Weak' | 'Weak' | 'Medium' | 'Strong' | 'Very Strong' | '';

export function usePasswordGenerator() {
  const [password, setPassword] = useState<string>('');
  const [options, setOptions] = useState<PasswordOptions>(DEFAULT_OPTIONS);
  const [strength, setStrength] = useState<PasswordStrength>('');

  const getEffectiveCharSet = useCallback(() => {
    const effectiveSets = { ...CHAR_SETS_BASE };
    if (options.excludeAmbiguous) {
      effectiveSets.uppercase = CHAR_SETS_BASE.uppercase.replace(AMBIGUOUS_CHARS, '');
      effectiveSets.lowercase = CHAR_SETS_BASE.lowercase.replace(AMBIGUOUS_CHARS, '');
      effectiveSets.numbers = CHAR_SETS_BASE.numbers.replace(AMBIGUOUS_CHARS, '');
      // Symbols are less likely to have ambiguous chars in this set, but could be extended
    }
    return effectiveSets;
  }, [options.excludeAmbiguous]);

  const calculateStrength = useCallback((currentPassword: string, currentOptions: PasswordOptions): PasswordStrength => {
    if (!currentPassword) return '';
    let score = 0;
    if (currentOptions.length >= 16) score += 2;
    else if (currentOptions.length >= 12) score += 1;
    else if (currentOptions.length < 8) score -=1;

    let typesCount = 0;
    if (currentOptions.includeUppercase && /[A-Z]/.test(currentPassword)) typesCount++;
    if (currentOptions.includeLowercase && /[a-z]/.test(currentPassword)) typesCount++;
    if (currentOptions.includeNumbers && /[0-9]/.test(currentPassword)) typesCount++;
    if (currentOptions.includeSymbols && /[^A-Za-z0-9]/.test(currentPassword)) typesCount++;
    
    if (typesCount >= 4) score += 3;
    else if (typesCount >= 3) score += 2;
    else if (typesCount >= 2) score += 1;
    
    const minTypesRequired = 
        (currentOptions.includeUppercase ? 1:0) + 
        (currentOptions.includeLowercase ? 1:0) + 
        (currentOptions.includeNumbers ? 1:0) + 
        (currentOptions.includeSymbols ? 1:0);
    if (typesCount < minTypesRequired && minTypesRequired > 0) return 'Very Weak';

    if (score <= 0) return 'Very Weak';
    if (score <= 1) return 'Weak';
    if (score <= 2) return 'Medium';
    if (score <= 3) return 'Strong';
    return 'Very Strong';
  }, []);

  const generatePassword = useCallback(() => {
    const CHAR_SETS = getEffectiveCharSet();
    let charPool = '';
    const guaranteedChars: string[] = [];

    if (options.includeUppercase && CHAR_SETS.uppercase.length > 0) {
      charPool += CHAR_SETS.uppercase;
      guaranteedChars.push(CHAR_SETS.uppercase[Math.floor(Math.random() * CHAR_SETS.uppercase.length)]);
    }
    if (options.includeLowercase && CHAR_SETS.lowercase.length > 0) {
      charPool += CHAR_SETS.lowercase;
      guaranteedChars.push(CHAR_SETS.lowercase[Math.floor(Math.random() * CHAR_SETS.lowercase.length)]);
    }
    if (options.includeNumbers && CHAR_SETS.numbers.length > 0) {
      charPool += CHAR_SETS.numbers;
      guaranteedChars.push(CHAR_SETS.numbers[Math.floor(Math.random() * CHAR_SETS.numbers.length)]);
    }
    if (options.includeSymbols && CHAR_SETS.symbols.length > 0) {
      charPool += CHAR_SETS.symbols;
      guaranteedChars.push(CHAR_SETS.symbols[Math.floor(Math.random() * CHAR_SETS.symbols.length)]);
    }

    if (charPool === '') {
      showError('Please select at least one character type or adjust ambiguous character settings.');
      setPassword('');
      setStrength('');
      return;
    }
    
    // Adjust length if guaranteed characters exceed desired length (edge case with short passwords and many types)
    const currentLength = Math.max(options.length, guaranteedChars.length);


    let newPasswordArray: string[] = [...guaranteedChars];
    const remainingLength = currentLength - newPasswordArray.length;

    for (let i = 0; i < remainingLength; i++) {
      const randomIndex = Math.floor(Math.random() * charPool.length);
      newPasswordArray.push(charPool[randomIndex]);
    }
    
    for (let i = newPasswordArray.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [newPasswordArray[i], newPasswordArray[j]] = [newPasswordArray[j], newPasswordArray[i]];
    }
    
    const finalPassword = newPasswordArray.slice(0, options.length).join(''); // Ensure final length is correct
    setPassword(finalPassword);
    setStrength(calculateStrength(finalPassword, options));
  }, [options, calculateStrength, getEffectiveCharSet]);

  const updateOption = <K extends keyof PasswordOptions>(
    optionKey: K,
    value: PasswordOptions[K]
  ) => {
    setOptions((prev) => ({ ...prev, [optionKey]: value }));
  };
  
  useEffect(() => {
    generatePassword();
  }, [options, generatePassword]);

  const copyToClipboard = useCallback(async () => {
    if (!password) {
      showError('No password generated yet.');
      return;
    }
    try {
      await navigator.clipboard.writeText(password);
      showSuccess('Password copied to clipboard!');
    } catch (err) {
      showError('Failed to copy password.');
    }
  }, [password]);

  return {
    password,
    options,
    strength,
    generatePassword,
    updateOption,
    copyToClipboard,
  };
}
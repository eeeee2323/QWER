import React from 'react';
import { PasswordStrength } from '@/hooks/usePasswordGenerator';
import { cn } from '@/lib/utils';
import { Card, CardContent } from '@/components/ui/card';

interface PasswordStrengthIndicatorProps {
  strength: PasswordStrength;
}

const strengthConfig: Record<PasswordStrength, { label: string; colorClass: string; barCount: number }> = {
  '': { label: 'Awaiting options...', colorClass: 'bg-gray-300 dark:bg-gray-700', barCount: 0 },
  'Very Weak': { label: 'Very Weak', colorClass: 'bg-[hsl(var(--strength-very-weak))]', barCount: 1 },
  'Weak': { label: 'Weak', colorClass: 'bg-[hsl(var(--strength-weak))]', barCount: 2 },
  'Medium': { label: 'Medium', colorClass: 'bg-[hsl(var(--strength-medium))]', barCount: 3 },
  'Strong': { label: 'Strong', colorClass: 'bg-[hsl(var(--strength-strong))]', barCount: 4 },
  'Very Strong': { label: 'Very Strong', colorClass: 'bg-[hsl(var(--strength-very-strong))]', barCount: 5 },
};

const PasswordStrengthIndicator: React.FC<PasswordStrengthIndicatorProps> = ({ strength }) => {
  const config = strengthConfig[strength] || strengthConfig[''];

  return (
    <Card className="w-full max-w-md shadow-xl animate-fadeIn border-border/60 bg-card backdrop-blur-sm" style={{ animationDelay: '0.2s' }}>
      <CardContent className="p-4">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm font-medium text-foreground/80">Password Strength:</span>
          <span className={cn("text-sm font-semibold", 
            strength === 'Very Weak' ? 'text-[hsl(var(--strength-very-weak))]' :
            strength === 'Weak' ? 'text-[hsl(var(--strength-weak))]' :
            strength === 'Medium' ? 'text-[hsl(var(--strength-medium))]' :
            strength === 'Strong' ? 'text-[hsl(var(--strength-strong))]' :
            strength === 'Very Strong' ? 'text-[hsl(var(--strength-very-strong))]' :
            'text-foreground/70'
          )}>
            {config.label}
          </span>
        </div>
        <div className="flex space-x-1.5 h-2.5 rounded-full overflow-hidden bg-muted/70">
          {Array.from({ length: 5 }).map((_, index) => (
            <div
              key={index}
              className={cn(
                "flex-1 h-full rounded-sm transition-all duration-500 ease-out",
                index < config.barCount ? config.colorClass : 'bg-transparent'
              )}
            />
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default PasswordStrengthIndicator;
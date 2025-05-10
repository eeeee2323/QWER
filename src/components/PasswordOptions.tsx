import React from 'react';
import { PasswordOptions as IPasswordOptions } from '@/hooks/usePasswordGenerator';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { Checkbox } from '@/components/ui/checkbox';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Info, EyeOff } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipTrigger, TooltipProvider } from '@/components/ui/tooltip';

interface PasswordOptionsProps {
  options: IPasswordOptions;
  onOptionChange: <K extends keyof IPasswordOptions>(
    optionKey: K,
    value: IPasswordOptions[K]
  ) => void;
}

const PasswordOptionsComponent: React.FC<PasswordOptionsProps> = ({ options, onOptionChange }) => {
  const optionItems = [
    { id: 'includeUppercase', label: 'Uppercase (A-Z)' },
    { id: 'includeLowercase', label: 'Lowercase (a-z)' },
    { id: 'includeNumbers', label: 'Numbers (0-9)' },
    { id: 'includeSymbols', label: 'Symbols (!@#$%)' },
    { id: 'excludeAmbiguous', label: 'Exclude Ambiguous (I, l, 1, O, 0)', icon: <EyeOff className="h-4 w-4 mr-2 text-muted-foreground" /> },
  ];

  return (
    <TooltipProvider delayDuration={100}>
      <Card className="w-full max-w-md shadow-xl animate-fadeInUp border-border/60 bg-card backdrop-blur-sm" style={{ animationDelay: '0.3s' }}>
        <CardHeader className="pb-4">
          <CardTitle className="text-2xl font-semibold text-center text-primary flex items-center justify-center space-x-2">
            <span>Customize Options</span>
            <Tooltip>
              <TooltipTrigger asChild>
                <Info className="h-5 w-5 text-muted-foreground hover:text-primary cursor-help transition-colors" />
              </TooltipTrigger>
              <TooltipContent side="top">
                <p>Adjust settings to fine-tune your password.</p>
              </TooltipContent>
            </Tooltip>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-5 p-6 pt-2">
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <Label htmlFor="length" className="text-md font-medium text-foreground/90">Password Length</Label>
              <span className="text-md font-semibold text-primary bg-primary/10 px-2.5 py-1 rounded-md">{options.length}</span>
            </div>
            <Slider
              id="length"
              min={8}
              max={64}
              step={1}
              value={[options.length]}
              onValueChange={(value) => onOptionChange('length', value[0])}
              className="[&>span:first-child]:h-2.5 [&>span:first-child>span]:h-2.5 [&>span:first-child>span]:bg-primary [&>span:first-child]:bg-muted"
            />
          </div>

          {optionItems.map(opt => (
            <div 
              key={opt.id} 
              className="flex items-center space-x-3 p-3.5 rounded-lg hover:bg-secondary/70 transition-all duration-200 cursor-pointer border border-transparent hover:border-primary/30"
              onClick={() => onOptionChange(opt.id as keyof IPasswordOptions, !options[opt.id as keyof IPasswordOptions])}
            >
              <Checkbox
                id={opt.id}
                checked={options[opt.id as keyof IPasswordOptions] as boolean}
                onCheckedChange={(checked) => onOptionChange(opt.id as keyof IPasswordOptions, !!checked)}
                className="h-5 w-5 rounded text-primary focus:ring-primary focus:ring-offset-0 border-muted-foreground data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground transition-all"
              />
              {opt.icon}
              <Label htmlFor={opt.id} className="text-sm font-normal cursor-pointer flex-grow text-foreground/90">{opt.label}</Label>
            </div>
          ))}
        </CardContent>
      </Card>
    </TooltipProvider>
  );
};

export default PasswordOptionsComponent;
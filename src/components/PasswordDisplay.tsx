import React from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Copy, RefreshCw, Check } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipTrigger, TooltipProvider } from '@/components/ui/tooltip';
import { Card, CardContent } from '@/components/ui/card';

interface PasswordDisplayProps {
  password?: string;
  onCopyToClipboard: () => void;
  onRegenerate: () => void;
}

const PasswordDisplay: React.FC<PasswordDisplayProps> = ({ password, onCopyToClipboard, onRegenerate }) => {
  const [copied, setCopied] = React.useState(false);

  const handleCopy = () => {
    onCopyToClipboard();
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <TooltipProvider delayDuration={100}>
      <Card className="w-full max-w-md shadow-xl animate-fadeInUp border-border/60 bg-card backdrop-blur-sm">
        <CardContent className="p-6 space-y-4">
          <div className="relative flex items-center group">
            <Input
              type="text"
              value={password || 'Generating...'}
              readOnly
              placeholder="Your Secure Password"
              className="text-xl sm:text-2xl p-4 pr-28 border-2 border-input focus:border-primary transition-all duration-300 h-16 shadow-sm focus:shadow-lg bg-background placeholder:text-muted-foreground tracking-wider"
              aria-label="Generated Password"
            />
            {password && (
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={handleCopy}
                    className="absolute right-14 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-primary transition-colors h-10 w-10"
                    aria-label="Copy password"
                  >
                    {copied ? <Check className="h-7 w-7 text-green-500" /> : <Copy className="h-7 w-7" />}
                  </Button>
                </TooltipTrigger>
                <TooltipContent side="top">
                  <p>{copied ? 'Copied!' : 'Copy to Clipboard'}</p>
                </TooltipContent>
              </Tooltip>
            )}
          </div>
          <Button
            onClick={onRegenerate}
            className="w-full text-lg py-3 h-16 bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 text-primary-foreground transition-all duration-300 transform active:scale-95 shadow-lg hover:shadow-xl flex items-center justify-center space-x-2.5 group"
          >
            <RefreshCw className="h-6 w-6 group-hover:animate-spin transition-transform" />
            <span className="font-semibold">Generate New Password</span>
          </Button>
        </CardContent>
      </Card>
    </TooltipProvider>
  );
};

export default PasswordDisplay;
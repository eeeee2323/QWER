import React from 'react';
import { usePasswordGenerator } from '@/hooks/usePasswordGenerator';
import PasswordOptionsComponent from '@/components/PasswordOptions';
import PasswordDisplay from '@/components/PasswordDisplay';
import PasswordStrengthIndicator from '@/components/PasswordStrengthIndicator';
import { Github, ShieldCheck } from 'lucide-react';

const PasswordGeneratorPage: React.FC = () => {
  const { password, options, strength, generatePassword, updateOption, copyToClipboard } = usePasswordGenerator();

  return (
    <div className="min-h-screen text-foreground flex flex-col items-center justify-center p-4 sm:p-6 space-y-4 md:space-y-6 selection:bg-primary/30 relative overflow-hidden">
      
      <div className="absolute inset-0 -z-10 h-full w-full bg-background">
        {/* Grid Pattern */}
        <div 
          className="absolute inset-0 bg-[linear-gradient(to_right,hsl(var(--border)/0.15)_1px,transparent_1px),linear-gradient(to_bottom,hsl(var(--border)/0.15)_1px,transparent_1px)]"
          style={{ backgroundSize: '40px 40px' }}
        ></div>
        
        {/* Primary Color Glow - Responsive Sizes */}
        <div 
          className="absolute -top-1/4 -left-1/4 
                     h-[350px] w-[350px] blur-[120px] 
                     sm:h-[500px] sm:w-[500px] sm:blur-[140px] 
                     lg:h-[700px] lg:w-[700px] lg:-top-2/5 lg:-left-2/5 lg:blur-[160px] 
                     rounded-full bg-primary/30 sm:bg-primary/40 opacity-70 sm:opacity-80 animate-pulse"
          style={{ animationDuration: '9s' }}
        ></div>
        
        {/* Accent Color Glow - Responsive Sizes */}
        <div 
          className="absolute -bottom-1/4 -right-1/4 
                     h-[300px] w-[400px] blur-[110px] 
                     sm:h-[450px] sm:w-[550px] sm:blur-[130px] 
                     lg:h-[650px] lg:w-[750px] lg:-bottom-2/5 lg:-right-2/5 lg:blur-[150px] 
                     rounded-full bg-accent/25 sm:bg-accent/35 opacity-60 sm:opacity-70 animate-pulse"
          style={{ animationDuration: '11s', animationDelay: '1.2s' }}
        ></div>
      </div>

      {/* Foreground Content */}
      <header className="text-center space-y-2 sm:space-y-3 animate-fadeInDown z-10">
        <div className="inline-flex items-center justify-center p-2.5 sm:p-3 bg-primary/10 rounded-full mb-2 sm:mb-3">
          <ShieldCheck className="h-10 w-10 sm:h-12 sm:w-12 lg:h-14 lg:w-14 text-primary" />
        </div>
        {/* Updated ImpasswoRD title styling */}
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-wide text-gradient-shine">
          ImpasswoRD
        </h2>
        {/* Responsive Title Font Size */}
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight">
          <span className="text-gradient-shine text-blue-glow">Secure</span> 
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary via-accent to-primary"> Password Generator</span>
        </h1>
        {/* Responsive Paragraph Font Size */}
        <p className="text-sm sm:text-md lg:text-lg text-muted-foreground max-w-xs sm:max-w-md lg:max-w-lg mx-auto">
          Craft robust & unique passwords with advanced customization. Powered by ORACLEv3.
        </p>
      </header>

      <main className="w-full max-w-md space-y-4 md:space-y-5 z-10">
        <PasswordDisplay
          password={password}
          onCopyToClipboard={copyToClipboard}
          onRegenerate={generatePassword}
        />
        <PasswordStrengthIndicator strength={strength} />
        <PasswordOptionsComponent options={options} onOptionChange={updateOption} />
      </main>

      <footer className="text-center text-muted-foreground/80 mt-6 sm:mt-8 lg:mt-10 animate-fadeInUp z-10" style={{ animationDelay: '0.4s' }}>
        <p className="text-xs sm:text-sm">Built by <span className="font-semibold text-primary/90">ORACLEv3</span></p>
        <a
          href="https://github.com/dyad-assist/dyad" 
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center space-x-1.5 hover:text-primary transition-colors group text-xs mt-1"
        >
          <Github className="h-3 sm:h-3.5 w-3 sm:w-3.5 group-hover:text-accent transition-colors" />
          <span>View Project Base</span>
        </a>
      </footer>
    </div>
  );
};

export default PasswordGeneratorPage;
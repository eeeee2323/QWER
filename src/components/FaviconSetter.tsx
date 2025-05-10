import React, { useEffect } from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { Zap } from 'lucide-react'; // Changed from ShieldCheck to Zap

const FaviconSetter: React.FC = () => {
  useEffect(() => {
    console.log('[FaviconSetter] Running effect for Zap icon...');
    try {
      // Using a yellow color for the lightning bolt
      const iconColor = "#FBBF24"; // A nice gold/yellow color (Tailwind's amber-400)
      console.log(`[FaviconSetter] Using icon color: ${iconColor}`);

      const iconSvgString = renderToStaticMarkup(
        <Zap color={iconColor} size={32} fill={iconColor} /> // Changed from ShieldCheck to Zap, added fill
      );
      console.log('[FaviconSetter] Generated icon SVG string:', iconSvgString);

      const fullSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="32" height="32">${iconSvgString}</svg>`;
      console.log('[FaviconSetter] Full SVG markup:', fullSvg);
      
      const svgDataUri = `data:image/svg+xml,${encodeURIComponent(fullSvg)}`;
      console.log('[FaviconSetter] Generated SVG Data URI:', svgDataUri);

      let link = document.querySelector<HTMLLinkElement>("link[rel*='icon']");
      if (!link) {
        console.log('[FaviconSetter] No existing link found, creating new one.');
        link = document.createElement('link');
        link.rel = 'icon';
        document.getElementsByTagName('head')[0].appendChild(link);
      } else {
        console.log('[FaviconSetter] Found existing link, will update href.');
      }

      link.type = 'image/svg+xml';
      link.href = svgDataUri;
      console.log('[FaviconSetter] Successfully set link href:', link.href);
      
      link.setAttribute('data-timestamp', Date.now().toString());

    } catch (error) {
      console.error('[FaviconSetter] Error generating or setting favicon:', error);
    }
  }, []);

  return null;
};

export default FaviconSetter;
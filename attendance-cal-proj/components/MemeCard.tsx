
import React, { useState } from 'react';
import { MemeResponse } from '../types';
import { Loader2, ImageOff } from 'lucide-react';

interface MemeCardProps {
  data: MemeResponse | null;
  loading: boolean;
  percentage: number;
}

// Fixed stable URLs for meme templates
const TEMPLATES: Record<string, string> = {
  // Safe (> 75%)
  success: 'https://i.imgflip.com/1bhk.jpg',     // Success Kid
  smart: 'https://i.imgflip.com/1h7in3.jpg',    // Roll Safe
  drake: 'https://i.imgflip.com/30b1gx.jpg',    // Drake Happy
  pauper: 'https://i.imgflip.com/22bdq6.jpg',   // Tuxedo Pooh
  cheers: 'https://i.imgflip.com/8k0sa.jpg',    // Leo Cheers
  buttons: 'https://i.imgflip.com/1g8my4.jpg',  // Two Buttons
  
  // Danger (<= 75%)
  fine: 'https://i.imgflip.com/1ooaki.jpg',     // This is fine
  panik: 'https://i.imgflip.com/306q4x.jpg',    // Panik Kalm Panik
  clown: 'https://i.imgflip.com/38el31.jpg',    // Clown makeup
  disaster: 'https://i.imgflip.com/23ls.jpg',   // Disaster Girl
  sweating: 'https://i.imgflip.com/32p1d8.jpg', // Jordan Peele Sweating
  grave: 'https://i.imgflip.com/3nx72a.jpg',    // Grant Gustin Grave
};

const MemeCard: React.FC<MemeCardProps> = ({ data, loading, percentage }) => {
  const [imgError, setImgError] = useState(false);

  // Reset error state when data changes
  React.useEffect(() => {
    setImgError(false);
  }, [data]);

  if (loading) {
    return (
      <div className="w-full h-60 rounded-xl border border-sky-100 bg-white shadow-sm flex flex-col items-center justify-center gap-3">
        <Loader2 className="w-6 h-6 text-sky-400 animate-spin" />
        <span className="text-sky-400/80 font-medium text-xs tracking-widest uppercase">Cooking up a roast...</span>
      </div>
    );
  }

  if (!data) return null;

  const bgImage = TEMPLATES[data.templateId || 'smart'] || TEMPLATES['smart'];

  return (
    <div className="w-full relative group overflow-hidden rounded-xl shadow-lg bg-slate-900 h-64 border-2 border-white ring-1 ring-slate-100">
      
      {/* Meme Image Background */}
      <div className="relative w-full h-full bg-slate-800 flex items-center justify-center">
        {!imgError ? (
          <img 
            src={bgImage} 
            alt="Meme Template" 
            className="w-full h-full object-cover"
            onError={() => setImgError(true)}
            referrerPolicy="no-referrer"
          />
        ) : (
          <div className="flex flex-col items-center justify-center text-slate-500 gap-2">
            <ImageOff className="w-8 h-8 opacity-50" />
            <span className="text-xs uppercase font-bold tracking-wider">Template Failed Load</span>
          </div>
        )}
        
        {/* Subtle overlay to ensure text pop if image is bright */}
        <div className="absolute inset-0 bg-black/10"></div>

        {/* Text Overlay Container - Flex space-between for Top/Bottom text */}
        <div className="absolute inset-0 flex flex-col justify-between py-3 px-2 text-center pointer-events-none">
          
          {/* Top Text */}
          <h2 
            className="text-3xl font-normal text-white uppercase tracking-tighter w-full break-words meme-font leading-[1.0]"
            style={{ 
              textShadow: '3px 3px 0 #000, -1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000' 
            }}
          >
            {data.topText}
          </h2>

          {/* Bottom Text */}
          <h2 
            className="text-3xl font-normal text-white uppercase tracking-tighter w-full break-words meme-font leading-[1.0]"
            style={{ 
               textShadow: '3px 3px 0 #000, -1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000' 
            }}
          >
            {data.bottomText}
          </h2>
        </div>
      </div>
      
      {/* Footer Badge */}
      <div className="absolute bottom-1 right-2 opacity-60">
        <span className="text-[8px] font-bold uppercase tracking-widest text-white drop-shadow-md">
         Debarred-Saver
        </span>
      </div>
    </div>
  );
};

export default MemeCard;

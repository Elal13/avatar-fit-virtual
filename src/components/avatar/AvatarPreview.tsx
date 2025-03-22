
import { useState, useEffect, useRef } from 'react';

interface AvatarPreviewProps {
  className?: string;
  outfitItems?: string[];
  isRotating?: boolean;
}

export function AvatarPreview({ 
  className = "", 
  outfitItems = [], 
  isRotating = true 
}: AvatarPreviewProps) {
  const canvasRef = useRef<HTMLDivElement>(null);
  const [loading, setLoading] = useState(true);

  // In a real implementation, this would initialize a 3D scene with Three.js or similar
  useEffect(() => {
    // Simulate loading the 3D avatar
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div 
      className={`relative rounded-xl overflow-hidden bg-gradient-to-b from-gray-50 to-gray-100 ${className}`}
    >
      {loading ? (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="h-12 w-12 rounded-full border-4 border-avatar-200 border-t-avatar-600 animate-spin" />
        </div>
      ) : (
        <>
          <div 
            ref={canvasRef} 
            className="h-full w-full flex items-center justify-center"
          >
            {/* Placeholder for the actual 3D avatar implementation */}
            <div className="relative w-64 h-96 md:w-80 md:h-[450px] bg-gradient-to-b from-avatar-50 to-avatar-100 rounded-xl flex items-center justify-center overflow-hidden">
              {/* Avatar silhouette */}
              <svg 
                className={`w-56 h-80 text-avatar-900/10 transition-transform duration-300 ease-in-out ${isRotating ? 'animate-float' : ''}`}
                viewBox="0 0 24 24" 
                fill="currentColor"
              >
                <path d="M12 2c2.21 0 4 1.79 4 4s-1.79 4-4 4-4-1.79-4-4 1.79-4 4-4zm0 10c4.42 0 8 1.79 8 4v2H4v-2c0-2.21 3.58-4 8-4z" />
              </svg>
              
              {/* Example clothing items rendered on avatar */}
              {outfitItems.includes('shirt') && (
                <div className="absolute top-[30%] left-1/2 transform -translate-x-1/2 w-40 h-20 bg-avatar-500/20 rounded-lg"></div>
              )}
              {outfitItems.includes('pants') && (
                <div className="absolute top-[55%] left-1/2 transform -translate-x-1/2 w-32 h-28 bg-avatar-700/20 rounded-lg"></div>
              )}
              {outfitItems.includes('shoes') && (
                <div className="absolute bottom-[8%] left-1/2 transform -translate-x-1/2 w-28 h-10 bg-avatar-900/20 rounded-lg"></div>
              )}
              {outfitItems.includes('glasses') && (
                <div className="absolute top-[20%] left-1/2 transform -translate-x-1/2 w-24 h-6 bg-avatar-400/20 rounded-lg"></div>
              )}
              
              <div className="absolute bottom-4 right-4 bg-black/20 backdrop-blur-md text-white text-xs px-2 py-1 rounded-full">
                Vista previa 3D
              </div>
            </div>
          </div>
          <div className="absolute bottom-4 left-4 bg-white/80 backdrop-blur-sm text-xs font-medium text-gray-700 px-3 py-2 rounded-full shadow-sm flex items-center">
            <span className="h-2 w-2 bg-green-500 rounded-full mr-2"></span>
            Avatar Activo
          </div>
        </>
      )}
    </div>
  );
}

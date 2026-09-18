import React, { useState } from "react";

type AuroraLogoProps = {
  variant?: "header" | "full" | "icon" | "footer";
  isLightText?: boolean;
  className?: string;
  showTagline?: boolean;
};

export const AuroraLogo: React.FC<AuroraLogoProps> = ({
  variant = "header",
  isLightText = false,
  className = "",
  showTagline = true,
}) => {
  const [imgFailed, setImgFailed] = useState(false);

  // Icon only
  if (variant === "icon") {
    return (
      <div className={`relative inline-flex items-center justify-center ${className}`}>
        <svg
          viewBox="0 0 100 100"
          className="w-8 h-8 text-amber-500 fill-current"
          aria-hidden="true"
        >
          {/* Stylized Golden A with star */}
          <path
            d="M50 8 L32 78 Q42 62 58 62 Q72 62 76 78 Z"
            fill="none"
            stroke="currentColor"
            strokeWidth="3.5"
            strokeLinecap="round"
          />
          <path
            d="M50 16 L68 76"
            stroke="currentColor"
            strokeWidth="3.5"
            strokeLinecap="round"
          />
          <path
            d="M26 48 Q44 32 68 56 Q78 66 84 72"
            fill="none"
            stroke="currentColor"
            strokeWidth="3"
            strokeLinecap="round"
          />
          {/* Diamond Star */}
          <path
            d="M50 48 Q50 56 56 56 Q50 56 50 64 Q50 56 44 56 Q50 56 50 48 Z"
            fill="currentColor"
          />
        </svg>
      </div>
    );
  }

  // Full Brand Mark (like the uploaded image)
  if (variant === "full") {
    return (
      <div className={`flex flex-col items-center text-center select-none ${className}`}>
        {/* Render uploaded image logo if available */}
        {!imgFailed ? (
          <div className="flex flex-col items-center">
            <img
              src="/aurora.png"
              alt="AURORA Fine Jewellery"
              onError={() => setImgFailed(true)}
              className="w-32 sm:w-40 h-auto object-contain drop-shadow-sm transition hover:scale-102 duration-300"
            />
          </div>
        ) : (
          <div className="flex flex-col items-center">
            {/* Sculpted Emblem Vector Fallback */}
            <div className="relative mb-2">
              <svg
                viewBox="0 0 120 120"
                className="w-20 h-20 text-[#c5a059]"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M60 12 L38 88 M60 12 L78 88"
                  stroke="currentColor"
                  strokeWidth="4"
                  strokeLinecap="round"
                />
                <path
                  d="M28 58 C46 36 74 60 88 78 C94 84 98 88 102 90"
                  stroke="currentColor"
                  strokeWidth="3.5"
                  strokeLinecap="round"
                />
                {/* 4-point Diamond Star */}
                <path
                  d="M60 52 C60 62 68 62 68 62 C68 62 60 62 60 72 C60 62 52 62 52 62 C52 62 60 62 60 52 Z"
                  fill="currentColor"
                />
              </svg>
            </div>

            <div className={`text-3xl sm:text-4xl tracking-[0.4em] font-serif ${isLightText ? "text-white" : "text-[#161513]"}`}>
              AURORA
            </div>
            <div className={`mt-1 text-[8px] tracking-[0.55em] uppercase font-medium ${isLightText ? "text-white/70" : "text-black/60"}`}>
              FINE JEWELLERY
            </div>
            <div className="w-8 h-[1px] bg-[#c5a059] my-3" />
            <div className={`text-[8px] tracking-[0.4em] uppercase ${isLightText ? "text-white/50" : "text-black/45"}`}>
              MORE THAN A MOMENT
            </div>
          </div>
        )}
      </div>
    );
  }

  // Header Brand Mark
  return (
    <div className={`flex items-center gap-1.5 sm:gap-2.5 select-none ${className}`}>
      {/* Monogram emblem */}
      <div className="relative flex items-center justify-center flex-shrink-0">
        <svg
          viewBox="0 0 100 100"
          className="w-6 h-6 sm:w-10 sm:h-10 lg:w-12 lg:h-12 text-[#c5a059] drop-shadow-xs"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M50 14 L34 82 M50 14 L66 82"
            stroke="currentColor"
            strokeWidth="3.5"
            strokeLinecap="round"
          />
          <path
            d="M26 52 C42 34 68 56 80 72"
            stroke="currentColor"
            strokeWidth="3"
            strokeLinecap="round"
          />
          {/* Star */}
          <path
            d="M50 46 C50 54 56 54 56 54 C56 54 50 54 50 62 C50 54 44 54 44 54 C44 54 50 54 50 46 Z"
            fill="currentColor"
          />
        </svg>
      </div>

      {/* Typography */}
      <div className="text-left flex flex-col justify-center min-w-0">
        <div
          className={`text-[15px] sm:text-[16px] md:text-[19px] tracking-[0.18em] sm:tracking-[0.28em] md:tracking-[0.34em] font-serif leading-none whitespace-nowrap ${
            isLightText ? "text-white" : "text-[#161513]"
          }`}
        >
          AURORA
        </div>
        <div
          className={`mt-0.5 sm:mt-1 text-[8px] sm:text-[6px] md:text-[7px] tracking-[0.22em] sm:tracking-[0.35em] uppercase leading-none whitespace-nowrap ${
            isLightText ? "text-white/70" : "text-black/50"
          }`}
        >
          FINE JEWELLERY
        </div>
      </div>
    </div>
  );
};

import React, { useState } from "react";
import { getProductFallbackImage } from "../lib/products";

type SafeImageProps = {
  src: string;
  alt: string;
  productId?: string;
  fallbackIndex?: number;
  className?: string;
  onClick?: () => void;
};

export const SafeImage: React.FC<SafeImageProps> = ({
  src,
  alt,
  productId,
  fallbackIndex = 0,
  className = "",
  onClick,
}) => {
  const [imgSrc, setImgSrc] = useState<string>(src);
  const [hasError, setHasError] = useState(false);

  const handleError = () => {
    if (!hasError && productId) {
      setHasError(true);
      setImgSrc(getProductFallbackImage(productId, fallbackIndex));
    } else if (!hasError) {
      setHasError(true);
      setImgSrc(
        "https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&w=1200&q=90"
      );
    }
  };

  return (
    <img
      src={imgSrc}
      alt={alt}
      onError={handleError}
      onClick={onClick}
      className={className}
      loading="lazy"
    />
  );
};

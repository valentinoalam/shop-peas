"use client"
import { useState, useEffect } from 'react';
import Image from 'next/image';

interface ImageWithFallbackProps extends React.ComponentProps<typeof Image> {
  fallbackSrc?: string;
}

const ImageWithFallback = ({
  src,
  fallbackSrc = '/placeholder.svg',
  alt,
  ...rest
}: ImageWithFallbackProps) => {
  const [hasError, setHasError] = useState(false);

  // Reset error state when src changes
  useEffect(() => {
    setHasError(false);
  }, [src]);

  return (
    <Image
      {...rest}
      alt={alt}
      src={hasError || !src ? fallbackSrc : src}
      onError={() => setHasError(true)}
      unoptimized={hasError} // Disable optimization for fallback image
    />
  );
};

export default ImageWithFallback;
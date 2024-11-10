'use client';

import { useEffect, useState } from 'react';

type Properties = {
  images: string[];
  className?: string;
};

const preloadImages = async (images: string[]) => {
  return await Promise.all(
    images.map((src) => {
      return new Promise<HTMLImageElement>((resolve, reject) => {
        const img = new Image();
        img.src = src;
        img.onload = () => resolve(img);
        img.onerror = () => reject();
      });
    }),
  );
};

export const ImageSequencer = ({ images, className }: Properties) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loadedImages, setLoadedImages] = useState<HTMLImageElement[]>([]);
  const hasFirstImage = loadedImages.length > 0;
  const isLoaded = loadedImages.length === images.length;

  useEffect(() => {
    const run = async () => {
      const [firstImage] = images;
      const v = await preloadImages([firstImage!]);
      setLoadedImages(v);
    };
    run();
  }, [images]);

  useEffect(() => {
    if (isLoaded || !hasFirstImage) {
      return;
    }

    const run = async () => {
      const [_firstImage, ...restImages] = images;
      const v = await preloadImages(restImages);
      setLoadedImages((prev) => [...prev, ...v]);
    };

    run();
  }, [hasFirstImage, images, isLoaded]);

  useEffect(() => {
    if (!isLoaded) {
      return;
    }

    const frameInterval = 1000 / 30; // 30 FPS

    const intervalId = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, frameInterval);

    return () => {
      clearInterval(intervalId);
    };
  }, [images.length, isLoaded]);

  if (!hasFirstImage) {
    return null;
  }

  return (
    <img
      src={!isLoaded ? loadedImages[0]!.src : loadedImages[currentIndex]!.src}
      className={className}
      alt="Animated Sequence"
      style={{
        width: '100%',
      }}
    />
  );
};

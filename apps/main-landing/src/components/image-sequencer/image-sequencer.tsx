'use client';

import { classes } from '@idriss-xyz/ui/utils';
import { useEffect, useRef, useState } from 'react';

type Properties = {
  images: string[];
  className?: string;
  direction?: 'forward' | 'backward';
  infinite?: boolean;
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

export const ImageSequencer = ({
  images,
  className,
  direction = 'forward',
  infinite = true,
}: Properties) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loadedImages, setLoadedImages] = useState<HTMLImageElement[]>([]);
  const hasFirstImage = loadedImages.length > 0;
  const isLoaded = loadedImages.length === images.length;
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const run = async () => {
      const [firstImage] = images;
      const lastImage = images[images.length - 1];
      const v = await preloadImages([
        direction === 'forward' ? firstImage! : lastImage!,
      ]);
      setLoadedImages(v);
    };
    run();
  }, [images]);

  useEffect(() => {
    if (isLoaded || !hasFirstImage) {
      return;
    }

    const run = async () => {
      const _images = JSON.parse(JSON.stringify(images)) as string[]
      if(direction === 'backward') {
        _images.reverse()
      }
      const [_firstImage, ...restImages] = _images;
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

    intervalRef.current = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, frameInterval);

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [images.length, isLoaded]);

  useEffect(() => {
    if (
      !infinite &&
      currentIndex === images.length - 1 &&
      intervalRef.current
    ) {
      clearInterval(intervalRef.current);
    }
  }, [infinite, currentIndex]);

  if (!hasFirstImage) {
    return null;
  }

  return (
    <img
      src={!isLoaded ? loadedImages[0]!.src : loadedImages[currentIndex]!.src}
      className={classes('pointer-events-none', className)}
      alt="Animated Sequence"
    />
  );
};

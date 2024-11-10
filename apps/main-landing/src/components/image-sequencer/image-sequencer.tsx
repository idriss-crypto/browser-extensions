'use client';

import { useEffect, useState } from 'react';
import NextImage from 'next/image';

type Properties = {
  images: string[];
  className?: string;
};

const preloadImages = async (images: string[]) => {
  return await Promise.all(
    images.map((src) => {
      return new Promise<HTMLImageElement>((resolve, reject) => {
        console.log('preload for ', src)
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
    console.log("1st useEffect")
    const run = async () => {
      const [firstImage] = images;
      const v = await preloadImages([firstImage!]);
      setLoadedImages(v);
    };
    run();
  }, [images]);

  useEffect(() => {
    console.log("2nd useEffect")

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
    console.log('3rd useEffect')
    if (!isLoaded) {
      console.log('3rd useEffect - early return')
      return;
    }
    console.log('3rd useEffect - body')
    
    const frameInterval = 1000 / 60; // 60 FPS

    const intervalId = setInterval(() => {
      console.log('3rd useEffect - inside interval')
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, frameInterval);

    return () => {
      console.log('3rd useEffect - clear interval')
      clearInterval(intervalId);
    };
  }, [images.length, isLoaded]);

  if (!hasFirstImage) {
    return null;
  }

  return (
    <NextImage
      className={className}
      width={2560}
      height={1440}
      src={!isLoaded ? loadedImages[0]!.src : loadedImages[currentIndex]!.src}
      alt="Animated Sequence"
      quality={100}
    />
    // <img
    //   src={!isLoaded ? loadedImages[0]!.src : loadedImages[currentIndex]!.src}
    //   alt="Animated Sequence"
    //   style={{
    //     width: '100%',
    //   }}
    // />
  );
};

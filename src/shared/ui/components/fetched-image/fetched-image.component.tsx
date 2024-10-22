import { ReactElement, useEffect, useState } from 'react';

import { useCommandQuery } from 'shared/messaging';
import { GetImageCommand } from 'shared/utils';

interface ImageProperties {
  src: string | null | undefined;
  /** The fallback component will be displayed during image loading and as a fallback if fetching the image fails */
  fallbackComponent?: ReactElement;
  className?: string;
}

export const FetchedImage = ({
  src,
  className,
  fallbackComponent,
}: ImageProperties) => {
  const [imageLoaded, setImageLoaded] = useState(false);

  const imageQuery = useCommandQuery({
    command: new GetImageCommand({
      src: src!,
    }),
    staleTime: Number.POSITIVE_INFINITY,
    enabled: !!src && src.length > 0,
  });

  useEffect(() => {
    setImageLoaded(false);
    if (imageQuery.data) {
      const img = new Image();
      img.addEventListener('load', () => {
        setImageLoaded(true);
      });
      img.src = imageQuery.data;
    }
  }, [imageQuery.data]);

  return imageQuery.data && imageLoaded ? (
    <img src={imageQuery.data} className={className} alt="" />
  ) : (
    fallbackComponent ?? null
  );
};

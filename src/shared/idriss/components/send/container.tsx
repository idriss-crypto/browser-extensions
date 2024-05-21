import {
  ReactNode,
  memo,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';
import { useLocation, useUpdateEffect } from 'react-use';

import { Closable } from 'shared/ui';

interface RenderChildrenProperties {
  close: () => void;
}

interface Properties {
  node: HTMLElement;
  recipientName: string;
  onClose?: () => void;
  children: (v: RenderChildrenProperties) => ReactNode;
  iconSize: number;
  iconSrc: string;
  widgetDataAttribute: string;
  closeOnHoverAway: boolean;
  closeOnClickAway: boolean;
}

export const Container = memo(
  ({
    node,
    iconSize,
    iconSrc,
    children,
    onClose,
    widgetDataAttribute,
    closeOnHoverAway,
    closeOnClickAway,
  }: Properties) => {
    const [isVisible, setIsVisible] = useState(false);
    const [position, setPosition] = useState({ x: 0, y: 0 });

    const injectedWidgetReference = useRef<HTMLImageElement | null>(null);
    const location = useLocation();
    useUpdateEffect(() => {
      return () => {
        injectedWidgetReference.current?.remove();
      };
    }, [location.pathname]);

    useEffect(() => {
      injectedWidgetReference.current = document.createElement('img');
      injectedWidgetReference.current.setAttribute(
        `data-${widgetDataAttribute}`,
        'true',
      );
      injectedWidgetReference.current.style.height = `${iconSize}px`;
      injectedWidgetReference.current.style.width = `${iconSize}px`;
      injectedWidgetReference.current.style.cursor = 'pointer';
      injectedWidgetReference.current.style.marginLeft = '2px';
      injectedWidgetReference.current.src = iconSrc;

      node.style.setProperty('display', 'inline-flex', 'important');
      node?.append(injectedWidgetReference.current);

      const updatePosition = () => {
        if (!injectedWidgetReference.current) {
          return;
        }
        const elementRect =
          injectedWidgetReference.current.getBoundingClientRect();
        setPosition({
          x: elementRect.right,
          y: elementRect.top + window.scrollY,
        });
      };

      const openWidget = (event: Event) => {
        event.preventDefault();
        setIsVisible(true);
        updatePosition();
      };

      injectedWidgetReference.current?.addEventListener(
        'mouseover',
        openWidget,
      );
      window.addEventListener('resize', updatePosition);

      return () => {
        injectedWidgetReference.current?.removeEventListener(
          'mouseover',
          openWidget,
        );
        window.removeEventListener('resize', updatePosition);
        injectedWidgetReference.current?.remove();
      };
    }, [iconSize, iconSrc, node, widgetDataAttribute]);

    const close = useCallback(() => {
      setIsVisible(false);
      onClose?.();
    }, [onClose]);

    if (!isVisible) {
      return null;
    }

    return (
      <Closable
        left={position.x}
        top={position.y + iconSize}
        className="absolute w-64 rounded-md bg-white text-gray-900 shadow-2xl"
        closeButtonClassName="hover:enabled:bg-black/20 active:enabled:bg-black/40"
        closeButtonIconClassName="text-[#000]"
        onClose={close}
        closeOnHoverAway={closeOnHoverAway}
        closeOnClickAway={closeOnClickAway}
      >
        {children({ close })}
      </Closable>
    );
  },
);

Container.displayName = 'SendContainer';

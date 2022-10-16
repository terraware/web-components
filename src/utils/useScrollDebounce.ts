import { useEffect, useRef } from 'react';

interface Position {
  x: number;
  y: number;
}

const getScrollPosition = (): Position => {
  const scrollPosition = document.body.getBoundingClientRect();

  return {
    x: scrollPosition.x || 0,
    y: scrollPosition.y || 0,
  };
};

/**
 * Detects scroll events in the window and calls the effect with the scroll
 * position when it has settled for longer than the debounceTime (ms).
 */
const useScrollDebounce = (
  effect: (props: Position) => void,
  debounceTime: number,
) => {
  const busy = useRef<boolean>(false);

  useEffect(() => {
    const handleScroll = async () => {
      if (!busy.current) {
        busy.current = true;
        let pos = getScrollPosition();
        let positionEqual = false;
        while (!positionEqual) {
          await new Promise((r) => setTimeout(r, debounceTime));
          const newPos = getScrollPosition();
          positionEqual = pos.y === newPos.y && pos.x === newPos.x;
          pos = newPos;
        }
        effect(pos);
        busy.current = false;
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [effect, debounceTime]);
};

export default useScrollDebounce;

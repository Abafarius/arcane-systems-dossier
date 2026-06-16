import { useCallback, useState, type CSSProperties, type MouseEvent } from "react";

interface MouseGlowState {
  x: number;
  y: number;
  active: boolean;
}

export function useMouseGlow() {
  const [glow, setGlow] = useState<MouseGlowState>({ x: 50, y: 50, active: false });

  const onMouseMove = useCallback((event: MouseEvent<HTMLElement>) => {
    const bounds = event.currentTarget.getBoundingClientRect();
    const x = ((event.clientX - bounds.left) / bounds.width) * 100;
    const y = ((event.clientY - bounds.top) / bounds.height) * 100;
    setGlow({ x, y, active: true });
  }, []);

  const onMouseLeave = useCallback(() => {
    setGlow((current) => ({ ...current, active: false }));
  }, []);

  const style = {
    "--mouse-x": `${glow.x}%`,
    "--mouse-y": `${glow.y}%`,
    "--mouse-opacity": glow.active ? "1" : "0",
  } as CSSProperties;

  return { glow, glowHandlers: { onMouseMove, onMouseLeave }, glowStyle: style };
}

import { useEffect } from 'react';

export function usePointerLight() {
  useEffect(() => {
    const finePointer = window.matchMedia('(hover: hover) and (pointer: fine)');
    let active = null;
    let frame = 0;
    let point = null;
    const clear = () => {
      cancelAnimationFrame(frame);
      frame = 0;
      active?.removeAttribute('data-pointer-light');
      active = null;
    };
    const paint = () => {
      frame = 0;
      if (!active?.isConnected || !point) return;
      const rect = active.getBoundingClientRect();
      active.style.setProperty('--light-x', `${point.x - rect.left}px`);
      active.style.setProperty('--light-y', `${point.y - rect.top}px`);
    };
    const move = event => {
      if (!finePointer.matches || event.pointerType === 'touch') return;
      const target = event.target instanceof Element ? event.target.closest('button:not(:disabled), a[href]') : null;
      if (!target || target.closest('[inert]')) { clear(); return; }
      if (active !== target) {
        clear();
        active = target;
        active.setAttribute('data-pointer-light', '');
      }
      point = { x: event.clientX, y: event.clientY };
      if (!frame) frame = requestAnimationFrame(paint);
    };
    document.addEventListener('pointermove', move, { passive: true });
    document.addEventListener('pointerleave', clear);
    document.addEventListener('pointercancel', clear);
    window.addEventListener('blur', clear);
    window.addEventListener('scroll', clear, true);
    return () => {
      clear();
      document.removeEventListener('pointermove', move);
      document.removeEventListener('pointerleave', clear);
      document.removeEventListener('pointercancel', clear);
      window.removeEventListener('blur', clear);
      window.removeEventListener('scroll', clear, true);
    };
  }, []);
}

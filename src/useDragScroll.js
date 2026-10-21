import { useEffect } from 'react';

export function useDragScroll(autoEnabled = true) {
  useEffect(() => {
    const rail = document.querySelector('.practice-grid');
    if (!rail) return;
    let visible = false;
    let frame = 0;
    let previous = 0;
    let direction = 1;
    let position = rail.scrollLeft;
    const observer = new IntersectionObserver(([entry]) => { visible = entry.isIntersecting; previous = 0; }, { threshold: .15 });
    observer.observe(rail);
    const animate = time => {
      const elapsed = previous ? Math.min(time - previous, 50) : 0;
      previous = time;
      const paused = !autoEnabled || !visible || document.hidden || gesture || rail.matches(':hover,:focus-within') || document.querySelector('[role="dialog"]');
      if (!paused) {
        const max = rail.scrollWidth - rail.clientWidth;
        position = Math.max(0, Math.min(max, position + direction * elapsed * .022));
        rail.scrollLeft = position;
        if (position >= max) direction = -1;
        if (position <= 0) direction = 1;
      } else position = rail.scrollLeft;
      frame = requestAnimationFrame(animate);
    };
    let gesture = null;
    let suppressClick = false;
    const down = event => {
      if (event.pointerType !== 'mouse' || event.button !== 0) return;
      // Leave the native scrollbar available too.
      if (event.clientY >= rail.getBoundingClientRect().top + rail.clientHeight) return;
      suppressClick = false;
      gesture = { id: event.pointerId, x: event.clientX, left: rail.scrollLeft, dragging: false };
    };
    const move = event => {
      if (!gesture || gesture.id !== event.pointerId) return;
      const delta = event.clientX - gesture.x;
      if (!gesture.dragging && Math.abs(delta) < 6) return;
      if (!gesture.dragging) {
        gesture.dragging = true;
        rail.setPointerCapture(event.pointerId);
        rail.classList.add('is-dragging');
      }
      event.preventDefault();
      rail.scrollLeft = gesture.left - delta;
    };
    const finish = event => {
      if (!gesture || (event.pointerId != null && gesture.id !== event.pointerId)) return;
      suppressClick = gesture.dragging;
      const id = gesture.id;
      gesture = null;
      rail.classList.remove('is-dragging');
      if (rail.hasPointerCapture(id)) rail.releasePointerCapture(id);
    };
    const click = event => {
      if (!suppressClick) return;
      suppressClick = false;
      event.preventDefault();
      event.stopImmediatePropagation();
    };
    const preventNativeDrag = event => event.preventDefault();
    frame = requestAnimationFrame(animate);
    rail.addEventListener('pointerdown', down);
    window.addEventListener('pointermove', move, { passive: false });
    window.addEventListener('pointerup', finish);
    window.addEventListener('pointercancel', finish);
    window.addEventListener('blur', finish);
    rail.addEventListener('lostpointercapture', finish);
    rail.addEventListener('click', click, true);
    rail.addEventListener('dragstart', preventNativeDrag);
    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
      finish({});
      rail.removeEventListener('pointerdown', down);
      window.removeEventListener('pointermove', move);
      window.removeEventListener('pointerup', finish);
      window.removeEventListener('pointercancel', finish);
      window.removeEventListener('blur', finish);
      rail.removeEventListener('lostpointercapture', finish);
      rail.removeEventListener('click', click, true);
      rail.removeEventListener('dragstart', preventNativeDrag);
    };
  }, [autoEnabled]);
}

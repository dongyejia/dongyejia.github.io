import { useEffect } from 'react';

export function useDragScroll() {
  useEffect(() => {
    const rail = document.querySelector('.practice-grid');
    if (!rail) return;
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
    rail.addEventListener('pointerdown', down);
    window.addEventListener('pointermove', move, { passive: false });
    window.addEventListener('pointerup', finish);
    window.addEventListener('pointercancel', finish);
    window.addEventListener('blur', finish);
    rail.addEventListener('lostpointercapture', finish);
    rail.addEventListener('click', click, true);
    rail.addEventListener('dragstart', preventNativeDrag);
    return () => {
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
  }, []);
}

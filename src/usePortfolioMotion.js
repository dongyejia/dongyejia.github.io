import { useLayoutEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);
const ease = 'expo.out';

export function usePortfolioMotion(dependencies, enabled, openingRun) {
  useLayoutEffect(() => {
    document.documentElement.dataset.motion = enabled ? 'full' : 'reduced';
    return () => { delete document.documentElement.dataset.motion; };
  }, [enabled]);
  useLayoutEffect(() => {
    if (!enabled) return;
    const media = gsap.matchMedia();
    let opening;
    const skip = () => opening?.progress(1);
    media.add('(min-width: 0px)', () => {
      const desktop = window.matchMedia('(min-width: 701px)').matches;
      const overlay = document.querySelector('.opening');
      const atHome = window.scrollY < 100 && (!location.hash || location.hash === '#home');
      if (!desktop) {
        // Mobile content is never masked: fast scrolling cannot leave it half revealed.
        if (atHome) {
          gsap.set(overlay, { display: 'grid', autoAlpha: 1 });
          opening = gsap.timeline({ defaults: { ease }, onComplete: () => gsap.set(overlay, { display: 'none' }) });
          opening.fromTo('.opening-monogram', { y: 30, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: .7 })
            .to(overlay, { yPercent: -100, duration: .85, ease: 'power3.inOut' }, .8)
            .fromTo('.hero-title-first,.hero-title-second', { y: 20 }, { y: 0, duration: .8, stagger: .12 }, 1.1);
        }
        return;
      }
      if (atHome) {
        gsap.set(overlay, { display: 'grid', autoAlpha: 1 });
        opening = gsap.timeline({ defaults: { ease }, onComplete: () => {
          gsap.set(overlay, { display: 'none' });
          ScrollTrigger.refresh();
        }});
        opening.fromTo('.opening-monogram', { yPercent: 125, scaleX: .65, rotate: -8 }, { yPercent: 0, scaleX: 1, rotate: 0, duration: 1.25 }, .08)
          .fromTo('.opening-caption', { y: 24, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: .8 }, .55)
          .fromTo('.opening-line', { scaleX: 0 }, { scaleX: 1, duration: 1.25, ease: 'power2.inOut' }, .35)
          .to(overlay, { clipPath: 'inset(0 0 100% 0)', duration: 1.6, ease: 'power4.inOut' }, 1.35)
          .fromTo('.hero-background', { scale: 1.16 }, { scale: 1, duration: 2.8 }, 1.5)
          .fromTo('.hero-title-first', { yPercent: 125, scaleX: .75, rotate: 4 }, { yPercent: 0, scaleX: 1, rotate: 0, duration: 1.85 }, 1.9)
          .fromTo('.hero-title-second', { yPercent: 130, scaleX: .7, rotate: -4 }, { yPercent: 0, scaleX: 1, rotate: 0, duration: 2 }, 2.15)
          .fromTo('.site-header', { yPercent: -110 }, { yPercent: 0, duration: 1.4 }, 2.15)
          .fromTo('.hero-eyebrow,.hero-intro,.hero-actions,.hero-footer', { y: 35, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: 1.4, stagger: .16 }, 2.45);
      }
      document.querySelectorAll('.section-word').forEach(word => {
        const section = word.closest('section');
        const label = word.nextElementSibling;
        gsap.timeline({ scrollTrigger: { trigger: word, start: 'top 90%', once: true }, defaults: { ease } })
          .fromTo(word.querySelector('span'), { yPercent: 120, xPercent: desktop ? -9 : -4, scaleY: .72, rotate: -4 }, { yPercent: 0, xPercent: 0, scaleY: 1, rotate: 0, duration: 1.8 })
          .fromTo(label, { clipPath: 'inset(0 100% 0 0)', x: -25 }, { clipPath: 'inset(0 0% 0 0)', x: 0, duration: 1.15 }, .4);
        const heading = section.querySelector('.section-heading h2,.about-copy h2,.campus-lead h2,.contact-main h2');
        if (heading) gsap.fromTo(heading, { y: 65, clipPath: 'inset(0 0 100% 0)' }, { y: 0, clipPath: 'inset(0 0 0% 0)', duration: 1.7, ease,
          scrollTrigger: { trigger: heading, start: 'top 92%', once: true } });
      });
      document.querySelectorAll('.portrait-card,.campus-sculpture,.campus-photo-frame').forEach(element => {
        gsap.fromTo(element, { clipPath: 'inset(0 0 100% 0)' }, { clipPath: 'inset(0 0 0% 0)', duration: 1.8, ease,
          scrollTrigger: { trigger: element, start: 'top 85%', once: true } });
      });
      document.querySelectorAll('.timeline,.campus-stories,.stats').forEach(group => {
        gsap.fromTo(group.children, { y: 65, clipPath: 'inset(0 0 100% 0)' }, { y: 0, clipPath: 'inset(0 0 0% 0)', stagger: .18, duration: 1.5, ease,
          scrollTrigger: { trigger: group, start: 'top 87%', once: true } });
      });
      if (desktop) document.querySelectorAll('.portrait-card > img').forEach(image => {
        gsap.fromTo(image, { yPercent: -4, scale: 1.12 }, { yPercent: 4, scale: 1.12, ease: 'none',
          scrollTrigger: { trigger: image.parentElement, start: 'top bottom', end: 'bottom top', scrub: 1.1 } });
      });
    });
    window.addEventListener('portfolio:skip-opening', skip);
    return () => { window.removeEventListener('portfolio:skip-opening', skip); media.revert(); };
  }, [enabled, openingRun]);

  useLayoutEffect(() => {
    if (!enabled) return;
    if (window.matchMedia('(max-width: 700px)').matches) return;
    const media = gsap.matchMedia();
    media.add('(min-width: 0px)', () => {
      document.querySelectorAll('.project-grid,.media-grid,.strength-grid').forEach(grid => {
        // Row-sized batches keep lower rows from revealing before the visitor reaches them.
        const cards = [...grid.children];
        const columns = getComputedStyle(grid).gridTemplateColumns.split(' ').length;
        for (let i = 0; i < cards.length; i += columns) {
          const row = cards.slice(i, i + columns);
          gsap.fromTo(row, { y: 90, scale: .94, clipPath: 'inset(0 0 100% 0)' }, {
            y: 0, scale: 1, clipPath: 'inset(0 0 0% 0)', duration: 1.75, stagger: .2, ease,
            scrollTrigger: { trigger: row[0], start: 'top 92%', once: true },
            onComplete: () => gsap.set(row, { clearProps: 'transform,clipPath' }),
          });
        }
      });
      document.querySelectorAll('.spatial-stage').forEach(stage => {
        gsap.fromTo(stage.querySelectorAll('.spatial-object img'), { scale: 1.13 }, { scale: 1, duration: 2.3, ease,
          scrollTrigger: { trigger: stage, start: 'top 88%', once: true } });
      });
      ScrollTrigger.refresh();
    });
    return () => media.revert();
  }, [...dependencies, enabled]);
}

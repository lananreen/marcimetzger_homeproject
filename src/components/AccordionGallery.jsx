import { useRef, useEffect, useState, useCallback } from 'react';
import { gsap } from 'gsap';
import { ChevronLeft, ChevronRight } from 'lucide-react';

import './AccordionGallery.css';

const MOBILE_QUERY = '(max-width: 768px)';

const DEFAULT_ITEMS = [
  { image: 'https://picsum.photos/id/1015/900/1200', label: 'Canyon', link: '#' },
  { image: 'https://picsum.photos/id/1018/900/1200', label: 'Ridgeline', link: '#' },
  { image: 'https://picsum.photos/id/1039/900/1200', label: 'Falls', link: '#' },
  { image: 'https://picsum.photos/id/1043/900/1200', label: 'Harbour', link: '#' },
  { image: 'https://picsum.photos/id/1044/900/1200', label: 'Skyline', link: '#' }
];

const AccordionGallery = ({
  items = DEFAULT_ITEMS,
  defaultIndex = 2,
  accentColor = '#ffffff',
  overlayColor = '#060010',
  textColor = '#ffffff',
  height = 460,
  gap = 10,
  radius = 16,
  expandRatio = 0.52,
  orientation = 'horizontal',
  duration = 0.6,
  ease = 'power3.out',
  parallax = 0.5,
  tilt = 8,
  stagger = 0.06,
  trigger = 'hover',
  showLabels = true,
  grayscale = true,
  className = '',
  onSelect
}) => {
  const rootRef = useRef(null);
  const panelRefs = useRef([]);
  const mediaRefs = useRef([]);
  const barRefs = useRef([]);
  const textRefs = useRef([]);
  const tlRef = useRef(null);
  const firstRunRef = useRef(true);
  const mediaSizeRef = useRef(320);
  const viewportRef = useRef(null);
  const pointerStartRef = useRef(null);

  const vertical = orientation === 'vertical';
  const count = items.length;
  const [active, setActive] = useState(Math.min(Math.max(defaultIndex, 0), count - 1));
  const [isMobile, setIsMobile] = useState(
    typeof window !== 'undefined' && window.matchMedia ? window.matchMedia(MOBILE_QUERY).matches : false
  );
  const [slideIndex, setSlideIndex] = useState(Math.min(Math.max(defaultIndex, 0), count - 1));

  const prefersReduced =
    typeof window !== 'undefined' && window.matchMedia
      ? window.matchMedia('(prefers-reduced-motion: reduce)').matches
      : false;

  useEffect(() => {
    if (typeof window === 'undefined' || !window.matchMedia) return;
    const mql = window.matchMedia(MOBILE_QUERY);
    const onChange = e => setIsMobile(e.matches);
    mql.addEventListener('change', onChange);
    return () => mql.removeEventListener('change', onChange);
  }, []);

  const applyLayout = useCallback(
    animate => {
      const panels = panelRefs.current;
      if (!panels.length) return;

      const r = Math.min(Math.max(expandRatio, 0.2), 0.9);
      const grow = count > 1 ? (r * (count - 1)) / (1 - r) : 1;
      const mediaSize = mediaSizeRef.current;

      tlRef.current?.kill();
      const dur = animate && !prefersReduced ? duration : 0;
      const tl = gsap.timeline();

      panels.forEach((panel, i) => {
        if (!panel) return;
        const isActive = i === active;
        const media = mediaRefs.current[i];
        const bar = barRefs.current[i];
        const text = textRefs.current[i];

        const rot = isActive ? 0 : i < active ? tilt : -tilt;
        const rotProp = vertical ? { rotateX: -rot } : { rotateY: rot };

        tl.to(panel, { flexGrow: isActive ? grow : 1, ...rotProp, duration: dur, ease }, 0);

        if (media) {
          const drift = Math.max(-1.5, Math.min(1.5, active - i));
          const shift = drift * parallax * mediaSize * 0.06;
          const gray = grayscale ? (isActive ? 0 : 1) : 0;
          tl.to(
            media,
            {
              xPercent: -50,
              yPercent: -50,
              x: vertical ? 0 : isActive ? 0 : shift,
              y: vertical ? (isActive ? 0 : shift) : 0,
              '--ag-gray': gray,
              '--ag-dim': isActive ? 0 : 0.35,
              duration: dur,
              ease
            },
            0
          );
        }

        if (showLabels && bar && text) {
          if (isActive) {
            tl.to([bar, text], { opacity: 1, x: 0, duration: dur, ease, stagger: prefersReduced ? 0 : stagger }, 0);
          } else {
            tl.to([bar, text], { opacity: 0, x: -14, duration: dur * 0.6, ease }, 0);
          }
        }
      });

      tlRef.current = tl;
    },
    [
      active,
      count,
      expandRatio,
      duration,
      ease,
      vertical,
      tilt,
      parallax,
      grayscale,
      showLabels,
      stagger,
      prefersReduced
    ]
  );

  useEffect(() => {
    if (isMobile) return;
    const el = rootRef.current;
    if (!el) return;

    const measure = () => {
      const rect = el.getBoundingClientRect();
      const total = vertical ? rect.height : rect.width;
      const usable = Math.max(total - gap * (count - 1), 120);
      const size = Math.max(140, usable * Math.min(Math.max(expandRatio, 0.2), 0.9) * 1.22);
      mediaSizeRef.current = size;
      el.style.setProperty('--ag-media-size', `${size}px`);
      applyLayout(!firstRunRef.current);
    };

    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    return () => ro.disconnect();
  }, [applyLayout, gap, count, expandRatio, vertical, isMobile]);

  useEffect(() => {
    if (isMobile) return;
    applyLayout(!firstRunRef.current);
    firstRunRef.current = false;
  }, [applyLayout, isMobile]);

  const goToSlide = useCallback(
    (i, smooth = true) => {
      const vp = viewportRef.current;
      if (!vp) return;
      const idx = ((i % count) + count) % count;
      const slide = vp.children[idx];
      if (!slide) return;
      vp.scrollTo({
        left: slide.offsetLeft - (vp.clientWidth - slide.offsetWidth) / 2,
        behavior: smooth && !prefersReduced ? 'smooth' : 'auto'
      });
      setSlideIndex(idx);
    },
    [count, prefersReduced]
  );

  useEffect(() => {
    if (!isMobile) return;
    goToSlide(Math.min(Math.max(defaultIndex, 0), count - 1), false);
  }, [isMobile, goToSlide, defaultIndex, count]);

  useEffect(() => {
    if (!isMobile) return;
    const vp = viewportRef.current;
    if (!vp) return;
    let frame = 0;
    const onScroll = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const slides = vp.children;
        if (!slides.length) return;
        const center = vp.scrollLeft + vp.clientWidth / 2;
        let best = 0;
        let bestDist = Infinity;
        for (let i = 0; i < slides.length; i++) {
          const s = slides[i];
          const dist = Math.abs(s.offsetLeft + s.offsetWidth / 2 - center);
          if (dist < bestDist) {
            bestDist = dist;
            best = i;
          }
        }
        setSlideIndex(best);
      });
    };
    vp.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      vp.removeEventListener('scroll', onScroll);
      cancelAnimationFrame(frame);
    };
  }, [isMobile, count]);

  useEffect(
    () => () => {
      tlRef.current?.kill();
    },
    []
  );

  const handleEnter = i => {
    if (trigger === 'hover') setActive(i);
  };

  const handleClick = (i, e) => {
    if (i !== active) {
      e.preventDefault();
      setActive(i);
    } else if (onSelect) {
      e.preventDefault();
      onSelect(items[i], i);
    }
  };

  const handleKeyDown = (i, e) => {
    if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
      e.preventDefault();
      setActive((i + 1) % count);
    } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
      e.preventDefault();
      setActive((i - 1 + count) % count);
    }
  };

  const handleSlideClick = (i, e) => {
    const start = pointerStartRef.current;
    if (start && (Math.abs(e.clientX - start.x) > 10 || Math.abs(e.clientY - start.y) > 10)) {
      e.preventDefault();
      return;
    }
    if (i !== slideIndex) {
      e.preventDefault();
      goToSlide(i);
    } else if (onSelect) {
      e.preventDefault();
      onSelect(items[i], i);
    }
  };

  if (isMobile) {
    return (
      <div
        className={`ag-carousel${className ? ` ${className}` : ''}`}
        style={{
          '--ag-accent': accentColor,
          '--ag-overlay': overlayColor,
          '--ag-text': textColor,
          '--ag-gap': `${gap}px`,
          '--ag-radius': `${radius}px`
        }}
        role="group"
        aria-roledescription="carousel"
        aria-label="Image carousel"
      >
        <div
          className="ag-carousel__viewport"
          ref={viewportRef}
          style={{ height: `${height}px` }}
          onPointerDown={e => {
            pointerStartRef.current = { x: e.clientX, y: e.clientY };
          }}
        >
          {items.map((item, i) => {
            const Tag = item.link ? 'a' : 'div';
            return (
              <Tag
                key={i}
                className={`ag-carousel__slide${i === slideIndex ? ' ag-carousel__slide--active' : ''}`}
                href={item.link || undefined}
                onClick={e => handleSlideClick(i, e)}
                role="group"
                aria-roledescription="slide"
                aria-label={`${i + 1} of ${count}${item.label ? `: ${item.label}` : ''}`}
              >
                <img src={item.image} alt={item.alt || item.label || ''} draggable="false" />
                <span className="ag-carousel__overlay" aria-hidden="true" />
                {showLabels && item.label && <span className="ag-carousel__label">{item.label}</span>}
              </Tag>
            );
          })}
        </div>
        <button
          type="button"
          className="ag-carousel__arrow ag-carousel__arrow--prev"
          onClick={() => goToSlide(slideIndex - 1)}
          aria-label="Previous slide"
        >
          <ChevronLeft size={22} />
        </button>
        <button
          type="button"
          className="ag-carousel__arrow ag-carousel__arrow--next"
          onClick={() => goToSlide(slideIndex + 1)}
          aria-label="Next slide"
        >
          <ChevronRight size={22} />
        </button>
        <div className="ag-carousel__dots" role="tablist" aria-label="Choose slide">
          {items.map((item, i) => (
            <button
              key={i}
              type="button"
              role="tab"
              aria-selected={i === slideIndex}
              aria-label={`Go to slide ${i + 1}${item.label ? `: ${item.label}` : ''}`}
              className={`ag-carousel__dot${i === slideIndex ? ' ag-carousel__dot--active' : ''}`}
              onClick={() => goToSlide(i)}
            />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div
      ref={rootRef}
      className={`accordion-gallery${vertical ? ' accordion-gallery--vertical' : ''}${className ? ` ${className}` : ''}`}
      style={{
        '--ag-accent': accentColor,
        '--ag-overlay': overlayColor,
        '--ag-text': textColor,
        '--ag-gap': `${gap}px`,
        '--ag-radius': `${radius}px`,
        height: vertical ? `${Math.round(height * 1.6)}px` : `${height}px`
      }}
      role="list"
      aria-label="Image accordion gallery"
    >
      {items.map((item, i) => {
        const isActive = i === active;
        const Tag = item.link ? 'a' : 'div';
        return (
          <Tag
            key={i}
            ref={el => (panelRefs.current[i] = el)}
            className={`ag-panel${isActive ? ' ag-panel--active' : ''}`}
            style={{ borderRadius: `${radius}px` }}
            href={item.link || undefined}
            onClick={e => handleClick(i, e)}
            onMouseEnter={() => handleEnter(i)}
            onFocus={() => setActive(i)}
            onKeyDown={e => handleKeyDown(i, e)}
            role="listitem"
            tabIndex={0}
            aria-current={isActive ? 'true' : undefined}
            aria-label={item.label}
          >
            <span className="ag-panel__frame">
              <span className="ag-panel__media" ref={el => (mediaRefs.current[i] = el)}>
                <img src={item.image} alt={item.alt || item.label || ''} draggable="false" />
              </span>
              <span className="ag-panel__overlay" aria-hidden="true" />
            </span>
            {showLabels && (
              <span className="ag-panel__label" aria-hidden="true">
                <span className="ag-panel__bar" ref={el => (barRefs.current[i] = el)} />
                <span className="ag-panel__text" ref={el => (textRefs.current[i] = el)}>
                  {item.label}
                </span>
              </span>
            )}
          </Tag>
        );
      })}
    </div>
  );
};

export default AccordionGallery;

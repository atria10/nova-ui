// components/image/ResponsiveImage.tsx
'use client';

import React, { useState, useRef, useEffect, forwardRef } from 'react';
import { cn } from '../../utils/cn';

export interface ResponsiveImageProps extends Omit<React.ImgHTMLAttributes<HTMLImageElement>, 'src'> {
  src: string;
  alt: string;
  aspectRatio?: string;
  lazy?: boolean;
  priority?: boolean;
  objectFit?: 'contain' | 'cover' | 'fill' | 'none' | 'scale-down';
  objectPosition?: string;
  fallback?: string;
  placeholder?: 'blur' | 'skeleton' | 'none';
  blurDataURL?: string;
  onLoad?: () => void;
  onError?: () => void;
  containerClassName?: string;
}

// Generate a simple base64 blur placeholder
function generateSimpleBlur(): string {
  return 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAiIGhlaWdodD0iMjAiIHZpZXdCb3g9IjAgMCAyMCAyMCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjIwIiBoZWlnaHQ9IjIwIiBmaWxsPSJva2xjaCh2YXIoLS1jb2xvci1iYXNlLTIwMCkpIi8+Cjwvc3ZnPgo=';
}

const ResponsiveImage = forwardRef<HTMLImageElement, ResponsiveImageProps>(
  ({
    src,
    alt,
    aspectRatio,
    lazy = true,
    priority = false,
    objectFit = 'cover',
    objectPosition = 'center',
    fallback,
    placeholder = 'blur',
    blurDataURL,
    onLoad,
    onError,
    containerClassName,
    className,
    style,
    ...props
  }, ref) => {
    const [isLoaded, setIsLoaded] = useState(false);
    const [hasError, setHasError] = useState(false);
    const [isInView, setIsInView] = useState(!lazy || priority);
    const imgRef = useRef<HTMLImageElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);

    // Intersection Observer per lazy loading
    useEffect(() => {
      if (!lazy || priority || isInView) return;

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setIsInView(true);
            observer.disconnect();
          }
        },
        { rootMargin: '50px' }
      );

      if (containerRef.current) {
        observer.observe(containerRef.current);
      }

      return () => observer.disconnect();
    }, [lazy, priority, isInView]);

    const handleLoad = () => {
      setIsLoaded(true);
      onLoad?.();
    };

    const handleError = () => {
      setHasError(true);
      onError?.();
      
      if (fallback && imgRef.current) {
        imgRef.current.src = fallback;
        setHasError(false);
      }
    };

    const blurData = blurDataURL || generateSimpleBlur();

    const containerStyles: React.CSSProperties = {
      position: 'relative',
      overflow: 'hidden',
      ...(aspectRatio && { aspectRatio }),
    };

    const imageStyles: React.CSSProperties = {
      objectFit,
      objectPosition,
      transition: 'opacity 0.3s ease-out',
      ...style,
    };

    return (
      <div
        ref={containerRef}
        style={containerStyles}
        className={cn(
          "relative overflow-hidden bg-base-200",
          containerClassName
        )}
      >
        {/* Placeholder */}
        {!isLoaded && placeholder === 'blur' && (
          <img
            src={blurData}
            alt=""
            aria-hidden="true"
            className="absolute inset-0 w-full h-full object-cover filter blur-sm scale-110 opacity-60"
          />
        )}

        {!isLoaded && placeholder === 'skeleton' && (
          <div className="absolute inset-0 animate-pulse bg-base-300" />
        )}

        {/* Immagine principale */}
        {isInView && (
          <img
            ref={(node) => {
              if (ref) {
                if (typeof ref === 'function') ref(node);
                else ref.current = node;
              }
              imgRef.current = node;
            }}
            src={src}
            alt={alt}
            loading={lazy && !priority ? 'lazy' : 'eager'}
            onLoad={handleLoad}
            onError={handleError}
            style={imageStyles}
            className={cn(
              "w-full h-full transition-opacity duration-300 ease-out",
              isLoaded ? 'opacity-100' : 'opacity-0',
              className
            )}
            {...props}
          />
        )}

        {/* Stato di errore */}
        {hasError && !fallback && (
          <div className="absolute inset-0 flex items-center justify-center bg-base-200 text-base-content/60">
            <div className="text-center">
              <div className="text-2xl mb-2">📷</div>
              <div className="text-sm">Immagine non disponibile</div>
            </div>
          </div>
        )}

        {/* Indicatore di caricamento */}
        {!isLoaded && !hasError && isInView && placeholder !== 'skeleton' && (
          <div className="absolute top-2 right-2 w-4 h-4 border-2 border-primary border-t-transparent rounded-full animate-spin" />
        )}
      </div>
    );
  }
);

ResponsiveImage.displayName = 'ResponsiveImage';

export default ResponsiveImage;

/*
Caratteristiche semplificate:

✅ Lazy loading con Intersection Observer
✅ Aspect ratio control
✅ Object fit/position control  
✅ Placeholder blur o skeleton
✅ Error handling con fallback
✅ Loading states
✅ TypeScript completo
✅ Accessibilità
✅ Performance ottimizzata

Rimosso:
❌ Ottimizzazione immagini server-side (non funzionante)
❌ SrcSet generation (inutile senza ottimizzazione)
❌ Logica complessa per Vercel
❌ Codice dead/commentato

Esempi d'uso:

// Uso base
<ResponsiveImage 
  src="/image.jpg"
  alt="Descrizione"
  aspectRatio="16/9"
/>

// Con placeholder personalizzato
<ResponsiveImage 
  src="/image.jpg"
  alt="Descrizione"
  aspectRatio="4/3"
  placeholder="skeleton"
  fallback="/placeholder.jpg"
/>

// Per immagini above-the-fold
<ResponsiveImage 
  src="/hero.jpg"
  alt="Hero image"
  aspectRatio="21/9"
  priority={true}
  lazy={false}
/>
*/
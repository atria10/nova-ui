// components/card/Card.tsx
'use client';

import React, { forwardRef, ReactNode, useState } from 'react';
import { cn } from '../../utils/cn';

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  variant?: 'default' | 'elevated' | 'outlined' | 'glass' | 'gradient' | 'interactive';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  padding?: 'none' | 'sm' | 'md' | 'lg' | 'xl';
  hover?: boolean;
  glow?: boolean;
  animate?: boolean;
  borderless?: boolean;
}

export const Card = forwardRef<HTMLDivElement, CardProps>(
  ({
    children,
    variant = 'default',
    size = 'md',
    padding = 'md',
    hover = false,
    glow = false,
    animate = true,
    borderless = false,
    className,
    onMouseEnter,
    onMouseLeave,
    ...props
  }, ref) => {
    const [isHovered, setIsHovered] = useState(false);

    const handleMouseEnter = (e: React.MouseEvent<HTMLDivElement>) => {
      setIsHovered(true);
      onMouseEnter?.(e);
    };

    const handleMouseLeave = (e: React.MouseEvent<HTMLDivElement>) => {
      setIsHovered(false);
      onMouseLeave?.(e);
    };

    return (
      <div
        ref={ref}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        className={cn(
          // Base styles
          "relative overflow-hidden",
          
          // Size variants
          {
            'min-h-[120px]': size === 'sm',
            'min-h-[160px]': size === 'md', 
            'min-h-[220px]': size === 'lg',
            'min-h-[300px]': size === 'xl',
          },
          
          // Padding variants
          {
            'p-0': padding === 'none',
            'p-3': padding === 'sm',
            'p-4': padding === 'md',
            'p-6': padding === 'lg',
            'p-8': padding === 'xl',
          },
          
          // Variant styles
          {
            // Default - Clean modern card
            'bg-base-100 border border-base-300/60 rounded-xl shadow-sm': variant === 'default',
            
            // Elevated - Prominent with strong shadow
            'bg-base-100 rounded-xl shadow-xl shadow-base-content/[0.15] border border-base-300/40': variant === 'elevated',
            
            // Outlined - Minimal with focus on content
            'bg-base-100/50 border-2 border-base-300 rounded-xl': variant === 'outlined',
            
            // Glass - Modern glass morphism
            'bg-base-100/80 backdrop-blur-xl border border-base-300/50 rounded-xl shadow-2xl shadow-base-content/[0.1]': variant === 'glass',
            
            // Gradient - Eye-catching with subtle gradient
            'bg-gradient-to-br from-base-100 via-base-100/95 to-base-200/80 border border-base-300/60 rounded-xl shadow-lg': variant === 'gradient',
            
            // Interactive - For clickable cards
            'bg-base-100 border border-base-300/60 rounded-xl shadow-md cursor-pointer': variant === 'interactive',
          },
          
          // Remove borders if borderless
          borderless && "!border-0",
          
          // Hover effects
          hover && [
            "transition-all duration-300 ease-out",
            variant === 'default' && "hover:shadow-lg hover:shadow-base-content/[0.08] hover:-translate-y-1",
            variant === 'elevated' && "hover:shadow-2xl hover:shadow-base-content/[0.2] hover:-translate-y-2",
            variant === 'outlined' && "hover:border-primary/60 hover:bg-base-100/80",
            variant === 'glass' && "hover:bg-base-100/90 hover:backdrop-blur-2xl hover:-translate-y-1",
            variant === 'gradient' && "hover:from-base-100/95 hover:to-base-200/90 hover:-translate-y-1",
            variant === 'interactive' && "hover:shadow-xl hover:shadow-base-content/[0.12] hover:-translate-y-1 hover:border-primary/40",
          ],
          
          // Glow effect
          glow && [
            "before:absolute before:inset-0 before:-z-10 before:rounded-xl",
            "before:bg-gradient-to-br before:from-primary/20 before:to-secondary/20",
            "before:blur-xl before:opacity-0 before:transition-opacity before:duration-500",
            isHovered && "before:opacity-100",
          ],
          
          // Animations
          animate && "transition-all duration-300 ease-out",
          
          className
        )}
        {...props}
      >
        {/* Glass overlay for glass variant */}
        {variant === 'glass' && (
          <div className="absolute inset-0 bg-gradient-to-br from-base-100/40 to-transparent pointer-events-none rounded-xl" />
        )}
        
        {/* Interactive pulse effect */}
        {variant === 'interactive' && (
          <div className={cn(
            "absolute inset-0 rounded-xl opacity-0 transition-opacity duration-300",
            "bg-gradient-to-br from-primary/5 to-secondary/5",
            isHovered && "opacity-100"
          )} />
        )}
        
        {/* Glow border for elevated cards */}
        {variant === 'elevated' && glow && (
          <div className={cn(
            "absolute inset-0 rounded-xl opacity-0 transition-opacity duration-500 -z-10",
            "bg-gradient-to-br from-primary/30 to-secondary/30 blur-lg",
            isHovered && "opacity-70"
          )} />
        )}
        
        {/* Content container */}
        <div className="relative z-10">
          {children}
        </div>
        
        {/* Subtle shine effect on hover */}
        <div className={cn(
          "absolute inset-0 opacity-0 transition-all duration-700 pointer-events-none",
          "bg-gradient-to-br from-transparent via-base-content/5 to-transparent",
          "transform rotate-12 -translate-x-full",
          animate && isHovered && "translate-x-full opacity-100"
        )} />
      </div>
    );
  }
);

Card.displayName = 'Card';

// Sub-components for better composition
export const CardHeader = forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn("flex flex-col space-y-1.5 mb-4", className)}
      {...props}
    />
  )
);

CardHeader.displayName = 'CardHeader';

export const CardTitle = forwardRef<HTMLHeadingElement, React.HTMLAttributes<HTMLHeadingElement>>(
  ({ className, children, ...props }, ref) => (
    <h3
      ref={ref}
      className={cn(
        "text-lg font-semibold leading-none tracking-tight text-base-content",
        className
      )}
      {...props}
    >
      {children}
    </h3>
  )
);

CardTitle.displayName = 'CardTitle';

export const CardDescription = forwardRef<HTMLParagraphElement, React.HTMLAttributes<HTMLParagraphElement>>(
  ({ className, ...props }, ref) => (
    <p
      ref={ref}
      className={cn("text-sm text-base-content/70 leading-relaxed", className)}
      {...props}
    />
  )
);

CardDescription.displayName = 'CardDescription';

export const CardContent = forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn("flex-1", className)}
      {...props}
    />
  )
);

CardContent.displayName = 'CardContent';

export const CardFooter = forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn("flex items-center justify-between mt-4 pt-4 border-t border-base-300/60", className)}
      {...props}
    />
  )
);

CardFooter.displayName = 'CardFooter';

// Specialized card variants
export const ProductCard = forwardRef<HTMLDivElement, CardProps & {
  image?: string;
  title?: string;
  price?: string;
  originalPrice?: string;
  badge?: string;
}>(
  ({ image, title, price, originalPrice, badge, children, ...props }, ref) => (
    <Card ref={ref} variant="interactive" hover glow animate {...props}>
      {/* Image container */}
      {image && (
        <div className="relative mb-4 rounded-lg overflow-hidden bg-base-200 aspect-video">
          <img 
            src={image} 
            alt={title}
            className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
          />
          {badge && (
            <div className="absolute top-2 left-2 px-2 py-1 bg-primary text-primary-content text-xs font-semibold rounded-md">
              {badge}
            </div>
          )}
        </div>
      )}
      
      <CardHeader>
        {title && <CardTitle className="text-base">{title}</CardTitle>}
      </CardHeader>
      
      <CardContent>
        {children}
      </CardContent>
      
      {(price || originalPrice) && (
        <CardFooter>
          <div className="flex items-center gap-2">
            {price && (
              <span className="text-lg font-bold text-primary">{price}</span>
            )}
            {originalPrice && (
              <span className="text-sm text-base-content/60 line-through">{originalPrice}</span>
            )}
          </div>
        </CardFooter>
      )}
    </Card>
  )
);

ProductCard.displayName = 'ProductCard';

export const StatsCard = forwardRef<HTMLDivElement, Omit<CardProps,"children"> & {
  title?: string;
  value?: string | number;
  change?: string;
  trend?: 'up' | 'down' | 'neutral';
  icon?: ReactNode;
}>(
  ({ title, value, change, trend = 'neutral', icon, ...props }, ref) => (
    <Card ref={ref} variant="gradient" glow {...props}>
      <div className="flex items-center justify-between">
        <div className="space-y-2">
          {title && (
            <p className="text-sm font-medium text-base-content/70">{title}</p>
          )}
          {value && (
            <p className="text-2xl font-bold text-base-content">{value}</p>
          )}
          {change && (
            <p className={cn(
              "text-sm font-medium flex items-center gap-1",
              trend === 'up' && "text-success",
              trend === 'down' && "text-error",
              trend === 'neutral' && "text-base-content/70"
            )}>
              {trend === 'up' && '↗'}
              {trend === 'down' && '↘'}
              {trend === 'neutral' && '→'}
              {change}
            </p>
          )}
        </div>
        
        {icon && (
          <div className="p-3 bg-primary/10 text-primary rounded-lg">
            {icon}
          </div>
        )}
      </div>
    </Card>
  )
);

StatsCard.displayName = 'StatsCard';

/*
Esempi di utilizzo:

// Card base moderna
<Card variant="glass" hover glow animate size="lg">
  <CardHeader>
    <CardTitle>Titolo Accattivante</CardTitle>
    <CardDescription>
      Descrizione del contenuto con stile moderno
    </CardDescription>
  </CardHeader>
  <CardContent>
    <p>Contenuto principale della card...</p>
  </CardContent>
  <CardFooter>
    <Button variant="primary">Azione</Button>
  </CardFooter>
</Card>

// Product Card specializzata
<ProductCard
  variant="interactive"
  image="/product.jpg"
  title="Prodotto Fantastico"
  price="€99.99"
  originalPrice="€149.99"
  badge="In Offerta"
  hover
  glow
>
  <p className="text-sm text-base-content/70 mb-4">
    Descrizione dettagliata del prodotto con caratteristiche principali
  </p>
</ProductCard>

// Stats Card per dashboard
<StatsCard
  title="Vendite Totali"
  value="€24,500"
  change="+12% vs mese scorso"
  trend="up"
  icon={<TrendingUpIcon className="w-6 h-6" />}
  variant="elevated"
  glow
/>

// Card grid layout
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
  <Card variant="glass" hover>Content 1</Card>
  <Card variant="elevated" glow>Content 2</Card>
  <Card variant="interactive" animate>Content 3</Card>
</div>
*/
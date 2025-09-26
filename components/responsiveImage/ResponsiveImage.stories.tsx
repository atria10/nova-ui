// components/responsiveImage/ResponsiveImage.stories.tsx
import type { Meta, StoryObj } from '@storybook/react';
import ResponsiveImage from './ResponsiveImage';

const meta = {
    title: 'Components/ResponsiveImage',
    component: ResponsiveImage,
    parameters: {
        layout: 'centered',
        docs: {
            description: {
                component: 'Un componente immagine responsive con lazy loading, placeholder e gestione errori.',
            },
        },
    },
    tags: ['autodocs'],
    argTypes: {
        src: {
            control: 'text',
            description: 'URL dell\'immagine',
        },
        alt: {
            control: 'text',
            description: 'Testo alternativo per accessibilità',
        },
        aspectRatio: {
            control: 'select',
            options: ['1/1', '4/3', '16/9', '21/9', '9/16'],
            description: 'Rapporto di aspetto dell\'immagine',
        },
        lazy: {
            control: 'boolean',
            description: 'Abilita il lazy loading',
            defaultValue: true,
        },
        priority: {
            control: 'boolean',
            description: 'Carica l\'immagine con priorità alta',
            defaultValue: false,
        },
        objectFit: {
            control: 'select',
            options: ['contain', 'cover', 'fill', 'none', 'scale-down'],
            description: 'Come l\'immagine si adatta al contenitore',
        },
        objectPosition: {
            control: 'text',
            description: 'Posizione dell\'immagine nel contenitore',
        },
        placeholder: {
            control: 'radio',
            options: ['blur', 'skeleton', 'none'],
            description: 'Tipo di placeholder durante il caricamento',
        },
        fallback: {
            control: 'text',
            description: 'Immagine di fallback in caso di errore',
        },
    },
} satisfies Meta<typeof ResponsiveImage>;

export default meta;
type Story = StoryObj<typeof meta>;

// Storia base
export const Default: Story = {
    args: {
        src: 'https://images.unsplash.com/photo-1682687220742-aba13b6e50ba?w=800',
        alt: 'Paesaggio montano',
        aspectRatio: '16/9',
    },
};

// Aspect Ratios diversi
export const SquareAspectRatio: Story = {
    args: {
        src: 'https://images.unsplash.com/photo-1682687220742-aba13b6e50ba?w=600',
        alt: 'Immagine quadrata',
        aspectRatio: '1/1',
    },
    parameters: {
        docs: {
            description: {
                story: 'Immagine con aspect ratio quadrato (1:1)',
            },
        },
    },
};

export const PortraitAspectRatio: Story = {
    args: {
        src: 'https://images.unsplash.com/photo-1682687220742-aba13b6e50ba?w=600',
        alt: 'Immagine verticale',
        aspectRatio: '9/16',
    },
    parameters: {
        docs: {
            description: {
                story: 'Immagine con aspect ratio verticale (9:16)',
            },
        },
    },
};

export const CinematicAspectRatio: Story = {
    args: {
        src: 'https://images.unsplash.com/photo-1682687220742-aba13b6e50ba?w=1200',
        alt: 'Immagine cinematografica',
        aspectRatio: '21/9',
    },
    parameters: {
        docs: {
            description: {
                story: 'Immagine con aspect ratio cinematografico (21:9)',
            },
        },
    },
};

// Placeholder variations
export const WithBlurPlaceholder: Story = {
    args: {
        src: 'https://images.unsplash.com/photo-1682695796954-bad0d0f59ff1?w=800',
        alt: 'Immagine con blur placeholder',
        aspectRatio: '16/9',
        placeholder: 'blur',
    },
    parameters: {
        docs: {
            description: {
                story: 'Mostra un placeholder sfocato mentre l\'immagine si carica',
            },
        },
    },
};

export const WithSkeletonPlaceholder: Story = {
    args: {
        src: 'https://images.unsplash.com/photo-1682695796954-bad0d0f59ff1?w=800',
        alt: 'Immagine con skeleton',
        aspectRatio: '16/9',
        placeholder: 'skeleton',
    },
    parameters: {
        docs: {
            description: {
                story: 'Mostra uno skeleton loader durante il caricamento',
            },
        },
    },
};

// Priority loading
export const PriorityImage: Story = {
    args: {
        src: 'https://images.unsplash.com/photo-1682687218608-5e2522b04673?w=800',
        alt: 'Immagine prioritaria',
        aspectRatio: '16/9',
        priority: true,
        lazy: false,
    },
    parameters: {
        docs: {
            description: {
                story: 'Immagine caricata con priorità alta, ideale per hero images',
            },
        },
    },
};

// Object fit variations
export const ObjectFitContain: Story = {
    args: {
        src: 'https://images.unsplash.com/photo-1682687218608-5e2522b04673?w=800',
        alt: 'Object-fit contain',
        aspectRatio: '16/9',
        objectFit: 'contain',
        className: 'bg-gray-100',
    },
    parameters: {
        docs: {
            description: {
                story: 'L\'immagine mantiene le proporzioni e si adatta completamente nel contenitore',
            },
        },
    },
};

export const ObjectFitCover: Story = {
    args: {
        src: 'https://images.unsplash.com/photo-1682687218608-5e2522b04673?w=800',
        alt: 'Object-fit cover',
        aspectRatio: '1/1',
        objectFit: 'cover',
    },
    parameters: {
        docs: {
            description: {
                story: 'L\'immagine copre tutto il contenitore, potrebbe essere ritagliata',
            },
        },
    },
};

// Error handling
export const WithErrorHandling: Story = {
    args: {
        src: 'https://invalid-url-that-will-fail.com/image.jpg',
        alt: 'Immagine con errore',
        aspectRatio: '16/9',
    },
    parameters: {
        docs: {
            description: {
                story: 'Mostra il comportamento quando l\'immagine non si carica',
            },
        },
    },
};

export const WithFallbackImage: Story = {
    args: {
        src: 'https://invalid-url-that-will-fail.com/image.jpg',
        alt: 'Immagine con fallback',
        aspectRatio: '16/9',
        fallback: 'https://via.placeholder.com/800x450/cccccc/666666?text=Fallback+Image',
    },
    parameters: {
        docs: {
            description: {
                story: 'Usa un\'immagine di fallback quando l\'immagine principale fallisce',
            },
        },
    },
};

// Custom styling
export const WithCustomStyling: Story = {
    args: {
        src: 'https://images.unsplash.com/photo-1682687220742-aba13b6e50ba?w=800',
        alt: 'Immagine con stili custom',
        aspectRatio: '16/9',
        className: 'rounded-xl shadow-2xl',
        containerClassName: 'p-4 bg-gradient-to-r from-blue-500 to-purple-500',
    },
    parameters: {
        docs: {
            description: {
                story: 'Esempio con classi CSS personalizzate',
            },
        },
    },
};

// Gallery example
export const Gallery: Story = {
    args: {
        src: 'https://images.unsplash.com/photo-1682687206741?w=400',
        alt: 'Immagine 1',
    },
    render: () => (
        <div className="grid grid-cols-3 gap-4 w-[800px]">
            {[1, 2, 3, 4, 5, 6].map((i) => (
                <ResponsiveImage
                    key={i}
                    src={`https://images.unsplash.com/photo-168268720674${i}?w=400`}
                    alt={`Immagine ${i}`}
                    aspectRatio="1/1"
                    className="rounded-lg"
                    placeholder="skeleton"
                />
            ))}
        </div>
    ),
    parameters: {
        docs: {
            description: {
                story: 'Esempio di galleria con più immagini',
            },
        },
    },
};

// Performance comparison
export const LazyVsEager: Story = {
    args: {
        src: 'https://images.unsplash.com/photo-1682687206741?w=400',
        alt: 'Immagine 1',
    },
    render: () => (
        <div className="space-y-8 w-[600px]">
            <div>
                <h3 className="text-lg font-semibold mb-2">Lazy Loading (default)</h3>
                <p className="text-sm text-gray-600 mb-4">
                    L'immagine si carica quando entra nel viewport
                </p>
                <ResponsiveImage
                    src="https://images.unsplash.com/photo-1682687220742-aba13b6e50ba?w=800"
                    alt="Lazy loading"
                    aspectRatio="16/9"
                    lazy={true}
                    placeholder="skeleton"
                />
            </div>

            <div>
                <h3 className="text-lg font-semibold mb-2">Eager Loading (priority)</h3>
                <p className="text-sm text-gray-600 mb-4">
                    L'immagine si carica immediatamente
                </p>
                <ResponsiveImage
                    src="https://images.unsplash.com/photo-1682695796954-bad0d0f59ff1?w=800"
                    alt="Eager loading"
                    aspectRatio="16/9"
                    priority={true}
                    lazy={false}
                    placeholder="blur"
                />
            </div>
        </div>
    ),
    parameters: {
        docs: {
            description: {
                story: 'Confronto tra lazy loading e eager loading',
            },
        },
    },
};

// Responsive sizes
export const ResponsiveSizes: Story = {
    args: {
        src: 'https://images.unsplash.com/photo-1682687206741?w=400',
        alt: 'Immagine 1',
    },
    render: () => (
        <div className="space-y-4 w-full max-w-4xl">
            <div className="w-full">
                <h3 className="text-sm font-semibold mb-2">Mobile (100% width)</h3>
                <ResponsiveImage
                    src="https://images.unsplash.com/photo-1682687220742-aba13b6e50ba?w=400"
                    alt="Mobile size"
                    aspectRatio="16/9"
                />
            </div>

            <div className="w-2/3">
                <h3 className="text-sm font-semibold mb-2">Tablet (66% width)</h3>
                <ResponsiveImage
                    src="https://images.unsplash.com/photo-1682687220742-aba13b6e50ba?w=600"
                    alt="Tablet size"
                    aspectRatio="16/9"
                />
            </div>

            <div className="w-1/2">
                <h3 className="text-sm font-semibold mb-2">Desktop (50% width)</h3>
                <ResponsiveImage
                    src="https://images.unsplash.com/photo-1682687220742-aba13b6e50ba?w=800"
                    alt="Desktop size"
                    aspectRatio="16/9"
                />
            </div>
        </div>
    ),
    parameters: {
        docs: {
            description: {
                story: 'Immagini responsive a diverse dimensioni',
            },
        },
    },
};
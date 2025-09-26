// components/card/Card.stories.tsx
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle, ProductCard, StatsCard } from '@/components';
import type { Meta, StoryObj } from '@storybook/react';


const meta = {
  title: 'Components/Card',
  component: Card,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Componente Card moderno e versatile con multiple varianti, effetti hover e animazioni. Include anche varianti specializzate come ProductCard e StatsCard.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'elevated', 'outlined', 'glass', 'gradient', 'interactive'],
      description: 'Variante visiva della card',
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg', 'xl'],
      description: 'Dimensione della card',
    },
    padding: {
      control: 'select',
      options: ['none', 'sm', 'md', 'lg', 'xl'],
      description: 'Padding interno della card',
    },
    hover: {
      control: 'boolean',
      description: 'Abilita effetti hover',
      defaultValue: false,
    },
    glow: {
      control: 'boolean',
      description: 'Abilita effetto glow',
      defaultValue: false,
    },
    animate: {
      control: 'boolean',
      description: 'Abilita animazioni',
      defaultValue: true,
    },
    borderless: {
      control: 'boolean',
      description: 'Rimuove i bordi',
      defaultValue: false,
    },
  },
} satisfies Meta<typeof Card>;

export default meta;
type Story = StoryObj<typeof meta>;

// Storia base
export const Default: Story = {
  args: {
    children: (
      <div>
        <CardHeader>
          <CardTitle>Titolo della Card</CardTitle>
          <CardDescription>
            Questa è una descrizione della card che spiega il contenuto
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-base-content/80">
            Contenuto principale della card. Qui puoi inserire qualsiasi tipo di contenuto,
            testo, immagini, form o altri componenti.
          </p>
        </CardContent>
        <CardFooter>
          <button className="px-4 py-2 bg-primary text-primary-content rounded-lg hover:bg-primary/90 transition-colors">
            Azione
          </button>
        </CardFooter>
      </div>
    ),
  },
};

// Varianti di stile
export const Elevated: Story = {
  args: {
    variant: 'elevated',
    hover: true,
    glow: true,
    children: (
      <div>
        <CardHeader>
          <CardTitle>Card Elevata</CardTitle>
          <CardDescription>
            Card con ombra prominente e effetti hover
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-base-content/80">
            Perfetta per elementi importanti che devono catturare l'attenzione.
          </p>
        </CardContent>
      </div>
    ),
  },
  parameters: {
    docs: {
      description: {
        story: 'Card elevata con ombra prominente, ideale per contenuti importanti',
      },
    },
  },
};

export const Glass: Story = {
  args: {
    variant: 'glass',
    hover: true,
    animate: true,
    children: (
      <div>
        <CardHeader>
          <CardTitle>Glass Morphism</CardTitle>
          <CardDescription>
            Effetto vetro moderno con backdrop blur
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-base-content/80">
            Design trendy con effetto vetro smerigliato per un look contemporaneo.
          </p>
        </CardContent>
      </div>
    ),
  },
  parameters: {
    docs: {
      description: {
        story: 'Card con effetto glass morphism per un design moderno',
      },
    },
  },
};

export const Gradient: Story = {
  args: {
    variant: 'gradient',
    hover: true,
    glow: true,
    children: (
      <div>
        <CardHeader>
          <CardTitle>Card Gradiente</CardTitle>
          <CardDescription>
            Sfondo con gradiente sottile
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-base-content/80">
            Gradiente delicato che aggiunge profondità visiva senza distrarre dal contenuto.
          </p>
        </CardContent>
      </div>
    ),
  },
  parameters: {
    docs: {
      description: {
        story: 'Card con sfondo sfumato per un tocco di eleganza',
      },
    },
  },
};

export const Interactive: Story = {
  args: {
    variant: 'interactive',
    hover: true,
    animate: true,
    children: (
      <div>
        <CardHeader>
          <CardTitle>Card Interattiva</CardTitle>
          <CardDescription>
            Cliccabile con feedback visivo
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-base-content/80">
            Ideale per elementi cliccabili come link cards o call-to-action.
          </p>
        </CardContent>
      </div>
    ),
  },
  parameters: {
    docs: {
      description: {
        story: 'Card interattiva per elementi cliccabili',
      },
    },
  },
};

export const Outlined: Story = {
  args: {
    variant: 'outlined',
    hover: true,
    children: (
      <div>
        <CardHeader>
          <CardTitle>Card Outlined</CardTitle>
          <CardDescription>
            Stile minimalista con bordo pronunciato
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-base-content/80">
            Design pulito e minimalista che mette in risalto il contenuto.
          </p>
        </CardContent>
      </div>
    ),
  },
  parameters: {
    docs: {
      description: {
        story: 'Card con stile outlined per un approccio minimalista',
      },
    },
  },
};

// Dimensioni
export const Sizes:  Omit<Story, 'args'>  = {
  render: () => (
    <div className="space-y-6 w-full max-w-4xl">
      <div>
        <h3 className="text-sm font-semibold mb-3">Small</h3>
        <Card size="sm" variant="elevated">
          <CardHeader>
            <CardTitle className="text-base">Card Piccola</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-base-content/80">Contenuto compatto</p>
          </CardContent>
        </Card>
      </div>
      
      <div>
        <h3 className="text-sm font-semibold mb-3">Medium (Default)</h3>
        <Card size="md" variant="elevated">
          <CardHeader>
            <CardTitle>Card Media</CardTitle>
            <CardDescription>Dimensione standard</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-base-content/80">Contenuto di dimensione normale</p>
          </CardContent>
        </Card>
      </div>
      
      <div>
        <h3 className="text-sm font-semibold mb-3">Large</h3>
        <Card size="lg" variant="elevated">
          <CardHeader>
            <CardTitle className="text-xl">Card Grande</CardTitle>
            <CardDescription>Più spazio per contenuti estesi</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-base-content/80">
              Ideale per contenuti più complessi che richiedono più spazio verticale.
              Perfetta per dashboard e sezioni importanti.
            </p>
          </CardContent>
        </Card>
      </div>
      
      <div>
        <h3 className="text-sm font-semibold mb-3">Extra Large</h3>
        <Card size="xl" variant="elevated">
          <CardHeader>
            <CardTitle className="text-2xl">Card Extra Large</CardTitle>
            <CardDescription>Massimo spazio disponibile</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-base-content/80">
              Perfetta per hero sections, contenuti dettagliati o quando si vuole
              dare massima prominenza al contenuto. Ideale per landing pages
              e sezioni principali.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Diverse dimensioni disponibili per la card',
      },
    },
  },
};

// Product Card
export const ProductCardExample:  Omit<Story, 'args'>  = {
  render: () => (
    <div className="w-80">
      <ProductCard
        image="https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&h=300&fit=crop"
        title="Sneakers Moderne"
        price="€89.99"
        originalPrice="€129.99"
        badge="Offerta"
        hover
        glow
      >
        <p className="text-sm text-base-content/70 mb-4">
          Sneakers di alta qualità con design moderno e materiali premium. 
          Comfort garantito per tutto il giorno.
        </p>
        <div className="flex gap-2 mb-4">
          <span className="px-2 py-1 bg-base-200 text-xs rounded">Taglia 42</span>
          <span className="px-2 py-1 bg-base-200 text-xs rounded">Bianco</span>
        </div>
      </ProductCard>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Card specializzata per prodotti con immagine, prezzo e badge',
      },
    },
  },
};

// Stats Card
export const StatsCardExample:  Omit<Story, 'args'>  = {
  render: () => (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full max-w-4xl">
      <StatsCard
        title="Vendite Totali"
        value="€24,500"
        change="+12% vs mese scorso"
        trend="up"
        icon={
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
          </svg>
        }
        variant="elevated"
        glow
      />
      
      <StatsCard
        title="Nuovi Clienti"
        value="142"
        change="-3% vs mese scorso"
        trend="down"
        icon={
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
          </svg>
        }
        variant="glass"
      />
      
      <StatsCard
        title="Tasso Conversione"
        value="3.2%"
        change="Stabile"
        trend="neutral"
        icon={
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
          </svg>
        }
        variant="gradient"
      />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Cards specializzate per statistiche con icone e trend',
      },
    },
  },
};

// Layout Examples
export const GridLayout:  Omit<Story, 'args'>  = {
  render: () => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-6xl">
      <Card variant="default" hover>
        <CardHeader>
          <CardTitle>Card 1</CardTitle>
          <CardDescription>Default variant</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-base-content/80">Contenuto della prima card</p>
        </CardContent>
      </Card>
      
      <Card variant="elevated" hover glow>
        <CardHeader>
          <CardTitle>Card 2</CardTitle>
          <CardDescription>Elevated with glow</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-base-content/80">Contenuto della seconda card</p>
        </CardContent>
      </Card>
      
      <Card variant="glass" hover animate>
        <CardHeader>
          <CardTitle>Card 3</CardTitle>
          <CardDescription>Glass morphism</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-base-content/80">Contenuto della terza card</p>
        </CardContent>
      </Card>
      
      <Card variant="gradient" hover>
        <CardHeader>
          <CardTitle>Card 4</CardTitle>
          <CardDescription>Gradient background</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-base-content/80">Contenuto della quarta card</p>
        </CardContent>
      </Card>
      
      <Card variant="interactive" hover animate>
        <CardHeader>
          <CardTitle>Card 5</CardTitle>
          <CardDescription>Interactive card</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-base-content/80">Contenuto della quinta card</p>
        </CardContent>
      </Card>
      
      <Card variant="outlined" hover>
        <CardHeader>
          <CardTitle>Card 6</CardTitle>
          <CardDescription>Outlined style</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-base-content/80">Contenuto della sesta card</p>
        </CardContent>
      </Card>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Layout a griglia con diverse varianti di card',
      },
    },
  },
};

// Custom Content Examples
export const WithCustomContent:  Omit<Story, 'args'>  = {
  render: () => (
    <div className="space-y-6 w-full max-w-2xl">
      {/* Card con form */}
      <Card variant="elevated" padding="lg">
        <CardHeader>
          <CardTitle>Form di Contatto</CardTitle>
          <CardDescription>Inserisci i tuoi dati per essere ricontattato</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <input 
              type="text" 
              placeholder="Nome" 
              className="w-full px-3 py-2 border border-base-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary" 
            />
            <input 
              type="email" 
              placeholder="Email" 
              className="w-full px-3 py-2 border border-base-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary" 
            />
            <textarea 
              placeholder="Messaggio" 
              rows={3}
              className="w-full px-3 py-2 border border-base-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary resize-none" 
            />
          </div>
        </CardContent>
        <CardFooter>
          <button className="w-full py-2 bg-primary text-primary-content rounded-lg hover:bg-primary/90 transition-colors">
            Invia Messaggio
          </button>
        </CardFooter>
      </Card>
      
      {/* Card con immagine e contenuto */}
      <Card variant="glass" hover glow>
        <div className="aspect-video bg-gradient-to-br from-primary/20 to-secondary/20 rounded-lg mb-4 flex items-center justify-center">
          <span className="text-base-content/60">Placeholder Immagine</span>
        </div>
        <CardHeader>
          <CardTitle>Articolo del Blog</CardTitle>
          <CardDescription>15 Marzo 2024 • 5 min di lettura</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-base-content/80">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod 
            tempor incididunt ut labore et dolore magna aliqua.
          </p>
        </CardContent>
        <CardFooter>
          <button className="text-primary hover:underline font-medium">
            Leggi di più →
          </button>
        </CardFooter>
      </Card>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Esempi di card con contenuto personalizzato come form e articoli',
      },
    },
  },
};

// Padding Variations
export const PaddingVariations:  Omit<Story, 'args'>  = {
  render: () => (
    <div className="space-y-4 w-full max-w-2xl">
      {(['none', 'sm', 'md', 'lg', 'xl'] as const).map((paddingSize) => (
        <Card key={paddingSize} variant="outlined" padding={paddingSize}>
          <div>
            <h4 className="font-semibold mb-2">Padding: {paddingSize}</h4>
            <p className="text-base-content/80">
              Questo testo mostra come il padding {paddingSize} influenza lo spazio interno della card.
            </p>
          </div>
        </Card>
      ))}
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Diverse opzioni di padding per controllare lo spazio interno',
      },
    },
  },
};
// components/button/Button.stories.tsx
import { Button } from '@/components';
import type { Meta, StoryObj } from '@storybook/react';

// Icone di esempio (usando caratteri Unicode per semplicità)
const PlusIcon = () => <span>➕</span>;
const TrashIcon = () => <span>🗑️</span>;
const EditIcon = () => <span>✏️</span>;
const SaveIcon = () => <span>💾</span>;
const DownloadIcon = () => <span>⬇️</span>;
const UploadIcon = () => <span>⬆️</span>;
const SearchIcon = () => <span>🔍</span>;
const SettingsIcon = () => <span>⚙️</span>;
const UserIcon = () => <span>👤</span>;
const HeartIcon = () => <span>❤️</span>;
const ShareIcon = () => <span>📤</span>;
const ArrowRightIcon = () => <span>→</span>;
const ArrowLeftIcon = () => <span>←</span>;
const CheckIcon = () => <span>✓</span>;
const CloseIcon = () => <span>✕</span>;

// Componenti esempio per demonstrare l'uso
const ButtonGrid = ({ children, title }: { children: React.ReactNode; title: string }) => (
  <div className="space-y-4">
    <h3 className="text-lg font-semibold text-base-content">{title}</h3>
    <div className="flex flex-wrap gap-3">
      {children}
    </div>
  </div>
);

const ActionBarExample = () => (
  <div className="flex flex-wrap gap-3 p-4 bg-base-200 rounded-lg">
    <Button color="primary" leftIcon={<PlusIcon />}>
      Nuovo
    </Button>
    <Button color="info" style="outline" leftIcon={<EditIcon />}>
      Modifica
    </Button>
    <Button color="success" style="ghost" leftIcon={<SaveIcon />}>
      Salva
    </Button>
    <Button color="warning" style="outline" leftIcon={<DownloadIcon />}>
      Scarica
    </Button>
    <Button color="error" style="ghost" leftIcon={<TrashIcon />}>
      Elimina
    </Button>
  </div>
);

const FormButtonsExample = () => (
  <div className="space-y-6">
    {/* Login Form */}
    <div className="p-6 border border-base-300 rounded-lg space-y-4">
      <h4 className="font-semibold">Login Form</h4>
      <div className="space-y-3">
        <input className="w-full px-3 py-2 border border-base-300 rounded-lg" placeholder="Email" />
        <input className="w-full px-3 py-2 border border-base-300 rounded-lg" placeholder="Password" type="password" />
      </div>
      <div className="flex gap-3">
        <Button color="primary" size="md" className="flex-1">
          Accedi
        </Button>
        <Button color="neutral" style="outline" size="md">
          Annulla
        </Button>
      </div>
      <Button color="info" style="ghost" size="sm" className="w-full">
        Password dimenticata?
      </Button>
    </div>

    {/* Contact Form */}
    <div className="p-6 border border-base-300 rounded-lg space-y-4">
      <h4 className="font-semibold">Contact Form</h4>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        <input className="px-3 py-2 border border-base-300 rounded-lg" placeholder="Nome" />
        <input className="px-3 py-2 border border-base-300 rounded-lg" placeholder="Email" />
      </div>
      <textarea className="w-full px-3 py-2 border border-base-300 rounded-lg" rows={3} placeholder="Messaggio"></textarea>
      <div className="flex gap-3 justify-end">
        <Button color="neutral" style="ghost">
          Reset
        </Button>
        <Button color="success" leftIcon={<ShareIcon />}>
          Invia Messaggio
        </Button>
      </div>
    </div>
  </div>
);

const NavigationExample = () => (
  <div className="space-y-4">
    {/* Toolbar */}
    <div className="flex justify-between items-center p-4 bg-base-100 border border-base-300 rounded-lg">
      <div className="flex gap-2">
        <Button color="neutral" style="ghost" leftIcon={<ArrowLeftIcon />}>
          Indietro
        </Button>
        <Button color="primary" style="outline" leftIcon={<SearchIcon />}>
          Cerca
        </Button>
      </div>
      <div className="flex gap-2">
        <Button color="info" style="ghost" leftIcon={<SettingsIcon />} />
        <Button color="primary" leftIcon={<UserIcon />}>
          Profilo
        </Button>
      </div>
    </div>

    {/* Pagination */}
    <div className="flex justify-center gap-2">
      <Button color="neutral" style="outline" size="sm" disabled>
        <ArrowLeftIcon />
      </Button>
      <Button color="primary" size="sm">1</Button>
      <Button color="neutral" style="ghost" size="sm">2</Button>
      <Button color="neutral" style="ghost" size="sm">3</Button>
      <Button color="neutral" style="outline" size="sm">
        <ArrowRightIcon />
      </Button>
    </div>

    {/* Tab Navigation */}
    <div className="flex border-b border-base-300">
      <Button color="primary" style="ghost" className="rounded-none border-b-2 border-primary">
        Overview
      </Button>
      <Button color="neutral" style="ghost" className="rounded-none">
        Analytics
      </Button>
      <Button color="neutral" style="ghost" className="rounded-none">
        Settings
      </Button>
    </div>
  </div>
);

const LoadingStatesExample = () => {
  return (
    <div className="space-y-6">
      <ButtonGrid title="Stati di Loading">
        <Button color="primary" loading>
          Caricamento...
        </Button>
        <Button color="success" loading style="outline">
          Salvando...
        </Button>
        <Button color="info" loading style="ghost">
          Elaborando...
        </Button>
        <Button color="warning" loading size="lg">
          Upload in corso...
        </Button>
      </ButtonGrid>

      <div className="p-4 bg-base-200 rounded-lg">
        <h4 className="font-semibold mb-3">Simulazione Upload</h4>
        <div className="flex gap-3">
          <Button color="primary" leftIcon={<UploadIcon />}>
            Carica File
          </Button>
          <Button color="success" loading disabled>
            Upload in corso...
          </Button>
          <Button color="info" leftIcon={<CheckIcon />} disabled>
            Completato
          </Button>
        </div>
      </div>
    </div>
  );
};

const meta = {
  title: 'Components/Button',
  component: Button,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Componente Button versatile basato su DaisyUI con supporto per colori, stili, dimensioni, icone e stati di loading. Include retrocompatibilità con l\'API variant.',
      },
    },
  },
  tags: ['autodocs'],
  args: {
    onClick: ()=>{},
  },
  argTypes: {
    color: {
      control: 'select',
      options: ['primary', 'secondary', 'accent', 'info', 'success', 'warning', 'error', 'neutral'],
      description: 'Colore del button basato su DaisyUI',
    },
    style: {
      control: 'select',
      options: ['filled', 'outline', 'ghost'],
      description: 'Stile visivo del button',
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: 'Dimensione del button',
    },
    loading: {
      control: 'boolean',
      description: 'Mostra stato di loading con spinner',
    },
    disabled: {
      control: 'boolean',
      description: 'Disabilita il button',
    },
    variant: {
      control: 'select',
      options: ['primary', 'secondary', 'accent', 'info', 'success', 'warning', 'error', 'neutral', 'outline', 'ghost'],
      description: 'API legacy per retrocompatibilità',
    },
  },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

// Storia base
export const Default: Story = {
  args: {
    children: 'Button Default',
  },
};

// Colori
export const Colors: Story = {
  render: () => (
    <ButtonGrid title="Tutti i Colori">
      <Button color="primary">Primary</Button>
      <Button color="secondary">Secondary</Button>
      <Button color="accent">Accent</Button>
      <Button color="info">Info</Button>
      <Button color="success">Success</Button>
      <Button color="warning">Warning</Button>
      <Button color="error">Error</Button>
      <Button color="neutral">Neutral</Button>
    </ButtonGrid>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Tutti i colori disponibili basati sulla palette DaisyUI',
      },
    },
  },
};

// Stili
export const Styles: Story = {
  render: () => (
    <div className="space-y-6">
      <ButtonGrid title="Filled (Default)">
        <Button color="primary" style="filled">Primary Filled</Button>
        <Button color="success" style="filled">Success Filled</Button>
        <Button color="warning" style="filled">Warning Filled</Button>
        <Button color="error" style="filled">Error Filled</Button>
      </ButtonGrid>

      <ButtonGrid title="Outline">
        <Button color="primary" style="outline">Primary Outline</Button>
        <Button color="success" style="outline">Success Outline</Button>
        <Button color="warning" style="outline">Warning Outline</Button>
        <Button color="error" style="outline">Error Outline</Button>
      </ButtonGrid>

      <ButtonGrid title="Ghost">
        <Button color="primary" style="ghost">Primary Ghost</Button>
        <Button color="success" style="ghost">Success Ghost</Button>
        <Button color="warning" style="ghost">Warning Ghost</Button>
        <Button color="error" style="ghost">Error Ghost</Button>
      </ButtonGrid>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Tre stili disponibili: filled (solido), outline (contorno), ghost (trasparente)',
      },
    },
  },
};

// Dimensioni
export const Sizes: Story = {
  render: () => (
    <div className="space-y-6">
      <ButtonGrid title="Small">
        <Button color="primary" size="sm">Small Primary</Button>
        <Button color="success" size="sm" style="outline">Small Outline</Button>
        <Button color="warning" size="sm" style="ghost">Small Ghost</Button>
      </ButtonGrid>

      <ButtonGrid title="Medium (Default)">
        <Button color="primary" size="md">Medium Primary</Button>
        <Button color="success" size="md" style="outline">Medium Outline</Button>
        <Button color="warning" size="md" style="ghost">Medium Ghost</Button>
      </ButtonGrid>

      <ButtonGrid title="Large">
        <Button color="primary" size="lg">Large Primary</Button>
        <Button color="success" size="lg" style="outline">Large Outline</Button>
        <Button color="warning" size="lg" style="ghost">Large Ghost</Button>
      </ButtonGrid>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Tre dimensioni: small (sm), medium (md), large (lg)',
      },
    },
  },
};

// Icone
export const WithIcons: Story = {
  render: () => (
    <div className="space-y-6">
      <ButtonGrid title="Icona Sinistra">
        <Button color="primary" leftIcon={<PlusIcon />}>Aggiungi</Button>
        <Button color="success" leftIcon={<SaveIcon />} style="outline">Salva</Button>
        <Button color="info" leftIcon={<EditIcon />} style="ghost">Modifica</Button>
        <Button color="error" leftIcon={<TrashIcon />}>Elimina</Button>
      </ButtonGrid>

      <ButtonGrid title="Icona Destra">
        <Button color="primary" rightIcon={<ArrowRightIcon />}>Continua</Button>
        <Button color="info" rightIcon={<DownloadIcon />} style="outline">Scarica</Button>
        <Button color="success" rightIcon={<ShareIcon />} style="ghost">Condividi</Button>
      </ButtonGrid>

      <ButtonGrid title="Solo Icone">
        <Button color="primary" leftIcon={<SearchIcon />} />
        <Button color="info" leftIcon={<SettingsIcon />} style="outline" />
        <Button color="success" leftIcon={<HeartIcon />} style="ghost" />
        <Button color="error" leftIcon={<CloseIcon />} />
      </ButtonGrid>

      <ButtonGrid title="Entrambe le Icone">
        <Button color="primary" leftIcon={<UserIcon />} rightIcon={<ArrowRightIcon />}>
          Profilo
        </Button>
        <Button color="success" leftIcon={<SaveIcon />} rightIcon={<CheckIcon />} style="outline">
          Salva e Continua
        </Button>
      </ButtonGrid>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Button con icone a sinistra, destra, entrambe o solo icone',
      },
    },
  },
};

// Stati
export const States: Story = {
  render: () => (
    <div className="space-y-6">
      <ButtonGrid title="Stati Normali">
        <Button color="primary">Normale</Button>
        <Button color="primary" className="hover:scale-105">Hover Simulated</Button>
        <Button color="primary" className="focus:ring-4 focus:ring-primary/20">Focus Simulated</Button>
      </ButtonGrid>

      <ButtonGrid title="Stati Disabilitati">
        <Button color="primary" disabled>Primary Disabled</Button>
        <Button color="success" disabled style="outline">Success Disabled</Button>
        <Button color="warning" disabled style="ghost">Warning Disabled</Button>
        <Button color="error" disabled leftIcon={<TrashIcon />}>Error Disabled</Button>
      </ButtonGrid>

      <ButtonGrid title="Stati Loading">
        <Button color="primary" loading>Loading Primary</Button>
        <Button color="success" loading style="outline">Loading Outline</Button>
        <Button color="info" loading style="ghost">Loading Ghost</Button>
        <Button color="warning" loading size="lg">Loading Large</Button>
      </ButtonGrid>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Diversi stati del button: normale, disabled, loading',
      },
    },
  },
};

// Retrocompatibilità
export const BackwardCompatibility: Story = {
  render: () => (
    <div className="space-y-6">
      <ButtonGrid title="API Variant (Legacy)">
        <Button variant="primary">Primary Variant</Button>
        <Button variant="secondary">Secondary Variant</Button>
        <Button variant="outline">Outline Variant</Button>
        <Button variant="ghost">Ghost Variant</Button>
      </ButtonGrid>

      <ButtonGrid title="Nuova API (Raccomandata)">
        <Button color="primary" style="filled">Primary Filled</Button>
        <Button color="secondary" style="filled">Secondary Filled</Button>
        <Button color="primary" style="outline">Primary Outline</Button>
        <Button color="primary" style="ghost">Primary Ghost</Button>
      </ButtonGrid>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Confronto tra API legacy (variant) e nuova API (color + style) per retrocompatibilità',
      },
    },
  },
};

// Esempi pratici
export const ActionBar: Story = {
  render: () => <ActionBarExample />,
  parameters: {
    docs: {
      description: {
        story: 'Barra delle azioni tipica con button per diverse operazioni',
      },
    },
  },
};

export const FormButtons: Story = {
  render: () => <FormButtonsExample />,
  parameters: {
    docs: {
      description: {
        story: 'Button in contesti di form: login, contact form, con diverse disposizioni',
      },
    },
  },
};

export const Navigation: Story = {
  render: () => <NavigationExample />,
  parameters: {
    docs: {
      description: {
        story: 'Button per navigazione: toolbar, pagination, tab navigation',
      },
    },
  },
};

export const LoadingStates: Story = {
  render: () => <LoadingStatesExample />,
  parameters: {
    docs: {
      description: {
        story: 'Gestione degli stati di loading in scenari reali come upload file',
      },
    },
  },
};

// Responsività
export const ResponsiveLayout: Story = {
  render: () => (
    <div className="space-y-6 w-full">
      <h3 className="text-lg font-semibold">Layout Responsive</h3>
      
      {/* Mobile stack */}
      <div className="block sm:hidden space-y-2">
        <Button color="primary" className="w-full">Mobile: Full Width</Button>
        <Button color="secondary" style="outline" className="w-full">Mobile: Outline</Button>
        <Button color="info" style="ghost" className="w-full">Mobile: Ghost</Button>
      </div>

      {/* Tablet/Desktop inline */}
      <div className="hidden sm:flex gap-3 flex-wrap">
        <Button color="primary">Desktop: Inline</Button>
        <Button color="secondary" style="outline">Desktop: Outline</Button>
        <Button color="info" style="ghost">Desktop: Ghost</Button>
        <Button color="success" leftIcon={<PlusIcon />}>Con Icona</Button>
      </div>

      {/* Toolbar responsive */}
      <div className="flex flex-col sm:flex-row gap-3 sm:justify-between sm:items-center p-4 bg-base-200 rounded-lg">
        <div className="flex gap-2 order-2 sm:order-1">
          <Button color="primary" size="sm" leftIcon={<PlusIcon />}>
            Nuovo
          </Button>
          <Button color="info" size="sm" style="outline" className="hidden sm:inline-flex">
            Filtri
          </Button>
        </div>
        <div className="flex gap-2 order-1 sm:order-2">
          <Button color="neutral" size="sm" style="ghost" leftIcon={<SettingsIcon />} />
          <Button color="primary" size="sm" leftIcon={<UserIcon />}>
            <span className="hidden sm:inline">Profilo</span>
          </Button>
        </div>
      </div>

      <div className="text-sm text-base-content/60 space-y-1">
        <p>📱 Mobile: Button stack verticalmente e occupano tutta la larghezza</p>
        <p>💻 Desktop: Button in linea con dimensioni automatiche</p>
        <p>🔄 Responsive: Layout si adatta automaticamente</p>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Layout responsive che si adatta a mobile e desktop automaticamente',
      },
    },
  },
};

// Combinazioni avanzate
export const AdvancedCombinations: Story = {
  render: () => (
    <div className="space-y-6">
      <ButtonGrid title="Tutte le Combinazioni Colore + Stile">
        <Button color="primary" style="filled">Primary Filled</Button>
        <Button color="primary" style="outline">Primary Outline</Button>
        <Button color="primary" style="ghost">Primary Ghost</Button>
        <Button color="success" style="filled">Success Filled</Button>
        <Button color="success" style="outline">Success Outline</Button>
        <Button color="success" style="ghost">Success Ghost</Button>
        <Button color="warning" style="filled">Warning Filled</Button>
        <Button color="warning" style="outline">Warning Outline</Button>
        <Button color="warning" style="ghost">Warning Ghost</Button>
        <Button color="error" style="filled">Error Filled</Button>
        <Button color="error" style="outline">Error Outline</Button>
        <Button color="error" style="ghost">Error Ghost</Button>
      </ButtonGrid>

      <div className="p-4 bg-base-200 rounded-lg">
        <h4 className="font-semibold mb-3">Matrice Completa</h4>
        <p className="text-sm text-base-content/70 mb-4">
          Con la nuova API puoi combinare qualsiasi colore con qualsiasi stile, 
          ottenendo 8 colori × 3 stili = 24 varianti possibili!
        </p>
        <div className="grid grid-cols-3 gap-4 text-sm">
          <div>
            <h5 className="font-medium mb-2">Filled</h5>
            <p className="text-base-content/60">Background pieno, testo contrastante</p>
          </div>
          <div>
            <h5 className="font-medium mb-2">Outline</h5>
            <p className="text-base-content/60">Solo bordo, background trasparente</p>
          </div>
          <div>
            <h5 className="font-medium mb-2">Ghost</h5>
            <p className="text-base-content/60">Trasparente, hover colorato</p>
          </div>
        </div>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Matrice completa di tutte le combinazioni possibili colore + stile',
      },
    },
  },
};
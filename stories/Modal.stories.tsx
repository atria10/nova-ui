// components/modal/Modal.stories.tsx
import { Modal } from '@/components';
import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';

// Componenti di esempio per testare il modal
const SimpleContent = () => (
  <div className="space-y-4">
    <p className="text-base-content/80">
      Questo è un semplice contenuto di esempio per il modal. 
      Puoi inserire qualsiasi tipo di contenuto qui.
    </p>
    <div className="flex gap-2 justify-end">
      <button className="px-4 py-2 border border-base-300 rounded-lg hover:bg-base-100 transition-colors">
        Annulla
      </button>
      <button className="px-4 py-2 bg-primary text-primary-content rounded-lg hover:bg-primary/90 transition-colors">
        Conferma
      </button>
    </div>
  </div>
);

const FormContent = ({ onClose }: { onClose?: () => void }) => (
  <div className="space-y-4">
    <div>
      <label className="block text-sm font-medium text-base-content mb-2">
        Nome Completo
      </label>
      <input 
        type="text" 
        className="w-full px-3 py-2 border border-base-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary" 
        placeholder="Inserisci il tuo nome"
      />
    </div>
    
    <div>
      <label className="block text-sm font-medium text-base-content mb-2">
        Email
      </label>
      <input 
        type="email" 
        className="w-full px-3 py-2 border border-base-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary" 
        placeholder="email@esempio.com"
      />
    </div>
    
    <div>
      <label className="block text-sm font-medium text-base-content mb-2">
        Messaggio
      </label>
      <textarea 
        rows={4}
        className="w-full px-3 py-2 border border-base-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary resize-none" 
        placeholder="Il tuo messaggio..."
      />
    </div>
    
    <div className="flex gap-3 justify-end pt-4">
      <button 
        onClick={onClose}
        className="px-4 py-2 border border-base-300 text-base-content rounded-lg hover:bg-base-100 transition-colors"
      >
        Annulla
      </button>
      <button className="px-4 py-2 bg-primary text-primary-content rounded-lg hover:bg-primary/90 transition-colors">
        Invia
      </button>
    </div>
  </div>
);

const SettingsContent = () => (
  <div className="space-y-6">
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-base-content">Preferenze Account</h3>
      
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-base-content">Notifiche Email</p>
            <p className="text-xs text-base-content/60">Ricevi aggiornamenti via email</p>
          </div>
          <label className="relative inline-flex items-center cursor-pointer">
            <input type="checkbox" className="sr-only peer" defaultChecked />
            <div className="relative w-11 h-6 bg-base-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
          </label>
        </div>
        
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-base-content">Notifiche Push</p>
            <p className="text-xs text-base-content/60">Ricevi notifiche sul dispositivo</p>
          </div>
          <label className="relative inline-flex items-center cursor-pointer">
            <input type="checkbox" className="sr-only peer" />
            <div className="relative w-11 h-6 bg-base-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
          </label>
        </div>
        
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-base-content">Modalità Scura</p>
            <p className="text-xs text-base-content/60">Attiva il tema scuro</p>
          </div>
          <label className="relative inline-flex items-center cursor-pointer">
            <input type="checkbox" className="sr-only peer" defaultChecked />
            <div className="relative w-11 h-6 bg-base-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
          </label>
        </div>
      </div>
    </div>
    
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-base-content">Privacy</h3>
      
      <div className="space-y-2">
        <button className="w-full text-left px-3 py-2 hover:bg-base-200 rounded-lg transition-colors">
          <p className="text-sm font-medium text-base-content">Gestisci dati personali</p>
          <p className="text-xs text-base-content/60">Visualizza ed elimina i tuoi dati</p>
        </button>
        
        <button className="w-full text-left px-3 py-2 hover:bg-base-200 rounded-lg transition-colors">
          <p className="text-sm font-medium text-base-content">Cronologia attività</p>
          <p className="text-xs text-base-content/60">Vedi la tua cronologia delle azioni</p>
        </button>
      </div>
    </div>
    
    <div className="flex gap-3 justify-end pt-4 border-t border-base-300">
      <button className="px-4 py-2 border border-base-300 text-base-content rounded-lg hover:bg-base-100 transition-colors">
        Reset
      </button>
      <button className="px-4 py-2 bg-primary text-primary-content rounded-lg hover:bg-primary/90 transition-colors">
        Salva
      </button>
    </div>
  </div>
);

const ConfirmationContent = ({ type = 'delete' }: { type?: 'delete' | 'save' | 'logout' }) => {
  const configs = {
    delete: {
      icon: '🗑️',
      title: 'Conferma Eliminazione',
      message: 'Sei sicuro di voler eliminare questo elemento? Questa azione non può essere annullata.',
      confirmText: 'Elimina',
      confirmClass: 'bg-error text-error-content hover:bg-error/90'
    },
    save: {
      icon: '💾',
      title: 'Salva Modifiche',
      message: 'Vuoi salvare le modifiche apportate? Le modifiche non salvate andranno perse.',
      confirmText: 'Salva',
      confirmClass: 'bg-success text-success-content hover:bg-success/90'
    },
    logout: {
      icon: '👋',
      title: 'Conferma Logout',
      message: 'Sei sicuro di voler uscire dal tuo account? Dovrai effettuare nuovamente l\'accesso.',
      confirmText: 'Logout',
      confirmClass: 'bg-warning text-warning-content hover:bg-warning/90'
    }
  };

  const config = configs[type];

  return (
    <div className="text-center space-y-4">
      <div className="text-4xl mb-4">{config.icon}</div>
      <h3 className="text-lg font-semibold text-base-content">{config.title}</h3>
      <p className="text-base-content/70">{config.message}</p>
      
      <div className="flex gap-3 justify-center pt-4">
        <button className="px-6 py-2 border border-base-300 text-base-content rounded-lg hover:bg-base-100 transition-colors">
          Annulla
        </button>
        <button className={`px-6 py-2 rounded-lg transition-colors ${config.confirmClass}`}>
          {config.confirmText}
        </button>
      </div>
    </div>
  );
};

const ImageGalleryContent = () => (
  <div className="space-y-4">
    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
      {[1, 2, 3, 4, 5, 6].map((i) => (
        <div key={i} className="aspect-square bg-gradient-to-br from-primary/20 to-secondary/20 rounded-lg flex items-center justify-center cursor-pointer hover:scale-105 transition-transform">
          <span className="text-base-content/60">Foto {i}</span>
        </div>
      ))}
    </div>
    
    <div className="flex justify-between items-center pt-4 border-t border-base-300">
      <p className="text-sm text-base-content/60">6 immagini selezionate</p>
      <div className="flex gap-2">
        <button className="px-4 py-2 border border-base-300 text-base-content rounded-lg hover:bg-base-100 transition-colors">
          Seleziona tutto
        </button>
        <button className="px-4 py-2 bg-primary text-primary-content rounded-lg hover:bg-primary/90 transition-colors">
          Scarica
        </button>
      </div>
    </div>
  </div>
);

// Controlled Modal Example
const ControlledModalExample = () => {
  const [isOpen, setIsOpen] = useState(false);
  
  return (
    <div className="space-y-4">
      <div className="flex gap-2">
        <button 
          onClick={() => setIsOpen(true)}
          className="px-4 py-2 bg-primary text-primary-content rounded-lg hover:bg-primary/90 transition-colors"
        >
          Apri Modal
        </button>
        <button 
          onClick={() => setIsOpen(false)}
          className="px-4 py-2 border border-base-300 text-base-content rounded-lg hover:bg-base-100 transition-colors"
        >
          Chiudi Modal
        </button>
      </div>
      
      <p className="text-sm text-base-content/60">
        Stato: {isOpen ? 'Aperto' : 'Chiuso'}
      </p>
      
      <Modal
        trigger={<div />} // Trigger vuoto perché controlliamo esternamente
        title="Modal Controllato"
        description="Questo modal è controllato esternamente tramite state"
        DynamicComponent={SimpleContent}
        isOpen={isOpen}
        onOpenChange={setIsOpen}
      />
    </div>
  );
};

const meta = {
  title: 'Components/Modal',
  component: Modal,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Componente Modal moderno con effetti glass morphism, animazioni fluide e supporto per componenti dinamici. Include backdrop blur, overlay con pattern e controllo esterno opzionale.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg', 'xl', 'full'],
      description: 'Dimensione del modal',
    },
    title: {
      control: 'text',
      description: 'Titolo del modal',
    },
    description: {
      control: 'text',
      description: 'Descrizione opzionale sotto il titolo',
    },
    isOpen: {
      control: 'boolean',
      description: 'Controllo esterno dello stato (opzionale)',
    },
  },
} satisfies Meta<typeof Modal>;

export default meta;
type Story = StoryObj<typeof meta>;

// Storia base
export const Default: Story = {
  args: {
    trigger: (
      <button className="px-4 py-2 bg-primary text-primary-content rounded-lg hover:bg-primary/90 transition-colors">
        Apri Modal
      </button>
    ),
    title: 'Modal di Default',
    description: 'Questo è un modal base con contenuto semplice',
    DynamicComponent: SimpleContent,
  },
};

// Dimensioni
export const Small: Story = {
  args: {
    trigger: (
      <button className="px-4 py-2 bg-primary text-primary-content rounded-lg hover:bg-primary/90 transition-colors">
        Modal Piccolo
      </button>
    ),
    title: 'Modal Piccolo',
    description: 'Modal compatto per contenuti brevi',
    size: 'sm',
    DynamicComponent: SimpleContent,
  },
  parameters: {
    docs: {
      description: {
        story: 'Modal piccolo ideale per conferme rapide o contenuti compatti',
      },
    },
  },
};

export const Large: Story = {
  args: {
    trigger: (
      <button className="px-4 py-2 bg-primary text-primary-content rounded-lg hover:bg-primary/90 transition-colors">
        Modal Grande
      </button>
    ),
    title: 'Modal Grande',
    description: 'Spazio extra per contenuti più complessi',
    size: 'lg',
    DynamicComponent: SettingsContent,
  },
  parameters: {
    docs: {
      description: {
        story: 'Modal grande per contenuti complessi come form o impostazioni',
      },
    },
  },
};

export const ExtraLarge: Story = {
  args: {
    trigger: (
      <button className="px-4 py-2 bg-primary text-primary-content rounded-lg hover:bg-primary/90 transition-colors">
        Modal Extra Large
      </button>
    ),
    title: 'Galleria Immagini',
    description: 'Modal extra large per contenuti che richiedono molto spazio',
    size: 'xl',
    DynamicComponent: ImageGalleryContent,
  },
  parameters: {
    docs: {
      description: {
        story: 'Modal extra large per gallerie, dashboard o contenuti estesi',
      },
    },
  },
};

export const FullScreen: Story = {
  args: {
    trigger: (
      <button className="px-4 py-2 bg-primary text-primary-content rounded-lg hover:bg-primary/90 transition-colors">
        Modal Fullscreen
      </button>
    ),
    title: 'Modal Fullscreen',
    description: 'Occupa quasi tutto lo schermo disponibile',
    size: 'full',
    DynamicComponent: SettingsContent,
  },
  parameters: {
    docs: {
      description: {
        story: 'Modal fullscreen per applicazioni complesse o editing',
      },
    },
  },
};

// Form Modal
export const FormModal: Story = {
  args: {
    trigger: (
      <button className="px-4 py-2 bg-success text-success-content rounded-lg hover:bg-success/90 transition-colors">
        Apri Form
      </button>
    ),
    title: 'Form di Contatto',
    description: 'Compila il form per inviarci un messaggio',
    size: 'md',
    DynamicComponent: FormContent,
  },
  parameters: {
    docs: {
      description: {
        story: 'Modal con form completo per raccolta dati utente',
      },
    },
  },
};

// Confirmation Modals
export const DeleteConfirmation: Story = {
  args: {
    trigger: (
      <button className="px-4 py-2 bg-error text-error-content rounded-lg hover:bg-error/90 transition-colors">
        Elimina
      </button>
    ),
    title: 'Conferma Azione',
    size: 'sm',
    DynamicComponent: () => <ConfirmationContent type="delete" />,
  },
  parameters: {
    docs: {
      description: {
        story: 'Modal di conferma per azioni distruttive come l\'eliminazione',
      },
    },
  },
};

export const SaveConfirmation: Story = {
  args: {
    trigger: (
      <button className="px-4 py-2 bg-success text-success-content rounded-lg hover:bg-success/90 transition-colors">
        Salva
      </button>
    ),
    title: 'Conferma Salvataggio',
    size: 'sm',
    DynamicComponent: () => <ConfirmationContent type="save" />,
  },
  parameters: {
    docs: {
      description: {
        story: 'Modal di conferma per il salvataggio delle modifiche',
      },
    },
  },
};

export const LogoutConfirmation: Story = {
  args: {
    trigger: (
      <button className="px-4 py-2 bg-warning text-warning-content rounded-lg hover:bg-warning/90 transition-colors">
        Logout
      </button>
    ),
    title: 'Conferma Logout',
    size: 'sm',
    DynamicComponent: () => <ConfirmationContent type="logout" />,
  },
  parameters: {
    docs: {
      description: {
        story: 'Modal di conferma per il logout dall\'applicazione',
      },
    },
  },
};

// Settings Modal
export const SettingsModal: Story = {
  args: {
    trigger: (
      <button className="px-4 py-2 bg-base-200 text-base-content border border-base-300 rounded-lg hover:bg-base-300 transition-colors">
        ⚙️ Impostazioni
      </button>
    ),
    title: 'Impostazioni',
    description: 'Gestisci le tue preferenze account',
    size: 'lg',
    DynamicComponent: SettingsContent,
  },
  parameters: {
    docs: {
      description: {
        story: 'Modal complesso per impostazioni con toggle switches e sezioni multiple',
      },
    },
  },
};

// Different Trigger Types
export const DifferentTriggers:  Omit<Story, 'args'> = {
  render: () => (
    <div className="flex gap-4 flex-wrap items-center">
      {/* Button trigger */}
      <Modal
        trigger={
          <button className="px-4 py-2 bg-primary text-primary-content rounded-lg hover:bg-primary/90 transition-colors">
            Button Trigger
          </button>
        }
        title="Triggered da Button"
        description="Modal aperto tramite un button"
        DynamicComponent={SimpleContent}
      />

      {/* Card trigger */}
      <Modal
        trigger={
          <div className="p-4 border border-base-300 rounded-lg cursor-pointer hover:bg-base-100 hover:shadow-md transition-all">
            <h4 className="font-semibold text-base-content">Card Cliccabile</h4>
            <p className="text-sm text-base-content/60">Clicca per aprire</p>
          </div>
        }
        title="Triggered da Card"
        description="Modal aperto cliccando su una card"
        DynamicComponent={FormContent}
      />

      {/* Icon trigger */}
      <Modal
        trigger={
          <button className="w-10 h-10 rounded-full bg-base-200 hover:bg-base-300 flex items-center justify-center transition-colors">
            ℹ️
          </button>
        }
        title="Triggered da Icon"
        description="Modal aperto da un'icona"
        size="sm"
        DynamicComponent={SimpleContent}
      />

      {/* Text link trigger */}
      <Modal
        trigger={
          <span className="text-primary hover:underline cursor-pointer font-medium">
            Clicca qui per maggiori info
          </span>
        }
        title="Triggered da Link"
        description="Modal aperto da un link testuale"
        DynamicComponent={SimpleContent}
      />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Diversi tipi di trigger per aprire il modal: button, card, icone, link testuali',
      },
    },
  },
};

// Controlled Modal
export const ControlledModal:  Omit<Story, 'args'> = {
  render: () => <ControlledModalExample />,
  parameters: {
    docs: {
      description: {
        story: 'Modal controllato esternamente tramite state, utile per apertura programmatica',
      },
    },
  },
};

// Loading State
export const WithLoadingState: Story = {
  args: {
    trigger: (
      <button className="px-4 py-2 bg-primary text-primary-content rounded-lg hover:bg-primary/90 transition-colors">
        Modal con Loading
      </button>
    ),
    title: 'Caricamento Dati',
    description: 'Modal che mostra uno stato di loading',
    DynamicComponent: () => null, // Simula il caricamento
    loading: (
      <div className="flex flex-col items-center py-8 space-y-4">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
        <p className="text-base-content/60">Caricamento in corso...</p>
      </div>
    ),
  },
  parameters: {
    docs: {
      description: {
        story: 'Modal con stato di loading personalizzato durante il caricamento del contenuto',
      },
    },
  },
};

// Responsive Showcase
export const ResponsiveShowcase:  Omit<Story, 'args'> = {
  render: () => (
    <div className="space-y-4">
      <p className="text-base-content/80 text-center">
        Tutti i modal sono completamente responsive e si adattano alle diverse dimensioni dello schermo
      </p>
      <div className="flex gap-4 justify-center flex-wrap">
        <Modal
          trigger={
            <button className="px-4 py-2 bg-primary text-primary-content rounded-lg hover:bg-primary/90 transition-colors">
              Test Mobile
            </button>
          }
          title="Responsive Design"
          description="Questo modal si adatta perfettamente a mobile, tablet e desktop"
          size="lg"
          DynamicComponent={SettingsContent}
        />
      </div>
      <div className="text-sm text-base-content/60 space-y-1 text-center">
        <p>📱 Su mobile: occupa 90% della larghezza schermo</p>
        <p>📊 Su tablet/desktop: rispetta le dimensioni impostate</p>
        <p>⚡ Animazioni ottimizzate per tutti i device</p>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Tutti i modal sono completamente responsive con animazioni ottimizzate per ogni dispositivo',
      },
    },
  },
};
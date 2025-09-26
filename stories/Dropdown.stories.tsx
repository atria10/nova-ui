// components/dropdown/Dropdown.stories.tsx
import { Dropdown, DropdownLabel, DropdownCheckboxItem, DropdownRadioGroup, DropdownRadioItem, DropdownItem, DropdownSeparator, DropdownSub, DropdownSubTrigger, DropdownSubContent } from '@/components';
import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';


// Icone di esempio (usando caratteri Unicode per semplicità)
const UserIcon = () => <span>👤</span>;
const SettingsIcon = () => <span>⚙️</span>;
const LogoutIcon = () => <span>🚪</span>;
const EditIcon = () => <span>✏️</span>;
const ShareIcon = () => <span>📤</span>;
const DeleteIcon = () => <span>🗑️</span>;
const CopyIcon = () => <span>📋</span>;
const DownloadIcon = () => <span>⬇️</span>;
const EmailIcon = () => <span>📧</span>;
const TwitterIcon = () => <span>🐦</span>;
const FacebookIcon = () => <span>📘</span>;
const LinkedInIcon = () => <span>💼</span>;
const BookmarkIcon = () => <span>🔖</span>;
const HistoryIcon = () => <span>📜</span>;
const HelpIcon = () => <span>❓</span>;
const BellIcon = () => <span>🔔</span>;
const ThemeIcon = () => <span>🎨</span>;
const LanguageIcon = () => <span>🌐</span>;

// Componenti di contenuto dinamico
const UserProfileContent = () => (
  <div className="p-4 space-y-4">
    <div className="flex items-center space-x-3">
      <div className="w-10 h-10 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-full flex items-center justify-center">
        👤
      </div>
      <div>
        <p className="font-semibold text-base-content">Mario Rossi</p>
        <p className="text-sm text-base-content/60">mario.rossi@email.com</p>
      </div>
    </div>
    <button className="w-full py-2 bg-primary text-primary-content rounded-lg hover:bg-primary/90 transition-colors">
      Visualizza Profilo
    </button>
  </div>
);

const NotificationsContent = () => (
  <div className="p-4 space-y-3 max-w-80">
    <div className="flex justify-between items-center">
      <h3 className="font-semibold text-base-content">Notifiche</h3>
      <span className="text-xs bg-primary text-primary-content px-2 py-1 rounded-full">3</span>
    </div>
    
    {[
      { title: 'Nuovo messaggio', time: '2 min fa', type: 'message' },
      { title: 'Aggiornamento sistema', time: '1 ora fa', type: 'system' },
      { title: 'Promemoria riunione', time: '2 ore fa', type: 'reminder' }
    ].map((notification, i) => (
      <div key={i} className="p-3 bg-base-200/50 rounded-lg">
        <p className="text-sm font-medium text-base-content">{notification.title}</p>
        <p className="text-xs text-base-content/60">{notification.time}</p>
      </div>
    ))}
    
    <button className="w-full text-center text-sm text-primary hover:underline">
      Vedi tutte le notifiche
    </button>
  </div>
);

// State per gli esempi interattivi
const CheckboxExample = () => {
  const [showBookmarks, setShowBookmarks] = useState(true);
  const [showHistory, setShowHistory] = useState(false);
  const [showDownloads, setShowDownloads] = useState(true);

  return (
    <Dropdown
      trigger={
        <button className="px-4 py-2 bg-base-200 border border-base-300 rounded-lg hover:bg-base-300 transition-colors">
          Opzioni Visualizzazione
        </button>
      }
    >
      <DropdownLabel>Mostra Elementi</DropdownLabel>
      <DropdownCheckboxItem
        checked={showBookmarks}
        onCheckedChange={setShowBookmarks}
        icon={<BookmarkIcon />}
      >
        Segnalibri
      </DropdownCheckboxItem>
      <DropdownCheckboxItem
        checked={showHistory}
        onCheckedChange={setShowHistory}
        icon={<HistoryIcon />}
      >
        Cronologia
      </DropdownCheckboxItem>
      <DropdownCheckboxItem
        checked={showDownloads}
        onCheckedChange={setShowDownloads}
        icon={<DownloadIcon />}
      >
        Download
      </DropdownCheckboxItem>
    </Dropdown>
  );
};

const RadioExample = () => {
  const [theme, setTheme] = useState('system');

  return (
    <Dropdown
      trigger={
        <button className="px-4 py-2 bg-base-200 border border-base-300 rounded-lg hover:bg-base-300 transition-colors">
          Tema: {theme === 'light' ? 'Chiaro' : theme === 'dark' ? 'Scuro' : 'Sistema'}
        </button>
      }
    >
      <DropdownLabel>Scegli Tema</DropdownLabel>
      <DropdownRadioGroup value={theme} onValueChange={setTheme}>
        <DropdownRadioItem value="light" icon={<span>☀️</span>}>
          Tema Chiaro
        </DropdownRadioItem>
        <DropdownRadioItem value="dark" icon={<span>🌙</span>}>
          Tema Scuro
        </DropdownRadioItem>
        <DropdownRadioItem value="system" icon={<span>💻</span>}>
          Segui Sistema
        </DropdownRadioItem>
      </DropdownRadioGroup>
    </Dropdown>
  );
};

const meta = {
  title: 'Components/Dropdown',
  component: Dropdown,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Componente Dropdown moderno basato su Radix UI con effetti glass morphism, animazioni fluide e supporto per submenu, checkbox, radio items e componenti dinamici.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    align: {
      control: 'select',
      options: ['start', 'center', 'end'],
      description: 'Allineamento del dropdown rispetto al trigger',
    },
    side: {
      control: 'select',
      options: ['top', 'right', 'bottom', 'left'],
      description: 'Posizione del dropdown rispetto al trigger',
    },
    sideOffset: {
      control: { type: 'number', min: 0, max: 50 },
      description: 'Distanza dal trigger',
    },
    alignOffset: {
      control: { type: 'number', min: -50, max: 50 },
      description: 'Offset di allineamento',
    },
  },
} satisfies Meta<typeof Dropdown>;

export default meta;
type Story = StoryObj<typeof meta>;

// Storia base
export const Default: Story = {
  args: {
    trigger: (
      <button className="px-4 py-2 bg-primary text-primary-content rounded-lg hover:bg-primary/90 transition-colors">
        Menu Base
      </button>
    ),
    children: (
      <>
        <DropdownItem icon={<UserIcon />}>Profilo</DropdownItem>
        <DropdownItem icon={<SettingsIcon />}>Impostazioni</DropdownItem>
        <DropdownSeparator />
        <DropdownItem icon={<LogoutIcon />} destructive>
          Logout
        </DropdownItem>
      </>
    ),
  },
};

// Dropdown con icone e shortcuts
export const WithIconsAndShortcuts: Story = {
  args: {
    trigger: (
      <button className="px-4 py-2 bg-secondary text-secondary-content rounded-lg hover:bg-secondary/90 transition-colors">
        Menu Avanzato
      </button>
    ),
    children: (
      <>
        <DropdownLabel>Account</DropdownLabel>
        <DropdownItem icon={<UserIcon />} shortcut="⌘K">
          Profilo Utente
        </DropdownItem>
        <DropdownItem icon={<SettingsIcon />} shortcut="⌘,">
          Impostazioni
        </DropdownItem>
        <DropdownItem icon={<BellIcon />} shortcut="⌘N">
          Notifiche
        </DropdownItem>
        
        <DropdownSeparator />
        
        <DropdownLabel>Azioni</DropdownLabel>
        <DropdownItem icon={<EditIcon />} shortcut="⌘E">
          Modifica
        </DropdownItem>
        <DropdownItem icon={<CopyIcon />} shortcut="⌘C">
          Copia
        </DropdownItem>
        <DropdownItem icon={<ShareIcon />} shortcut="⌘S">
          Condividi
        </DropdownItem>
        
        <DropdownSeparator />
        
        <DropdownItem icon={<DeleteIcon />} shortcut="⌦" destructive>
          Elimina
        </DropdownItem>
        <DropdownItem icon={<LogoutIcon />} destructive>
          Logout
        </DropdownItem>
      </>
    ),
  },
  parameters: {
    docs: {
      description: {
        story: 'Dropdown completo con icone, shortcuts da tastiera e sezioni organizzate',
      },
    },
  },
};

// Submenu
export const WithSubmenu: Story = {
  args: {
    trigger: (
      <button className="px-4 py-2 bg-accent text-accent-content rounded-lg hover:bg-accent/90 transition-colors">
        Menu con Submenu
      </button>
    ),
    children: (
      <>
        <DropdownItem icon={<EditIcon />}>Modifica</DropdownItem>
        <DropdownItem icon={<CopyIcon />}>Copia</DropdownItem>
        
        <DropdownSub>
          <DropdownSubTrigger icon={<ShareIcon />}>
            Condividi
          </DropdownSubTrigger>
          <DropdownSubContent>
            <DropdownItem icon={<EmailIcon />}>Email</DropdownItem>
            <DropdownItem icon={<TwitterIcon />}>Twitter</DropdownItem>
            <DropdownItem icon={<FacebookIcon />}>Facebook</DropdownItem>
            <DropdownItem icon={<LinkedInIcon />}>LinkedIn</DropdownItem>
            <DropdownSeparator />
            <DropdownItem icon={<CopyIcon />}>Copia Link</DropdownItem>
          </DropdownSubContent>
        </DropdownSub>
        
        <DropdownSub>
          <DropdownSubTrigger icon={<ThemeIcon />}>
            Aspetto
          </DropdownSubTrigger>
          <DropdownSubContent>
            <DropdownItem icon={<span>☀️</span>}>Tema Chiaro</DropdownItem>
            <DropdownItem icon={<span>🌙</span>}>Tema Scuro</DropdownItem>
            <DropdownItem icon={<span>💻</span>}>Automatico</DropdownItem>
          </DropdownSubContent>
        </DropdownSub>
        
        <DropdownSeparator />
        <DropdownItem icon={<DeleteIcon />} destructive>
          Elimina
        </DropdownItem>
      </>
    ),
  },
  parameters: {
    docs: {
      description: {
        story: 'Dropdown con submenu per organizzare azioni correlate',
      },
    },
  },
};

// Checkbox Items
export const CheckboxItems: Omit<Story,'args'> = {
  render: () => <CheckboxExample />,
  parameters: {
    docs: {
      description: {
        story: 'Dropdown con checkbox items per opzioni multiple selezionabili',
      },
    },
  },
};

// Radio Items
export const RadioItems: Omit<Story,'args'> = {
  render: () => <RadioExample />,
  parameters: {
    docs: {
      description: {
        story: 'Dropdown con radio items per selezione esclusiva',
      },
    },
  },
};

// Posizionamento
export const Positioning: Omit<Story,'args'> = {
  render: () => (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-8 p-8">
      {/* Top */}
      <Dropdown
        trigger={
          <button className="px-4 py-2 bg-primary text-primary-content rounded-lg hover:bg-primary/90 transition-colors">
            Sopra
          </button>
        }
        side="top"
      >
        <DropdownItem>Posizionato sopra</DropdownItem>
        <DropdownItem>Menu in alto</DropdownItem>
      </Dropdown>

      {/* Right */}
      <Dropdown
        trigger={
          <button className="px-4 py-2 bg-secondary text-secondary-content rounded-lg hover:bg-secondary/90 transition-colors">
            Destra
          </button>
        }
        side="right"
      >
        <DropdownItem>Posizionato a destra</DropdownItem>
        <DropdownItem>Menu laterale</DropdownItem>
      </Dropdown>

      {/* Bottom (default) */}
      <Dropdown
        trigger={
          <button className="px-4 py-2 bg-accent text-accent-content rounded-lg hover:bg-accent/90 transition-colors">
            Sotto
          </button>
        }
        side="bottom"
      >
        <DropdownItem>Posizionato sotto</DropdownItem>
        <DropdownItem>Menu in basso</DropdownItem>
      </Dropdown>

      {/* Left */}
      <Dropdown
        trigger={
          <button className="px-4 py-2 bg-warning text-warning-content rounded-lg hover:bg-warning/90 transition-colors">
            Sinistra
          </button>
        }
        side="left"
      >
        <DropdownItem>Posizionato a sinistra</DropdownItem>
        <DropdownItem>Menu laterale</DropdownItem>
      </Dropdown>

      {/* Allineamento al centro */}
      <Dropdown
        trigger={
          <button className="px-4 py-2 bg-info text-info-content rounded-lg hover:bg-info/90 transition-colors">
            Centro
          </button>
        }
        align="center"
      >
        <DropdownItem>Allineato al centro</DropdownItem>
        <DropdownItem>Menu centrato</DropdownItem>
      </Dropdown>

      {/* Allineamento alla fine */}
      <Dropdown
        trigger={
          <button className="px-4 py-2 bg-success text-success-content rounded-lg hover:bg-success/90 transition-colors">
            Fine
          </button>
        }
        align="end"
      >
        <DropdownItem>Allineato alla fine</DropdownItem>
        <DropdownItem>Menu alla fine</DropdownItem>
      </Dropdown>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Diverse opzioni di posizionamento e allineamento del dropdown',
      },
    },
  },
};

// Trigger diversi
export const DifferentTriggers: Omit<Story,'args'> = {
  render: () => (
    <div className="flex gap-6 flex-wrap items-center">
      {/* Button trigger */}
      <Dropdown
        trigger={
          <button className="px-4 py-2 bg-primary text-primary-content rounded-lg hover:bg-primary/90 transition-colors">
            Button
          </button>
        }
      >
        <DropdownItem>Opzione 1</DropdownItem>
        <DropdownItem>Opzione 2</DropdownItem>
      </Dropdown>

      {/* Icon trigger */}
      <Dropdown
        trigger={
          <button className="w-10 h-10 rounded-full bg-base-200 hover:bg-base-300 flex items-center justify-center transition-colors">
            ⚙️
          </button>
        }
      >
        <DropdownItem icon={<UserIcon />}>Profilo</DropdownItem>
        <DropdownItem icon={<SettingsIcon />}>Impostazioni</DropdownItem>
      </Dropdown>

      {/* Card trigger */}
      <Dropdown
        trigger={
          <div className="p-4 border border-base-300 rounded-lg cursor-pointer hover:bg-base-100 hover:shadow-md transition-all">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-full flex items-center justify-center">
                👤
              </div>
              <div>
                <p className="font-semibold text-sm">Mario Rossi</p>
                <p className="text-xs text-base-content/60">Clicca per menu</p>
              </div>
            </div>
          </div>
        }
      >
        <DropdownItem icon={<UserIcon />}>Visualizza Profilo</DropdownItem>
        <DropdownItem icon={<EditIcon />}>Modifica Profilo</DropdownItem>
        <DropdownSeparator />
        <DropdownItem icon={<LogoutIcon />} destructive>Logout</DropdownItem>
      </Dropdown>

      {/* Text trigger */}
      <Dropdown
        trigger={
          <span className="text-primary hover:underline cursor-pointer font-medium">
            Menu Testuale
          </span>
        }
      >
        <DropdownItem>Azione 1</DropdownItem>
        <DropdownItem>Azione 2</DropdownItem>
      </Dropdown>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Diversi tipi di trigger: button, icona, card, testo',
      },
    },
  },
};

// Componenti dinamici
export const DynamicComponents: Omit<Story,'args'> = {
  render: () => (
    <div className="flex gap-4">
      <Dropdown
        trigger={
          <button className="px-4 py-2 bg-primary text-primary-content rounded-lg hover:bg-primary/90 transition-colors flex items-center gap-2">
            👤 Profilo
          </button>
        }
        DynamicComponent={UserProfileContent}
      />

      <Dropdown
        trigger={
          <button className="px-4 py-2 bg-warning text-warning-content rounded-lg hover:bg-warning/90 transition-colors flex items-center gap-2">
            🔔 Notifiche
          </button>
        }
        DynamicComponent={NotificationsContent}
      />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Dropdown con componenti dinamici per contenuti complessi come profili utente o notifiche',
      },
    },
  },
};

// Menu di contesto
export const ContextMenu: Story = {
  args: {
    trigger: (
      <div className="p-6 border-2 border-dashed border-base-300 rounded-lg text-center cursor-pointer hover:bg-base-100 transition-colors">
        <p className="text-base-content/60">Clicca per menu di contesto</p>
        <p className="text-sm text-base-content/40">Simula il click destro</p>
      </div>
    ),
    children: (
      <>
        <DropdownLabel>Azioni File</DropdownLabel>
        <DropdownItem icon={<EditIcon />} shortcut="F2">
          Rinomina
        </DropdownItem>
        <DropdownItem icon={<CopyIcon />} shortcut="⌘C">
          Copia
        </DropdownItem>
        <DropdownItem icon={<DownloadIcon />} shortcut="⌘D">
          Scarica
        </DropdownItem>
        
        <DropdownSeparator />
        
        <DropdownSub>
          <DropdownSubTrigger icon={<ShareIcon />}>
            Condividi con
          </DropdownSubTrigger>
          <DropdownSubContent>
            <DropdownItem icon={<EmailIcon />}>Email</DropdownItem>
            <DropdownItem icon={<span>👥</span>}>Team</DropdownItem>
            <DropdownItem icon={<span>🔗</span>}>Link pubblico</DropdownItem>
          </DropdownSubContent>
        </DropdownSub>
        
        <DropdownItem icon={<span>📋</span>}>Proprietà</DropdownItem>
        
        <DropdownSeparator />
        
        <DropdownItem icon={<DeleteIcon />} destructive>
          Elimina
        </DropdownItem>
      </>
    ),
  },
  parameters: {
    docs: {
      description: {
        story: 'Menu di contesto completo con azioni tipiche per gestione file',
      },
    },
  },
};

// Navigation menu
export const NavigationMenu: Story = {
  args: {
    trigger: (
      <button className="px-4 py-2 bg-base-200 border border-base-300 rounded-lg hover:bg-base-300 transition-colors flex items-center gap-2">
        📁 Progetti
      </button>
    ),
    children: (
      <>
        <DropdownLabel>Progetti Recenti</DropdownLabel>
        <DropdownItem icon={<span>🚀</span>}>Website Redesign</DropdownItem>
        <DropdownItem icon={<span>📱</span>}>Mobile App</DropdownItem>
        <DropdownItem icon={<span>🛍️</span>}>E-commerce Platform</DropdownItem>
        
        <DropdownSeparator />
        
        <DropdownLabel>Azioni</DropdownLabel>
        <DropdownItem icon={<span>➕</span>} shortcut="⌘N">
          Nuovo Progetto
        </DropdownItem>
        <DropdownItem icon={<span>📂</span>} shortcut="⌘O">
          Apri Progetto
        </DropdownItem>
        <DropdownItem icon={<span>💾</span>} shortcut="⌘S">
          Salva Tutto
        </DropdownItem>
        
        <DropdownSeparator />
        
        <DropdownItem icon={<span>📊</span>}>Statistiche</DropdownItem>
        <DropdownItem icon={<HelpIcon />}>Guida</DropdownItem>
      </>
    ),
  },
  parameters: {
    docs: {
      description: {
        story: 'Menu di navigazione per applicazioni con progetti e azioni rapide',
      },
    },
  },
};

// Large content
export const LargeContent: Story = {
  args: {
    trigger: (
      <button className="px-4 py-2 bg-info text-info-content rounded-lg hover:bg-info/90 transition-colors">
        Menu Esteso
      </button>
    ),
    children: (
      <>
        <DropdownLabel>Sezione 1</DropdownLabel>
        <DropdownItem icon={<span>1️⃣</span>}>Primo elemento</DropdownItem>
        <DropdownItem icon={<span>2️⃣</span>}>Secondo elemento</DropdownItem>
        <DropdownItem icon={<span>3️⃣</span>}>Terzo elemento</DropdownItem>
        
        <DropdownSeparator />
        
        <DropdownLabel>Sezione 2</DropdownLabel>
        <DropdownItem icon={<span>🔧</span>}>Strumento A</DropdownItem>
        <DropdownItem icon={<span>🔨</span>}>Strumento B</DropdownItem>
        <DropdownItem icon={<span>⚡</span>}>Strumento C</DropdownItem>
        <DropdownItem icon={<span>🎯</span>}>Strumento D</DropdownItem>
        
        <DropdownSeparator />
        
        <DropdownLabel>Sezione 3</DropdownLabel>
        <DropdownItem icon={<span>📈</span>}>Analytics</DropdownItem>
        <DropdownItem icon={<span>📊</span>}>Reportistica</DropdownItem>
        <DropdownItem icon={<span>📋</span>}>Dashboard</DropdownItem>
        <DropdownItem icon={<span>📑</span>}>Esportazione</DropdownItem>
        <DropdownItem icon={<span>🔍</span>}>Ricerca Avanzata</DropdownItem>
        
        <DropdownSeparator />
        
        <DropdownLabel>Amministrazione</DropdownLabel>
        <DropdownItem icon={<UserIcon />}>Gestione Utenti</DropdownItem>
        <DropdownItem icon={<SettingsIcon />}>Configurazione</DropdownItem>
        <DropdownItem icon={<span>🔐</span>}>Sicurezza</DropdownItem>
        <DropdownItem icon={<span>💾</span>}>Backup</DropdownItem>
        
        <DropdownSeparator />
        
        <DropdownItem icon={<HelpIcon />}>Supporto</DropdownItem>
        <DropdownItem icon={<LogoutIcon />} destructive>
          Logout
        </DropdownItem>
      </>
    ),
  },
  parameters: {
    docs: {
      description: {
        story: 'Dropdown con contenuto esteso che dimostra lo scrolling automatico',
      },
    },
  },
};
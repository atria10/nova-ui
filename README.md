
# Nova UI

<div align="center">
  <h3>🚀 Design System moderno per React + Next.js</h3>
  <p>Una collezione di componenti UI ottimizzati, performanti e user-friendly basati su <strong>TailwindCSS</strong> e <strong>DaisyUI</strong></p>
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0+-blue?style=flat-square&logo=typescript)](https://www.typescriptlang.org/)
[![Next.js](https://img.shields.io/badge/Next.js-15.5+-black?style=flat-square&logo=next.js)](https://nextjs.org/)
[![TailwindCSS](https://img.shields.io/badge/TailwindCSS-4.0+-06B6D4?style=flat-square&logo=tailwindcss)](https://tailwindcss.com/)
[![DaisyUI](https://img.shields.io/badge/DaisyUI-5.1+-00D7FF?style=flat-square&logo=daisyui)](https://daisyui.com/)
[![Storybook](https://img.shields.io/badge/Storybook-Docs-FF4785?style=flat-square&logo=storybook)](https://storybook.js.org/)

</div>
---


---

## ✨ Caratteristiche

* **🎨 Design System Completo** - Componenti consistenti e riutilizzabili
* **⚡ Performance Ottimizzate** - Bundle ottimizzato e caricamento lazy
* **🌙 Dark Mode Nativo** - Supporto completo per temi chiari e scuri
* **📱 Responsive Design** - Mobile-first e completamente responsivo
* **♿ Accessibilità** - Conforme alle linee guida WCAG 2.1
* **🔧 TypeScript** - Type safety completa e ottimo DX
* **📚 Documentazione** - Storybook integrato con esempi interattivi
* **🎭 Radix UI** - Componenti headless per massima flessibilità

## 🏗️ Stack Tecnologico

| Tecnologia            | Versione | Scopo                   |
| --------------------- | -------- | ----------------------- |
| **Next.js**     | 15.5+    | Framework React         |
| **TypeScript**  | 5.0+     | Type Safety             |
| **TailwindCSS** | 4.0+     | Styling System          |
| **DaisyUI**     | 5.1+     | Design Tokens           |
| **Radix UI**    | 1.4+     | Headless Components     |
| **Storybook**   | 9.1+     | Component Documentation |

## 📦 Installazione

```bash
# Clone del repository
git clone https://github.com/tuousername/nova-ui.git
cd nova-ui

# Installazione dipendenze
npm install
# oppure
yarn install
# oppure
pnpm install
```

## 🚀 Quick Start

### 1. Avvia il server di sviluppo

```bash
npm run dev
```

Il progetto sarà disponibile su [http://localhost:3000](http://localhost:3000/)

### 2. Esplora i componenti con Storybook

```bash
npm run storybook
```

Storybook sarà disponibile su [http://localhost:6006](http://localhost:6006/)

### 3. Importa e usa i componenti

```tsx
import { Button, Dropdown, TextInput } from '@/components';

export default function MyPage() {
  return (
    <div className="space-y-4">
      <Button color="primary" size="lg">
        Click me!
      </Button>
    
      <Dropdown
        trigger={<Button color="secondary">Menu</Button>}
      >
        <DropdownItem>Azione 1</DropdownItem>
        <DropdownItem>Azione 2</DropdownItem>
      </Dropdown>
    
      <TextInput
        label="Nome"
        placeholder="Inserisci il tuo nome"
        required
      />
    </div>
  );
}
```

## 🧩 Componenti Disponibili

### Componenti Base

* **Button** - Button versatile con varianti, icone e stati di loading
* **TextInput** - Input di testo con validazione e formattazione
* **SelectInput** - Select avanzato con ricerca e selezione multipla
* **EmailInput** - Input email con validazione integrata
* **PhoneInput** - Input telefono con formattazione automatica
* **DateInput** - Date picker con validazione range

### Componenti Interattivi

* **Dropdown** - Menu dropdown con submenu, checkbox e radio
* **Modal** - Modali responsive con animazioni fluide
* **Toast** - Notifiche toast non intrusive
* **Tooltip** - Tooltip informativi e accessibili

### Layout e Navigazione

* **Navigation** - Barra di navigazione responsive
* **Sidebar** - Sidebar collassabile
* **Card** - Card modulari per contenuti
* **Grid** - Sistema di griglia flessibile

## 🎨 Sistema di Design

### Palette Colori (DaisyUI)

```css
/* Colori principali */
primary: #570df8     /* Blu violetto */
secondary: #f000b8   /* Magenta */
accent: #37cdbe      /* Teal */
neutral: #3d4451     /* Grigio scuro */

/* Colori semantici */
info: #3abff8        /* Blu info */
success: #36d399     /* Verde successo */
warning: #fbbd23     /* Giallo warning */
error: #f87272       /* Rosso errore */

/* Colori base */
base-100: #ffffff    /* Sfondo principale */
base-200: #f2f2f2    /* Sfondo secondario */
base-300: #e5e6e6    /* Bordi e separatori */
base-content: #1f2937 /* Testo principale */
```

### Tipografia

```css
/* Font stack ottimizzato */
font-family: 'Geist', system-ui, -apple-system, sans-serif;

/* Scale tipografica */
text-xs: 0.75rem     /* 12px */
text-sm: 0.875rem    /* 14px */
text-base: 1rem      /* 16px */
text-lg: 1.125rem    /* 18px */
text-xl: 1.25rem     /* 20px */
text-2xl: 1.5rem     /* 24px */
```

### Spaziatura

```css
/* Sistema di spaziatura 4px-based */
space-1: 0.25rem     /* 4px */
space-2: 0.5rem      /* 8px */
space-3: 0.75rem     /* 12px */
space-4: 1rem        /* 16px */
space-6: 1.5rem      /* 24px */
space-8: 2rem        /* 32px */
```

## 🌙 Gestione Temi

Nova UI include un sistema di temi avanzato:

```tsx
# 📦 Nova UI - Guida Completa alla Libreria NPM

## 🚀 Creazione e Pubblicazione

### 1. Setup Iniziale

```bash
# Aggiorna il package.json con i nuovi script
npm install --save-dev rimraf

# Crea i file di configurazione TypeScript
# Usa i file tsconfig.*.json forniti

# Crea la directory scripts e aggiungi i file di build
mkdir scripts
# Aggiungi fix-cjs-extensions.js, build-styles.js, pre-build.js
```

### 2. Build della Libreria

```bash
# Build completo per produzione
npm run build

# O step by step:
npm run clean                 # Pulisce dist/
npm run build:types          # Genera i file .d.ts
npm run build:esm            # Build ESM (import/export)
npm run build:cjs            # Build CommonJS (require)
npm run build:styles         # Compila CSS
```

### 3. Pubblicazione su NPM

```bash
# Primo setup NPM (solo la prima volta)
npm login

# Cambia il nome del package in package.json
# da "nova-ui" a "@tuousername/nova-ui"

# Pubblica
npm publish --access public

# Per aggiornamenti
npm version patch  # o minor/major
npm run build
npm publish
```

---

## 📋 Per gli Utilizzatori della Libreria

### 1. Installazione

```bash
# Con npm
npm install @tuousername/nova-ui

# Con yarn
yarn add @tuousername/nova-ui

# Con pnpm
pnpm add @tuousername/nova-ui
```

### 2. Peer Dependencies

La libreria richiede queste dipendenze nel tuo progetto:

```bash
npm install react react-dom tailwindcss
```

### 3. Setup TailwindCSS

Aggiungi al tuo `tailwind.config.js`:

```javascript
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/@tuousername/nova-ui/dist/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {},
  },
  plugins: [require("daisyui")],
}
```

### 4. Import degli Stili

Nel tuo file CSS principale (es. `globals.css`):

```css
@import '@tuousername/nova-ui/styles.css';
@tailwind base;
@tailwind components;
@tailwind utilities;
```

### 5. Utilizzo Base

```tsx
// Import singoli (tree-shaking friendly)
import { Button, TextInput, Dropdown } from '@tuousername/nova-ui';

// Oppure import specifici
import Button from '@tuousername/nova-ui/components/button/Button';
import { ThemeProvider } from '@tuousername/nova-ui/contexts';

function App() {
  return (
    <ThemeProvider>
      <div className="p-4">
        <Button color="primary" size="lg">
          Hello Nova UI!
        </Button>
      
        <TextInput
          label="Nome"
          placeholder="Inserisci il tuo nome"
          required
        />
      
        <Dropdown
          trigger={<Button color="secondary">Menu</Button>}
        >
          <DropdownItem>Opzione 1</DropdownItem>
          <DropdownItem>Opzione 2</DropdownItem>
        </Dropdown>
      </div>
    </ThemeProvider>
  );
}
```

### 6. Utilizzo Avanzato con Tree-shaking

```tsx
// ✅ Ottimale - Import diretti per bundle più piccoli
import Button from '@tuousername/nova-ui/components/button/Button';
import TextInput from '@tuousername/nova-ui/components/inputs/TextInput';
import { cn } from '@tuousername/nova-ui/utils';

// ✅ Ottimale - Import per categoria
import { ThemeProvider, useTheme } from '@tuousername/nova-ui/contexts';
import { 
  Dropdown, 
  DropdownItem, 
  DropdownLabel 
} from '@tuousername/nova-ui/components';

// ⚠️ Meno ottimale - Import tutto dal root
import { Button, TextInput, ThemeProvider } from '@tuousername/nova-ui';
```

### 7. Configurazione Next.js

Se usi Next.js, aggiungi al `next.config.js`:

```javascript
/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ['@tuousername/nova-ui'],
}

module.exports = nextConfig
```

---

## 🎯 Tree-shaking e Ottimizzazioni

### Come Funziona il Tree-shaking

La libreria è ottimizzata per il tree-shaking attraverso:

1. **Export individuali**: Ogni componente è esportato singolarmente
2. **sideEffects: false**: Nel package.json eccetto per i CSS
3. **Build ESM**: Moduli ES6 per bundler moderni
4. **Export map**: Percorsi specifici per import granulari

### Bundle Size Analysis

```bash
# Nel tuo progetto, analizza il bundle
npm install --save-dev webpack-bundle-analyzer

# Verifica quali componenti vengono inclusi
npx webpack-bundle-analyzer .next/static/chunks/*.js
```

### Best Practices per Bundle Ottimali

```tsx
// ✅ DO - Import specifici
import Button from '@tuousername/nova-ui/components/button/Button';
import { cn } from '@tuousername/nova-ui/utils/cn';

// ❌ DON'T - Import dell'intero package
import * as NovaUI from '@tuousername/nova-ui';

// ✅ DO - Dynamic imports per componenti pesanti
const Modal = lazy(() => 
  import('@tuousername/nova-ui/components/modal/Modal')
);

// ✅ DO - Conditional imports
const AdvancedChart = process.env.NODE_ENV === 'production' 
  ? lazy(() => import('@tuousername/nova-ui/components/chart/AdvancedChart'))
  : null;
```

---

## 🔧 Esempi di Utilizzo

### Form Completo

```tsx
import React, { useState } from 'react';
import { 
  TextInput, 
  EmailInput, 
  PhoneInput, 
  SelectInput, 
  Button 
} from '@tuousername/nova-ui';

function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    country: ''
  });

  return (
    <form className="space-y-4">
      <TextInput
        label="Nome Completo"
        value={formData.name}
        onChange={(e) => setFormData(prev => ({ 
          ...prev, 
          name: e.target.value 
        }))}
        required
      />
    
      <EmailInput
        label="Email"
        value={formData.email}
        onChange={(e) => setFormData(prev => ({ 
          ...prev, 
          email: e.target.value 
        }))}
        required
      />
    
      <PhoneInput
        label="Telefono"
        country="IT"
        value={formData.phone}
        onChange={(phone) => setFormData(prev => ({ 
          ...prev, 
          phone 
        }))}
      />
    
      <SelectInput
        label="Paese"
        options={[
          { value: 'it', label: 'Italia' },
          { value: 'us', label: 'Stati Uniti' },
          { value: 'uk', label: 'Regno Unito' }
        ]}
        value={formData.country}
        onChange={(country) => setFormData(prev => ({ 
          ...prev, 
          country 
        }))}
        searchable
      />
    
      <Button 
        type="submit" 
        color="primary" 
        size="lg" 
        fullWidth
      >
        Invia Form
      </Button>
    </form>
  );
}
```

### Dashboard con Temi

```tsx
import React from 'react';
import { 
  ThemeProvider, 
  useTheme, 
  Button, 
  Card, 
  CardHeader, 
  CardContent 
} from '@tuousername/nova-ui';

function ThemeToggle() {
  const { themeMode, toggleTheme } = useTheme();
  
  return (
    <Button
      onClick={toggleTheme}
      color="ghost"
      size="sm"
    >
      {themeMode === 'light' ? '🌙' : '☀️'}
    </Button>
  );
}

function Dashboard() {
  return (
    <ThemeProvider>
      <div className="min-h-screen bg-base-100 p-6">
        <header className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-base-content">
            Dashboard
          </h1>
          <ThemeToggle />
        </header>
      
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Card>
            <CardHeader>
              <h2 className="text-xl font-semibold">Statistiche</h2>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span>Utenti attivi</span>
                  <span className="font-bold">1,234</span>
                </div>
                <div className="flex justify-between">
                  <span>Vendite oggi</span>
                  <span className="font-bold text-success">€2,456</span>
                </div>
              </div>
            </CardContent>
          </Card>
        
          <Card>
            <CardHeader>
              <h2 className="text-xl font-semibold">Azioni Rapide</h2>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button color="primary" fullWidth>
                Nuovo Cliente
              </Button>
              <Button color="secondary" fullWidth>
                Genera Report
              </Button>
              <Button color="accent" fullWidth>
                Backup Dati
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </ThemeProvider>
  );
}
```

---

## 🚦 Compatibilità e Requisiti

### Versioni Supportate

| Tecnologia  | Versione Minima | Versione Consigliata |
| ----------- | --------------- | -------------------- |
| React       | 18.0.0          | 19.x.x               |
| React DOM   | 18.0.0          | 19.x.x               |
| Node.js     | 18.0.0          | 20.x.x               |
| TailwindCSS | 3.0.0           | 4.x.x                |
| TypeScript  | 5.0.0           | 5.x.x                |

### Browser Support

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

---

## 🐛 Troubleshooting

### Problemi Comuni

#### 1. Stili non applicati

```tsx
// Assicurati di importare gli stili
import '@tuousername/nova-ui/styles.css';

// E di avere DaisyUI nel tailwind.config.js
module.exports = {
  plugins: [require("daisyui")],
}
```

#### 2. TypeScript errors

```bash
# Installa i types se mancanti
npm install --save-dev @types/react @types/react-dom
```

#### 3. Build errors con Next.js

```javascript
// next.config.js
const nextConfig = {
  transpilePackages: ['@tuousername/nova-ui'],
  experimental: {
    esmExternals: true,
  },
}
```

#### 4. Bundle size troppo grande

```tsx
// Usa import specifici invece di barrel exports
// ❌ Evita questo
import { Button, Modal, Chart, Table } from '@tuousername/nova-ui';

// ✅ Preferisci questo
import Button from '@tuousername/nova-ui/components/button/Button';
import Modal from '@tuousername/nova-ui/components/modal/Modal';
```

---

## 📈 Performance Tips

### 1. Lazy Loading per Componenti Pesanti

```tsx
import { lazy, Suspense } from 'react';
import { Button } from '@tuousername/nova-ui';

const HeavyChart = lazy(() => 
  import('@tuousername/nova-ui/components/chart/Chart')
);

function Dashboard() {
  return (
    <div>
      <Button>Carica Grafico</Button>
    
      <Suspense fallback={<div>Caricamento...</div>}>
        <HeavyChart data={chartData} />
      </Suspense>
    </div>
  );
}
```

### 2. Code Splitting per Routes

```tsx
// pages/dashboard.tsx
import { Button, Card } from '@tuousername/nova-ui/components';

// pages/admin.tsx
import { Table, Modal } from '@tuousername/nova-ui/components';
```

### 3. Bundle Analysis

```bash
# Aggiungi al package.json del tuo progetto
{
  "scripts": {
    "analyze": "cross-env ANALYZE=true next build"
  }
}

# Esegui l'analisi
npm run analyze
```

---

## 🎨 Customizzazione Avanzata

### 1. Override dei Temi DaisyUI

```css
/* Nel tuo globals.css */
:root[data-theme="myCustomTheme"] {
  --primary: #your-color;
  --secondary: #your-color;
  /* Altri colori... */
}
```

### 2. Extend dei Componenti

```tsx
import Button, { ButtonProps } from '@tuousername/nova-ui/components/button/Button';
import { cn } from '@tuousername/nova-ui/utils';

interface CustomButtonProps extends ButtonProps {
  gradient?: boolean;
}

export function CustomButton({ 
  gradient = false, 
  className, 
  ...props 
}: CustomButtonProps) {
  return (
    <Button
      className={cn(
        gradient && 'bg-gradient-to-r from-purple-500 to-pink-500',
        className
      )}
      {...props}
    />
  );
}
```

### 3. Personalizzazione CSS Variables

```css
.my-custom-theme {
  --nova-border-radius: 12px;
  --nova-shadow: 0 4px 20px rgba(0,0,0,0.1);
  --nova-transition: all 0.3s ease;
}
```

---

## 📚 Esempi Completi

### E-commerce Product Card

```tsx
import React from 'react';
import { 
  Card, 
  CardHeader, 
  CardContent, 
  CardFooter,
  Button,
  ResponsiveImage 
} from '@tuousername/nova-ui';

interface ProductCardProps {
  title: string;
  price: number;
  image: string;
  onAddToCart: () => void;
}

export function ProductCard({ 
  title, 
  price, 
  image, 
  onAddToCart 
}: ProductCardProps) {
  return (
    <Card className="w-full max-w-sm">
      <CardHeader className="p-0">
        <ResponsiveImage
          src={image}
          alt={title}
          aspectRatio="4/3"
          className="w-full rounded-t-lg"
        />
      </CardHeader>
    
      <CardContent className="p-4">
        <h3 className="text-lg font-semibold mb-2">{title}</h3>
        <p className="text-2xl font-bold text-primary">
          €{price.toFixed(2)}
        </p>
      </CardContent>
    
      <CardFooter className="p-4 pt-0">
        <Button 
          color="primary" 
          size="lg" 
          fullWidth
          onClick={onAddToCart}
        >
          Aggiungi al Carrello
        </Button>
      </CardFooter>
    </Card>
  );
}
```

### Data Table con Filtri

```tsx
import React, { useState } from 'react';
import { 
  TextInput, 
  SelectInput, 
  Button,
  Card,
  CardHeader,
  CardContent 
} from '@tuousername/nova-ui';

interface User {
  id: number;
  name: string;
  email: string;
  role: string;
  status: 'active' | 'inactive';
}

export function UserTable({ users }: { users: User[] }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [roleFilter, setRoleFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState('');

  const filteredUsers = users.filter(user => {
    return (
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (roleFilter === '' || user.role === roleFilter) &&
      (statusFilter === '' || user.status === statusFilter)
    );
  });

  return (
    <Card>
      <CardHeader>
        <div className="flex flex-col md:flex-row gap-4">
          <TextInput
            placeholder="Cerca utenti..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="flex-1"
          />
        
          <SelectInput
            placeholder="Filtra per ruolo"
            options={[
              { value: '', label: 'Tutti i ruoli' },
              { value: 'admin', label: 'Admin' },
              { value: 'user', label: 'User' },
              { value: 'moderator', label: 'Moderator' }
            ]}
            value={roleFilter}
            onChange={(value) => setRoleFilter(value as string)}
          />
        
          <SelectInput
            placeholder="Filtra per stato"
            options={[
              { value: '', label: 'Tutti gli stati' },
              { value: 'active', label: 'Attivo' },
              { value: 'inactive', label: 'Inattivo' }
            ]}
            value={statusFilter}
            onChange={(value) => setStatusFilter(value as string)}
          />
        </div>
      </CardHeader>
    
      <CardContent>
        <div className="overflow-x-auto">
          <table className="table w-full">
            <thead>
              <tr>
                <th>Nome</th>
                <th>Email</th>
                <th>Ruolo</th>
                <th>Stato</th>
                <th>Azioni</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.map(user => (
                <tr key={user.id}>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>
                    <span className="badge badge-outline">
                      {user.role}
                    </span>
                  </td>
                  <td>
                    <span className={`badge ${
                      user.status === 'active' 
                        ? 'badge-success' 
                        : 'badge-error'
                    }`}>
                      {user.status}
                    </span>
                  </td>
                  <td>
                    <div className="flex gap-2">
                      <Button size="sm" color="info">
                        Modifica
                      </Button>
                      <Button size="sm" color="error">
                        Elimina
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  );
}
```

---

## 🔄 Aggiornamenti e Changelog

### Semantic Versioning

Nova UI segue il [Semantic Versioning](https://semver.org/):

- **MAJOR** (1.0.0): Breaking changes
- **MINOR** (0.1.0): Nuove features backward-compatible
- **PATCH** (0.0.1): Bug fixes

### Come Aggiornare

```bash
# Controlla versione attuale
npm list @tuousername/nova-ui

# Aggiorna alla versione più recente
npm update @tuousername/nova-ui

# Oppure installa una versione specifica
npm install @tuousername/nova-ui@^2.0.0
```

---

## 🤝 Contribuire e Supporto

### Repository GitHub

- **Issues**: [github.com/tuousername/nova-ui/issues](https://github.com/tuousername/nova-ui/issues)
- **Discussions**: [github.com/tuousername/nova-ui/discussions](https://github.com/tuousername/nova-ui/discussions)
- **Pull Requests**: [github.com/tuousername/nova-ui/pulls](https://github.com/tuousername/nova-ui/pulls)

### Storybook Live

- **Demo**: [tuousername.github.io/nova-ui](https://tuousername.github.io/nova-ui)
- **Docs**: Documentazione interattiva di tutti i componenti

---

## ⚡ Quick Reference

### Import più Comuni

```tsx
// Componenti essenziali
import { Button, TextInput, SelectInput } from '@tuousername/nova-ui';

// Layout e navigazione
import { Card, Modal, Dropdown } from '@tuousername/nova-ui';

// Context e utils
import { ThemeProvider, useTheme, cn } from '@tuousername/nova-ui';

// Import specifici (migliori per tree-shaking)
import Button from '@tuousername/nova-ui/components/button/Button';
import { cn } from '@tuousername/nova-ui/utils/cn';
```

### CSS Setup Veloce

```css
/* globals.css */
@import '@tuousername/nova-ui/styles.css';
@tailwind base;
@tailwind components;
@tailwind utilities;
```

### TailwindCSS Config Minimo

```javascript
module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/@tuousername/nova-ui/dist/**/*.{js,ts,jsx,tsx}"
  ],
  plugins: [require("daisyui")],
}
```

---

**🎉 Congratulazioni! Ora sei pronto per utilizzare Nova UI nei tuoi progetti!**

```

```

### Temi Disponibili

* **myLight** - Tema chiaro ottimizzato
* **myDark** - Tema scuro con contrasti ottimali
* **Sistema** - Segue le preferenze del sistema operativo

## 📖 Documentazione e Esempi

### Storybook

Ogni componente include:

* **Documentazione completa** con props e varianti
* **Esempi interattivi** per testare in tempo reale
* **Codice sorgente** facilmente copiabile
* **Test di accessibilità** integrati

### Esempi di Utilizzo

```tsx
// Button con icone e loading
<Button
  color="primary"
  size="lg"
  leftIcon={<PlusIcon />}
  loading={isSubmitting}
  onClick={handleSubmit}
>
  Aggiungi Elemento
</Button>

// Dropdown avanzato con checkbox
<Dropdown
  trigger={<Button variant="outline">Opzioni</Button>}
>
  <DropdownLabel>Visualizzazione</DropdownLabel>
  <DropdownCheckboxItem checked={showGrid}>
    Mostra Griglia
  </DropdownCheckboxItem>
  <DropdownCheckboxItem checked={showLabels}>
    Mostra Etichette
  </DropdownCheckboxItem>
  <DropdownSeparator />
  <DropdownItem destructive>
    Reset Impostazioni
  </DropdownItem>
</Dropdown>

// Form con validazione
<form className="space-y-4">
  <TextInput
    label="Email"
    type="email"
    required
    placeholder="mario@esempio.com"
    error={errors.email}
  />
  
  <PhoneInput
    label="Telefono"
    country="IT"
    onChange={setPhone}
  />
  
  <DateInput
    label="Data di nascita"
    maxDate={new Date()}
    onChange={setBirthDate}
  />
</form>
```

## 🧪 Testing

```bash
# Esegui i test
npm run test

# Test di accessibilità
npm run test:a11y

# Visual regression testing
npm run test:visual
```

## 🏗️ Build e Deploy

```bash
# Build di produzione
npm run build

# Build Storybook per deploy
npm run build-storybook

# Linting e controllo qualità
npm run lint
```

## 🤝 Contribuire

1. **Fork** del repository
2. Crea un **feature branch** (`git checkout -b feature/amazing-component`)
3. **Commit** delle modifiche (`git commit -m 'feat: add amazing component'`)
4. **Push** del branch (`git push origin feature/amazing-component`)
5. Apri una **Pull Request**

### Convenzioni

* **Commit** : Usa [Conventional Commits](https://conventionalcommits.org/)
* **Codice** : ESLint + Prettier configurati
* **Componenti** : Ogni componente deve avere le relative stories
* **TypeScript** : Props fully typed con JSDoc

## 📝 Roadmap

### ✅ Versione 0.1 (Attuale)

* [X] Componenti base (Button, Input, Dropdown)
* [X] Sistema di temi
* [X] Documentazione Storybook
* [X] Setup TypeScript + TailwindCSS

### 🚧 Versione 0.2 (In sviluppo)

* [ ] Componenti form avanzati (FileUpload, RichTextEditor)
* [ ] Sistema di notifiche
* [ ] Componenti di layout (Grid, Flex)
* [ ] Testing suite completa

### 🔮 Versione 0.3 (Pianificata)

* [ ] Animazioni avanzate (Framer Motion)
* [ ] Componenti data (Table, Chart)
* [ ] Plugin Figma
* [ ] Package NPM pubblicato

## 📄 Licenza

Questo progetto è rilasciato sotto licenza  **MIT** . Vedi il file [LICENSE](https://claude.ai/chat/LICENSE) per i dettagli.

---

<div align="center">
  <p>Realizzato con ❤️ per la comunità React</p>
  <p>
    <a href="#top">⬆️ Torna su</a>
  </p>
</div>

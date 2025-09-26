// components/inputs/Inputs.stories.tsx
import { SelectOption, EmailInput, PasswordInput, TextInput, PhoneInput, CalendarInput, SelectInput } from '@/components';
import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';

// Mock data per gli esempi
const countryOptions: SelectOption[] = [
  { value: 'it', label: 'Italia' },
  { value: 'us', label: 'Stati Uniti' },
  { value: 'de', label: 'Germania' },
  { value: 'fr', label: 'Francia' },
  { value: 'es', label: 'Spagna' },
  { value: 'uk', label: 'Regno Unito' },
];

const skillsOptions: SelectOption[] = [
  { value: 'react', label: 'React', group: 'Frontend' },
  { value: 'vue', label: 'Vue.js', group: 'Frontend' },
  { value: 'angular', label: 'Angular', group: 'Frontend' },
  { value: 'node', label: 'Node.js', group: 'Backend' },
  { value: 'python', label: 'Python', group: 'Backend' },
  { value: 'java', label: 'Java', group: 'Backend' },
  { value: 'docker', label: 'Docker', group: 'DevOps' },
  { value: 'kubernetes', label: 'Kubernetes', group: 'DevOps' },
  { value: 'aws', label: 'AWS', group: 'Cloud' },
  { value: 'azure', label: 'Azure', group: 'Cloud' },
];

const priorityOptions: SelectOption[] = [
  { value: 'low', label: 'Bassa' },
  { value: 'medium', label: 'Media' },
  { value: 'high', label: 'Alta' },
  { value: 'urgent', label: 'Urgente' },
];

// Componenti di esempio per demonstrare l'uso
const LoginFormExample = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setEmail(value);
    
    // Validazione email semplice
    if (value && !/\S+@\S+\.\S+/.test(value)) {
      setEmailError('Inserisci un email valida');
    } else {
      setEmailError('');
    }
  };

  return (
    <div className="space-y-4 max-w-md">
      <h3 className="text-lg font-semibold text-base-content">Login</h3>
      
      <EmailInput
        label="Email"
        value={email}
        onChange={handleEmailChange}
        error={emailError}
        placeholder="nome@esempio.com"
        required
      />
      
      <PasswordInput
        label="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        showStrength
        showRequirements
        required
      />
      
      <button className="w-full py-2 bg-primary text-primary-content rounded-lg hover:bg-primary/90 transition-colors">
        Accedi
      </button>
    </div>
  );
};

const RegistrationFormExample = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    birthDate: null as Date | null,
    country: '',
    skills: [] as (string | number)[],
  });

  const updateField = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="space-y-4 max-w-2xl">
      <h3 className="text-lg font-semibold text-base-content">Registrazione</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <TextInput
          label="Nome"
          value={formData.firstName}
          onChange={(e) => updateField('firstName', e.target.value)}
          placeholder="Mario"
          required
        />
        
        <TextInput
          label="Cognome"
          value={formData.lastName}
          onChange={(e) => updateField('lastName', e.target.value)}
          placeholder="Rossi"
          required
        />
      </div>
      
      <EmailInput
        label="Email"
        value={formData.email}
        onChange={(e) => updateField('email', e.target.value)}
        placeholder="mario.rossi@esempio.com"
        hint="Useremo questa email per contattarti"
        required
      />
      
      <PhoneInput
        label="Telefono"
        value={formData.phone}
        onChange={(value) => updateField('phone', value)}
        hint="Includi il prefisso internazionale"
      />
      
      <CalendarInput
        label="Data di nascita"
        value={formData.birthDate??undefined}
        onChange={(date) => updateField('birthDate', date)}
        maxDate={new Date()}
        hint="Devi essere maggiorenne per registrarti"
      />
      
      <SelectInput
        label="Paese"
        options={countryOptions}
        value={formData.country}
        onChange={(value) => updateField('country', value)}
        placeholder="Seleziona il tuo paese"
        required
      />
      
      <SelectInput
        label="Competenze"
        options={skillsOptions}
        value={formData.skills}
        onChange={(value) => updateField('skills', value)}
        multiple
        searchable
        placeholder="Seleziona le tue competenze"
        hint="Puoi selezionare più competenze"
      />
      
      <button className="w-full py-2 bg-primary text-primary-content rounded-lg hover:bg-primary/90 transition-colors">
        Registrati
      </button>
    </div>
  );
};

const ValidationExample = () => {
  const [values, setValues] = useState({
    required: '',
    email: '',
    phone: '',
    date: null as Date | null,
    select: '',
  });

  const [errors, setErrors] = useState({
    required: '',
    email: '',
    phone: '',
    date: '',
    select: '',
  });

  const validate = () => {
    const newErrors = {
      required: values.required ? '' : 'Questo campo è obbligatorio',
      email: values.email && !/\S+@\S+\.\S+/.test(values.email) ? 'Email non valida' : '',
      phone: values.phone && values.phone.length < 8 ? 'Numero di telefono troppo corto' : '',
      date: !values.date ? 'Seleziona una data' : '',
      select: !values.select ? 'Seleziona un\'opzione' : '',
    };
    
    setErrors(newErrors);
    return !Object.values(newErrors).some(error => error);
  };

  return (
    <div className="space-y-4 max-w-md">
      <h3 className="text-lg font-semibold text-base-content">Validazione</h3>
      
      <TextInput
        label="Campo obbligatorio"
        value={values.required}
        onChange={(e) => setValues(prev => ({ ...prev, required: e.target.value }))}
        error={errors.required}
        required
      />
      
      <EmailInput
        label="Email"
        value={values.email}
        onChange={(e) => setValues(prev => ({ ...prev, email: e.target.value }))}
        error={errors.email}
      />
      
      <PhoneInput
        label="Telefono"
        value={values.phone}
        onChange={(value) => setValues(prev => ({ ...prev, phone: value }))}
        error={errors.phone}
      />
      
      <CalendarInput
        label="Data"
        value={values.date??undefined}
        onChange={(date) => setValues(prev => ({ ...prev, date }))}
        error={errors.date}
        required
      />
      
      <SelectInput
        label="Priorità"
        options={priorityOptions}
        value={values.select}
        onChange={(value) => setValues(prev => ({ ...prev, select: value as string }))}
        error={errors.select}
        required
      />
      
      <button 
        onClick={validate}
        className="w-full py-2 bg-secondary text-secondary-content rounded-lg hover:bg-secondary/90 transition-colors"
      >
        Valida Form
      </button>
    </div>
  );
};

const meta = {
  title: 'Components/Inputs',
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Collezione completa di componenti input moderni con validazione, icone, hint e stati di errore. Include TextInput, EmailInput, PasswordInput, PhoneInput, CalendarInput e SelectInput.',
      },
    },
  },
  tags: ['autodocs'],
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

// TextInput Stories
export const TextInputBasic: Story = {
  render: () => (
    <div className="space-y-4 w-80">
      <TextInput
        label="Nome"
        placeholder="Inserisci il tuo nome"
      />
      
      <TextInput
        label="Campo obbligatorio"
        placeholder="Questo campo è richiesto"
        required
      />
      
      <TextInput
        label="Con hint"
        placeholder="Inserisci del testo"
        hint="Questo è un suggerimento utile"
      />
      
      <TextInput
        label="Con errore"
        placeholder="Campo con errore"
        error="Questo campo contiene un errore"
        defaultValue="Valore non valido"
      />
      
      <TextInput
        label="Disabilitato"
        placeholder="Campo disabilitato"
        disabled
        defaultValue="Valore fisso"
      />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'TextInput base con diversi stati: normale, obbligatorio, con hint, errore e disabilitato',
      },
    },
  },
};

// EmailInput Stories
export const EmailInputBasic: Story = {
  render: () => (
    <div className="space-y-4 w-80">
      <EmailInput
        label="Email"
        placeholder="nome@esempio.com"
      />
      
      <EmailInput
        label="Email aziendale"
        placeholder="nome@azienda.com"
        hint="Usa la tua email aziendale"
        required
      />
      
      <EmailInput
        label="Email con errore"
        defaultValue="email-non-valida"
        error="Formato email non valido"
      />
      
      <EmailInput
        label="Senza icona"
        placeholder="email@esempio.com"
        showIcon={false}
      />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'EmailInput con icona email, validazione automatica del formato e stati diversi',
      },
    },
  },
};

// PasswordInput Stories
export const PasswordInputBasic: Story = {
  render: () => (
    <div className="space-y-6 w-80">
      <PasswordInput
        label="Password semplice"
        placeholder="Inserisci password"
      />
      
      <PasswordInput
        label="Password con forza"
        placeholder="Password sicura"
        showStrength
        hint="La password deve essere sicura"
      />
      
      <PasswordInput
        label="Password con requisiti"
        placeholder="Password complessa"
        showStrength
        showRequirements
        minLength={12}
      />
      
      <PasswordInput
        label="Password senza icona"
        placeholder="Password"
        showIcon={false}
      />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'PasswordInput con indicatore di forza, requisiti visuali, toggle visibilità e validazione',
      },
    },
  },
};

// PhoneInput Stories
export const PhoneInputBasic: Story = {
  render: () => (
    <div className="space-y-4 w-80">
      <PhoneInput
        label="Telefono"
        placeholder="+39 123 456 7890"
      />
      
      <PhoneInput
        label="Telefono con validazione"
        hint="Inserisci un numero valido"
        required
      />
      
      <PhoneInput
        label="Telefono internazionale"
        countryCode="US"
        hint="Usa il formato USA"
      />
      
      <PhoneInput
        label="Con errore"
        defaultValue="123"
        error="Numero di telefono non valido"
      />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'PhoneInput con validazione automatica, formattazione e supporto prefissi internazionali',
      },
    },
  },
};

// CalendarInput Stories
export const CalendarInputBasic: Story = {
  render: () => (
    <div className="space-y-4 w-80">
      <CalendarInput
        label="Data"
        placeholder="Seleziona una data"
      />
      
      <CalendarInput
        label="Data di nascita"
        maxDate={new Date()}
        hint="Devi essere maggiorenne"
        required
      />
      
      <CalendarInput
        label="Data appuntamento"
        minDate={new Date()}
        maxDate={new Date(Date.now() + 90 * 24 * 60 * 60 * 1000)} // 90 giorni
        hint="Seleziona nei prossimi 90 giorni"
      />
      
      <CalendarInput
        label="Formato personalizzato"
        dateFormat="dd-MM-yyyy"
        placeholder="gg-mm-aaaa"
      />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'CalendarInput con picker integrato, validazione range date e formati personalizzabili',
      },
    },
  },
};

// SelectInput Stories
export const SelectInputBasic: Story = {
  render: () => (
    <div className="space-y-4 w-80">
      <SelectInput
        label="Paese"
        options={countryOptions}
        placeholder="Seleziona paese"
      />
      
      <SelectInput
        label="Selezione multipla"
        options={skillsOptions}
        multiple
        searchable
        placeholder="Seleziona competenze"
        hint="Puoi selezionare più opzioni"
      />
      
      <SelectInput
        label="Con ricerca"
        options={countryOptions}
        searchable
        placeholder="Cerca e seleziona"
      />
      
      <SelectInput
        label="Clearable"
        options={priorityOptions}
        clearable
        placeholder="Seleziona priorità"
        defaultValue="medium"
      />
      
      <SelectInput
        label="Loading state"
        options={[]}
        loading
        loadingMessage="Caricamento opzioni..."
      />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'SelectInput con ricerca, selezione multipla, gruppi, stati di loading e opzioni clearable',
      },
    },
  },
};

// Dimensioni e Layout
export const SizesAndLayout: Story = {
  render: () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold mb-4">Layout a griglia</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <TextInput
            label="Nome"
            placeholder="Mario"
          />
          <TextInput
            label="Cognome"
            placeholder="Rossi"
          />
          <EmailInput
            label="Email"
            placeholder="mario@esempio.com"
          />
        </div>
      </div>
      
      <div>
        <h3 className="text-lg font-semibold mb-4">Larghezza non piena</h3>
        <div className="flex gap-4">
          <TextInput
            label="Città"
            placeholder="Milano"
            fullWidth={false}
            className="w-40"
          />
          <SelectInput
            label="Provincia"
            options={[
              { value: 'mi', label: 'MI' },
              { value: 'rm', label: 'RM' },
              { value: 'na', label: 'NA' },
            ]}
            fullWidth={false}
            className="w-32"
          />
        </div>
      </div>
      
      <div>
        <h3 className="text-lg font-semibold mb-4">Senza icone</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <EmailInput
            label="Email"
            placeholder="nome@esempio.com"
            showIcon={false}
          />
          <PhoneInput
            label="Telefono"
            placeholder="+39 123 456 7890"
            showIcon={false}
          />
        </div>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Diverse opzioni di layout, dimensionamento e personalizzazione degli input',
      },
    },
  },
};

// Form completo di login
export const LoginForm: Story = {
  render: () => <LoginFormExample />,
  parameters: {
    docs: {
      description: {
        story: 'Esempio completo di form di login con validazione email e password strength',
      },
    },
  },
};

// Form completo di registrazione
export const RegistrationForm: Story = {
  render: () => <RegistrationFormExample />,
  parameters: {
    docs: {
      description: {
        story: 'Form di registrazione completo che dimostra tutti i tipi di input insieme',
      },
    },
  },
};

// Esempi di validazione
export const ValidationExamples: Story = {
  render: () => <ValidationExample />,
  parameters: {
    docs: {
      description: {
        story: 'Esempi di validazione in tempo reale per tutti i tipi di input',
      },
    },
  },
};

// Stati degli input
export const InputStates: Story = {
  render: () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold mb-4">Stati normali</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <TextInput
            label="Normale"
            placeholder="Input normale"
          />
          <TextInput
            label="Con valore"
            defaultValue="Testo inserito"
          />
        </div>
      </div>
      
      <div>
        <h3 className="text-lg font-semibold mb-4">Stati di focus</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <TextInput
            label="Focus"
            placeholder="Clicca per focus"
            autoFocus
          />
          <EmailInput
            label="Focus con icona"
            placeholder="email@esempio.com"
            autoFocus
          />
        </div>
      </div>
      
      <div>
        <h3 className="text-lg font-semibold mb-4">Stati di errore</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <TextInput
            label="Errore semplice"
            error="Campo obbligatorio"
            defaultValue=""
          />
          <EmailInput
            label="Email non valida"
            error="Formato email non corretto"
            defaultValue="email-sbagliata"
          />
        </div>
      </div>
      
      <div>
        <h3 className="text-lg font-semibold mb-4">Stati disabilitati</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <TextInput
            label="Disabilitato vuoto"
            placeholder="Non modificabile"
            disabled
          />
          <TextInput
            label="Disabilitato con valore"
            defaultValue="Valore fisso"
            disabled
          />
        </div>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Tutti gli stati possibili degli input: normale, focus, errore, disabilitato',
      },
    },
  },
};

// Accessibilità
export const AccessibilityFeatures: Story = {
  render: () => (
    <div className="space-y-4 w-80">
      <TextInput
        label="Campo con ID personalizzato"
        id="custom-id"
        placeholder="Input accessibile"
        hint="Questo input ha un ID personalizzato per l'accessibilità"
      />
      
      <TextInput
        label="Campo con aria-label"
        aria-label="Nome utente per il login"
        placeholder="Username"
        required
      />
      
      <EmailInput
        label="Email con descrizione estesa"
        placeholder="email@esempio.com"
        hint="Useremo questa email solo per comunicazioni importanti"
        aria-describedby="email-description"
      />
      
      <div id="email-description" className="text-xs text-base-content/60">
        La tua email sarà mantenuta privata e sicura secondo la nostra privacy policy.
      </div>
      
      <PasswordInput
        label="Password accessibile"
        placeholder="Password sicura"
        showStrength
        showRequirements
        aria-describedby="password-requirements"
      />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Caratteristiche di accessibilità: ID personalizzati, aria-labels, descrizioni estese',
      },
    },
  },
};

// Responsive design
export const ResponsiveDesign: Story = {
  render: () => (
    <div className="w-full space-y-6">
      <h3 className="text-lg font-semibold">Design Responsive</h3>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        <TextInput
          label="Mobile First"
          placeholder="Responsive"
        />
        <EmailInput
          label="Email"
          placeholder="email@esempio.com"
        />
        <PhoneInput
          label="Telefono"
          placeholder="+39 123 456 7890"
        />
        <SelectInput
          label="Paese"
          options={countryOptions}
          placeholder="Seleziona"
        />
      </div>
      
      <div className="text-sm text-base-content/60 space-y-1">
        <p>📱 Mobile: 1 colonna</p>
        <p>📟 Tablet: 2 colonne</p>
        <p>💻 Desktop: 3 colonne</p>
        <p>🖥️ Large: 4 colonne</p>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Gli input si adattano automaticamente a diverse dimensioni di schermo',
      },
    },
  },
};
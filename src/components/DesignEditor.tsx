'use client';
import { useEffect, useState } from 'react';


type Theme = 'dark' | 'light' | 'sepia';

type Config = {
  theme: Theme;
  font: string;
  primaryColor: string;
  accentColor: string;
  animationPreset: 'calm' | 'float' | 'pulse';
};

const presets: Record<string, Config> = {
  default: {
    theme: 'dark',
    font: 'sans-serif',
    primaryColor: '#8b5cf6',
    accentColor: '#22d3ee',
    animationPreset: 'calm'
  },
  ocean: {
    theme: 'light',
    font: 'serif',
    primaryColor: '#0ea5e9',
    accentColor: '#f97316',
    animationPreset: 'float'
  },
  forest: {
    theme: 'sepia',
    font: 'monospace',
    primaryColor: '#16a34a',
    accentColor: '#facc15',
    animationPreset: 'pulse'
  }
};

interface Props {
  theme: Theme;
  setTheme: (t: Theme) => void;
  font: string;
  setFont: (f: string) => void;
  primaryColor?: string;
  setPrimaryColor?: (value: string) => void;
  accentColor?: string;
  setAccentColor?: (value: string) => void;
  animationPreset?: 'calm' | 'float' | 'pulse';
  setAnimationPreset?: (value: 'calm' | 'float' | 'pulse') => void;
  onClose: () => void;
}

const DesignEditor = ({
  theme,
  setTheme,
  font,
  setFont,
  primaryColor = '#8b5cf6',
  setPrimaryColor = () => {},
  accentColor = '#22d3ee',
  setAccentColor = () => {},
  animationPreset = 'calm',
  setAnimationPreset = () => {},
  onClose
}: Props) => {
  const [importValue, setImportValue] = useState('');


  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [onClose]);

  const copyJson = () => {
    const json = JSON.stringify({ theme, font, primaryColor, accentColor, animationPreset });
    if (navigator?.clipboard) {
      navigator.clipboard.writeText(json).catch(() => {});
    }

  };

  const handleImport = () => {
    try {
      const parsed = JSON.parse(importValue) as Partial<Config>;
      if (parsed.theme) setTheme(parsed.theme);
      if (parsed.font) setFont(parsed.font);
      if (parsed.primaryColor) setPrimaryColor(parsed.primaryColor);
      if (parsed.accentColor) setAccentColor(parsed.accentColor);
      if (parsed.animationPreset) setAnimationPreset(parsed.animationPreset);
    } catch {
      // ignore parse errors
    }
  };

  return (
    <div
      className="design-editor"
      role="dialog"
      aria-modal="true"
      aria-label="Design editor"
      id="design-editor"
    >
      <button onClick={onClose} className="close" aria-label="Close design editor">
        Close
      </button>

      <label>
        Preset
        <select
          onChange={(e) => {
            const key = e.target.value;
            const preset = presets[key];
            if (preset) {
              setTheme(preset.theme);
              setFont(preset.font);
              setPrimaryColor(preset.primaryColor);
              setAccentColor(preset.accentColor);
              setAnimationPreset(preset.animationPreset);
            }
          }}
          defaultValue=""
        >
          <option value="" disabled>
            Select preset
          </option>
          {Object.keys(presets).map((p) => (
            <option key={p} value={p}>
              {p}
            </option>
          ))}
        </select>
      </label>

      <label>
        Font
        <select value={font} onChange={(e) => setFont(e.target.value)}>
          <option value="sans-serif">Sans-serif</option>
          <option value="serif">Serif</option>
          <option value="monospace">Monospace</option>
        </select>
      </label>

      <label>
        Primary colour
        <input
          type="color"
          value={primaryColor}
          onChange={(event) => setPrimaryColor(event.target.value)}
        />
      </label>

      <label>
        Accent colour
        <input
          type="color"
          value={accentColor}
          onChange={(event) => setAccentColor(event.target.value)}
        />
      </label>

      <label>
        Animation preset
        <select
          value={animationPreset}
          onChange={(event) => setAnimationPreset(event.target.value as 'calm' | 'float' | 'pulse')}
        >
          <option value="calm">Calm</option>
          <option value="float">Float</option>
          <option value="pulse">Pulse</option>
        </select>
      </label>

      <div className="export">
        <button onClick={copyJson}>Copy JSON</button>
      </div>

      <div className="import">
        <textarea
          placeholder="Paste JSON here"
          value={importValue}
          onChange={(e) => setImportValue(e.target.value)}
        />
        <button onClick={handleImport}>Import</button>
      </div>
    </div>
  );
};

export default DesignEditor;


import { useState } from 'react';

type Theme = 'dark' | 'light' | 'sepia';

type Config = {
  theme: Theme;
  font: string;
};

const presets: Record<string, Config> = {
  default: { theme: 'dark', font: 'sans-serif' },
  ocean: { theme: 'light', font: 'serif' },
  forest: { theme: 'sepia', font: 'monospace' },
};

interface Props {
  theme: Theme;
  setTheme: (t: Theme) => void;
  font: string;
  setFont: (f: string) => void;
  onClose: () => void;
}

const DesignEditor = ({ theme, setTheme, font, setFont, onClose }: Props) => {
  const [importValue, setImportValue] = useState('');

  const copyJson = () => {
    const json = JSON.stringify({ theme, font });
    navigator.clipboard.writeText(json);
  };

  const handleImport = () => {
    try {
      const parsed = JSON.parse(importValue) as Partial<Config>;
      if (parsed.theme) setTheme(parsed.theme);
      if (parsed.font) setFont(parsed.font);
    } catch {
      // ignore parse errors
    }
  };

  return (
    <div className="design-editor">
      <button onClick={onClose} className="close">Close</button>

      <label>
        Preset
        <select
          onChange={(e) => {
            const key = e.target.value;
            const preset = presets[key];
            if (preset) {
              setTheme(preset.theme);
              setFont(preset.font);
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


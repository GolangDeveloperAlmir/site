'use client';

interface FloatingControlsProps {
  onScrollTop: () => void;
  onOpenContact: () => void;
  onOpenDesign: () => void;
  onTogglePomodoro: () => void;
  onOpenSearch: () => void;
}

const FloatingControls = ({
  onScrollTop,
  onOpenContact,
  onOpenDesign,
  onTogglePomodoro,
  onOpenSearch
}: FloatingControlsProps) => (
  <div className="floating-controls" role="toolbar" aria-label="Быстрые действия">
    <button type="button" onClick={onScrollTop} aria-label="Наверх">
      ↑
    </button>
    <button type="button" onClick={onOpenContact} aria-label="Контакты">
      @
    </button>
    <button type="button" onClick={onOpenDesign} aria-label="Открыть редактор дизайна">
      🎨
    </button>
    <button type="button" onClick={onTogglePomodoro} aria-label="Таймер Помодоро">
      ⏱️
    </button>
    <button type="button" onClick={onOpenSearch} aria-label="Поиск">
      /
    </button>
  </div>
);

export default FloatingControls;

'use client';

import { useEffect, useRef, useState } from 'react';

interface PomodoroTimerProps {
  open: boolean;
  onClose: () => void;
}

type Mode = 'focus' | 'break';

const PomodoroTimer = ({ open, onClose }: PomodoroTimerProps) => {
  const [focusMinutes, setFocusMinutes] = useState(25);
  const [breakMinutes, setBreakMinutes] = useState(5);
  const [mode, setMode] = useState<Mode>('focus');
  const [secondsLeft, setSecondsLeft] = useState(focusMinutes * 60);
  const [running, setRunning] = useState(false);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    if (!open) {
      setRunning(false);
      setMode('focus');
      setSecondsLeft(focusMinutes * 60);
    }
  }, [open, focusMinutes]);

  useEffect(() => {
    if (!running) {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
      return;
    }

    intervalRef.current = setInterval(() => {
      setSecondsLeft((prev) => {
        if (prev <= 1) {
          const nextMode: Mode = mode === 'focus' ? 'break' : 'focus';
          setMode(nextMode);
          const nextSeconds = (nextMode === 'focus' ? focusMinutes : breakMinutes) * 60;
          return nextSeconds;
        }
        return prev - 1;
      });
    }, 1000);

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
  }, [running, mode, focusMinutes, breakMinutes]);

  const reset = () => {
    setRunning(false);
    setMode('focus');
    setSecondsLeft(focusMinutes * 60);
  };

  const minutes = Math.floor(secondsLeft / 60)
    .toString()
    .padStart(2, '0');
  const seconds = Math.floor(secondsLeft % 60)
    .toString()
    .padStart(2, '0');

  if (!open) return null;

  return (
    <div className="pomodoro" role="dialog" aria-modal="true" aria-label="Pomodoro timer">
      <div className="pomodoro__content">
        <header>
          <h2>{mode === 'focus' ? 'Фокус' : 'Перерыв'}</h2>
          <button type="button" onClick={onClose} aria-label="Закрыть таймер">
            ×
          </button>
        </header>
        <div className="pomodoro__time">
          <span>{minutes}</span>:<span>{seconds}</span>
        </div>
        <div className="pomodoro__actions">
          <button type="button" onClick={() => setRunning((value) => !value)}>
            {running ? 'Пауза' : 'Старт'}
          </button>
          <button type="button" onClick={reset}>
            Сброс
          </button>
        </div>
        <fieldset className="pomodoro__settings">
          <legend>Настройки</legend>
          <label>
            Фокус (мин)
            <input
              type="number"
              min={10}
              max={60}
              value={focusMinutes}
              onChange={(event) => {
                const value = Number(event.target.value);
                setFocusMinutes(value);
                setSecondsLeft(value * 60);
              }}
            />
          </label>
          <label>
            Перерыв (мин)
            <input
              type="number"
              min={3}
              max={30}
              value={breakMinutes}
              onChange={(event) => setBreakMinutes(Number(event.target.value))}
            />
          </label>
        </fieldset>
      </div>
    </div>
  );
};

export default PomodoroTimer;

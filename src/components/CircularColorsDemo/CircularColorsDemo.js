'use client';
import React from 'react';
import clsx from 'clsx';
import {
  Play,
  Pause,
  RotateCcw,
} from 'react-feather';

import Card from '@/components/Card';
import VisuallyHidden from '@/components/VisuallyHidden';
import {motion} from 'framer-motion';

import styles from './CircularColorsDemo.module.css';

const COLORS = [
  {label: 'red', value: 'hsl(348deg 100% 60%)'},
  {label: 'yellow', value: 'hsl(50deg 100% 55%)'},
  {label: 'blue', value: 'hsl(235deg 100% 65%)'},
];

function CircularColorsDemo() {
  const [timeElapsed, setTimeElapsed] = React.useState(0);
  const [timerId, setTimerId] = React.useState(null);
  const selectedId = React.useId();

  // COLORS array:
  const selectedColor = COLORS[timeElapsed % COLORS.length];

  const handlePlayOnClick = () => {
    setTimerId(setInterval(() => setTimeElapsed((t) => t + 1), 1_000));
  };

  const stop = () => {
    clearInterval(timerId);
    setTimerId(null);
  };

  const handlePauseOnClick = () => {
    stop();
  };

  const handleResetOnClick = () => {
    stop();
    setTimeElapsed(0);
  };

  return (
    <Card as='section' className={styles.wrapper}>
      <ul className={styles.colorsWrapper}>
        {COLORS.map((color, index) => {
          const isSelected =
            color.value === selectedColor.value;

          return (
            <li
              className={styles.color}
              key={index}
            >
              {isSelected && (
                <motion.div
                  className={
                    styles.selectedColorOutline
                  }
                  layoutId={selectedId}
                />
              )}
              <div
                className={clsx(
                  styles.colorBox,
                  isSelected &&
                  styles.selectedColorBox
                )}
                style={{
                  backgroundColor: color.value,
                }}
              >
                <VisuallyHidden>
                  {color.label}
                </VisuallyHidden>
              </div>
            </li>
          );
        })}
      </ul>

      <div className={styles.timeWrapper}>
        <dl className={styles.timeDisplay}>
          <dt>Time Elapsed</dt>
          <dd>{timeElapsed}</dd>
        </dl>
        <div className={styles.actions}>
          {timerId !== null ? (
              <button onClick={handlePauseOnClick}>
                <Pause/>
                <VisuallyHidden>Pause</VisuallyHidden>
              </button>
            ) :
            (<button onClick={handlePlayOnClick}>
                <Play/>
                <VisuallyHidden>Play</VisuallyHidden>
              </button>
            )}

          <button onClick={handleResetOnClick}>
            <RotateCcw/>
            <VisuallyHidden>Reset</VisuallyHidden>
          </button>
        </div>
      </div>
    </Card>
  );
}

export default CircularColorsDemo;

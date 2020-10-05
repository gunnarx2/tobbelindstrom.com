import React, { useEffect, useState, useMemo } from 'react';
import { LinePath } from '@visx/shape';
import { Drag } from '@visx/drag';
import { curveBasis } from '@visx/curve';
import { LinearGradient } from '@visx/gradient';
import { initial } from 'lodash';
import classNames from 'classnames';

import { useResizeObserver } from 'hooks';
import { UndoIcon, TrashIcon } from 'assets/icons';
import styles from './Visx.module.scss';

type Lines = { x: number; y: number }[][];

interface Props {
  width: number;
  height: number;
}

const VisxComponent = ({ width, height }: Props) => {
  const [lines, setLines] = useState<Lines>([]);
  const linearGradientColors = useMemo(() => {
    const computedStyleBody = window.getComputedStyle(document.body);
    return {
      from: computedStyleBody.getPropertyValue('--color-primary-darken'),
      to: computedStyleBody.getPropertyValue('--color-primary-lighten')
    };
  }, []);

  return (
    <div
      className={classNames(styles.visx, {
        [styles.hasLines]: lines.length
      })}
    >
      <svg className={styles.visxArea} width={width} height={height}>
        <LinearGradient
          id="stroke"
          from={linearGradientColors.from}
          to={linearGradientColors.to}
        />
        {lines.map((line, index) => (
          <LinePath
            // 🙈
            // eslint-disable-next-line react/no-array-index-key
            key={index}
            className={styles.visxLinePath}
            data={line}
            curve={curveBasis}
            x={(d) => d.x}
            y={(d) => d.y}
          />
        ))}
        <Drag
          width={width}
          height={height}
          resetOnStart
          onDragStart={({ x = 0, y = 0 }) =>
            setLines((currLines) => [
              ...currLines,
              [
                { x, y },
                { x: x + 0.1, y: y + 0.1 }
              ]
            ])
          }
          onDragMove={({ x = 0, y = 0, dx, dy }) =>
            setLines((currLines) => {
              const nextLines = [...currLines];
              const newPoint = { x: x + dx, y: y + dy };
              const lastIndex = nextLines.length - 1;
              nextLines[lastIndex] = [
                ...(nextLines[lastIndex] || []),
                newPoint
              ];
              return nextLines;
            })
          }
        >
          {({
            x = 0,
            y = 0,
            dx,
            dy,
            isDragging,
            dragStart,
            dragEnd,
            dragMove
          }) => (
            <g>
              {isDragging && (
                <g>
                  <circle
                    className={styles.visxDrawingEnd}
                    r={4}
                    cx={x + dx}
                    cy={y + dy}
                  />
                  <circle
                    className={styles.visxDrawingStart}
                    cx={x}
                    cy={y}
                    r={4}
                  />
                </g>
              )}
              <rect
                className={styles.visxDrawingArea}
                width={width}
                height={height}
                onMouseDown={dragStart}
                onMouseUp={dragEnd}
                onMouseMove={dragMove}
                onTouchStart={dragStart}
                onTouchEnd={dragEnd}
                onTouchMove={dragMove}
              />
            </g>
          )}
        </Drag>
      </svg>
      <div className={styles.visxTools}>
        <button
          type="button"
          className={styles.visxToolsUndo}
          onClick={() => setLines(initial(lines))}
          aria-label="Undo line"
        >
          <UndoIcon />
          <div className={styles.visxToolsLabel}>Undo line</div>
        </button>
        <button
          type="button"
          className={styles.visxToolsClear}
          onClick={() => setLines([])}
          aria-label="Clear canvas"
        >
          <TrashIcon />
          <div className={styles.visxToolsLabel}>Clear canvas</div>
        </button>
      </div>
      <div className={styles.visxDrawSomething}>Draw something here 🖌</div>
    </div>
  );
};

const Visx = () => {
  const [ref, entry] = useResizeObserver();
  const [size, setSize] = useState<
    { width: number; height: number } | undefined
  >();

  useEffect(() => {
    if (entry) {
      const { width, height } = entry.contentRect;
      setSize({ width, height });
    }
  }, [entry]);

  return (
    <div className={styles.root}>
      <div ref={ref} className={styles.inner}>
        {size && <VisxComponent width={size.width} height={size.height} />}
      </div>
    </div>
  );
};

export default Visx;

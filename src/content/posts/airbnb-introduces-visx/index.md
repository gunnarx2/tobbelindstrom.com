---
title:        Airbnb introduces visx 🐯
description:  visx is a collection of reusable low-level visualization components.
              visx combines the power of d3 to generate your visualization with
              the benefits of React for updating the DOM.
spoiler:      Collection of reusable low-level visualization components. Combines
              the power of d3 to generate your visualization with the benefits
              of React.
date:         2020-10-05
---

## visx 🐅

[Airbnb](https://airbnb.io/) has created a new open source product called
[visx](https://github.com/airbnb/visx). After 3 years of development, 2.5 years of
production use and a rewrite in TypeScript they finally released it 22 September
2020.

> visx is a collection of reusable low-level visualization components. visx
> combines the power of d3 to generate your visualization with the benefits
> of react for updating the DOM.
>
> [Source](https://github.com/airbnb/visx)

## Just another charting library? 😒

No, actually not. It's more of a complex and reusable visualization system. You can
create your own charting library based on visx.

> **Not a charting library.** As you start using visualization primitives, you’ll
> end up building your own charting library that’s optimized for your use case.
> You’re in control.
>
> [Source](https://airbnb.io/visx/)

## Demo 🔥

There's a lot to demo, but for fun and to prove that it's not a charting library
I'll show you the possibility to draw something.

import { Visx } from 'components/ui/blog';

<Visx />

## Implementation

The demo is highly based on their own [showcase](https://airbnb.io/visx/drag-ii).
If you want to take a look at my own tweak of their demo, you can do that
[here](https://github.com/gunnarx2/tobbelindstrom.com/blob/master/src/components/ui/blog/Visx/Visx.tsx).

This is how their showcase looks like:

```tsx
import React, { useState } from 'react';
import { LinePath } from '@visx/shape';
import { Drag } from '@visx/drag';
import { curveBasis } from '@visx/curve';
import { LinearGradient } from '@visx/gradient';

type Line = { x: number; y: number }[];
type Lines = Line[];

export type DragIIProps = {
  width: number;
  height: number;
  data?: Lines;
};

export default function DragII({ data = [], width, height }: DragIIProps) {
  const [lines, setLines] = useState<Lines>(data);

  return width < 10 ? null : (
    <div className="DragII" style={{ touchAction: 'none' }}>
      <svg width={width} height={height}>
        <LinearGradient id="stroke" from="#ff614e" to="#ffdc64" />
        <rect fill="#04002b" width={width} height={height} rx={14} />
        {lines.map((line, i) => (
          <LinePath
            key={`line-${i}`}
            fill="transparent"
            stroke="url(#stroke)"
            strokeWidth={3}
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
          onDragStart={({ x = 0, y = 0 }) => {
            // add the new line with the starting point
            setLines((currLines) => [...currLines, [{ x, y }]]);
          }}
          onDragMove={({ x = 0, y = 0, dx, dy }) => {
            // add the new point to the current line
            setLines((currLines) => {
              const nextLines = [...currLines];
              const newPoint = { x: x + dx, y: y + dy };
              const lastIndex = nextLines.length - 1;
              nextLines[lastIndex] = [
                ...(nextLines[lastIndex] || []),
                newPoint
              ];
              return nextLines;
            });
          }}
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
              {/* decorate the currently drawing line */}
              {isDragging && (
                <g>
                  <rect
                    fill="white"
                    width={8}
                    height={8}
                    x={x + dx - 4}
                    y={y + dy - 4}
                    pointerEvents="none"
                  />
                  <circle
                    cx={x}
                    cy={y}
                    r={4}
                    fill="transparent"
                    stroke="white"
                    pointerEvents="none"
                  />
                </g>
              )}
              {/* create the drawing area */}
              <rect
                fill="transparent"
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
      <div className="deets">
        <div>
          Based on Mike Bostock's{' '}
          <a href="https://bl.ocks.org/mbostock/f705fc55e6f26df29354">
            Line Drawing
          </a>
        </div>
      </div>

      <style jsx>{`
        .DragII {
          display: flex;
          flex-direction: column;
          user-select: none;
        }

        svg {
          margin: 1rem 0;
          cursor: crosshair;
        }

        .deets {
          display: flex;
          flex-direction: row;
          font-size: 12px;
        }
        .deets > div {
          margin: 0.25rem;
        }
      `}</style>
    </div>
  );
}
```

## The end

If you're curious to learn more you should head over to their [GitHub](https://github.com/airbnb/visx)
or [documentation](https://airbnb.io/visx/docs) page.

import React, { useState, useRef, useEffect } from 'react';

interface Brick {
  id: number;
  type: string;
  x: number;
  y: number;
  color: string;
}

const Test: React.FC = () => {
  const [bricks, setBricks] = useState<Brick[]>([
    { id: 1, type: 'set', x: 50, y: 50, color: '#ff9ff3' },
    { id: 2, type: 'repeat', x: 50, y: 110, color: '#54a0ff' },
    { id: 3, type: 'do', x: 200, y: 200, color: '#5f27cd' },
  ]);
  const [isDragging, setIsDragging] = useState(false);
  const [draggedBrickId, setDraggedBrickId] = useState<number | null>(null);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const svgRef = useRef<SVGSVGElement>(null);

  const CONNECT_THRESHOLD = 20; // Pixels within which bricks can connect
  const NOT_CONNECTABLE_THRESHOLD = 40; // Pixels within which bricks show they can't connect

  const isConnectable = (brick1: Brick, brick2: Brick) => 
    Math.abs(brick1.y + 60 - brick2.y) < CONNECT_THRESHOLD && Math.abs(brick1.x - brick2.x) < CONNECT_THRESHOLD;

  const isCloseButNotConnectable = (brick1: Brick, brick2: Brick) =>
    Math.abs(brick1.y + 60 - brick2.y) < NOT_CONNECTABLE_THRESHOLD && Math.abs(brick1.x - brick2.x) < NOT_CONNECTABLE_THRESHOLD;

  const handleMouseDown = (e: React.MouseEvent, id: number) => {
    const brick = bricks.find(b => b.id === id);
    if (brick) {
      const svgRect = svgRef.current?.getBoundingClientRect();
      if (svgRect) {
        setIsDragging(true);
        setDraggedBrickId(id);
        setDragOffset({
          x: e.clientX - svgRect.left - brick.x,
          y: e.clientY - svgRect.top - brick.y
        });
      }
    }
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (isDragging && draggedBrickId !== null) {
      const svgRect = svgRef.current?.getBoundingClientRect();
      if (svgRect) {
        const newX = e.clientX - svgRect.left - dragOffset.x;
        const newY = e.clientY - svgRect.top - dragOffset.y;
        
        setBricks(prevBricks => {
          return prevBricks.map(brick => {
            if (brick.id === draggedBrickId) {
              return { ...brick, x: newX, y: newY };
            }
            return brick;
          });
        });
      }
    }
  };

  const handleMouseUp = () => {
    if (isDragging && draggedBrickId !== null) {
      setBricks(prevBricks => {
        const draggedBrick = prevBricks.find(b => b.id === draggedBrickId)!;
        const connectableBrick = prevBricks.find(b => b.id !== draggedBrickId && isConnectable(draggedBrick, b));
        
        if (connectableBrick) {
          return prevBricks.map(brick => 
            brick.id === draggedBrickId ? { ...brick, x: connectableBrick.x, y: connectableBrick.y + 60 } : brick
          );
        }
        return prevBricks;
      });
    }
    setIsDragging(false);
    setDraggedBrickId(null);
  };

  useEffect(() => {
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging, draggedBrickId]);

  const renderBrickPath = (type: string) => {
    switch (type) {
      case 'set':
        return "M0,0 h120 v60 h-100 l-20,10 v-70 z";
      case 'repeat':
        return "M0,0 h140 v60 h-120 l-20,10 v-70 z";
      case 'do':
        return "M0,0 h80 v60 h-60 l-20,10 v-70 z";
      default:
        return "";
    }
  };

  return (
    <svg ref={svgRef} width="800" height="600" style={{ border: '1px solid black' }}>
      <defs>
        <filter id="shadow">
          <feDropShadow dx="0" dy="0" stdDeviation="3" floodColor="#4CAF50" />
        </filter>
      </defs>
      {bricks.map(brick => {
        const isConnectableToAny = bricks.some(b => b.id !== brick.id && isConnectable(brick, b));
        const isCloseButNotConnectableToAny = bricks.some(b => b.id !== brick.id && isCloseButNotConnectable(brick, b) && !isConnectable(brick, b));
        
        return (
          <g
            key={brick.id}
            transform={`translate(${brick.x},${brick.y})`}
            onMouseDown={(e) => handleMouseDown(e, brick.id)}
          >
            <path
              d={renderBrickPath(brick.type)}
              fill={brick.color}
              stroke={isCloseButNotConnectableToAny ? "red" : "black"}
              strokeWidth={isCloseButNotConnectableToAny ? 2 : 1}
              filter={isConnectableToAny ? "url(#shadow)" : "none"}
            />
            <text x="10" y="35" fill="white" fontSize="14">{brick.type}</text>
          </g>
        );
      })}
    </svg>
  );
};

export default Test;
import React, { useState, useRef, useEffect } from 'react';

interface Brick {
  id: number;
  type: string;
  x: number;
  y: number;
  color: string;
}

const App: React.FC = () => {
  const [bricks, setBricks] = useState<Brick[]>([
    { id: 1, type: 'top', x: 50, y: 50, color: '#ff6b6b' },
    { id: 2, type: 'middle', x: 50, y: 110, color: '#4ecdc4' },
    { id: 3, type: 'middle', x: 50, y: 170, color: '#45b7d1' },
    { id: 4, type: 'middle', x: 50, y: 230, color: '#f9d56e' },
    { id: 5, type: 'middle', x: 50, y: 290, color: '#ff9ff3' },
    { id: 6, type: 'bottom', x: 50, y: 350, color: '#54a0ff' },
  ]);
  const [isDragging, setIsDragging] = useState(false);
  const [draggedBrickId, setDraggedBrickId] = useState<number | null>(null);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const svgRef = useRef<SVGSVGElement>(null);

  const isConnected = (brick1: Brick, brick2: Brick) => 
    Math.abs(brick1.y + 60 - brick2.y) < 5 && Math.abs(brick1.x - brick2.x) < 5;

  const findConnectedBricks = (startId: number): number[] => {
    const result: number[] = [startId];
    let currentId = startId;
    
    // Find bricks below
    while (true) {
      const currentBrick = bricks.find(b => b.id === currentId);
      const nextBrick = bricks.find(b => b.id !== currentId && isConnected(currentBrick!, b));
      if (nextBrick && nextBrick.y > currentBrick!.y) {
        result.push(nextBrick.id);
        currentId = nextBrick.id;
      } else {
        break;
      }
    }
    
    return result;
  };

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
        
        const connectedBricks = findConnectedBricks(draggedBrickId);
        
        setBricks(prevBricks => {
          return prevBricks.map(brick => {
            if (connectedBricks.includes(brick.id)) {
              const index = connectedBricks.indexOf(brick.id);
              return {
                ...brick,
                x: newX,
                y: newY + index * 60
              };
            }
            return brick;
          });
        });
      }
    }
  };

  const handleMouseUp = () => {
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
      case 'top':
        return "M0,0 h100 v50 h-80 l-20,10 v-60 z";
      case 'middle':
        return "M0,0 h80 l20,-10 v60 h-80 l-20,10 v-60 z";
      case 'bottom':
        return "M0,0 h80 l20,-10 v60 h-100 v-50 z";
      default:
        return "";
    }
  };

  return (
    <svg ref={svgRef} width="800" height="600" style={{ border: '1px solid black' }}>
      {bricks.map(brick => (
        <g
          key={brick.id}
          transform={`translate(${brick.x},${brick.y})`}
          onMouseDown={(e) => handleMouseDown(e, brick.id)}
        >
          <path
            d={renderBrickPath(brick.type)}
            fill={brick.color}
            stroke="black"
          />
        </g>
      ))}
    </svg>
  );
};

export default App;
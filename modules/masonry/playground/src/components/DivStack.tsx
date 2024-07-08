/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-constant-condition */
import React, { useState, useEffect } from 'react';

interface Brick {
  id: number;
  type: string;
  x: number;
  y: number;
  color: string;
}

const DivStack: React.FC = () => {
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

  const isConnected = (brick1: Brick, brick2: Brick) =>
    Math.abs(brick1.y + 60 - brick2.y) < 5 && Math.abs(brick1.x - brick2.x) < 5;

  const findConnectedBricks = (startId: number): number[] => {
    const result: number[] = [startId];
    let currentId = startId;

    while (true) {
      const currentBrick = bricks.find((b) => b.id === currentId);
      const nextBrick = bricks.find((b) => b.id !== currentId && isConnected(currentBrick!, b));
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
    const brick = bricks.find((b) => b.id === id);
    if (brick) {
      setIsDragging(true);
      setDraggedBrickId(id);
      setDragOffset({
        x: e.clientX - brick.x,
        y: e.clientY - brick.y,
      });
    }
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (isDragging && draggedBrickId !== null) {
      const newX = e.clientX - dragOffset.x;
      const newY = e.clientY - dragOffset.y;
      const connectedBricks = findConnectedBricks(draggedBrickId);
      setBricks((prevBricks) => {
        return prevBricks.map((brick) => {
          if (connectedBricks.includes(brick.id)) {
            const index = connectedBricks.indexOf(brick.id);
            return {
              ...brick,
              x: newX,
              y: newY + index * 60,
            };
          }
          return brick;
        });
      });
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

  return (
    <div className="workspace">
      <div
        id="workspace-div"
        className="workspace-div"
        style={{
          width: '800px',
          height: '600px',
          border: '1px solid black',
          position: 'relative',
        }}
      >
        {bricks.map((brick) => (
          <div
            key={brick.id}
            className="brick"
            style={{
              position: 'absolute',
              left: brick.x,
              top: brick.y,
              width: '100px',
              height: '50px',
              backgroundColor: brick.color,
              cursor: 'grab',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              border: '1px solid black',
            }}
            onMouseDown={(e) => handleMouseDown(e, brick.id)}
          >
            {brick.type === 'top' && <button>Top Button</button>}
            {brick.type === 'middle' && <input type="text" placeholder="Middle Input" />}
            {brick.type === 'bottom' && <label>Bottom Label</label>}
          </div>
        ))}
      </div>
    </div>
  );
};

export default DivStack;

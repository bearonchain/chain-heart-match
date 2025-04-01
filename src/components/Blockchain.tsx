
import React, { useRef, useEffect } from 'react';

const BlockchainBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size
    const setCanvasSize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    setCanvasSize();
    window.addEventListener('resize', setCanvasSize);

    // Define Block class
    class Block {
      x: number;
      y: number;
      size: number;
      alpha: number;
      vx: number;
      vy: number;
      color: string;

      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 5 + 1;
        this.alpha = Math.random() * 0.6 + 0.1;
        this.vx = (Math.random() - 0.5) * 0.2;
        this.vy = (Math.random() - 0.5) * 0.2;
        
        // Purple to blue gradient for particles
        const colors = ['rgba(139, 92, 246, ', 'rgba(14, 165, 233, '];
        this.color = colors[Math.floor(Math.random() * colors.length)];
      }

      update() {
        this.x += this.vx;
        this.y += this.vy;

        // Wrap around the screen
        if (this.x < 0) this.x = canvas.width;
        if (this.x > canvas.width) this.x = 0;
        if (this.y < 0) this.y = canvas.height;
        if (this.y > canvas.height) this.y = 0;
      }

      draw() {
        if (!ctx) return;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = `${this.color}${this.alpha})`;
        ctx.fill();
      }
    }

    // Create blocks
    const blocks: Block[] = [];
    const blocksCount = Math.min(window.innerWidth * window.innerHeight / 10000, 100);
    
    for (let i = 0; i < blocksCount; i++) {
      blocks.push(new Block());
    }

    // Animation loop
    const animate = () => {
      if (!ctx) return;
      
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Update and draw blocks
      blocks.forEach(block => {
        block.update();
        block.draw();
      });
      
      // Draw connections between nearby blocks
      for (let i = 0; i < blocks.length; i++) {
        for (let j = i + 1; j < blocks.length; j++) {
          const dx = blocks[i].x - blocks[j].x;
          const dy = blocks[i].y - blocks[j].y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          
          if (distance < 100) {
            ctx.beginPath();
            ctx.moveTo(blocks[i].x, blocks[i].y);
            ctx.lineTo(blocks[j].x, blocks[j].y);
            ctx.strokeStyle = `rgba(139, 92, 246, ${0.1 * (1 - distance / 100)})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      }
      
      requestAnimationFrame(animate);
    };
    
    animate();

    return () => {
      window.removeEventListener('resize', setCanvasSize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 -z-10 opacity-40"
    />
  );
};

export default BlockchainBackground;

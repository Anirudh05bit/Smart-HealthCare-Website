import React, { useRef, useEffect } from "react";

const WebBackground = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");

    // size to parent element so the canvas can be placed inside the hero
    const parent = canvas.parentElement || document.body;
    let width = (canvas.width = parent.clientWidth);
    let height = (canvas.height = parent.clientHeight);

    // Increase points for more web lines and speed for faster movement
    const points = Array.from({ length: 120 }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 3.2, // increased speed
      vy: (Math.random() - 0.5) * 3.2,
    }));

    let mouse = { x: -1000, y: -1000 };
    let rafId;

    function draw() {
      ctx.clearRect(0, 0, width, height);

      // draw connections (increase web density by reducing distance threshold)
      for (let i = 0; i < points.length; i++) {
        for (let j = i + 1; j < points.length; j++) {
          const dx = points[i].x - points[j].x;
          const dy = points[i].y - points[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 110) {
            ctx.beginPath();
            ctx.strokeStyle = `rgba(255,255,255,${1 - dist / 110})`;
            ctx.moveTo(points[i].x, points[i].y);
            ctx.lineTo(points[j].x, points[j].y);
            ctx.stroke();
          }
        }
      }

      // move points and repel from mouse
      points.forEach((p) => {
        // Repel from mouse if close
        const dx = p.x - mouse.x;
        const dy = p.y - mouse.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 80) {
          // Move away from mouse
          const angle = Math.atan2(dy, dx);
          p.vx += Math.cos(angle) * 3.5;
          p.vy += Math.sin(angle) * 2.5;
        }
        // If velocity is too low, reset to random
        if (Math.abs(p.vx) < 0.1 && Math.abs(p.vy) < 0.1) {
          p.vx = (Math.random() - 0.5) * 3.2;
          p.vy = (Math.random() - 0.5) * 3.2;
        }
        // Apply velocity
        p.x += p.vx;
        p.y += p.vy;
        // Dampen velocity less for smoother movement
        p.vx *= 0.98;
        p.vy *= 0.98;
        if (p.x < 0 || p.x > width) p.vx *= -1;
        if (p.y < 0 || p.y > height) p.vy *= -1;
      });

      rafId = requestAnimationFrame(draw);
    }
    draw();

    // Mouse move event handlers
    function onMouseMove(e) {
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
    }
    function onMouseLeave() {
      mouse.x = -1000;
      mouse.y = -1000;
    }

    function onResize() {
      width = canvas.width = parent.clientWidth;
      height = canvas.height = parent.clientHeight;
    }

    canvas.addEventListener("mousemove", onMouseMove);
    canvas.addEventListener("mouseleave", onMouseLeave);
    window.addEventListener("resize", onResize);

    return () => {
      cancelAnimationFrame(rafId);
      canvas.removeEventListener("mousemove", onMouseMove);
      canvas.removeEventListener("mouseleave", onMouseLeave);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        zIndex: 0,
        width: "100%",
        height: "100%",
      }}
    />
  );
};

export default WebBackground;

'use client';

import React, { useEffect, useRef } from "react";

const AxoFlip: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    // Comprueba que el canvas exista
    const b = canvasRef.current;
    if (!b) return;
    // Comprueba que se pueda obtener el contexto 2D
    const c = b.getContext("2d", { alpha: false });
    if (!c) return;

    // Creamos alias para mayor claridad y para que TS sepa que no son null.
    const canvas = b;
    const ctx = c;

    // Declaración de variables (tal como en el código original)
    let e = canvas.width,
      aa = canvas.height,
      ba: number,
      ca = -1,
      da = -1,
      h = 0,
      k = 0,
      l = 0,
      m = 0,
      p = 1000,
      q = 0,
      r = false,
      t = 0,
      u = 3,
      ea = 0.5,
      v = false,
      w = 0,
      fa = false,
      x = 0,
      y = 0,
      z = 0,
      ha = 0,
      A = false,
      B = 0,
      C = 0,
      D = false,
      E = 0,
      F = 0,
      G = 0,
      H = 0.7,
      I = 0,
      J = 0,
      K = false,
      ia = 0,
      ja = 0,
      L = true,
      M = false,
      ka: any[] = [],
      N: { text: string; b: Function; a: number }[] = [],
      O = parseInt(localStorage.getItem("axoflip.goalIdx") || "0") || 0;

    // Se agregan los objetivos del juego
    N.push({ text: "Haz un flip", b: P, a: 1 });
    N.push({ text: "Aterriza 2 flips seguidos", b: Q, a: 2 });
    N.push({ text: "Aterriza perfectamente", b: la, a: 1 });
    N.push({ text: "Alcanza una altura de 20 pies", b: R, a: 20 });
    N.push({ text: "Haz un doble flip", b: P, a: 2 });
    N.push({ text: "Aterriza 3 flips seguidos", b: Q, a: 3 });
    N.push({ text: "Aterriza sobre tu cabeza", b: ma, a: 1 });
    N.push({ text: "Haz un triple flip", b: P, a: 3 });
    N.push({ text: "Aterriza perfectamente 2 veces seguidas", b: na, a: 2 });
    N.push({ text: "Alcanza una altura de 50 pies", b: R, a: 50 });
    N.push({ text: "Aterriza 4 flips seguidos", b: Q, a: 4 });
    N.push({ text: "Haz un cuádruple flip", b: P, a: 4 });
    N.push({ text: "Aterriza 5 flips seguidos", b: Q, a: 5 });
    N.push({ text: "Aterriza perfectamente 3 veces seguidas", b: na, a: 3 });
    N.push({ text: "Alcanza una altura de 100 pies", b: R, a: 100 });
    N.push({ text: "Haz un quíntuple flip", b: P, a: 5 });
    N.push({ text: "Aterriza 10 flips seguidos", b: Q, a: 10 });
    N.push({ text: "Alcanza una altura de 250 pies", b: R, a: 250 });
    N.push({ text: "Aterriza perfectamente 5 veces seguidas", b: na, a: 5 });
    N.push({ text: "Haz un flip de diez veces", b: P, a: 7 });
    N.push({ text: "Alcanza una altura de 500 pies", b: R, a: 500 });

    let S = 0;

    // Funciones de evaluación de objetivos
    function P(a: { text: string; b: Function; a: number }) {
      return z >= a.a;
    }
    function la() {
      return A && 0 < z;
    }
    function Q(a: { text: string; b: Function; a: number }) {
      return B >= a.a;
    }
    function na(a: { text: string; b: Function; a: number }) {
      return C >= a.a;
    }
    function ma() {
      return D;
    }
    function R(a: { text: string; b: Function; a: number }) {
      return Math.floor(E / 40) >= a.a;
    }

    // Función para obtener la posición del puntero/touch
    function T(a: MouseEvent | TouchEvent) {
      let pageX: number, pageY: number;
      if (a instanceof TouchEvent) {
        const touch = a.touches[0] || a.changedTouches[0];
        pageX = touch.pageX;
        pageY = touch.pageY;
      } else {
        pageX = a.pageX;
        pageY = a.pageY;
      }
      ia = pageX - canvas.offsetLeft;
      ja = pageY - canvas.offsetTop;
    }

    // Agregar listeners para mouse y touch
    const mouseDownHandler = (a: MouseEvent) => {
      K = true;
      T(a);
    };
    const mouseUpHandler = (a: MouseEvent) => {
      K = false;
      T(a);
    };
    const touchStartHandler = (a: TouchEvent) => {
      K = true;
      T(a);
      a.preventDefault();
    };
    const touchEndHandler = (a: TouchEvent) => {
      K = false;
      T(a);
      a.preventDefault();
    };
    const touchCancelHandler = (a: TouchEvent) => {
      K = false;
      T(a);
      a.preventDefault();
    };

    document.addEventListener("mousedown", mouseDownHandler, false);
    document.addEventListener("mouseup", mouseUpHandler, false);
    document.addEventListener("touchstart", touchStartHandler, { passive: false });
    document.addEventListener("touchend", touchEndHandler, { passive: false });
    document.addEventListener("touchcancel", touchCancelHandler, { passive: false });
    document.addEventListener("touchstart", (e) => e.preventDefault(), { passive: false });

    document.addEventListener("keydown", (a: KeyboardEvent) => {
      if (a.altKey && a.code === "KeyR") {
        localStorage.setItem("axoflip.maxHeightFt", "0");
        localStorage.setItem("axoflip.maxTotalFlips", "0");
        localStorage.setItem("axoflip.goalIdx", "0");
        O = 0;
      }
    });

    // Reinicia variables del juego
    function pa() {
      k = h = 0;
      l = p = 1000;
      q = m = 0;
      r = false;
      G = F = t = 0;
      H = 0.7;
      I = 0;
      v = false;
      ha = S = z = y = x = 0;
      A = false;
      C = B = 0;
      D = false;
      E = 0;
    }

    // Función principal de animación
    function qa(a: number) {
      const d = Math.min((a - (ba || a)) / 1000, 0.2);
      ba = a;
      const aspect = canvas.width / canvas.height;
      let f = window.innerWidth;
      let g = window.innerWidth / aspect;
      if (g > window.innerHeight) {
        g = window.innerHeight;
        f = g * aspect;
      }
      if (f !== ca || g !== da) {
        canvas.style.width = f + "px";
        canvas.style.height = g + "px";
        ca = f;
        da = g;
      }
      window.scrollTo(0, 0);
      ra(d);
      let aFlag = K && !M;
      if (v) {
        const aVal = w;
        h = 400 * Math.cos(aVal * Math.PI * 0.5) * (fa ? -1 : 1) * p * 0.001;
        k = 200 * Math.sin(aVal * Math.PI) * p * 0.001;
        m += 800 * d * (fa ? -1 : 1);
        w -= d;
        if (w <= 0) pa();
      } else {
        if (aFlag && k > 100) {
          r = false;
          q += 0.1 * (720 - q);
        } else {
          if (r) {
            m *= 0.8;
            if (Math.abs(m) < 0.01) r = false;
          }
          q *= 0.7;
        }
        const oldM = m;
        m += q * d;
        t += m - oldM;
        const oldY = y;
        y = Math.floor((t + 90) / 360);
        if (y > oldY) {
          U(0.5 * canvas.width + 100, canvas.height - 200, "x" + y, "#D37CFF");
          if (l > 0) ha++;
        }
        if (m >= 180) m -= 360;
        else if (m < -180) m += 360;
        l += -1400 * d;
        k += l * d;
        E = Math.max(k, E);
        if (k <= 0) {
          F = 16;
          G = 0;
          if (Math.abs(m) > 30) {
            v = true;
            w = 1;
            fa = Math.random() < 0.5;
            U(0.5 * canvas.width + 100, canvas.height - 100, "al suelo", "#F42");
            if (Math.abs(m) > 145) D = true;
          } else {
            const condition = t >= 270;
            A = Math.abs(m) < 6.5;
            p = condition ? p + (A ? 180 : 120) * (1 + (y / 5) * 0.5) : Math.max(p - 120, 1000);
            if (condition && A && !L) { J = 0.025; }
            if (condition) {
              z = y;
              x += y;
              B++;
              if (A) { C++; }
              if (A) {
                U(0.5 * canvas.width + 100, canvas.height - 100, "perfecto", "#FF0");
              } else {
                U(0.5 * canvas.width + 100, canvas.height - 100, "bien", "#0F4");
              }
            } else {
              C = B = 0;
            }
          }
          if (O < N.length && N[O].b(N[O])) {
            U(canvas.width - 100, 120, "¡Completado!", "#FF0", true);
            S = 1;
            C = B = 0;
          }
          k = 0;
          l = p;
          r = true;
          ha = y = z = t = 0;
          D = false;
          E = 0;
        }
        u -= d;
        ea -= d;
        if (u <= 0) {
          u = 1 + 3 * Math.random();
          ea = 0.1 + 0.1 * Math.random();
        }
      }
      let aCalc = (280 / Math.max(k, 280)) * 1.5;
      I = aCalc < H ? 3 : I - d;
      aCalc = Math.min(H, aCalc);
      if (aCalc < 0.5) aCalc = Math.pow(aCalc, 0.97);
      H += 0.2 * (aCalc - H);
      if (I <= 0) H += 0.001 * (0.7 - H);
      J *= 0.8;
      F *= 0.9;
      G += 4000 * d;

      ctx.save();
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.fillStyle = "#AADDFF";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.restore();

      ctx.save();
      ctx.scale(H + J, H + J);
      e = canvas.width / (H + J);
      aa = canvas.height / (H + J);
      ctx.translate(0.5 * (e - canvas.width), aa - canvas.height);

      ctx.save();
      ctx.translate(0.5 * canvas.width, canvas.height - 120);
      X(e, 240, "#00D846");
      Y(-196, -20, -196, 80, 12);
      Y(196, -20, 196, 80, 12);
      ctx.translate(0, Math.sin((G * Math.PI) / 180) * F);
      Y(-200, 0, 200, 0, 12);
      ctx.restore();

      ctx.save();
      ctx.translate(0.5 * canvas.width + h, canvas.height - 170 - k);
      ctx.rotate((m * Math.PI) / 180);
      ctx.translate(0, -40);
      X(80, 96, "#FF00B7");
      ctx.save();
      if (ea > 0 || v) {
        ctx.translate(-4, 4);
        X(40, 40, "#000");
        ctx.translate(4, 4);
        X(34, 34, "#FF00B7");
        ctx.translate(-12, 0);
      } else {
        ctx.translate(-4, 4);
        X(40, 40, "#FFF");
        ctx.translate(-8, 4 - 7 * Math.max(Math.min(l / 1000, 1), 0));
        X(16, 24, "#9800ad");
      }
      ctx.restore();
      ctx.translate(-4, 4);
      if (!K || M) {
        ctx.translate(8, 40);
        Y(0, 0, 0, 60, 8);
      } else {
        ctx.translate(8, 40);
        Y(0, 0, -30, 20, 8);
        Y(-30, 20, 0, 40, 8);
      }
      ctx.restore();

      sa();

      ctx.restore();
      window.requestAnimationFrame(qa);
    }

    function ra(a: number) {
      if (K) {
        if (!M) {
          if (L) {
            M = true;
          }
          L = false;
          if (O === N.length && ia > 0.5 * canvas.width && ja < 75) {
            localStorage.setItem("axoflip.goalIdx", "0");
            O = 0;
            pa();
            M = L = true;
          }
        }
      } else {
        M = false;
      }
      for (let i = ka.length - 1; i >= 0; i--) {
        ka[i].time += a;
        if (ka[i].time >= 0.5) {
          ka.splice(i, 1);
        }
      }
      if (S > 0) {
        S -= a;
        if (S <= 0) {
          O++;
          localStorage.setItem("axoflip.goalIdx", O.toString());
        }
      }
    }

    function Y(a: number, d: number, f: number, g: number, n: number) {
      ctx.save();
      ctx.strokeStyle = "#000";
      ctx.lineWidth = n;
      ctx.beginPath();
      ctx.moveTo(a, d);
      ctx.lineTo(f, g);
      ctx.stroke();
      ctx.restore();
    }
    function X(a: number, d: number, f: string) {
      const halfA = a * 0.5;
      const halfD = d * 0.5;
      ctx.save();
      ctx.fillStyle = f;
      ctx.beginPath();
      ctx.moveTo(-halfA, -halfD);
      ctx.lineTo(halfA, -halfD);
      ctx.lineTo(halfA, halfD);
      ctx.lineTo(-halfA, halfD);
      ctx.closePath();
      ctx.fill();
      ctx.restore();
    }
    function Z(text: string, d: number, f: number, g: number, n: number, V: string, W: string) {
      ctx.save();
      ctx.translate(d, f);
      ctx.rotate(g);
      ctx.font = `bold ${n}px Arial`;
      ctx.fillStyle = W;
      ctx.textAlign = V.toLowerCase() as CanvasTextAlign;
      ctx.fillText(text, 0, 0);
      ctx.restore();
    }
    function sa() {
      ctx.save();
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      if (L) {
        Z("AXOFLIP", 0.5 * canvas.width, 160, (-5 * Math.PI) / 180, 170, "center", "#000");
        Z("AXOFLIP", 0.5 * canvas.width - 10, 155, (-5 * Math.PI) / 180, 170, "center", "#FF00B7");
        Z("haz flips para ganar altura - completa los objetivos para ganar", 0.5 * canvas.width, canvas.height - 20, 0, 25, "center", "#000");
        Z("haz flips para ganar altura - completa los objetivos para ganar", 0.5 * canvas.width - 3, canvas.height - 23, 0, 25, "center", "#FFF");
      } else {
        let currentHeight = Math.floor(k / 40);
        let storedHeight = parseInt(localStorage.getItem("axoflip.maxHeightFt") || "0");
        if (currentHeight > storedHeight) {
          localStorage.setItem("axoflip.maxHeightFt", currentHeight.toString());
          storedHeight = currentHeight;
        }
        Z(`Altura: ${currentHeight} m (Récord: ${storedHeight} m)`, 12, 27, 0, 20, "left", "#000");
        let totalFlips = parseInt(localStorage.getItem("axoflip.maxTotalFlips") || "0");
        if (x > totalFlips) {
          localStorage.setItem("axoflip.maxTotalFlips", x.toString());
          totalFlips = x;
        }
        Z(`Flips: ${x} (Récord: ${totalFlips})`, 12, 50, 0, 20, "left", "#000");
        let color = "#000";
        if (S > 0) { color = S % 0.15 < 0.075 ? "#000" : "#00FF00"; }
        if (O < N.length) {
          Z(`Objetivo #${O + 1}:`, canvas.width - 12, 27, 0, 20, "right", color);
          Z(N[O].text, canvas.width - 12, 50, 0, 20, "right", color);
        } else {
          color = (Date.now() % 800) < 400 ? "#000" : "#FF9600";
          Z("¡Felicidades! ¡Has completado todos los objetivos!", canvas.width - 12, 27, 0, 20, "right", color);
          Z("¡Presiona aquí para reiniciar y jugar nuevamente!", canvas.width - 12, 50, 0, 20, "right", color);
        }
      }
      ka.forEach((f) => {
        let g = Math.min(f.time / 0.1, 1);
        let n = Math.min(f.time / 0.4, 1);
        let V = 25 * Math.sin(n * Math.PI * 0.5);
        n = 50 * Math.sin(n * Math.PI * 0.5);
        const W = f.c ? 20 : 30;
        const oa = f.c ? 10 : 25;
        Z(f.text, f.x + V, f.y - n, (-5 * Math.PI) / 180, W + Math.sin(g * Math.PI * 0.75) * oa, "center", "#000");
        Z(f.text, f.x + V - 3, f.y - n - 3, (-5 * Math.PI) / 180, W + Math.sin(g * Math.PI * 0.75) * oa, "center", f.color);
      });
      ctx.restore();
    }
    function U(a: number, d: number, f: string, g: string, n?: boolean) {
      ka.push({ x: a, y: d, text: f, color: g, time: 0, c: n || false });
    }
    pa();
    window.requestAnimationFrame(qa);

    return () => {
      document.removeEventListener("mousedown", mouseDownHandler);
      document.removeEventListener("mouseup", mouseUpHandler);
      document.removeEventListener("touchstart", touchStartHandler);
      document.removeEventListener("touchend", touchEndHandler);
      document.removeEventListener("touchcancel", touchCancelHandler);
    };
  }, []);

  return (
    <div
      id="game"
      style={{
        width: "100%",
        height: "100%",
        margin: 0,
        border: 0,
        overflow: "hidden",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "rgba(0, 0, 0, 0)"
      }}
    >
      <canvas
        id="canvas"
        ref={canvasRef}
        width={800}
        height={600}
        style={{ width: "800px", height: "600px" }}
      ></canvas>
    </div>
  );
};

export default AxoFlip;
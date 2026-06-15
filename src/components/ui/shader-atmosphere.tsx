"use client";

import { useEffect, useRef, useState } from "react";

/**
 * A living atmosphere: slow fractal-noise plumes drifting through deep black,
 * lit by a single restrained cool halo. This is the only "colour" on the site.
 * Hand-rolled raw WebGL2 (no library) so we fully control shader linking; falls
 * back to a static CSS gradient when WebGL is unavailable, on mobile, or under
 * reduced motion. The fullscreen triangle is generated from gl_VertexID, so no
 * vertex buffers or attributes are needed.
 */
const VERT = `#version 300 es
void main() {
  vec2 p = vec2(float((gl_VertexID << 1) & 2), float(gl_VertexID & 2));
  gl_Position = vec4(p * 2.0 - 1.0, 0.0, 1.0);
}`;

const FRAG = `#version 300 es
precision highp float;
uniform float uTime;
uniform vec2 uResolution;
uniform vec2 uMouse;
out vec4 fragColor;

float hash(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453123); }
float noise(vec2 p){
  vec2 i = floor(p); vec2 f = fract(p);
  vec2 u = f*f*(3.0-2.0*f);
  return mix(mix(hash(i+vec2(0.0,0.0)), hash(i+vec2(1.0,0.0)), u.x),
             mix(hash(i+vec2(0.0,1.0)), hash(i+vec2(1.0,1.0)), u.x), u.y);
}
float fbm(vec2 p){
  float v = 0.0; float a = 0.5;
  for(int i=0;i<5;i++){ v += a*noise(p); p *= 2.0; a *= 0.5; }
  return v;
}

void main(){
  vec2 uv = gl_FragCoord.xy / uResolution.xy;
  vec2 p = (gl_FragCoord.xy - 0.5*uResolution.xy) / uResolution.y;

  float t = uTime * 0.035;
  vec2 q = vec2(fbm(p*1.6 + t), fbm(p*1.6 - t + 4.3));
  float clouds = fbm(p*2.2 + q*1.4 + vec2(0.0, t*0.6));

  vec2 center = vec2(0.5 + (uMouse.x-0.5)*0.18, 0.62 + (uMouse.y-0.5)*0.12);
  float d = distance(uv, center);
  float halo = smoothstep(0.85, 0.0, d);

  vec3 cool = vec3(0.30, 0.34, 0.62);   // faint indigo
  vec3 warm = vec3(0.42, 0.40, 0.46);   // dusty violet-grey
  vec3 col = mix(warm, cool, clouds);

  float glow = pow(clouds, 2.2) * halo;
  col *= glow * 1.35;

  col *= smoothstep(1.15, 0.15, d);   // vignette to pure black
  col = max(col, vec3(0.0));
  col = col / (col + 0.6);             // gentle filmic lift

  fragColor = vec4(col, 1.0);
}`;

function makeShader(gl: WebGL2RenderingContext, type: number, src: string) {
  const s = gl.createShader(type)!;
  gl.shaderSource(s, src);
  gl.compileShader(s);
  return gl.getShaderParameter(s, gl.COMPILE_STATUS) ? s : null;
}

export function ShaderAtmosphere({ className = "" }: { className?: string }) {
  const ref = useRef<HTMLCanvasElement>(null);
  const [failed, setFailed] = useState(false);

  // Imported with `ssr: false`, so `window` is always defined here.
  const allowed =
    typeof window !== "undefined" &&
    !window.matchMedia("(prefers-reduced-motion: reduce)").matches &&
    !window.matchMedia("(max-width: 767px)").matches;

  useEffect(() => {
    const canvas = ref.current;
    if (!allowed || !canvas) return;

    const gl = canvas.getContext("webgl2", { alpha: false, antialias: false });
    const vs = gl && makeShader(gl, gl.VERTEX_SHADER, VERT);
    const fs = gl && makeShader(gl, gl.FRAGMENT_SHADER, FRAG);
    if (!gl || !vs || !fs) {
      setFailed(true);
      return;
    }

    const prog = gl.createProgram()!;
    gl.attachShader(prog, vs);
    gl.attachShader(prog, fs);
    gl.linkProgram(prog);
    if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) {
      setFailed(true);
      return;
    }
    gl.useProgram(prog);
    gl.bindVertexArray(gl.createVertexArray());

    const uTime = gl.getUniformLocation(prog, "uTime");
    const uRes = gl.getUniformLocation(prog, "uResolution");
    const uMouse = gl.getUniformLocation(prog, "uMouse");
    const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
    const target = [0.5, 0.5];
    const cur = [0.5, 0.5];

    const resize = () => {
      const w = canvas.clientWidth || window.innerWidth;
      const h = canvas.clientHeight || window.innerHeight;
      canvas.width = Math.floor(w * dpr);
      canvas.height = Math.floor(h * dpr);
      gl.viewport(0, 0, canvas.width, canvas.height);
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);

    const onMove = (e: PointerEvent) => {
      target[0] = e.clientX / window.innerWidth;
      target[1] = 1 - e.clientY / window.innerHeight;
    };
    window.addEventListener("pointermove", onMove, { passive: true });

    let raf = 0;
    let running = true;
    const loop = (time: number) => {
      if (!running) return;
      cur[0] += (target[0] - cur[0]) * 0.04;
      cur[1] += (target[1] - cur[1]) * 0.04;
      gl.uniform1f(uTime, time * 0.001);
      gl.uniform2f(uRes, canvas.width, canvas.height);
      gl.uniform2f(uMouse, cur[0], cur[1]);
      gl.drawArrays(gl.TRIANGLES, 0, 3);
      raf = requestAnimationFrame(loop);
    };

    // Pause when the hero scrolls out of view to spare the GPU.
    const io = new IntersectionObserver(
      ([entry]) => {
        running = entry.isIntersecting;
        if (running) raf = requestAnimationFrame(loop);
        else cancelAnimationFrame(raf);
      },
      { threshold: 0 },
    );
    io.observe(canvas);
    raf = requestAnimationFrame(loop);

    return () => {
      running = false;
      cancelAnimationFrame(raf);
      io.disconnect();
      ro.disconnect();
      window.removeEventListener("pointermove", onMove);
      // Note: deliberately NOT calling loseContext() — under React StrictMode's
      // dev double-invoke it would kill the context before the second mount can
      // reuse it. The context is released when the canvas unmounts.
    };
  }, [allowed]);

  return (
    <div className={`absolute inset-0 ${className}`} aria-hidden="true">
      {/* Static fallback / paint-before-WebGL layer (good for LCP) */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(120% 90% at 50% 65%, rgba(58,62,120,0.35), rgba(20,20,30,0.0) 55%), radial-gradient(80% 60% at 50% 40%, rgba(109,124,255,0.10), transparent 60%), #000",
        }}
      />
      {allowed && !failed && (
        <canvas ref={ref} className="absolute inset-0 h-full w-full" />
      )}
    </div>
  );
}

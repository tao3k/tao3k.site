import { useEffect, useRef } from "react";

const vertexShaderSource = `
attribute vec2 a_position;
void main() {
  gl_Position = vec4(a_position, 0.0, 1.0);
}
`;

const fragmentShaderSource = `
precision mediump float;

uniform sampler2D u_image;
uniform vec2 u_resolution;
uniform vec2 u_image_resolution;
uniform float u_time;

float softRange(float value, float start, float end) {
  return smoothstep(start, start + 0.055, value) *
    (1.0 - smoothstep(end - 0.055, end, value));
}

float ellipseMask(vec2 point, vec2 center, vec2 radius) {
  float distanceFromCenter = length((point - center) / radius);
  return 1.0 - smoothstep(0.78, 1.0, distanceFromCenter);
}

float hashNoise(vec2 point) {
  return fract(sin(dot(point, vec2(127.1, 311.7))) * 43758.5453);
}

float valueNoise(vec2 point) {
  vec2 cell = floor(point);
  vec2 local = fract(point);
  local = local * local * (3.0 - 2.0 * local);
  return mix(
    mix(hashNoise(cell), hashNoise(cell + vec2(1.0, 0.0)), local.x),
    mix(hashNoise(cell + vec2(0.0, 1.0)), hashNoise(cell + vec2(1.0, 1.0)), local.x),
    local.y
  );
}

void main() {
  vec2 screenUv = gl_FragCoord.xy / u_resolution;
  screenUv.y = 1.0 - screenUv.y;

  float screenAspect = u_resolution.x / u_resolution.y;
  float imageAspect = u_image_resolution.x / u_image_resolution.y;
  vec2 coverScale = vec2(1.0);
  if (screenAspect > imageAspect) {
    coverScale.y = imageAspect / screenAspect;
  } else {
    coverScale.x = screenAspect / imageAspect;
  }

  vec2 imageUv = (screenUv - 0.5) * coverScale + 0.5;
  vec4 base = texture2D(u_image, imageUv);

  float bridgeRegion = softRange(imageUv.x, 0.17, 0.60) *
    (1.0 - smoothstep(0.34, 0.43, imageUv.y));
  float foregroundPlanter = ellipseMask(imageUv, vec2(0.34, 0.88), vec2(0.22, 0.15));
  float middlePlanter = ellipseMask(imageUv, vec2(0.48, 0.75), vec2(0.13, 0.11));
  float foregroundRootAnchor = pow(clamp((0.98 - imageUv.y) / 0.18, 0.0, 1.0), 1.45);
  float middleRootAnchor = pow(clamp((0.88 - imageUv.y) / 0.16, 0.0, 1.0), 1.45);
  float greenOverRed = base.g - base.r;
  float greenOverBlue = base.g - base.b * 0.88;
  float foliageColor = smoothstep(-0.035, 0.025, min(greenOverRed, greenOverBlue));
  float planterFoliageColor = smoothstep(
    0.002,
    0.052,
    min(greenOverRed, base.g - base.b * 0.94)
  );
  float luminance = dot(base.rgb, vec3(0.299, 0.587, 0.114));
  float visibleDetail = smoothstep(0.004, 0.09, luminance);
  float colorDetail = foliageColor * (0.48 + visibleDetail * 0.52);
  float bridgeMask = min(1.0, bridgeRegion * colorDetail);
  float planterGeometry = foregroundPlanter * foregroundRootAnchor +
    middlePlanter * middleRootAnchor;
  float planterMask = min(
    1.0,
    planterGeometry * planterFoliageColor * (0.34 + visibleDetail * 0.66)
  );

  float primaryWind = sin(u_time * 1.05 + imageUv.x * 24.0 + imageUv.y * 8.0);
  float leafPhase = sin(u_time * 1.62 + imageUv.x * 49.0 - imageUv.y * 29.0);
  float planterGust = valueNoise(vec2(u_time * 0.2, imageUv.y * 4.0)) * 2.0 - 1.0;
  float planterWind = sin(u_time * 0.82 + imageUv.x * 13.0) * 0.72 +
    planterGust * 0.28;
  float planterLeafPhase = valueNoise(
    imageUv * vec2(96.0, 118.0) + vec2(u_time * 0.48, -u_time * 0.21)
  ) * 2.0 - 1.0;
  vec2 bridgeDisplacement = vec2(
    (primaryWind * 0.0038 + leafPhase * 0.0012) * bridgeMask,
    leafPhase * 0.00085 * bridgeMask
  );
  vec2 planterDisplacement = vec2(
    (planterWind * 0.0042 + planterLeafPhase * 0.00095) * planterMask,
    planterLeafPhase * 0.00012 * planterMask
  );
  vec2 displacement = bridgeDisplacement + planterDisplacement;
  vec4 moved = texture2D(u_image, imageUv + displacement);

  gl_FragColor = vec4(moved.rgb, 1.0);
}
`;

function compileShader(gl: WebGLRenderingContext, type: number, source: string) {
  const shader = gl.createShader(type);
  if (!shader) throw new Error("Unable to allocate foliage shader");
  gl.shaderSource(shader, source);
  gl.compileShader(shader);
  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    const message = gl.getShaderInfoLog(shader) ?? "Unknown foliage shader failure";
    gl.deleteShader(shader);
    throw new Error(message);
  }
  return shader;
}

export function TrustKernelFoliage({ source }: { readonly source: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const host = canvas?.parentElement;
    if (
      !canvas ||
      !host ||
      window.matchMedia("(max-width: 760px), (prefers-reduced-motion: reduce)").matches
    ) {
      return;
    }

    const gl = canvas.getContext("webgl", {
      alpha: false,
      antialias: false,
      depth: false,
      powerPreference: "low-power",
      preserveDrawingBuffer: false,
    });
    if (!gl) return;

    const vertexShader = compileShader(gl, gl.VERTEX_SHADER, vertexShaderSource);
    const fragmentShader = compileShader(gl, gl.FRAGMENT_SHADER, fragmentShaderSource);
    const program = gl.createProgram();
    if (!program) return;
    gl.attachShader(program, vertexShader);
    gl.attachShader(program, fragmentShader);
    gl.linkProgram(program);
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      throw new Error(gl.getProgramInfoLog(program) ?? "Unable to link foliage shader");
    }

    const buffer = gl.createBuffer();
    const texture = gl.createTexture();
    if (!buffer || !texture) return;
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array([-1, -1, 1, -1, -1, 1, -1, 1, 1, -1, 1, 1]),
      gl.STATIC_DRAW,
    );
    gl.useProgram(program);
    const position = gl.getAttribLocation(program, "a_position");
    gl.enableVertexAttribArray(position);
    gl.vertexAttribPointer(position, 2, gl.FLOAT, false, 0, 0);

    gl.activeTexture(gl.TEXTURE0);
    gl.bindTexture(gl.TEXTURE_2D, texture);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);

    const resolution = gl.getUniformLocation(program, "u_resolution");
    const imageResolution = gl.getUniformLocation(program, "u_image_resolution");
    const time = gl.getUniformLocation(program, "u_time");
    gl.uniform1i(gl.getUniformLocation(program, "u_image"), 0);

    const image = new Image();
    image.crossOrigin = "anonymous";
    image.decoding = "async";
    let imageReady = false;
    let visible = false;
    let running = false;
    let frame = 0;
    let lastRender = 0;

    const resize = () => {
      const ratio = Math.min(window.devicePixelRatio, 1);
      const width = Math.max(1, Math.round(host.clientWidth * ratio));
      const height = Math.max(1, Math.round(host.clientHeight * ratio));
      if (canvas.width === width && canvas.height === height) return;
      canvas.width = width;
      canvas.height = height;
      gl.viewport(0, 0, width, height);
      gl.uniform2f(resolution, width, height);
    };

    const render = (timestamp: number) => {
      if (timestamp - lastRender < 32) {
        frame = requestAnimationFrame(render);
        return;
      }
      lastRender = timestamp;
      resize();
      gl.uniform1f(time, timestamp / 1000);
      gl.drawArrays(gl.TRIANGLES, 0, 6);
      canvas.dataset.ready = "true";
      frame = requestAnimationFrame(render);
    };

    const updateActivity = () => {
      const shouldRun = imageReady && visible && !document.hidden;
      if (shouldRun && !running) {
        running = true;
        frame = requestAnimationFrame(render);
      } else if (!shouldRun && running) {
        running = false;
        cancelAnimationFrame(frame);
      }
    };

    image.addEventListener("load", () => {
      gl.bindTexture(gl.TEXTURE_2D, texture);
      gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, image);
      gl.uniform2f(imageResolution, image.naturalWidth, image.naturalHeight);
      imageReady = true;
      updateActivity();
    });
    image.src = source;

    const intersectionObserver = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      updateActivity();
    });
    intersectionObserver.observe(host);
    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(host);
    const onVisibility = () => updateActivity();
    document.addEventListener("visibilitychange", onVisibility);

    return () => {
      cancelAnimationFrame(frame);
      intersectionObserver.disconnect();
      resizeObserver.disconnect();
      document.removeEventListener("visibilitychange", onVisibility);
      gl.deleteTexture(texture);
      gl.deleteBuffer(buffer);
      gl.deleteProgram(program);
      gl.deleteShader(vertexShader);
      gl.deleteShader(fragmentShader);
    };
  }, [source]);

  return <canvas ref={canvasRef} className="tao3k-trust-hero__foliage-canvas" aria-hidden="true" />;
}

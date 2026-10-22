import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { soundFx } from '../utils/soundFx';
import { projects } from '../data/projects';
import { Volume2, VolumeX, Terminal as TerminalIcon, Sparkles } from 'lucide-react';

interface Hero3DCanvasProps {
  onSelectProject?: (projectId: string) => void;
  onOpenTerminal?: () => void;
}

interface BeaconNode {
  id: string;
  name: string;
  category: string;
  radius: number;
  speed: number;
  angle: number;
  yOffset: number;
  tilt: { x: number; y: number; z: number };
  color: number;
  mesh?: THREE.Mesh;
  glowMesh?: THREE.Mesh;
}

export function Hero3DCanvas({ onSelectProject, onOpenTerminal }: Hero3DCanvasProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const [hoveredNode, setHoveredNode] = useState<{ name: string; category: string; x: number; y: number } | null>(null);
  const [isMuted, setIsMuted] = useState(soundFx.isMuted());

  useEffect(() => {
    const container = containerRef.current;
    const canvas = canvasRef.current;
    if (!container || !canvas) return;

    // Check WebGL availability
    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({
        canvas,
        antialias: true,
        alpha: true,
        powerPreference: 'high-performance',
      });
    } catch (e) {
      console.warn('WebGL initialization failed, falling back', e);
      return;
    }

    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x060913, 0.035);

    const camera = new THREE.PerspectiveCamera(50, container.clientWidth / container.clientHeight, 0.1, 100);
    camera.position.set(0, 2.2, 9.5);

    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    // Lights
    const ambientLight = new THREE.AmbientLight(0x0a192f, 2.0);
    scene.add(ambientLight);

    const cyanPoint = new THREE.PointLight(0x00f2fe, 4.5, 30);
    cyanPoint.position.set(5, 5, 5);
    scene.add(cyanPoint);

    const violetPoint = new THREE.PointLight(0x8a2be2, 4.0, 30);
    violetPoint.position.set(-5, -4, 4);
    scene.add(violetPoint);

    const emeraldPoint = new THREE.PointLight(0x00e676, 2.5, 20);
    emeraldPoint.position.set(0, 6, -3);
    scene.add(emeraldPoint);

    // 1. Central Neural Quantum Core (Layered Geometry)
    const coreGroup = new THREE.Group();
    scene.add(coreGroup);

    // Inner glowing icosahedron
    const innerGeo = new THREE.IcosahedronGeometry(1.35, 1);
    const innerMat = new THREE.MeshStandardMaterial({
      color: 0x00f2fe,
      emissive: 0x0077aa,
      emissiveIntensity: 0.9,
      wireframe: true,
      transparent: true,
      opacity: 0.85,
    });
    const innerMesh = new THREE.Mesh(innerGeo, innerMat);
    coreGroup.add(innerMesh);

    // Solid inner heart
    const heartGeo = new THREE.OctahedronGeometry(0.7, 0);
    const heartMat = new THREE.MeshStandardMaterial({
      color: 0x8a2be2,
      emissive: 0x5500aa,
      emissiveIntensity: 1.2,
      roughness: 0.2,
      metalness: 0.8,
    });
    const heartMesh = new THREE.Mesh(heartGeo, heartMat);
    coreGroup.add(heartMesh);

    // Outer crystalline wireframe
    const outerGeo = new THREE.DodecahedronGeometry(2.0, 0);
    const outerMat = new THREE.MeshStandardMaterial({
      color: 0xc084fc,
      wireframe: true,
      transparent: true,
      opacity: 0.35,
    });
    const outerMesh = new THREE.Mesh(outerGeo, outerMat);
    coreGroup.add(outerMesh);

    // 2. Cyber Horizon Grid
    const gridHelper = new THREE.GridHelper(30, 40, 0x00f2fe, 0x1e293b);
    gridHelper.position.y = -3.2;
    scene.add(gridHelper);

    // 3. Stardust / Neural Particles Swarm (2,400 particles)
    const particleCount = 2400;
    const particleGeo = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);

    const palette = [
      new THREE.Color(0x00f2fe), // Cyan
      new THREE.Color(0x8a2be2), // Violet
      new THREE.Color(0x00e676), // Emerald
      new THREE.Color(0x38bdf8), // Sky
    ];

    for (let i = 0; i < particleCount; i++) {
      const i3 = i * 3;
      const radius = 3.2 + Math.random() * 8.5;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(Math.random() * 2 - 1);

      positions[i3] = radius * Math.sin(phi) * Math.cos(theta);
      positions[i3 + 1] = (radius * Math.sin(phi) * Math.sin(theta)) * 0.7;
      positions[i3 + 2] = radius * Math.cos(phi);

      const col = palette[Math.floor(Math.random() * palette.length)];
      colors[i3] = col.r;
      colors[i3 + 1] = col.g;
      colors[i3 + 2] = col.b;
    }

    particleGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    particleGeo.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    const particleMat = new THREE.PointsMaterial({
      size: 0.055,
      vertexColors: true,
      transparent: true,
      opacity: 0.75,
      blending: THREE.AdditiveBlending,
    });

    const particles = new THREE.Points(particleGeo, particleMat);
    scene.add(particles);

    // 4. Orbit Rings & Project Beacons
    const featuredProjects = projects.filter((p) => p.featured).slice(0, 6);
    const ringSpecs = [
      { radius: 3.2, tilt: { x: 0.6, y: 0.2, z: 0.3 }, color: 0x00f2fe },
      { radius: 4.4, tilt: { x: -0.5, y: 0.4, z: -0.2 }, color: 0x8a2be2 },
      { radius: 5.6, tilt: { x: 0.3, y: -0.6, z: 0.5 }, color: 0x00e676 },
    ];

    // Build visual orbit rings
    ringSpecs.forEach((spec) => {
      const ringGeo = new THREE.TorusGeometry(spec.radius, 0.015, 8, 80);
      const ringMat = new THREE.MeshBasicMaterial({
        color: spec.color,
        transparent: true,
        opacity: 0.25,
      });
      const ringMesh = new THREE.Mesh(ringGeo, ringMat);
      ringMesh.rotation.x = spec.tilt.x;
      ringMesh.rotation.y = spec.tilt.y;
      ringMesh.rotation.z = spec.tilt.z;
      scene.add(ringMesh);
    });

    // Create interactive beacon nodes
    const beacons: BeaconNode[] = featuredProjects.map((p, index) => {
      const ring = ringSpecs[index % ringSpecs.length];
      const colorsMap = [0x00f2fe, 0x8a2be2, 0x00e676, 0x38bdf8, 0xf59e0b, 0xec4899];
      const color = colorsMap[index % colorsMap.length];

      // Physical beacon sphere
      const beaconGeo = new THREE.SphereGeometry(0.18, 16, 16);
      const beaconMat = new THREE.MeshStandardMaterial({
        color,
        emissive: color,
        emissiveIntensity: 1.2,
        roughness: 0.2,
      });
      const mesh = new THREE.Mesh(beaconGeo, beaconMat);
      mesh.userData = { id: p.id, name: p.title, category: p.category };
      scene.add(mesh);

      // Outer glow pulse
      const glowGeo = new THREE.SphereGeometry(0.26, 12, 12);
      const glowMat = new THREE.MeshBasicMaterial({
        color,
        wireframe: true,
        transparent: true,
        opacity: 0.45,
      });
      const glowMesh = new THREE.Mesh(glowGeo, glowMat);
      scene.add(glowMesh);

      return {
        id: p.id,
        name: p.title,
        category: p.category,
        radius: ring.radius,
        speed: 0.25 + (index * 0.08),
        angle: (index / featuredProjects.length) * Math.PI * 2,
        yOffset: 0,
        tilt: ring.tilt,
        color,
        mesh,
        glowMesh,
      };
    });

    // Mouse, Raycasting & Drag Interaction State
    const mouse = new THREE.Vector2(-999, -999);
    const targetCameraPos = new THREE.Vector3(0, 2.2, 9.5);
    const raycaster = new THREE.Raycaster();
    let isDragging = false;
    let prevMousePos = { x: 0, y: 0 };
    let sphericalCoords = { radius: 9.5, theta: 0, phi: Math.PI / 2.3 };

    const handlePointerDown = (e: MouseEvent | TouchEvent) => {
      isDragging = true;
      const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
      const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;
      prevMousePos = { x: clientX, y: clientY };
    };

    const handlePointerMove = (e: MouseEvent | TouchEvent) => {
      const rect = container.getBoundingClientRect();
      const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
      const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;

      mouse.x = ((clientX - rect.left) / rect.width) * 2 - 1;
      mouse.y = -(((clientY - rect.top) / rect.height) * 2 - 1);

      if (isDragging) {
        const deltaX = clientX - prevMousePos.x;
        const deltaY = clientY - prevMousePos.y;
        sphericalCoords.theta -= deltaX * 0.006;
        sphericalCoords.phi = Math.max(0.3, Math.min(Math.PI - 0.3, sphericalCoords.phi - deltaY * 0.006));
        prevMousePos = { x: clientX, y: clientY };
      }
    };

    const handlePointerUp = () => {
      isDragging = false;
    };

    const handleClick = () => {
      raycaster.setFromCamera(mouse, camera);
      const beaconMeshes = beacons.map((b) => b.mesh).filter(Boolean) as THREE.Mesh[];
      const intersects = raycaster.intersectObjects(beaconMeshes);

      if (intersects.length > 0) {
        const target = intersects[0].object;
        const data = target.userData as { id: string; name: string };
        soundFx.playWarp();
        if (onSelectProject) {
          onSelectProject(data.id);
        }
      }
    };

    const domTarget = container;
    domTarget.addEventListener('mousedown', handlePointerDown);
    window.addEventListener('mousemove', handlePointerMove);
    window.addEventListener('mouseup', handlePointerUp);
    domTarget.addEventListener('touchstart', handlePointerDown, { passive: true });
    window.addEventListener('touchmove', handlePointerMove, { passive: true });
    window.addEventListener('touchend', handlePointerUp);
    domTarget.addEventListener('click', handleClick);

    // Resize Observer
    const resizeObserver = new ResizeObserver(() => {
      if (!container) return;
      const width = container.clientWidth;
      const height = container.clientHeight;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    });
    resizeObserver.observe(container);

    // Animation Loop
    let animationFrameId: number;
    let clock = new THREE.Clock();
    let isVisible = true;

    const visibilityObserver = new IntersectionObserver(([entry]) => {
      isVisible = entry.isIntersecting;
    });
    visibilityObserver.observe(container);

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      if (!isVisible) return;

      const elapsedTime = clock.getElapsedTime();

      // 1. Core rotation & organic breathing
      coreGroup.rotation.y = elapsedTime * 0.35;
      coreGroup.rotation.x = Math.sin(elapsedTime * 0.25) * 0.2;
      outerMesh.rotation.y = -elapsedTime * 0.2;
      outerMesh.rotation.z = Math.cos(elapsedTime * 0.15) * 0.2;

      const pulseScale = 1.0 + Math.sin(elapsedTime * 2.4) * 0.06;
      innerMesh.scale.set(pulseScale, pulseScale, pulseScale);

      // 2. Particle swarm drift
      particles.rotation.y = elapsedTime * 0.04;
      particles.rotation.x = Math.sin(elapsedTime * 0.03) * 0.05;

      // 3. Move orbiting beacons along tilted paths
      beacons.forEach((beacon) => {
        const angle = beacon.angle + elapsedTime * beacon.speed;
        const rawX = Math.cos(angle) * beacon.radius;
        const rawZ = Math.sin(angle) * beacon.radius;

        // Apply Euler tilt matrix math
        const vec = new THREE.Vector3(rawX, 0, rawZ);
        vec.applyEuler(new THREE.Euler(beacon.tilt.x, beacon.tilt.y, beacon.tilt.z));

        if (beacon.mesh) {
          beacon.mesh.position.copy(vec);
        }
        if (beacon.glowMesh) {
          beacon.glowMesh.position.copy(vec);
          const glowScale = 1.0 + Math.sin(elapsedTime * 4.0 + beacon.radius) * 0.15;
          beacon.glowMesh.scale.set(glowScale, glowScale, glowScale);
        }
      });

      // 4. Raycast Hover detection
      raycaster.setFromCamera(mouse, camera);
      const beaconMeshes = beacons.map((b) => b.mesh).filter(Boolean) as THREE.Mesh[];
      const intersects = raycaster.intersectObjects(beaconMeshes);

      if (intersects.length > 0) {
        const hit = intersects[0].object;
        const hitBeacon = beacons.find((b) => b.mesh === hit);
        if (hitBeacon) {
          // Project 3D coordinate to 2D screen coordinate
          const hitPos = hit.position.clone();
          hitPos.project(camera);
          const screenX = (hitPos.x * 0.5 + 0.5) * container.clientWidth;
          const screenY = (-(hitPos.y * 0.5) + 0.5) * container.clientHeight;

          setHoveredNode({
            name: hitBeacon.name,
            category: hitBeacon.category,
            x: screenX,
            y: screenY,
          });
          document.body.style.cursor = 'pointer';
        }
      } else {
        setHoveredNode(null);
        document.body.style.cursor = 'default';
      }

      // 5. Camera positioning with smooth lerp
      targetCameraPos.x = sphericalCoords.radius * Math.sin(sphericalCoords.phi) * Math.sin(sphericalCoords.theta) + mouse.x * 0.6;
      targetCameraPos.y = sphericalCoords.radius * Math.cos(sphericalCoords.phi) - mouse.y * 0.4;
      targetCameraPos.z = sphericalCoords.radius * Math.sin(sphericalCoords.phi) * Math.cos(sphericalCoords.theta);

      camera.position.lerp(targetCameraPos, 0.05);
      camera.lookAt(0, 0, 0);

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
      resizeObserver.disconnect();
      visibilityObserver.disconnect();
      domTarget.removeEventListener('mousedown', handlePointerDown);
      window.removeEventListener('mousemove', handlePointerMove);
      window.removeEventListener('mouseup', handlePointerUp);
      domTarget.removeEventListener('touchstart', handlePointerDown);
      window.removeEventListener('touchmove', handlePointerMove);
      window.removeEventListener('touchend', handlePointerUp);
      domTarget.removeEventListener('click', handleClick);
      document.body.style.cursor = 'default';
      renderer.dispose();
    };
  }, [onSelectProject]);

  const handleToggleSound = () => {
    const nextMuted = soundFx.toggleMute();
    setIsMuted(nextMuted);
  };

  return (
    <div
      ref={containerRef}
      className="relative w-full h-[540px] md:h-[680px] lg:h-[760px] rounded-3xl overflow-hidden bg-gradient-to-b from-[#060913]/90 via-[#0a0f1d]/70 to-[#060913]/95 border border-cyan-500/20 shadow-[0_0_50px_rgba(0,242,254,0.08)] select-none"
    >
      {/* Three.js Canvas */}
      <canvas ref={canvasRef} className="w-full h-full block cursor-grab active:cursor-grabbing" />

      {/* Cyber Grid Overlay lines & Scanlines */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_40%,rgba(6,9,19,0.85)_100%)]" />
      <div
        className="pointer-events-none absolute inset-0 opacity-15"
        style={{
          backgroundImage: 'linear-gradient(rgba(0, 242, 254, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(0, 242, 254, 0.1) 1px, transparent 1px)',
          backgroundSize: '40px 40px',
        }}
      />

      {/* Top HUD Telemetry Bar */}
      <div className="absolute top-4 left-4 right-4 flex items-center justify-between text-xs font-mono pointer-events-none z-10">
        <div className="flex items-center gap-2 pointer-events-auto">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-500"></span>
          </span>
          <span className="text-cyan-400 font-semibold tracking-wider">3D NEURAL CORE // ONLINE</span>
          <span className="hidden sm:inline-block text-slate-500">•</span>
          <span className="hidden sm:inline-block text-slate-400">60 FPS GLSL SHADER</span>
        </div>

        <div className="flex items-center gap-2 pointer-events-auto">
          <button
            onClick={handleToggleSound}
            aria-label={isMuted ? 'Unmute sound effects' : 'Mute sound effects'}
            className="flex items-center gap-1 px-2.5 py-1 rounded-md bg-slate-900/80 border border-slate-700/80 text-slate-300 hover:text-cyan-400 hover:border-cyan-500/50 transition-all text-[11px]"
          >
            {isMuted ? <VolumeX className="w-3.5 h-3.5 text-slate-500" /> : <Volume2 className="w-3.5 h-3.5 text-cyan-400" />}
            <span className="hidden sm:inline">{isMuted ? 'SFX OFF' : 'SFX ON'}</span>
          </button>

          {onOpenTerminal && (
            <button
              onClick={() => {
                soundFx.playClick();
                onOpenTerminal();
              }}
              className="flex items-center gap-1.5 px-3 py-1 rounded-md bg-cyan-500/15 border border-cyan-400/40 text-cyan-300 hover:bg-cyan-500/25 hover:border-cyan-300 transition-all text-[11px] font-bold shadow-[0_0_15px_rgba(0,242,254,0.2)]"
            >
              <TerminalIcon className="w-3.5 h-3.5" />
              <span>FOOL-CLI</span>
            </button>
          )}
        </div>
      </div>

      {/* Floating 3D Hover Tooltip */}
      {hoveredNode && (
        <div
          className="pointer-events-none absolute z-30 transform -translate-x-1/2 -translate-y-full mb-3 px-3 py-1.5 rounded-lg bg-slate-950/95 border border-cyan-400/80 shadow-[0_0_20px_rgba(0,242,254,0.4)] text-left backdrop-blur-md animate-in fade-in zoom-in-95 duration-150"
          style={{ left: `${hoveredNode.x}px`, top: `${hoveredNode.y}px` }}
        >
          <div className="flex items-center gap-1.5 text-cyan-400 font-bold text-xs font-mono">
            <Sparkles className="w-3 h-3 animate-spin" />
            <span>{hoveredNode.name}</span>
          </div>
          <div className="text-[10px] text-slate-400 font-mono tracking-tight">{hoveredNode.category}</div>
          <div className="text-[9px] text-cyan-300/80 font-mono mt-0.5">Click to inspect dossier ↗</div>
        </div>
      )}

      {/* Bottom Control Instructions */}
      <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between text-[11px] font-mono text-slate-400 pointer-events-none z-10">
        <div className="flex flex-col gap-0.5">
          <div className="text-slate-300 flex items-center gap-1.5">
            <span className="text-cyan-400">❖</span> Drag cursor / touch to rotate 3D nexus
          </div>
          <div className="text-slate-500">Hover & click orbiting nodes to inspect live systems</div>
        </div>
        <div className="text-right hidden sm:block text-slate-500">
          <span>COORDS: 17.6868° N, 83.2185° E</span>
          <br />
          <span className="text-slate-600">VIZAG // ARCH: QUANTUM-NEURAL</span>
        </div>
      </div>
    </div>
  );
}

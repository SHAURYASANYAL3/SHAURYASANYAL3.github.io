import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { soundFx } from '../utils/soundFx';
import { projects } from '../data/projects';
import { Volume2, VolumeX, Terminal as TerminalIcon, Sparkles, Orbit, Compass } from 'lucide-react';

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
  trailMesh?: THREE.Line;
}

interface Shockwave {
  mesh: THREE.Mesh;
  radius: number;
  maxRadius: number;
  opacity: number;
  active: boolean;
}

export function Hero3DCanvas({ onSelectProject, onOpenTerminal }: Hero3DCanvasProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const [hoveredNode, setHoveredNode] = useState<{ name: string; category: string; x: number; y: number } | null>(null);
  const [isMuted, setIsMuted] = useState(soundFx.isMuted());
  const [autoRotate, setAutoRotate] = useState(true);

  useEffect(() => {
    const container = containerRef.current;
    const canvas = canvasRef.current;
    if (!container || !canvas) return;

    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({
        canvas,
        antialias: true,
        alpha: true,
        powerPreference: 'high-performance',
      });
    } catch (e) {
      console.warn('WebGL init failed, fallback', e);
      return;
    }

    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x05070f, 0.032);

    const camera = new THREE.PerspectiveCamera(48, container.clientWidth / container.clientHeight, 0.1, 100);
    camera.position.set(0, 2.0, 9.2);

    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    // Dynamic Multi-color Lights
    const ambientLight = new THREE.AmbientLight(0x0a1128, 2.5);
    scene.add(ambientLight);

    const cyanPoint = new THREE.PointLight(0x00f2fe, 5.0, 35);
    cyanPoint.position.set(5, 5, 5);
    scene.add(cyanPoint);

    const indigoPoint = new THREE.PointLight(0x6366f1, 4.5, 35);
    indigoPoint.position.set(-6, -4, 4);
    scene.add(indigoPoint);

    const emeraldPoint = new THREE.PointLight(0x10b981, 3.0, 25);
    emeraldPoint.position.set(0, 6, -3);
    scene.add(emeraldPoint);

    // 1. Multi-layered Bioluminescent Core
    const coreGroup = new THREE.Group();
    scene.add(coreGroup);

    // Inner glowing crystal icosahedron
    const innerGeo = new THREE.IcosahedronGeometry(1.4, 2);
    const innerMat = new THREE.MeshStandardMaterial({
      color: 0x00f2fe,
      emissive: 0x0088cc,
      emissiveIntensity: 0.95,
      wireframe: true,
      transparent: true,
      opacity: 0.85,
    });
    const innerMesh = new THREE.Mesh(innerGeo, innerMat);
    coreGroup.add(innerMesh);

    // High-intensity core plasma
    const plasmaGeo = new THREE.SphereGeometry(0.75, 24, 24);
    const plasmaMat = new THREE.MeshStandardMaterial({
      color: 0x6366f1,
      emissive: 0x4f46e5,
      emissiveIntensity: 1.4,
      roughness: 0.1,
      metalness: 0.9,
    });
    const plasmaMesh = new THREE.Mesh(plasmaGeo, plasmaMat);
    coreGroup.add(plasmaMesh);

    // Outer geodesic energy cage
    const outerGeo = new THREE.DodecahedronGeometry(2.1, 1);
    const outerMat = new THREE.MeshStandardMaterial({
      color: 0xa855f7,
      wireframe: true,
      transparent: true,
      opacity: 0.38,
    });
    const outerMesh = new THREE.Mesh(outerGeo, outerMat);
    coreGroup.add(outerMesh);

    // Floating orbital halos
    const haloGeo1 = new THREE.RingGeometry(2.5, 2.54, 64);
    const haloMat1 = new THREE.MeshBasicMaterial({ color: 0x00f2fe, side: THREE.DoubleSide, transparent: true, opacity: 0.4 });
    const halo1 = new THREE.Mesh(haloGeo1, haloMat1);
    halo1.rotation.x = Math.PI / 2.5;
    coreGroup.add(halo1);

    // 2. Cyber Horizon Grid
    const gridHelper = new THREE.GridHelper(36, 45, 0x00f2fe, 0x1e293b);
    gridHelper.position.y = -3.2;
    scene.add(gridHelper);

    // 3. Dynamic Interactive Particle Swarm (2,500 particles with velocity physics)
    const particleCount = 2500;
    const particleGeo = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const originalPositions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);

    const palette = [
      new THREE.Color(0x00f2fe), // Sky Cyan
      new THREE.Color(0x6366f1), // Electric Indigo
      new THREE.Color(0xa855f7), // Hyper Violet
      new THREE.Color(0x10b981), // Emerald
      new THREE.Color(0xf59e0b), // Cyber Gold
    ];

    for (let i = 0; i < particleCount; i++) {
      const i3 = i * 3;
      const radius = 3.0 + Math.random() * 8.5;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(Math.random() * 2 - 1);

      const x = radius * Math.sin(phi) * Math.cos(theta);
      const y = (radius * Math.sin(phi) * Math.sin(theta)) * 0.75;
      const z = radius * Math.cos(phi);

      positions[i3] = x;
      positions[i3 + 1] = y;
      positions[i3 + 2] = z;

      originalPositions[i3] = x;
      originalPositions[i3 + 1] = y;
      originalPositions[i3 + 2] = z;

      const col = palette[Math.floor(Math.random() * palette.length)];
      colors[i3] = col.r;
      colors[i3 + 1] = col.g;
      colors[i3 + 2] = col.b;
    }

    particleGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    particleGeo.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    const particleMat = new THREE.PointsMaterial({
      size: 0.065,
      vertexColors: true,
      transparent: true,
      opacity: 0.82,
      blending: THREE.AdditiveBlending,
    });

    const particles = new THREE.Points(particleGeo, particleMat);
    scene.add(particles);

    // 4. Interactive Click Shockwaves Pool
    const shockwaves: Shockwave[] = [];
    const createShockwaveMesh = () => {
      const geo = new THREE.RingGeometry(0.1, 0.25, 48);
      const mat = new THREE.MeshBasicMaterial({
        color: 0x00f2fe,
        side: THREE.DoubleSide,
        transparent: true,
        opacity: 0,
        blending: THREE.AdditiveBlending,
      });
      const mesh = new THREE.Mesh(geo, mat);
      mesh.visible = false;
      scene.add(mesh);
      return { mesh, radius: 0.1, maxRadius: 8.0, opacity: 0, active: false };
    };

    for (let i = 0; i < 4; i++) {
      shockwaves.push(createShockwaveMesh());
    }

    const triggerShockwave = (position: THREE.Vector3) => {
      const sw = shockwaves.find((s) => !s.active) || shockwaves[0];
      sw.active = true;
      sw.radius = 0.2;
      sw.opacity = 0.9;
      sw.mesh.position.copy(position);
      sw.mesh.lookAt(camera.position);
      sw.mesh.visible = true;
    };

    // 5. 6 Tilted Orbit Rings & Project Beacons
    const featuredProjects = projects.filter((p) => p.featured).slice(0, 6);
    const ringSpecs = [
      { radius: 3.3, tilt: { x: 0.55, y: 0.25, z: 0.2 }, color: 0x00f2fe },
      { radius: 4.5, tilt: { x: -0.45, y: 0.4, z: -0.3 }, color: 0x6366f1 },
      { radius: 5.8, tilt: { x: 0.35, y: -0.55, z: 0.45 }, color: 0x10b981 },
    ];

    // Build visual orbit toruses
    ringSpecs.forEach((spec) => {
      const ringGeo = new THREE.TorusGeometry(spec.radius, 0.016, 12, 100);
      const ringMat = new THREE.MeshBasicMaterial({
        color: spec.color,
        transparent: true,
        opacity: 0.28,
        blending: THREE.AdditiveBlending,
      });
      const ringMesh = new THREE.Mesh(ringGeo, ringMat);
      ringMesh.rotation.x = spec.tilt.x;
      ringMesh.rotation.y = spec.tilt.y;
      ringMesh.rotation.z = spec.tilt.z;
      scene.add(ringMesh);
    });

    // Create interactive project satellites
    const beacons: BeaconNode[] = featuredProjects.map((p, index) => {
      const ring = ringSpecs[index % ringSpecs.length];
      const colorsMap = [0x00f2fe, 0x6366f1, 0x10b981, 0x38bdf8, 0xf59e0b, 0xa855f7];
      const color = colorsMap[index % colorsMap.length];

      const beaconGeo = new THREE.SphereGeometry(0.2, 20, 20);
      const beaconMat = new THREE.MeshStandardMaterial({
        color,
        emissive: color,
        emissiveIntensity: 1.35,
        roughness: 0.15,
        metalness: 0.8,
      });
      const mesh = new THREE.Mesh(beaconGeo, beaconMat);
      mesh.userData = { id: p.id, name: p.title, category: p.category };
      scene.add(mesh);

      const glowGeo = new THREE.SphereGeometry(0.3, 14, 14);
      const glowMat = new THREE.MeshBasicMaterial({
        color,
        wireframe: true,
        transparent: true,
        opacity: 0.5,
        blending: THREE.AdditiveBlending,
      });
      const glowMesh = new THREE.Mesh(glowGeo, glowMat);
      scene.add(glowMesh);

      return {
        id: p.id,
        name: p.title,
        category: p.category,
        radius: ring.radius,
        speed: 0.22 + (index * 0.07),
        angle: (index / featuredProjects.length) * Math.PI * 2,
        yOffset: 0,
        tilt: ring.tilt,
        color,
        mesh,
        glowMesh,
      };
    });

    // Interaction State
    const mouse = new THREE.Vector2(-999, -999);
    const mouseVelocity = new THREE.Vector2(0, 0);
    let lastMousePos = { x: 0, y: 0 };
    const targetCameraPos = new THREE.Vector3(0, 2.0, 9.2);
    const raycaster = new THREE.Raycaster();
    let isDragging = false;
    let prevMousePos = { x: 0, y: 0 };
    let sphericalCoords = { radius: 9.2, theta: 0, phi: Math.PI / 2.3 };

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

      const newX = ((clientX - rect.left) / rect.width) * 2 - 1;
      const newY = -(((clientY - rect.top) / rect.height) * 2 - 1);

      mouseVelocity.x = newX - mouse.x;
      mouseVelocity.y = newY - mouse.y;

      mouse.x = newX;
      mouse.y = newY;

      if (isDragging) {
        const deltaX = clientX - prevMousePos.x;
        const deltaY = clientY - prevMousePos.y;
        sphericalCoords.theta -= deltaX * 0.005;
        sphericalCoords.phi = Math.max(0.35, Math.min(Math.PI - 0.35, sphericalCoords.phi - deltaY * 0.005));
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

      // Trigger 3D Shockwave at intersection or plane
      const plane = new THREE.Plane(new THREE.Vector3(0, 0, 1), 0);
      const intersectionPoint = new THREE.Vector3();
      raycaster.ray.intersectPlane(plane, intersectionPoint);
      triggerShockwave(intersectionPoint);

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

      // 1. Core Kinetic Pulsing
      coreGroup.rotation.y = elapsedTime * 0.32;
      coreGroup.rotation.x = Math.sin(elapsedTime * 0.22) * 0.18;
      outerMesh.rotation.y = -elapsedTime * 0.22;
      outerMesh.rotation.z = Math.cos(elapsedTime * 0.16) * 0.18;
      halo1.rotation.z = elapsedTime * 0.2;

      const pulseScale = 1.0 + Math.sin(elapsedTime * 2.8) * 0.08;
      innerMesh.scale.set(pulseScale, pulseScale, pulseScale);

      const plasmaPulse = 0.95 + Math.sin(elapsedTime * 4.2) * 0.07;
      plasmaMesh.scale.set(plasmaPulse, plasmaPulse, plasmaPulse);

      // 2. Active Shockwaves Expansion
      shockwaves.forEach((sw) => {
        if (sw.active) {
          sw.radius += 0.22;
          sw.opacity = Math.max(0, sw.opacity - 0.024);
          sw.mesh.scale.set(sw.radius, sw.radius, 1);
          (sw.mesh.material as THREE.MeshBasicMaterial).opacity = sw.opacity;
          if (sw.opacity <= 0.01) {
            sw.active = false;
            sw.mesh.visible = false;
          }
        }
      });

      // 3. Dynamic Cursor Particle Disturbance
      const posAttr = particleGeo.attributes.position as THREE.BufferAttribute;
      const posArray = posAttr.array as Float32Array;

      // Subtle particle swirl
      particles.rotation.y = elapsedTime * 0.05;
      particles.rotation.x = Math.sin(elapsedTime * 0.035) * 0.04;

      // 4. Move orbiting project satellites
      beacons.forEach((beacon) => {
        const angle = beacon.angle + elapsedTime * beacon.speed;
        const rawX = Math.cos(angle) * beacon.radius;
        const rawZ = Math.sin(angle) * beacon.radius;

        const vec = new THREE.Vector3(rawX, 0, rawZ);
        vec.applyEuler(new THREE.Euler(beacon.tilt.x, beacon.tilt.y, beacon.tilt.z));

        if (beacon.mesh) {
          beacon.mesh.position.copy(vec);
        }
        if (beacon.glowMesh) {
          beacon.glowMesh.position.copy(vec);
          const glowScale = 1.0 + Math.sin(elapsedTime * 4.5 + beacon.radius) * 0.2;
          beacon.glowMesh.scale.set(glowScale, glowScale, glowScale);
        }
      });

      // 5. Raycasting Hover Check
      raycaster.setFromCamera(mouse, camera);
      const beaconMeshes = beacons.map((b) => b.mesh).filter(Boolean) as THREE.Mesh[];
      const intersects = raycaster.intersectObjects(beaconMeshes);

      if (intersects.length > 0) {
        const hit = intersects[0].object;
        const hitBeacon = beacons.find((b) => b.mesh === hit);
        if (hitBeacon) {
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

      // 6. Smooth Camera Orbiting (Auto-orbit when not dragging)
      if (!isDragging && autoRotate) {
        sphericalCoords.theta += 0.0018;
      }

      targetCameraPos.x = sphericalCoords.radius * Math.sin(sphericalCoords.phi) * Math.sin(sphericalCoords.theta) + mouse.x * 0.65;
      targetCameraPos.y = sphericalCoords.radius * Math.cos(sphericalCoords.phi) - mouse.y * 0.45;
      targetCameraPos.z = sphericalCoords.radius * Math.sin(sphericalCoords.phi) * Math.cos(sphericalCoords.theta);

      camera.position.lerp(targetCameraPos, 0.06);
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
  }, [onSelectProject, autoRotate]);

  const handleToggleSound = () => {
    const nextMuted = soundFx.toggleMute();
    setIsMuted(nextMuted);
  };

  return (
    <div
      ref={containerRef}
      className="relative w-full h-[560px] md:h-[700px] lg:h-[780px] rounded-3xl overflow-hidden bg-gradient-to-b from-[#05070f] via-[#090e1f] to-[#05070f] border border-cyan-500/25 shadow-[0_0_60px_rgba(0,242,254,0.12)] select-none"
    >
      {/* Three.js Canvas */}
      <canvas ref={canvasRef} className="w-full h-full block cursor-grab active:cursor-grabbing" />

      {/* Cyber Grid & Ambient Radial Vignette */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_35%,rgba(5,7,15,0.9)_100%)]" />
      <div
        className="pointer-events-none absolute inset-0 opacity-20"
        style={{
          backgroundImage:
            'linear-gradient(rgba(0, 242, 254, 0.12) 1px, transparent 1px), linear-gradient(90deg, rgba(0, 242, 254, 0.12) 1px, transparent 1px)',
          backgroundSize: '36px 36px',
        }}
      />

      {/* Top HUD Telemetry Bar */}
      <div className="absolute top-4 left-4 right-4 flex items-center justify-between text-xs font-mono pointer-events-none z-10">
        <div className="flex items-center gap-2 pointer-events-auto">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-400"></span>
          </span>
          <span className="text-cyan-300 font-bold tracking-wider">3D QUANTUM CORE // ACTIVE</span>
          <span className="hidden sm:inline-block text-slate-600">•</span>
          <span className="hidden sm:inline-block text-indigo-300">SHOCKWAVES ON CLICK</span>
        </div>

        <div className="flex items-center gap-2 pointer-events-auto">
          <button
            onClick={() => setAutoRotate(!autoRotate)}
            aria-label="Toggle auto rotation"
            className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-slate-900/80 border border-slate-700/80 text-slate-300 hover:text-cyan-400 hover:border-cyan-500/50 transition-all text-[11px]"
          >
            <Orbit className={`w-3.5 h-3.5 ${autoRotate ? 'text-cyan-400 animate-spin' : 'text-slate-500'}`} />
            <span className="hidden sm:inline">{autoRotate ? 'AUTO-ORBIT' : 'MANUAL'}</span>
          </button>

          <button
            onClick={handleToggleSound}
            aria-label={isMuted ? 'Unmute sound effects' : 'Mute sound effects'}
            className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-slate-900/80 border border-slate-700/80 text-slate-300 hover:text-cyan-400 hover:border-cyan-500/50 transition-all text-[11px]"
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
              className="flex items-center gap-1.5 px-3 py-1 rounded-lg bg-gradient-to-r from-cyan-500/20 to-indigo-500/20 border border-cyan-400/50 text-cyan-300 hover:brightness-125 transition-all text-[11px] font-bold shadow-[0_0_15px_rgba(0,242,254,0.2)]"
            >
              <TerminalIcon className="w-3.5 h-3.5 text-cyan-300" />
              <span>FOOL-CLI</span>
            </button>
          )}
        </div>
      </div>

      {/* Floating 3D Hover Tooltip */}
      {hoveredNode && (
        <div
          className="pointer-events-none absolute z-30 transform -translate-x-1/2 -translate-y-full mb-3 px-3.5 py-2 rounded-xl bg-slate-950/95 border border-cyan-400/80 shadow-[0_0_25px_rgba(0,242,254,0.45)] text-left backdrop-blur-md animate-in fade-in zoom-in-95 duration-150"
          style={{ left: `${hoveredNode.x}px`, top: `${hoveredNode.y}px` }}
        >
          <div className="flex items-center gap-1.5 text-cyan-300 font-bold text-xs font-mono">
            <Sparkles className="w-3.5 h-3.5 text-cyan-400 animate-spin" />
            <span>{hoveredNode.name}</span>
          </div>
          <div className="text-[10px] text-slate-400 font-mono tracking-tight mt-0.5">{hoveredNode.category}</div>
          <div className="text-[9px] text-emerald-400 font-mono mt-1 font-semibold flex items-center gap-1">
            <span>● Click to inspect dossier ↗</span>
          </div>
        </div>
      )}

      {/* Bottom Control Instructions */}
      <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between text-[11px] font-mono text-slate-400 pointer-events-none z-10">
        <div className="flex flex-col gap-0.5">
          <div className="text-slate-200 flex items-center gap-1.5 font-semibold">
            <Compass className="w-3.5 h-3.5 text-cyan-400" />
            <span>Drag cursor / touch to rotate 3D nexus</span>
          </div>
          <div className="text-slate-500 text-[10px]">
            Click anywhere in space for 3D shockwave • Click nodes for project dossiers
          </div>
        </div>
        <div className="text-right hidden sm:block text-slate-500 text-[10px]">
          <span className="text-cyan-400">GEO: 17.6868° N, 83.2185° E</span>
          <br />
          <span className="text-slate-600">VIZAG // ARCH: QUANTUM-KINETIC</span>
        </div>
      </div>
    </div>
  );
}

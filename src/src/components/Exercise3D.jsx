import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

export function Exercise3D({ exerciseName = 'Flexão' }) {
  const containerRef = useRef(null);
  const sceneRef = useRef(null);
  const cameraRef = useRef(null);
  const rendererRef = useRef(null);

  useEffect(() => {
    if (!containerRef.current) return;

    // Scene setup
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x18181b);
    sceneRef.current = scene;

    // Camera
    const camera = new THREE.PerspectiveCamera(
      75,
      containerRef.current.clientWidth / containerRef.current.clientHeight,
      0.1,
      1000
    );
    camera.position.z = 3;
    cameraRef.current = camera;

    // Renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(containerRef.current.clientWidth, containerRef.current.clientHeight);
    renderer.shadowMap.enabled = true;
    containerRef.current.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
    directionalLight.position.set(5, 10, 7);
    directionalLight.castShadow = true;
    scene.add(directionalLight);

    // Create simple body model (stick figure)
    const bodyGroup = new THREE.Group();
    
    // Head
    const headGeometry = new THREE.SphereGeometry(0.3, 32, 32);
    const headMaterial = new THREE.MeshPhongMaterial({ color: 0xffcc99 });
    const head = new THREE.Mesh(headGeometry, headMaterial);
    head.position.y = 1.5;
    head.castShadow = true;
    bodyGroup.add(head);

    // Torso
    const torsoGeometry = new THREE.CylinderGeometry(0.2, 0.2, 0.8, 32);
    const torsoMaterial = new THREE.MeshPhongMaterial({ color: 0x00d4ff });
    const torso = new THREE.Mesh(torsoGeometry, torsoMaterial);
    torso.position.y = 0.7;
    torso.castShadow = true;
    bodyGroup.add(torso);

    // Left arm
    const armGeometry = new THREE.CylinderGeometry(0.1, 0.1, 0.8, 32);
    const armMaterial = new THREE.MeshPhongMaterial({ color: 0xffcc99 });
    
    const leftArm = new THREE.Mesh(armGeometry, armMaterial);
    leftArm.position.set(-0.5, 1, 0);
    leftArm.rotation.z = Math.PI / 4;
    leftArm.castShadow = true;
    bodyGroup.add(leftArm);

    // Right arm
    const rightArm = new THREE.Mesh(armGeometry, armMaterial);
    rightArm.position.set(0.5, 1, 0);
    rightArm.rotation.z = -Math.PI / 4;
    rightArm.castShadow = true;
    bodyGroup.add(rightArm);

    // Left leg
    const legGeometry = new THREE.CylinderGeometry(0.1, 0.1, 0.8, 32);
    const legMaterial = new THREE.MeshPhongMaterial({ color: 0x333333 });
    
    const leftLeg = new THREE.Mesh(legGeometry, legMaterial);
    leftLeg.position.set(-0.2, -0.5, 0);
    leftLeg.castShadow = true;
    bodyGroup.add(leftLeg);

    // Right leg
    const rightLeg = new THREE.Mesh(legGeometry, legMaterial);
    rightLeg.position.set(0.2, -0.5, 0);
    rightLeg.castShadow = true;
    bodyGroup.add(rightLeg);

    scene.add(bodyGroup);

    // Ground
    const groundGeometry = new THREE.PlaneGeometry(10, 10);
    const groundMaterial = new THREE.MeshPhongMaterial({ color: 0x27272a });
    const ground = new THREE.Mesh(groundGeometry, groundMaterial);
    ground.rotation.x = -Math.PI / 2;
    ground.position.y = -1.5;
    ground.receiveShadow = true;
    scene.add(ground);

    // Animation loop
    let animationId;
    const animate = () => {
      animationId = requestAnimationFrame(animate);

      // Rotate body
      bodyGroup.rotation.y += 0.01;

      // Animate arms (simulating exercise)
      leftArm.rotation.z = Math.PI / 4 + Math.sin(Date.now() * 0.003) * 0.5;
      rightArm.rotation.z = -Math.PI / 4 - Math.sin(Date.now() * 0.003) * 0.5;

      renderer.render(scene, camera);
    };
    animate();

    // Handle window resize
    const handleResize = () => {
      if (!containerRef.current) return;
      const width = containerRef.current.clientWidth;
      const height = containerRef.current.clientHeight;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };
    window.addEventListener('resize', handleResize);

    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationId);
      renderer.dispose();
      if (containerRef.current && renderer.domElement.parentNode === containerRef.current) {
        containerRef.current.removeChild(renderer.domElement);
      }
    };
  }, [exerciseName]);

  return (
    <div
      ref={containerRef}
      className="w-full h-96 rounded-2xl border-2 border-zinc-800 overflow-hidden"
      style={{ background: '#18181b' }}
    />
  );
}

export default Exercise3D;

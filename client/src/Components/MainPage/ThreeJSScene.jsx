import React, { useEffect, useRef } from "react";
import * as THREE from "three";
import Stats from "stats.js";
import styled, { keyframes } from "styled-components";
import { Typography } from "@mui/material";

const bounce = keyframes`
  0%, 20%, 50%, 80%, 100% {
    transform: translateY(0);
  }
  40% {
    transform: translateY(-30px);
  }
  60% {
    transform: translateY(-15px);
  }
`;

const Container = styled.div`
  position: relative;
`;

const AnimatedText = styled.div`
  position: absolute;
  top: 20px;
  left: 45%;
  transform: translateX(-50%);
  font-size: 2em;
  color: white;
  animation: ${bounce} 2s infinite;
  z-index: 10;
  pointer-events: none; /* Prevent text from blocking pointer events */
`;

const ThreeJSScene = () => {
  const containerRef = useRef();
  const spheresRef = useRef([]);
  const pointerRef = useRef(new THREE.Vector2());
  const clockRef = useRef(new THREE.Clock());
  const raycasterRef = useRef(new THREE.Raycaster());
  const toggleRef = useRef(0);
  const intersectionRef = useRef(null);
  const spheresIndexRef = useRef(0);

  const width = 80;
  const length = 160;
  const pointSize = 0.05;
  const threshold = 0.1;
  const rotateY = new THREE.Matrix4().makeRotationY(0.005);

  const generatePointCloudGeometry = (color, width, length) => {
    const geometry = new THREE.BufferGeometry();
    const numPoints = width * length;

    const positions = new Float32Array(numPoints * 3);
    const colors = new Float32Array(numPoints * 3);

    let k = 0;

    for (let i = 0; i < width; i++) {
      for (let j = 0; j < length; j++) {
        const u = i / width;
        const v = j / length;
        const x = u - 0.5;
        const y = (Math.cos(u * Math.PI * 4) + Math.sin(v * Math.PI * 8)) / 20;
        const z = v - 0.5;

        positions[3 * k] = x;
        positions[3 * k + 1] = y;
        positions[3 * k + 2] = z;

        const intensity = (y + 0.1) * 5;
        colors[3 * k] = color.r * intensity;
        colors[3 * k + 1] = color.g * intensity;
        colors[3 * k + 2] = color.b * intensity;

        k++;
      }
    }

    geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute("color", new THREE.BufferAttribute(colors, 3));
    geometry.computeBoundingBox();

    return geometry;
  };

  const generatePointcloud = (color, width, length) => {
    const geometry = generatePointCloudGeometry(color, width, length);
    const material = new THREE.PointsMaterial({
      size: pointSize,
      vertexColors: true,
    });

    return new THREE.Points(geometry, material);
  };

  const generateIndexedPointcloud = (color, width, length) => {
    const geometry = generatePointCloudGeometry(color, width, length);
    const numPoints = width * length;
    const indices = new Uint16Array(numPoints);

    let k = 0;

    for (let i = 0; i < width; i++) {
      for (let j = 0; j < length; j++) {
        indices[k] = k;
        k++;
      }
    }

    geometry.setIndex(new THREE.BufferAttribute(indices, 1));

    const material = new THREE.PointsMaterial({
      size: pointSize,
      vertexColors: true,
    });

    return new THREE.Points(geometry, material);
  };

  const generateIndexedWithOffsetPointcloud = (color, width, length) => {
    const geometry = generatePointCloudGeometry(color, width, length);
    const numPoints = width * length;
    const indices = new Uint16Array(numPoints);

    let k = 0;

    for (let i = 0; i < width; i++) {
      for (let j = 0; j < length; j++) {
        indices[k] = k;
        k++;
      }
    }

    geometry.setIndex(new THREE.BufferAttribute(indices, 1));
    geometry.addGroup(0, indices.length);

    const material = new THREE.PointsMaterial({
      size: pointSize,
      vertexColors: true,
    });

    return new THREE.Points(geometry, material);
  };

  useEffect(() => {
    const container = containerRef.current;

    const scene = new THREE.Scene();

    const camera = new THREE.PerspectiveCamera(
      45,
      window.innerWidth / window.innerHeight,
      1,
      10000
    );
    camera.position.set(10, 10, 10);
    camera.lookAt(scene.position);
    camera.updateMatrix();

    const pcBuffer = generatePointcloud(
      new THREE.Color(1, 0, 0),
      width,
      length
    );
    pcBuffer.scale.set(5, 10, 10);
    pcBuffer.position.set(-5, 0, 0);
    scene.add(pcBuffer);

    const pcIndexed = generateIndexedPointcloud(
      new THREE.Color(0, 1, 0),
      width,
      length
    );
    pcIndexed.scale.set(5, 10, 10);
    pcIndexed.position.set(0, 0, 0);
    scene.add(pcIndexed);

    const pcIndexedOffset = generateIndexedWithOffsetPointcloud(
      new THREE.Color(0, 1, 1),
      width,
      length
    );
    pcIndexedOffset.scale.set(5, 10, 10);
    pcIndexedOffset.position.set(5, 0, 0);
    scene.add(pcIndexedOffset);

    const pointclouds = [pcBuffer, pcIndexed, pcIndexedOffset];

    const sphereGeometry = new THREE.SphereGeometry(0.1, 32, 32);
    const sphereMaterial = new THREE.MeshBasicMaterial({ color: 0xff0000 });

    for (let i = 0; i < 40; i++) {
      const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
      scene.add(sphere);
      spheresRef.current.push(sphere);
    }

    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);
    container.appendChild(renderer.domElement);

    const stats = new Stats();
    container.appendChild(stats.dom);

    raycasterRef.current.params.Points.threshold = threshold;

    const onWindowResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();

      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    const onPointerMove = (event) => {
      pointerRef.current.x = (event.clientX / window.innerWidth) * 2 - 1;
      pointerRef.current.y = -(event.clientY / window.innerHeight) * 2 + 1;
    };

    const animate = () => {
      renderer.setAnimationLoop(render);
    };

    const render = () => {
      camera.applyMatrix4(rotateY);
      camera.updateMatrixWorld();

      raycasterRef.current.setFromCamera(pointerRef.current, camera);

      const intersections = raycasterRef.current.intersectObjects(
        pointclouds,
        false
      );
      intersectionRef.current =
        intersections.length > 0 ? intersections[0] : null;

      if (toggleRef.current > 0.02 && intersectionRef.current !== null) {
        const sphere = spheresRef.current[spheresIndexRef.current];
        sphere.position.copy(intersectionRef.current.point);
        sphere.scale.set(1, 1, 1);
        spheresIndexRef.current =
          (spheresIndexRef.current + 1) % spheresRef.current.length;

        toggleRef.current = 0;
      }

      spheresRef.current.forEach((sphere) => {
        sphere.scale.multiplyScalar(0.98);
        sphere.scale.clampScalar(0.01, 1);
      });

      toggleRef.current += clockRef.current.getDelta();

      renderer.render(scene, camera);
      stats.update();
    };

    window.addEventListener("resize", onWindowResize);
    document.addEventListener("pointermove", onPointerMove);

    animate();

    return () => {
      window.removeEventListener("resize", onWindowResize);
      document.removeEventListener("pointermove", onPointerMove);
    };
  }, []);

  return (
    <Container ref={containerRef}>
      <AnimatedText>SehatSathi</AnimatedText>
    </Container>
  );
};

export default ThreeJSScene;

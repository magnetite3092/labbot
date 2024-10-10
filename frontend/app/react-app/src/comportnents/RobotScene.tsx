// src/RobotScene.tsx
import React, { useEffect } from 'react';
import * as THREE from 'three';

const RobotScene: React.FC = () => {
  useEffect(() => {
    // シーンのセットアップ
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer();
    
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);

    // ロボットの作成
    const geometry = new THREE.BoxGeometry();
    const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
    const robot = new THREE.Mesh(geometry, material);
    scene.add(robot);

    camera.position.z = 5;

    // アニメーションループ
    const animate = () => {
      requestAnimationFrame(animate);
      robot.rotation.x += 0.01;
      robot.rotation.y += 0.01;
      renderer.render(scene, camera);
    };

    animate();

    // クリーンアップ
    return () => {
      document.body.removeChild(renderer.domElement);
    };
  }, []);

  return null; // 何も表示しない
};

export default RobotScene;

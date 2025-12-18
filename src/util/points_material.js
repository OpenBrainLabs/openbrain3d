import * as THREE from 'three';

const canvas = document.createElement( 'CANVAS' );
  canvas.width = 128;
  canvas.height = 128;

const context = canvas.getContext( '2d' );
  context.globalAlpha = 0.3;
  context.filter = 'blur(16px)';
  context.fillStyle = 'white';
  context.beginPath();
  context.arc( 64, 64, 40, 0, 2*Math.PI );
  context.fill( );
  context.globalAlpha = 0.6;
  context.filter = 'blur(10px)';
  context.fillStyle = 'white';
  context.beginPath();
  context.arc( 64, 64, 28, 0, 2*Math.PI );
  context.fill( );
  context.globalAlpha = 1;
  context.filter = 'blur(5px)';
  context.fillStyle = 'white';
  context.beginPath();
  context.arc( 64, 64, 16, 0, 2*Math.PI );
  context.fill( );

const texture = new THREE.CanvasTexture( canvas );

const POINTS_MATERIAL = new THREE.PointsMaterial({
  size: 0.8,
  map: texture,
  transparent: true,
  vertexColors: true,
  blending: THREE.AdditiveBlending,
  depthTest: false,
});

export default POINTS_MATERIAL;
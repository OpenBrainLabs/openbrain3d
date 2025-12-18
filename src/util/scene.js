import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

const getScene = () => {
  const container = document.getElementById('canvas');

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(
    75,
    container.offsetWidth / container.offsetHeight,
    0.1,
    500
  );
  camera.position.set(-200, 0, 0);
  camera.up.set(0, 0, 1);

  const renderer = new THREE.WebGLRenderer( { antialias: true } );
  renderer.setPixelRatio( window.devicePixelRatio );
  renderer.setSize( container.offsetWidth, container.offsetHeight );
  renderer.setClearColor( 0x000000, 1 );
  renderer.domElement.style.position = 'absolute';

  window.addEventListener('resize', function () {
    camera.aspect = container.offsetWidth / container.offsetHeight;
    camera.updateProjectionMatrix();
    renderer.setSize( container.offsetWidth, container.offsetHeight );
  }, false );

  renderer.domElement.id = 'brain';

  container.appendChild( renderer.domElement );

  new OrbitControls( camera, renderer.domElement );

  const render = function () {
    requestAnimationFrame( render );
    renderer.render( scene, camera );
  };

  return { scene, render };
}

export {
  getScene
};
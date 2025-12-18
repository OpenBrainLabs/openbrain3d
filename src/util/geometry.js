import * as THREE from 'three';

import POINTS_MATERIAL from './points_material.js';
import { points_array } from './array.js';

const getGeometry = atlas => {
  const positions = points_array(atlas);

  const ATLAS_MAP = new THREE.Float32BufferAttribute( positions, 3 );

  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute( 'position', ATLAS_MAP );
  const points = new THREE.Points( geometry, POINTS_MATERIAL );

  const setPointsColor = colors => {
    geometry.setAttribute( 'color',
          new THREE.Float32BufferAttribute( colors, 4 ) );
  }

  return { points, setPointsColor };
}

export {
  getGeometry,
};
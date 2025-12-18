import { GUI } from 'three/examples/jsm/libs/lil-gui.module.min.js';

const newGui = () => {
  const container = document.getElementById('gui_container');
  return new GUI({ container });
}

export {
  newGui,
}
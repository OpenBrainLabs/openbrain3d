import { MNI152_AAL_Atlas } from 'openbraindata';

import { getScene } from './util/scene.js';
import { getGeometry } from './util/geometry.js';
import { newGui } from './util/gui.js';

import { abs_pos } from './util/color.js';
import { colors_array } from './util/array.js';

const activations = () => {

  const ATLAS = MNI152_AAL_Atlas;

  const { points, setPointsColor } = getGeometry(ATLAS);
  const { scene, render } = getScene();

  const gui = newGui();

  const keys = [
    'Number of Voxels',
    'Density of Voxels',
  ];

  const input = document.getElementById('file');
  const reader = new FileReader();
  reader.onload = function (e) {
    updateData(JSON.parse(e.target.result));
  };
  const fObject = {
    'Load data (JSON)': async function() {
      input.value = null;
      const promise = new Promise(resolve => {
        input.addEventListener('change', resolve, {once: true});
      });
      input.click();
      await promise;
      reader.readAsText(input.files[0]);
    },
  };
  gui.add( fObject, 'Load data (JSON)' );

  const keyFolder = gui.addFolder( 'Field' );
  const keyObj = {
    ...Object.fromEntries( keys.map((k,i) => [k, () => updateKey(i)]) )};
  keys.forEach(k => keyFolder.add( keyObj, k ));

  let data = ATLAS.sample0(), key = 0;

  const colors = () => {
    const fun = key == 0
      ? ([r,sr]) => data[sr]
      : ([r,sr]) => data[sr]/ATLAS.coords([r,sr]).length;
    const DATA = Object.fromEntries(
      ATLAS.qualifiedNames().map( q => [q, fun(q)]) );
    const min = Math.min(...Object.values(DATA));
    const max = Math.max(...Object.values(DATA));
    const adjust = x => (x-min)/(max-min);
    const field = q => adjust(DATA[q]);
    const colors = colors_array(abs_pos(field))(ATLAS);
    return colors;
  }

  scene.add( points );

  const updateData = d => {
    data = d;
    update();
  }

  const updateKey = k => {
    key = k;
    update();
  }

  const update = () => setPointsColor(colors());

  update();

  render();

  return () => gui.destroy();
};

export default activations;

import { MNI152_AAL_Atlas } from 'openbraindata';

import { getScene } from './util/scene.js';
import { getGeometry } from './util/geometry.js';
import { newGui } from './util/gui.js';

import { abs_neg_pos, empty } from './util/color.js';
import { colors_array } from './util/array.js';

const differences = () => {

  const ATLAS = MNI152_AAL_Atlas;

  const { points, setPointsColor } = getGeometry(ATLAS);
  const { scene, render } = getScene();

  const gui = newGui();

  const keys = [
    'Number of Voxels',
    'Density of Voxels',
  ];

  const input0 = document.getElementById('file1');
  const input1 = document.getElementById('file2');
  const inputs = [input0,input1];
  const reader0 = new FileReader();
  reader0.onload = function (e) {
    updateData0(JSON.parse(e.target.result));
  };
  const reader1 = new FileReader();
  reader1.onload = function (e) {
    updateData1(JSON.parse(e.target.result));
  };
  const readers = [reader0,reader1];
  const load = async i => {
    const input = inputs[i];
    const reader = readers[i];
    input.value = null;
    const promise = new Promise(resolve => {
      input.addEventListener('change', resolve, {once: true});
    });
    input.click();
    await promise;
    reader.readAsText(input.files[0]);
  }
  const fObject = {
    'Load data 1 (JSON)': async () => load(0),
    'Load data 2 (JSON)': async () => load(1),
  };
  gui.add( fObject, 'Load data 1 (JSON)' );
  gui.add( fObject, 'Load data 2 (JSON)' );

  const keyFolder = gui.addFolder( 'Field' );
  const keyObj = {
    ...Object.fromEntries( keys.map((k,i) => [k, () => updateKey(i)]) )};
  keys.forEach(k => keyFolder.add( keyObj, k ));

  let data0 = ATLAS.sample0(), data1 = ATLAS.sample1(), key = 0;

  const colors = () => {
    let color_fun;
    const fun = key == 0
      ? ([r,sr]) => data1[sr] - data0[sr]
      : ([r,sr]) => (data1[sr] - data0[sr])/ATLAS.coords([r,sr]).length;
    const DATA = Object.fromEntries(
      ATLAS.qualifiedNames().map( q => [q, fun(q)]) );
    const max = Math.max(...Object.values(DATA).map(Math.abs));
    if (max > 0) {
      const adjust = x => x/max;
      const field = q => adjust(DATA[q]);
      color_fun = abs_neg_pos(field);
    } else {
      color_fun = empty;
    }
    return colors_array(color_fun)(ATLAS);
  }

  scene.add( points );

  const updateData0 = d => {
    data0 = d;
    update();
  }
  const updateData1 = d => {
    data1 = d;
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

export default differences;
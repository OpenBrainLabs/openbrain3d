import { MNI152_AAL_Atlas } from 'openbraindata';

import { getScene } from './util/scene.js';
import { getGeometry } from './util/geometry.js';
import { newGui } from './util/gui.js';

import { PALETTE, region_highlight } from './util/color.js';
import { colors_array } from './util/array.js';

const general = () => {

  const ATLAS = MNI152_AAL_Atlas;

  const { points, setPointsColor } = getGeometry(ATLAS);
  const { scene, render } = getScene();

  const gui = newGui();

  for (let region of ATLAS.regions()) {
    const folder = gui.addFolder( region );
    const obj = {'-- ALL --': () => updateRegion([region,""]),
      ...Object.fromEntries( ATLAS.subregions(region).map(
        sr => [sr, () => updateRegion([region,sr])]) )}
    folder.add( obj, '-- ALL --' );
    for (let subregion of ATLAS.subregions(region)) folder.add( obj, subregion );
    folder.close();
  }

  const COLORS = {
    'Frontal Lobe':                            PALETTE.PINK,
    'Parietal Lobe':                           PALETTE.BLUE,
    'Temporal Lobe':                           PALETTE.ORANGE,
    'Occipital Lobe':                          PALETTE.GREEN,
    'Limbic Lobe':                             PALETTE.PURPLE,
    'Basal Ganglia':                           PALETTE.LIME,
    'Cerebellum':                              PALETTE.TEAL,
    'Corpus Callosum and Subcortical Regions': PALETTE.BROWN,
    'Vermis':                                  PALETTE.BLUEGRAY,
  };

  const colorsOfSubregion = ([r,s]) =>
    colors_array(region_highlight(s||r,COLORS[r]))(ATLAS);

  scene.add( points );

  const updateRegion = k => setPointsColor(colorsOfSubregion(k));

  updateRegion(['Frontal Lobe','']);

  render();

  return () => gui.destroy();
};

export default general;
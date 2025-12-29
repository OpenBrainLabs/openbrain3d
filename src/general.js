import { MNI152_AAL_Atlas } from 'openbraindata';

import { getScene } from './util/scene.js';
import { getGeometry } from './util/geometry.js';
import { newGui } from './util/gui.js';

import { PALETTE, list_highlight } from './util/color.js';
import { colors_array } from './util/array.js';

const general = () => {

  const ATLAS = MNI152_AAL_Atlas;

  const { points, setPointsColor } = getGeometry(ATLAS);
  const { scene, render } = getScene();

  const gui = newGui();

  let ACTIVE = {};
  let initial_region = ATLAS.regions()[0];

  for (let region of ATLAS.regions()) {
    ACTIVE[region] = {};
    const folder = gui.addFolder( region );
    const obj = {'-- ALL --': region == initial_region,
      ...Object.fromEntries( ATLAS.subregions(region).map(
        sr => [sr, region == initial_region]) )}
    folder.add( obj, '-- ALL --' ).onChange( value => {
      for (let subregion of ATLAS.subregions(region)) {
        ACTIVE[region][subregion] = value;
        obj[subregion] = value;
      }
      update();
    } );
    for (let subregion of ATLAS.subregions(region)) {
      ACTIVE[region][subregion] = region == initial_region;
      folder.add( obj, subregion ).listen().onChange( value => {
        ACTIVE[region][subregion] = value;
        update();
      } );
    }
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

  scene.add( points );

  const colors = () =>
    colors_array(list_highlight(ACTIVE,COLORS))(ATLAS);

  const update = () => setPointsColor(colors());

  update();

  render();

  return () => gui.destroy();
};

export default general;
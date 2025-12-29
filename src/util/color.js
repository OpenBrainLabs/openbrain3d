import * as THREE from 'three';

const rgb = h => {
	const color = new THREE.Color();
	color.setHex( h, THREE.SRGBColorSpace );
	return [color.r, color.g, color.b];
}

const PINK     = rgb(0xE91E63);
const BLUE     = rgb(0x2196F3);
const ORANGE   = rgb(0xF57C00);
const GREEN    = rgb(0x4CAF50);
const PURPLE   = rgb(0x9C27B0);
const LIME     = rgb(0xCDDC39);
const TEAL     = rgb(0x009688);
const BROWN    = rgb(0xA1887F);
const BLUEGRAY = rgb(0x90A4AE);
const WHITE    = rgb(0xFFFFFF);

const PALETTE = {
  PINK,
  BLUE,
	ORANGE,
	GREEN,
	PURPLE,
	LIME,
	TEAL,
	BROWN,
	BLUEGRAY,
  WHITE,
}

const empty = _ => [0,0,0,0];

const abs_pos = field => qname => [1,1,1,field(qname)];

const abs_neg_pos = field => qname => {
  let v = field(qname);
  let c = v > 0 ? PINK : v < 0 ? BLUE : WHITE;
  const opacity = v => 0.02 + Math.abs(v)*(1-0.02);
  return [c[0], c[1], c[2], opacity(v)];
};

const region_highlight = (name,color) => qname => {
  let h,a;
  if (qname.some(n => n == name)) {
    h = color;
    a = 1;
  } else {
    h = [1,1,1];
    a = 0.1;
  }
	return [...h,a];
}

const list_highlight = (list,colors) => qname => {
  let h,a;
  if (list[qname[0]][qname[1]]) {
    h = colors[qname[0]];
    a = 1;
  } else {
    h = [1,1,1];
    a = 0.1;
  }
	return [...h,a];
}

export {
  PALETTE,
  empty,
  abs_pos,
  abs_neg_pos,
	region_highlight,
  list_highlight,
}
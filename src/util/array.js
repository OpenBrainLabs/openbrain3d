const array = transf => atlas => {
  const data = [];
  for (let qname of atlas.qualifiedNames()) {
    for ( let c of atlas.coords(qname) ) {
      data.push(...transf(c,qname));
    }
  }
  return data;
}

const r = () => (Math.random()-0.5);
const points_array = array((c,_) => [c[0]+r(), c[1]+r(), c[2]+r()]);

const colors_array = color_fun => array((_,q) => color_fun(q));

export {
  array,
  points_array,
  colors_array,
}
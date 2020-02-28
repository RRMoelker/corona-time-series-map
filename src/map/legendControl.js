import { spreadLevels, spreadLevelsHuman, spreadColor } from '../levels';

export const createLegend = (position) => {
  const legend = L.control({position});

  legend.onAdd = function (map) {
    const div = L.DomUtil.create('div', 'legend-panel');
    div.innerHTML = '<h3>Legend</h3>';

    let list = '';
    list += '<li class="indent">Size: number of confirmed cases</li>';

    for (const key of Object.keys(spreadLevels)) {
      const color = spreadColor[key];
      const label = spreadLevelsHuman[key];
      list += `<li><i class="swatch" style="background: ${color};"></i>${key}: ${label}</li>`;
    }

    div.innerHTML += `<ul>${list}</ul>`;

    div.innerHTML += `<p>Marker position reflects region not precise location</p>`;

    return div;
  };
  return legend;
};

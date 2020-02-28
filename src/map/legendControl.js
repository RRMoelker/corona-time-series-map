/**
 * Map legend panel creation
 * lot of manual HTML and JS, don't know how to use Svelte template here a.t.m.
 */
import { spreadLevels, spreadLevelsHuman, spreadColor } from '../levels';

const getButton = () => {
  const button = L.DomUtil.create('span', 'icon');
  button.innerHTML += '<span class="do-open"><i class="material-icons">keyboard_arrow_up</i></span>';
  button.innerHTML += '<span class="do-close"><i class="material-icons">keyboard_arrow_down</i></span>';
  return button;
};

const getHeader = () => {
  const div = L.DomUtil.create('div', 'header');
  const button = getButton();
  div.appendChild(button);
  div.innerHTML += '<h3>Legend</h3>';
  return div;
};

export const createLegend = (position, isOpen) => {
  const legend = L.control({position});

  legend.onAdd = function (map) {
    const div = L.DomUtil.create('div', 'legend-panel');

    const header = getHeader();
    div.appendChild(header);
    div.onclick = () => { // can't register on just header for some reason.
      if(L.DomUtil.hasClass(div, 'open')) {
        L.DomUtil.removeClass(div, 'open');
        L.DomUtil.addClass(div, 'closed');
      } else {
        L.DomUtil.removeClass(div, 'closed');
        L.DomUtil.addClass(div, 'open');
      }
    };

    let list = '';
    list += '<li class="indent">Size: number of confirmed cases</li>';
    for (const key of Object.keys(spreadLevels)) {
      const color = spreadColor[key];
      let label = spreadLevelsHuman[key];


      // Lol, there actually is a left pad now! Can't use it unfortunately label.padStart
      const nbsp = '&nbsp';
      const count = Math.max(6 - label.length, 0);
      label = nbsp.repeat(count * 2) + label; // *2 is needed because spaces aren't same width as char apparently

      list += `<li><i class="swatch" style="background: ${color};"></i>${label} infections/day</li>`;
    }

    let content = `<ul>${list}</ul>`;
    content += `<p>Marker position reflects region not precise location</p>`;

    div.innerHTML += `<div class="content">${content}</div>`;

    if (isOpen) {
      L.DomUtil.addClass(div, 'open');
    } else {
      L.DomUtil.addClass(div, 'closed');
    }


    return div;
  };
  return legend;
};

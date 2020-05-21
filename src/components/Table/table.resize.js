import {$} from '@core/dom';

export function resizeHandler($root, event) {
  const $resize = $(event.target);
  const $parent = $resize.closest(`[data-type="resizable"]`);
  const coords = $parent.getCoords();
  const type = $resize.data.resize;
  const sideProp = type === 'col' ? 'bottom' : 'right';

  $resize.css({[sideProp]: '-2500px'})
  let value;

  document.onmousemove = e => {
    if (type === 'col') {
      const delta = e.pageX - coords.right;
      value = coords.width + delta;
      $resize.css({right: -delta + 'px'})
    } else {
      const delta = e.pageY - coords.bottom;
      value = coords.height + delta;
      $resize.css({bottom: -delta + 'px'})
    }

    document.onmouseup = () => {
      if (type === 'col') {
        $parent.css({width: value + 'px'})
        $root.findAll(`[data-col="${$parent.data.col}"]`)
            .forEach(cell => cell.style.width = value + 'px')
      } else {
        $parent.css({height: value + 'px'})
      }
      document.onmousemove = null;
      document.onmouseup = null;
      $resize.css({
        bottom: 0,
        right: 0,
      })
    }
  }
}

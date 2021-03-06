export function capitalize(str) {
  if (typeof str !== 'string') return '';
  return str[0].toUpperCase() + str.slice(1);
}

export function range(start, end) {
  if (start > end) {
    [end, start] = [start, end]
  }
  return new Array(end - start + 1)
      .fill('')
      .map((_, idx) => start + idx)
}

export function isEqual(a, b) {
  if (typeof a === 'object' && typeof b === 'object') {
    return JSON.stringify(a) === JSON.stringify(b);
  }
  return a === b;
}

export function storage(key, payload) {
  if (!payload) {
    return JSON.parse(localStorage.getItem(key));
  }
  localStorage.setItem(key, JSON.stringify(payload));
}

export function debounce(fn, ms) {
  let timeout;
  return function(...args) {
    const later = () => {
      clearTimeout(timeout);
      // eslint-disable-next-line no-invalid-this
      fn.apply(this, args);
    }
    clearTimeout(timeout);
    timeout = setTimeout(later, ms)
  }
}

export function camelCaseToDash(str) {
  return str.replace(/([A-Z])/g, g => `-${g[0].toLowerCase()}`);
}

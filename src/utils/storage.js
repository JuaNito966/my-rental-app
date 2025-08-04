
export function loadState(key) {
  try {
    const serialized = localStorage.getItem(key);
    if (serialized === null) return undefined;
    return JSON.parse(serialized);
  } catch (err) {
    console.warn('⚠️ loadState error:', err);
    return undefined;
  }
}

export function saveState(key, state) {
  try {
    const serialized = JSON.stringify(state);
    localStorage.setItem(key, serialized);
  } catch (err) {
    console.warn('⚠️ saveState error:', err);
  }
}

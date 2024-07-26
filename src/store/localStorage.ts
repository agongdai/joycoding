const KEY = 'redux';
export function loadState() {
  try {
    const serializedState = localStorage.getItem(KEY);
    if (!serializedState) return undefined;
    const state = JSON.parse(serializedState);
    // @note when reloading the page, we want to reset the scroll position
    state.dom.scrollTop = 0;
    return state;
  } catch (e) {
    return undefined;
  }
}

export async function saveState(state: any) {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem(KEY, serializedState);
  } catch (e) {
    // Ignore
  }
}

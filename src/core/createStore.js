export function createStore(rootReducer, initialState = {}) {
  let state = rootReducer(initialState, {type: '__INIT__'});
  let listeners = [];

  return {
    dispatch(action) {
      state = rootReducer(state, action);
      listeners.forEach(listener => listener(state));
    },

    subscribe(callback) {
      listeners.push(callback);

      return {
        unsubscribe() {
          listeners = listeners.filter(l => l !== callback);
        },
      }
    },

    getState() {
      return JSON.parse(JSON.stringify(state));
    },
  }
}

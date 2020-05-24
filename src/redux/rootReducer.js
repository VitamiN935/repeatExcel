import * as types from '@/redux/types';

export function rootReducer(state, action) {
  let field;
  switch (action.type) {
    case types.TABLE_RESIZE:
      field = action.data.type === 'col' ? 'colState' : 'rowState';
      return {...state, [field]: getUpdatedFieldState(state, field, action)}
    case types.CHANGE_TEXT:
      field = 'dataState';
      return {
        ...state,
        currentText: action.data.value,
        [field]: getUpdatedFieldState(state, field, action),
      }
    default:
      return state;
  }
}

function getUpdatedFieldState(state, field, action) {
  const prevState = state[field] || {}
  prevState[action.data.id] = action.data.value;
  return prevState;
}

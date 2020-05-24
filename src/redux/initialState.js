import {storage} from '@core/utils';

const defaultState = {
  colState: {},
  rowState: {},
  dataState: {},
  currentText: '',
}

export const initialValue = storage('excel-app') || defaultState

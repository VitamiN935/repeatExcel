import {storage} from '@core/utils';
import {defaultStyles} from '@/constants';

const defaultState = {
  colState: {},
  rowState: {},
  dataState: {},
  changeStyles: defaultStyles,
  currentText: '',
  title: '',
}

export const initialValue = storage('excel-app') || defaultState

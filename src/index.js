import {Excel} from '@/components/Excel/Excel';
import {Header} from '@/components/Header/Header';
import {Toolbar} from '@/components/Toolbar/Toolbar';
import {Formula} from '@/components/Formula/Formula';
import {Table} from '@/components/Table/Table';
import './scss/index.scss'
import {createStore} from '@core/createStore';
import {rootReducer} from '@/redux/rootReducer';
import {debounce, storage} from '@core/utils';
import {initialValue} from '@/redux/initialState';

const store = createStore(rootReducer, initialValue)

const storeListener = debounce(state => {
  storage('excel-app', state)
  console.log('App: ', state);
}, 300)

store.subscribe(storeListener)

const app = new Excel('#app', {
  components: [Header, Toolbar, Formula, Table],
  store,
})

app.render();

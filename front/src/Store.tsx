import {createStore} from 'redux';
import {composeWithDevTools} from 'redux-devtools-extension';
import {applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import rootReducer, { RootState } from './Reducers/rootReducer';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

const persistConfig = {
    key: 'authType',
    storage: storage,
    whitelist: ['Auth']
 //stateReconciler: autoMergeLevel2 // see "Merge Process" section for details.
};

const pReducer = persistReducer<RootState>(persistConfig, rootReducer);


const Store = createStore(pReducer , composeWithDevTools(applyMiddleware(thunk)));
export const persistor = persistStore(Store);
export default Store;
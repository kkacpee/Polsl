import {combineReducers} from 'redux';
import AccommodationListReducer from './AccommodationListReducer';
import ConferenceListReducer from './ConferenceListReducer';
import AlertReducer from './AlertReducer';

const RootReducer = combineReducers({
    AccommodationList: AccommodationListReducer,
    ConferenceList: ConferenceListReducer,
    Alert: AlertReducer
});

export type RootState = ReturnType<typeof RootReducer>

export default RootReducer;
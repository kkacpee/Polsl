import {combineReducers} from 'redux';
import AccommodationListReducer from './AccommodationListReducer';
import ConferenceListReducer from './ConferenceListReducer';
const RootReducer = combineReducers({
    AccommodationList: AccommodationListReducer,
    ConferenceList: ConferenceListReducer
});

export type RootState = ReturnType<typeof RootReducer>

export default RootReducer;
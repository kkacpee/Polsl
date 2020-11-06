import {combineReducers} from 'redux';
import AccommodationReducer from './AccommodationReducer';
import AlertReducer from './AlertReducer';
import BuildingPlanReducer from './BuildingPlanReducer';
import ConferenceReducer from './ConferenceReducer';
import EmergencyNumberReducer from './EmergencyNumberReducer';
import OrganizerReducer from './OrganizerReducer';
import ParticipantReducer from './ParticipantReducer';
import PointOfInterestReducer from './PointOfInterestReducer';
import SponsorReducer from './SponsorReducer';

const RootReducer = combineReducers({
    Accommodation: AccommodationReducer,
    Alert: AlertReducer,
    BuildingPlan: BuildingPlanReducer,
    Conference: ConferenceReducer,
    EmergencyNumber: EmergencyNumberReducer,
    Organizer: OrganizerReducer,
    Participant: ParticipantReducer,
    PointOfInterest: PointOfInterestReducer,
    Sponsor: SponsorReducer
});

export type RootState = ReturnType<typeof RootReducer>

export default RootReducer;
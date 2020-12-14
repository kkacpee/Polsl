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
import AuthReducer from './AuthReducer';
import PresentationReducer from './PresentationReducer';
import MessageReducer from './MessageReducer';
import RateReducer from './RateReducer';

const RootReducer = combineReducers({
    Accommodation: AccommodationReducer,
    Alert: AlertReducer,
    BuildingPlan: BuildingPlanReducer,
    Conference: ConferenceReducer,
    EmergencyNumber: EmergencyNumberReducer,
    Organizer: OrganizerReducer,
    Participant: ParticipantReducer,
    PointOfInterest: PointOfInterestReducer,
    Sponsor: SponsorReducer,
    Presentation: PresentationReducer,
    Rate: RateReducer,
    Message: MessageReducer,
    Auth: AuthReducer
});

export type RootState = ReturnType<typeof RootReducer>

export default RootReducer;
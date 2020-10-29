using AutoMapper;
using Core.Models;
using Core.DTO.Requests;
using Persistence.Models;

namespace Core.MappingConfiguration
{
    public class ConferenceMapping : Profile
    {
        public ConferenceMapping()
        {
            CreateMap<Accommodation, AccommodationModel>().ReverseMap();
            CreateMap<Accommodation, AddAccommodationRequest>().ReverseMap();

            CreateMap<BuildingPlan, BuildingPlanModel>().ReverseMap();
            CreateMap<BuildingPlan, AddBuildingPlanRequest>().ReverseMap();

            CreateMap<ConferenceAccommodation, ConferenceAccommodationModel>().ReverseMap();
            CreateMap<ConferenceAccommodation, AddAccommodationsToConferenceRequest>().ReverseMap();

            CreateMap<ConferenceEmergencyNumber, ConferenceEmergencyNumberModel>().ReverseMap();
            CreateMap<ConferenceEmergencyNumber, AddEmergencyNumbersToConferenceRequest>().ReverseMap();

            CreateMap<Conference, ConferenceModel>().ReverseMap();
            CreateMap<Conference, AddConferenceRequest>().ReverseMap();

            CreateMap<ConferenceOrganizer, ConferenceOrganizerModel>().ReverseMap();
            CreateMap<ConferenceOrganizer, AddOrganizersToConferenceRequest>().ReverseMap();

            CreateMap<ConferencePointOfInterest, ConferencePointOfInterestModel>().ReverseMap();
            CreateMap<ConferencePointOfInterest, AddPointsOfInterestToConferenceRequest>().ReverseMap();

            CreateMap<ConferenceSponsor, ConferenceSponsorModel>().ReverseMap();
            CreateMap<ConferenceSponsor, AddSponsorsToConferenceRequest>().ReverseMap();

            CreateMap<EmergencyNumber, EmergencyNumberModel>().ReverseMap();
            CreateMap<EmergencyNumber, AddEmergencyNumberRequest>().ReverseMap();

            CreateMap<Organizer, OrganizerModel>().ReverseMap();
            CreateMap<Organizer, AddOrganizerRequest>().ReverseMap();

            CreateMap<PointOfInterest, PointOfInterestModel>().ReverseMap();
            CreateMap<PointOfInterest, AddPointOfInterestRequest>().ReverseMap();

            CreateMap<PointOfInterestType, PointOfInterestTypeModel>().ReverseMap();
            CreateMap<PointOfInterestType, AddPointOfInterestTypeRequest>().ReverseMap();

            CreateMap<Sponsor, SponsorModel>().ReverseMap();
            CreateMap<Sponsor, AddSponsorRequest>().ReverseMap();
        }
    }
}

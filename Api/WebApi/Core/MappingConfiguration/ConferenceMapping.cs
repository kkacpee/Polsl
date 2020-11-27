using AutoMapper;
using Core.Models;
using Core.DTO.Requests;
using Persistence.Models;
using Core.DTO.Response;

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
            CreateMap<ConferenceAccommodation, ConferenceAccommodationRequest>().ReverseMap();

            CreateMap<ConferenceEmergencyNumber, ConferenceEmergencyNumberModel>().ReverseMap();
            CreateMap<ConferenceEmergencyNumber, ConferenceEmergencyNumberRequest>().ReverseMap();

            CreateMap<Conference, ConferenceModel>().ReverseMap();
            CreateMap<Conference, AddConferenceRequest>().ReverseMap();

            CreateMap<ConferenceOrganizer, ConferenceOrganizerModel>().ReverseMap();
            CreateMap<ConferenceOrganizer, ConferenceOrganizerRequest>().ReverseMap();

            CreateMap<ConferencePointOfInterest, ConferencePointOfInterestModel>().ReverseMap();
            CreateMap<ConferencePointOfInterest, ConferencePointOfInterestRequest>().ReverseMap();

            CreateMap<ConferenceSponsor, ConferenceSponsorModel>().ReverseMap();
            CreateMap<ConferenceSponsor, ConferenceSponsorRequest>().ReverseMap();

            CreateMap<EmergencyNumber, EmergencyNumberModel>().ReverseMap();
            CreateMap<EmergencyNumber, AddEmergencyNumberRequest>().ReverseMap();

            CreateMap<Organizer, OrganizerModel>().ReverseMap();
            CreateMap<Organizer, AddOrganizerRequest>().ReverseMap();

            CreateMap<PointOfInterest, PointOfInterestModel>().ReverseMap();
            CreateMap<PointOfInterest, AddPointOfInterestRequest>().ReverseMap();

            CreateMap<PointOfInterestType, PointOfInterestTypeModel>().ReverseMap();
            CreateMap<PointOfInterestType, AddPointOfInterestTypeRequest>().ReverseMap();
            CreateMap<PointOfInterest, PointOfInterestResponse>()
                    .ForMember(dest => dest.PointOfInterestTypeName,
                      opt => opt.MapFrom(src => src.PointOfInterestType.Name))
                    .ReverseMap();

            CreateMap<PointOfInterestIcon, AddPointOfInterestIconRequest>().ReverseMap();
            CreateMap<PointOfInterestIcon, PointOfInterestIconModel>().ReverseMap();
            CreateMap<PointOfInterestIcon, PointOfInterestIconResponse>().ReverseMap();

            CreateMap<Sponsor, SponsorModel>().ReverseMap();
            CreateMap<Sponsor, AddSponsorRequest>().ReverseMap();

  
            CreateMap<BuildingPlan, BuildingPlanResponse>().ReverseMap();
            CreateMap<EmergencyNumber, EmergencyNumberResponse>().ReverseMap();
            CreateMap<Organizer, OrganizerResponse>().ReverseMap();
            CreateMap<Accommodation, AccommodationResponse>().ReverseMap();
            CreateMap<Rate, RateResponse>().ReverseMap();
            CreateMap<Sponsor, SponsorResponse>().ReverseMap();


        }
    }
}

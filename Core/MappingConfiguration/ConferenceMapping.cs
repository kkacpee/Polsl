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
            CreateMap<Conference, ConferenceModel>().ReverseMap();
            CreateMap<Conference, AddConferenceRequest>().ReverseMap();
            CreateMap<Accommodation, AccommodationModel>().ReverseMap();
            CreateMap<Accommodation, AddAccommodationRequest>().ReverseMap();
            CreateMap<EmergencyNumber, EmergencyNumberModel>().ReverseMap();
            CreateMap<EmergencyNumber, AddEmergencyNumberRequest>().ReverseMap();
            CreateMap<Organizer, OrganizerModel>().ReverseMap();
            CreateMap<Organizer, AddOrganizerRequest>().ReverseMap();
        }
    }
}

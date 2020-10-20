using AutoMapper;
using Core.Models;
using Persistence.Models;

namespace Core.MappingConfiguration
{
    public class ConferenceMapping : Profile
    {
        public ConferenceMapping()
        {
            CreateMap<Presentation, PresentationModel>().ReverseMap();
            CreateMap<Accommodation, AccommodationModel>().ReverseMap();
        }
    }
}

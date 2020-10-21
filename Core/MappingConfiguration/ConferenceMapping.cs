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
        }
    }
}

using AutoMapper;
using Core.DTO.Requests;
using Core.DTO.Response;
using Core.Models;
using Persistence.Models;

namespace Core.MappingConfiguration
{
    public class PresentationMapping : Profile
    {
        public PresentationMapping()
        {
            CreateMap<ParticipantPhoto, ParticipantPhotoModel>().ReverseMap();
            CreateMap<ParticipantPhoto, AddParticipantPhotoRequest>().ReverseMap();

            CreateMap<Participant, ParticipantModel>().ReverseMap();
            CreateMap<Participant, AddParticipantRequest>().ReverseMap();

            CreateMap<PresentationParticipant, PresentationParticipantModel>().ReverseMap();
            CreateMap<PresentationParticipant, PresentationParticipantRequest>().ReverseMap();

            CreateMap<Presentation, PresentationModel>().ReverseMap();
            CreateMap<Presentation, AddPresentationRequest>().ReverseMap();
            CreateMap<Presentation, PresentationResponse>()
                                .ForMember(dest => dest.PresentationTypeName,
                                  opt => opt.MapFrom(src => src.PresentationType.Name))
                                .ReverseMap();

            CreateMap<PresentationType, PresentationTypeModel>().ReverseMap();
            CreateMap<PresentationType, AddPresentationTypeRequest>().ReverseMap();
        }
    }
}

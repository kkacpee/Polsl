using AutoMapper;
using Core.DTO.Requests;
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
            CreateMap<PresentationParticipant, AddParticipantsToPresentationRequest>().ReverseMap();

            CreateMap<Presentation, PresentationModel>().ReverseMap();
            CreateMap<Presentation, AddPresentationRequest>().ReverseMap();

            CreateMap<PresentationType, PresentationTypeModel>().ReverseMap();
            CreateMap<PresentationType, AddPresentationTypeRequest>().ReverseMap();
        }
    }
}

using AutoMapper;
using Core.Interfaces.Repositories.Conference;
using Core.Interfaces.Services;

namespace Core.Services
{
    public class ConferenceService : IConferenceService
    {
        private readonly IConferenceRepository _conferenceRepository;
        private readonly IMapper _mapper;

        public ConferenceService(IConferenceRepository conferenceRepository, IMapper mapper)
        {
            _conferenceRepository = conferenceRepository;
            _mapper = mapper;
        }
    }
}

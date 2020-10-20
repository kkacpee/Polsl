using AutoMapper;
using Core.Interfaces.Repositories.Conference;
using Core.Interfaces.Services;
using Core.Models;
using Persistence.Models;
using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;

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

        public async Task<List<ConferenceModel>> GetConferencesAsync(CancellationToken cancellationToken)
        {
            var result = await _conferenceRepository.GetAllAsync(cancellationToken);
            return _mapper.Map<List<ConferenceModel>>(result);
        }
    }
}

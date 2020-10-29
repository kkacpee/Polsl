using AutoMapper;
using Core.Interfaces.Repositories.Conference;
using Core.Interfaces.Services;
using Core.Models;
using Core.DTO.Requests;
using Persistence.Models;
using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;
using System;

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

        public async Task<int> AddConferenceAsync(AddConferenceRequest request, CancellationToken cancellationToken)
        {
            if (await _conferenceRepository.AnyAsync(x =>
                        x.Address == request.Address &&
                        x.Country == request.Country &&
                        x.EndDate == request.EndDate &&
                        x.StartDate == request.StartDate &&
                        x.Title == request.Title, cancellationToken))
            {
                throw new InvalidOperationException("This accommodation exists");
            }
            var mapped = _mapper.Map<Conference>(request);
            await _conferenceRepository.AddAsync(mapped, cancellationToken);

            return mapped.ID;
        }

        public async Task DeleteConferencePermanentlyAsync(int id, CancellationToken cancellationToken)
        {
            if (!await _conferenceRepository.AnyAsync(x => x.ID == id, cancellationToken))
            {
                throw new InvalidOperationException("There is no conference with given ID");
            }

            await _conferenceRepository.DeletePermanentlyByIdAsync(id, cancellationToken);
        }
    }
}

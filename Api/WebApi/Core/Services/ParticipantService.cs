using AutoMapper;
using Core.DTO.Requests;
using Core.Interfaces.Repositories.Presentation;
using Core.Interfaces.Services;
using Core.Models;
using Persistence.Models;
using System;
using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;

namespace Core.Services
{
    public class ParticipantService : IParticipantService
    {
        private readonly IParticipantRepository _participantRepository;
        private readonly IMapper _mapper;

        public ParticipantService(IParticipantRepository participantRepository, IMapper mapper)
        {
            _participantRepository = participantRepository;
            _mapper = mapper;
        }

        public async Task<List<ParticipantModel>> GetAllParticipantsAsync(CancellationToken cancellationToken)
        {
            var result = await _participantRepository.GetAllAsync(cancellationToken);

            return _mapper.Map<List<ParticipantModel>>(result);
        }

        public async Task<int> AddParticipantAsync(AddParticipantRequest request, CancellationToken cancellationToken)
        {
            if (await _participantRepository.AnyAsync(x =>
                        x.FirstName == request.FirstName &&
                        x.LastName == request.LastName &&
                        x.Affiliation == request.Affiliation &&
                        x.Company == request.Company &&
                        x.Country == request.Country, cancellationToken))
            {
                throw new InvalidOperationException("Participant with given parameters exists");
            }
            var mapped = _mapper.Map<Participant>(request);
            await _participantRepository.AddAsync(mapped, cancellationToken);

            return mapped.ID;
        }

        public async Task DeleteParticipantPermanentlyAsync(int id, CancellationToken cancellationToken)
        {
            if (!await _participantRepository.AnyAsync(x => x.ID == id, cancellationToken))
            {
                throw new InvalidOperationException("There is no Participant with given ID");
            }

            await _participantRepository.DeletePermanentlyByIdAsync(id, cancellationToken);
        }
    }
}

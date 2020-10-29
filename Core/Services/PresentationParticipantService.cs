using AutoMapper;
using Core.Interfaces.Repositories.Presentation;
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
    public class PresentationParticipantService : IPresentationParticipantService
    {
        private readonly IPresentationParticipantRepository _PresentationParticipantRepository;
        private readonly IMapper _mapper;

        public PresentationParticipantService(IPresentationParticipantRepository PresentationParticipantRepository, IMapper mapper)
        {
            _PresentationParticipantRepository = PresentationParticipantRepository;
            _mapper = mapper;
        }

        public async Task<List<PresentationParticipantModel>> GetAllPresentationParticipantsAsync(CancellationToken cancellationToken)
        {
            var result = await _PresentationParticipantRepository.GetAllAsync(cancellationToken);
            return _mapper.Map<List<PresentationParticipantModel>>(result);
        }

        public async Task AddParticipantsToPresentationAsync(AddParticipantsToPresentationRequest request, CancellationToken cancellationToken)
        {
            var list = new List<PresentationParticipant>();
            foreach (var id in request.ParticipantIDs)
                list.Add(new PresentationParticipant
                {
                    PresentationID = request.PresentationID,
                    ParticipantID = id
                });
            await _PresentationParticipantRepository.AddManyAsync(list, cancellationToken);
        }

        public async Task DeleteParticipantFromPresentationPermanentlyAsync(int id, CancellationToken cancellationToken)
        {
            if (!await _PresentationParticipantRepository.AnyAsync(x => x.ID == id, cancellationToken))
            {
                throw new InvalidOperationException("There is no PresentationParticipant with given ID");
            }

            await _PresentationParticipantRepository.DeletePermanentlyByIdAsync(id, cancellationToken);
        }
    }
}

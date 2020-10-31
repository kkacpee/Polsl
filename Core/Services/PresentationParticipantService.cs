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
        private readonly IPresentationParticipantRepository _presentationParticipantRepository;
        private readonly IMapper _mapper;

        public PresentationParticipantService(IPresentationParticipantRepository presentationParticipantRepository, IMapper mapper)
        {
            _presentationParticipantRepository = presentationParticipantRepository;
            _mapper = mapper;
        }

        public async Task<List<PresentationParticipantModel>> GetAllPresentationParticipantsAsync(CancellationToken cancellationToken)
        {
            var result = await _presentationParticipantRepository.GetAllAsync(cancellationToken);
            return _mapper.Map<List<PresentationParticipantModel>>(result);
        }

        public async Task AddParticipantsToPresentationAsync(AddParticipantsToPresentationRequest request, CancellationToken cancellationToken)
        {
            if (await _presentationParticipantRepository.AnyAsync(x =>
                        request.ParticipantIDs.Contains(x.ParticipantID) &&
                        x.PresentationID == request.PresentationID, cancellationToken))
            {
                throw new InvalidOperationException("This Participant for given presentation exists");
            }

            var list = new List<PresentationParticipant>();
            foreach (var id in request.ParticipantIDs)
                list.Add(new PresentationParticipant
                {
                    PresentationID = request.PresentationID,
                    ParticipantID = id
                });
            await _presentationParticipantRepository.AddManyAsync(list, cancellationToken);
        }

        public async Task DeleteParticipantFromPresentationPermanentlyAsync(int id, CancellationToken cancellationToken)
        {
            if (!await _presentationParticipantRepository.AnyAsync(x => x.ID == id, cancellationToken))
            {
                throw new InvalidOperationException("There is no PresentationParticipant with given ID");
            }

            await _presentationParticipantRepository.DeletePermanentlyByIdAsync(id, cancellationToken);
        }
    }
}

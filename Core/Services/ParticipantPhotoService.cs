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
    public class ParticipantPhotoService : IParticipantPhotoService
    {
        private readonly IParticipantPhotoRepository _participantPhotoRepository;
        private readonly IMapper _mapper;

        public ParticipantPhotoService(IParticipantPhotoRepository participantPhotoRepository, IMapper mapper)
        {
            _participantPhotoRepository = participantPhotoRepository;
            _mapper = mapper;
        }

        public async Task<List<ParticipantPhotoModel>> GetAllParticipantPhotosAsync(CancellationToken cancellationToken)
        {
            var result = await _participantPhotoRepository.GetAllAsync(cancellationToken);

            return _mapper.Map<List<ParticipantPhotoModel>>(result);
        }

        public async Task<int> AddParticipantPhotoAsync(AddParticipantPhotoRequest request, CancellationToken cancellationToken)
        {
            var mapped = _mapper.Map<ParticipantPhoto>(request);
            await _participantPhotoRepository.AddAsync(mapped, cancellationToken);

            return mapped.ID;
        }

        public async Task DeleteParticipantPhotoPermanentlyAsync(int id, CancellationToken cancellationToken)
        {
            if (!await _participantPhotoRepository.AnyAsync(x => x.ID == id, cancellationToken))
            {
                throw new InvalidOperationException("There is no ParticipantPhoto with given ID");
            }

            await _participantPhotoRepository.DeletePermanentlyByIdAsync(id, cancellationToken);
        }
    }
}

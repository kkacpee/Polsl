using AutoMapper;
using Core.DTO.Requests;
using Core.DTO.Response;
using Core.Interfaces.Repositories.Presentation;
using Core.Interfaces.Services;
using Core.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Query;
using Persistence.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;

namespace Core.Services
{
    public class ParticipantService : IParticipantService
    {
        private readonly IParticipantRepository _participantRepository;
        private readonly IPresentationParticipantRepository _presentationParticipantRepository;
        private readonly IMapper _mapper;

        public ParticipantService(IParticipantRepository participantRepository, IPresentationParticipantRepository presentationParticipantRepository, IMapper mapper)
        {
            _participantRepository = participantRepository;
            _presentationParticipantRepository = presentationParticipantRepository;
            _mapper = mapper;
        }

        public async Task<List<ParticipantResponse>> GetAllParticipantsAsync(CancellationToken cancellationToken)
        {
            var include = CreateInclude();

            var result = await _participantRepository.GetAllAsync(cancellationToken, include);

            return _mapper.Map<List<ParticipantResponse>>(result);
        }

        public async Task<List<ParticipantResponse>> GetParticipantsForPresentationAsync(int id, CancellationToken cancellationToken)
        {
            var presentationParticipantsIds = await _presentationParticipantRepository.SelectAsync(x => x.PresentationID == id, x => x.ParticipantID, cancellationToken);
            var result = await _participantRepository.GetAsync(x => !presentationParticipantsIds.ToList().Contains(x.ID), cancellationToken);

            return _mapper.Map<List<ParticipantResponse>>(result);
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

        public async Task EditParticipantAsync(ParticipantModel model, CancellationToken cancellationToken)
        {
            var participantToUpdate = await _participantRepository.GetByIdAsync(model.ID, cancellationToken);
            if (participantToUpdate == null)
            {
                throw new InvalidOperationException("Participant with given id does not exist");
            }

            if (await _participantRepository.AnyAsync(x =>
             x.FirstName == model.FirstName &&
            x.LastName == model.LastName &&
            x.Affiliation == model.Affiliation &&
            x.Company == model.Company &&
            x.Country == model.Country, cancellationToken))
            {
                throw new InvalidOperationException("Participant with given parameters exists");
            }

            participantToUpdate.FirstName = model.FirstName;
            participantToUpdate.LastName = model.LastName;
            participantToUpdate.Affiliation = model.Affiliation;
            participantToUpdate.Company = model.Company;
            participantToUpdate.Country = model.Country;

            await _participantRepository.UpdateAsync(participantToUpdate, cancellationToken);
        }

        public async Task DeleteParticipantPermanentlyAsync(int id, CancellationToken cancellationToken)
        {
            if (!await _participantRepository.AnyAsync(x => x.ID == id, cancellationToken))
            {
                throw new InvalidOperationException("There is no Participant with given ID");
            }

            await _participantRepository.DeletePermanentlyByIdAsync(id, cancellationToken);
        }

        private Func<IQueryable<Participant>, IIncludableQueryable<Participant, object>> CreateInclude()
        {
            return x => x.Include(x => x.ParticipantPhoto);
        }
    }
}

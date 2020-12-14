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
using Core.DTO.Response;
using System.Linq;
using Microsoft.EntityFrameworkCore.Query;
using Microsoft.EntityFrameworkCore;

namespace Core.Services
{
    public class PresentationService : IPresentationService
    {
        private readonly IPresentationRepository _presentationRepository;
        private readonly IMapper _mapper;

        public PresentationService(IPresentationRepository presentationRepository, IMapper mapper)
        {
            _presentationRepository = presentationRepository;
            _mapper = mapper;
        }

        public async Task<List<PresentationModel>> GetPresentationsAsync(CancellationToken cancellationToken)
        {
            var result = await _presentationRepository.GetAllAsync(cancellationToken);
            return _mapper.Map<List<PresentationModel>>(result);
        }

        public async Task<int> AddPresentationAsync(AddPresentationRequest request, CancellationToken cancellationToken)
        {
            if (await _presentationRepository.AnyAsync(x =>
                        x.ConferenceID == request.ConferenceID &&
                        x.Authors == request.Authors &&
                        x.EndDate == request.EndDate &&
                        x.StartDate == request.StartDate &&
                        x.Title == request.Title &&
                        x.Place == request.Place, cancellationToken))
            {
                throw new InvalidOperationException("Presentation with given parameters exists");
            }

            var mapped = _mapper.Map<Presentation>(request);
            await _presentationRepository.AddAsync(mapped, cancellationToken);

            return mapped.ID;
        }

        public async Task EditPresentationAsync(PresentationModel model, CancellationToken cancellationToken)
        {
            var presentationToUpdate = await _presentationRepository.GetByIdAsync(model.ID, cancellationToken);
            if (presentationToUpdate == null)
            {
                throw new InvalidOperationException("Presentation with given id does not exist");
            }

            if (await _presentationRepository.AnyAsync(x =>
             x.ConferenceID == model.ConferenceID &&
            x.Authors == model.Authors &&
            x.EndDate == model.EndDate &&
            x.StartDate == model.StartDate &&
            x.Title == model.Title &&
            x.Place == model.Place, cancellationToken))
{
                throw new InvalidOperationException("Presentation with given parameters exists");
            }

            presentationToUpdate.ConferenceID = model.ConferenceID;
            presentationToUpdate.Authors = model.Authors;
            presentationToUpdate.EndDate = model.EndDate;
            presentationToUpdate.StartDate = model.StartDate;
            presentationToUpdate.Title = model.Title;
            presentationToUpdate.Place = model.Place;

            await _presentationRepository.UpdateAsync(presentationToUpdate, cancellationToken);
        }

        public async Task DeletePresentationPermanentlyAsync(int id, CancellationToken cancellationToken)
        {
            if (!await _presentationRepository.AnyAsync(x => x.ID == id, cancellationToken))
            {
                throw new InvalidOperationException("There is no Presentation with given ID");
            }

            await _presentationRepository.DeletePermanentlyByIdAsync(id, cancellationToken);
        }

        public async Task<PresentationDetailsResponse> GetPresentationDetailsAsync(int id, CancellationToken cancellationToken)
        {
            if (!await _presentationRepository.AnyAsync(x => x.ID == id, cancellationToken))
            {
                throw new InvalidOperationException("There is no Presentation with given ID");
            }

            var include = CreateInclude();

            var result = await _presentationRepository.GetByIdAsync(id, cancellationToken, include);

            var mapped = new PresentationDetailsResponse
            {
                ID = result.ID,
                ConferenceID = result.ConferenceID,
                Authors = result.Authors,
                Description = result.Description,
                EndDate = result.EndDate,
                StartDate = result.StartDate,
                Place = result.Place,
                Title = result.Title,
                PresentationTypeID = result.PresentationTypeID,
                PresentationTypeName = result.PresentationType.Name,
                Photos = _mapper.Map<List<PresentationPhotoResponse>>(result.PresentationPhotos)
            };

            if (result.PresentationParticipants != null)
            {
                var temp = new List<Participant>();
                foreach (var participant in result.PresentationParticipants)
                {
                    temp.Add(participant.Participant);
                }
                mapped.Participants = _mapper.Map<ICollection<ParticipantModel>>(temp);
            }

            return mapped;
        }

        private Func<IQueryable<Presentation>, IIncludableQueryable<Presentation, object>> CreateInclude()
        {
            return x => x.Include(x => x.PresentationParticipants)
                            .ThenInclude(x => x.Participant)
                          .Include(x => x.PresentationType)
                          .Include(x => x.PresentationPhotos);
        }
    }
}

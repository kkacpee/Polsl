using AutoMapper;
using Core.DTO.Requests;
using Core.Interfaces.Repositories.Conference;
using Core.Interfaces.Services;
using Core.Models;
using Persistence.Models;
using System;
using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;

namespace Core.Services
{
    public class ConferenceAccommodationService : IConferenceAccommodationService
    {
        private readonly IConferenceAccommodationRepository _conferenceAccommodationRepository;
        private readonly IMapper _mapper;

        public ConferenceAccommodationService(IConferenceAccommodationRepository ConferenceAccommodationRepository, IMapper mapper)
        {
            _conferenceAccommodationRepository = ConferenceAccommodationRepository;
            _mapper = mapper;
        }

        public async Task<List<ConferenceAccommodationModel>> GetAllConferenceAccommodationsAsync(CancellationToken cancellationToken)
        {
            var result = await _conferenceAccommodationRepository.GetAllAsync(cancellationToken);
            return _mapper.Map<List<ConferenceAccommodationModel>>(result);
        }

        public async Task AddAccommodationsToConferenceAsync(ConferenceAccommodationRequest request, CancellationToken cancellationToken)
        {
            if (await _conferenceAccommodationRepository.AnyAsync(x =>
                        request.AccommodationIDs.Contains(x.AccommodationID) &&
                        x.ConferenceID == request.ConferenceID, cancellationToken))
            {
                throw new InvalidOperationException("This accommodation for given conference exists");
            }
            var list = new List<ConferenceAccommodation>();
            foreach(var id in request.AccommodationIDs)
            {
                list.Add(new ConferenceAccommodation
                {
                    ConferenceID = request.ConferenceID,
                    AccommodationID = id
                });
            }
               
            await _conferenceAccommodationRepository.AddManyAsync(list, cancellationToken);
        }

        public async Task DeleteAccommodationFromConferencePermanentlyAsync(int id, CancellationToken cancellationToken)
        {
            if (!await _conferenceAccommodationRepository.AnyAsync(x => x.ID == id, cancellationToken))
            {
                throw new InvalidOperationException("There is no ConferenceAccommodation with given ID");
            }

            await _conferenceAccommodationRepository.DeletePermanentlyByIdAsync(id, cancellationToken);
        }
    }
}

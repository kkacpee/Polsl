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
    public class ConferencePointOfInterestService : IConferencePointOfInterestService
    {
        private readonly IConferencePointOfInterestRepository _conferencePointOfInterestRepository;
        private readonly IMapper _mapper;

        public ConferencePointOfInterestService(IConferencePointOfInterestRepository ConferencePointOfInterestRepository, IMapper mapper)
        {
            _conferencePointOfInterestRepository = ConferencePointOfInterestRepository;
            _mapper = mapper;
        }

        public async Task<List<ConferencePointOfInterestModel>> GetAllConferencePointsOfInterestAsync(CancellationToken cancellationToken)
        {
            var result = await _conferencePointOfInterestRepository.GetAllAsync(cancellationToken);
            return _mapper.Map<List<ConferencePointOfInterestModel>>(result);
        }

        public async Task AddPointsOfInterestToConferenceAsync(ConferencePointOfInterestRequest request, CancellationToken cancellationToken)
        {
            if (await _conferencePointOfInterestRepository.AnyAsync(x =>
                        request.PointOfInterestIDs.Contains(x.PointOfInterestID) &&
                        x.ConferenceID == request.ConferenceID, cancellationToken))
            {
                throw new InvalidOperationException("This Point Of Interest for given conference exists");
            }
            var list = new List<ConferencePointOfInterest>();
            foreach (var id in request.PointOfInterestIDs)
                list.Add(new ConferencePointOfInterest
                {
                    ConferenceID = request.ConferenceID,
                    PointOfInterestID = id
                });
            await _conferencePointOfInterestRepository.AddManyAsync(list, cancellationToken);
        }

        public async Task DeletePointOfInterestFromConferencePermanentlyAsync(int id, CancellationToken cancellationToken)
        {
            if (!await _conferencePointOfInterestRepository.AnyAsync(x => x.ID == id, cancellationToken))
            {
                throw new InvalidOperationException("There is no ConferencePointOfInterest with given ID");
            }

            await _conferencePointOfInterestRepository.DeletePermanentlyByIdAsync(id, cancellationToken);
        }
    }
}

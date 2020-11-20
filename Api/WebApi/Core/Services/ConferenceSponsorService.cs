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
    public class ConferenceSponsorService : IConferenceSponsorService
    {
        private readonly IConferenceSponsorRepository _conferenceSponsorRepository;
        private readonly IMapper _mapper;

        public ConferenceSponsorService(IConferenceSponsorRepository ConferenceSponsorRepository, IMapper mapper)
        {
            _conferenceSponsorRepository = ConferenceSponsorRepository;
            _mapper = mapper;
        }

        public async Task<List<ConferenceSponsorModel>> GetAllConferenceSponsorsAsync(CancellationToken cancellationToken)
        {
            var result = await _conferenceSponsorRepository.GetAllAsync(cancellationToken);
            return _mapper.Map<List<ConferenceSponsorModel>>(result);
        }

        public async Task AddSponsorsToConferenceAsync(ConferenceSponsorRequest request, CancellationToken cancellationToken)
        {
            if (await _conferenceSponsorRepository.AnyAsync(x =>
                        request.SponsorIDs.Contains(x.SponsorID) &&
                        x.ConferenceID == request.ConferenceID, cancellationToken))
            {
                throw new InvalidOperationException("This Sponsor for given conference exists");
            }

            var list = new List<ConferenceSponsor>();
            foreach (var id in request.SponsorIDs)
                list.Add(new ConferenceSponsor
                {
                    ConferenceID = request.ConferenceID,
                    SponsorID = id
                });
            await _conferenceSponsorRepository.AddManyAsync(list, cancellationToken);
        }

        public async Task DeleteSponsorFromConferencePermanentlyAsync(int id, CancellationToken cancellationToken)
        {
            if (!await _conferenceSponsorRepository.AnyAsync(x => x.ID == id, cancellationToken))
            {
                throw new InvalidOperationException("There is no ConferenceSponsor with given ID");
            }

            await _conferenceSponsorRepository.DeletePermanentlyByIdAsync(id, cancellationToken);
        }
    }
}

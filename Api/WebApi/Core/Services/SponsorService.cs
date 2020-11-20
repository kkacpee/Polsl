using AutoMapper;
using Core.DTO.Requests;
using Core.Interfaces.Repositories.Conference;
using Core.Interfaces.Services;
using Core.Models;
using Persistence.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;

namespace Core.Services
{
    public class SponsorService : ISponsorService
    {
        private readonly ISponsorRepository _sponsorRepository;
        private readonly IConferenceSponsorRepository _conferenceSponsorRepository;
        private readonly IMapper _mapper;

        public SponsorService(ISponsorRepository sponsorRepository,IConferenceSponsorRepository conferenceSponsorRepository, IMapper mapper)
        {
            _sponsorRepository = sponsorRepository;
            _conferenceSponsorRepository = conferenceSponsorRepository;
            _mapper = mapper;
        }

        public async Task<List<SponsorModel>> GetAllSponsorsAsync(CancellationToken cancellationToken)
        {
            var result = await _sponsorRepository.GetAllAsync(cancellationToken);

            return _mapper.Map<List<SponsorModel>>(result);
        }

        public async Task<List<SponsorModel>> GetSponsorsForConference(int id, CancellationToken cancellationToken)
        {
            var conferenceSponsorIDs = await _conferenceSponsorRepository.SelectAsync(x => x.ConferenceID == id, x => x.SponsorID, cancellationToken);
            var result = await _sponsorRepository.GetAsync(x => !conferenceSponsorIDs.ToList().Contains(x.ID), cancellationToken);

            return _mapper.Map<List<SponsorModel>>(result);
        }

        public async Task<int> AddSponsorAsync(AddSponsorRequest request, CancellationToken cancellationToken)
        {
            if (await _sponsorRepository.AnyAsync(x =>
                        x.Name == request.Name &&
                        x.Country == request.Country &&
                        x.Website == request.Website, cancellationToken))
            {
                throw new InvalidOperationException("Sponsor with given parameters exists");
            }

            var mapped = _mapper.Map<Sponsor>(request);
            await _sponsorRepository.AddAsync(mapped, cancellationToken);

            return mapped.ID;
        }

        public async Task EditSponsorAsync(SponsorModel model, CancellationToken cancellationToken)
        {
            var sponsorToUpdate = await _sponsorRepository.GetByIdAsync(model.ID, cancellationToken);
            if (sponsorToUpdate == null)
            {
                throw new InvalidOperationException("Sponsor with given id does not exist");
            }

            if (await _sponsorRepository.AnyAsync(x =>
             x.Name == model.Name &&
            x.Country == model.Country &&
            x.Website == model.Website, cancellationToken))
            {
                throw new InvalidOperationException("Sponsor with given parameters exists");
            }

            sponsorToUpdate.Name = model.Name;
            sponsorToUpdate.Country = model.Country;
            sponsorToUpdate.Website = model.Website;

            await _sponsorRepository.UpdateAsync(sponsorToUpdate, cancellationToken);
        }

        public async Task DeleteSponsorPermanentlyAsync(int id, CancellationToken cancellationToken)
        {
            if (!await _sponsorRepository.AnyAsync(x => x.ID == id, cancellationToken))
            {
                throw new InvalidOperationException("There is no Sponsor with given ID");
            }

            await _sponsorRepository.DeletePermanentlyByIdAsync(id, cancellationToken);
        }
    }
}

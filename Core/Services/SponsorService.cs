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
    public class SponsorService : ISponsorService
    {
        private readonly ISponsorRepository _sponsorRepository;
        private readonly IMapper _mapper;

        public SponsorService(ISponsorRepository sponsorRepository, IMapper mapper)
        {
            _sponsorRepository = sponsorRepository;
            _mapper = mapper;
        }

        public async Task<List<SponsorModel>> GetAllSponsorsAsync(CancellationToken cancellationToken)
        {
            var result = await _sponsorRepository.GetAllAsync(cancellationToken);

            return _mapper.Map<List<SponsorModel>>(result);
        }

        public async Task<int> AddSponsorAsync(AddSponsorRequest request, CancellationToken cancellationToken)
        {
            var mapped = _mapper.Map<Sponsor>(request);
            await _sponsorRepository.AddAsync(mapped, cancellationToken);

            return mapped.ID;
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

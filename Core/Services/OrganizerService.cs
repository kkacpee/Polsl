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
    public class OrganizerService : IOrganizerService
    {
        private readonly IOrganizerRepository _organizerRepository;
        private readonly IMapper _mapper;

        public OrganizerService(IOrganizerRepository OrganizerRepository, IMapper mapper)
        {
            _organizerRepository = OrganizerRepository;
            _mapper = mapper;
        }

        public async Task<List<OrganizerModel>> GetAllOrganizersAsync(CancellationToken cancellationToken)
        {
            var result = await _organizerRepository.GetAllAsync(cancellationToken);

            return _mapper.Map<List<OrganizerModel>>(result);
        }

        public async Task<int> AddOrganizerAsync(AddOrganizerRequest request, CancellationToken cancellationToken)
        {
            var mapped = _mapper.Map<Organizer>(request);
            await _organizerRepository.AddAsync(mapped, cancellationToken);

            return mapped.ID;
        }

        public async Task DeleteOrganizerPermanentlyAsync(int id, CancellationToken cancellationToken)
        {
            if (!await _organizerRepository.AnyAsync(x => x.ID == id, cancellationToken))
            {
                throw new InvalidOperationException("There is no Organizer with given ID");
            }

            await _organizerRepository.DeletePermanentlyByIdAsync(id, cancellationToken);
        }
    }
}

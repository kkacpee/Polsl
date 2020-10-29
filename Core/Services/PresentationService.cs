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
            var mapped = _mapper.Map<Presentation>(request);
            await _presentationRepository.AddAsync(mapped, cancellationToken);

            return mapped.ID;
        }

        public async Task DeletePresentationPermanentlyAsync(int id, CancellationToken cancellationToken)
        {
            if (!await _presentationRepository.AnyAsync(x => x.ID == id, cancellationToken))
            {
                throw new InvalidOperationException("There is no Presentation with given ID");
            }

            await _presentationRepository.DeletePermanentlyByIdAsync(id, cancellationToken);
        }
    }
}

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
    public class PresentationTypeService : IPresentationTypeService
    {
        private readonly IPresentationTypeRepository _presentationTypeRepository;
        private readonly IMapper _mapper;

        public PresentationTypeService(IPresentationTypeRepository presentationTypeRepository, IMapper mapper)
        {
            _presentationTypeRepository = presentationTypeRepository;
            _mapper = mapper;
        }

        public async Task<List<PresentationTypeModel>> GetAllPresentationTypesAsync(CancellationToken cancellationToken)
        {
            var result = await _presentationTypeRepository.GetAllAsync(cancellationToken);
            return _mapper.Map<List<PresentationTypeModel>>(result);
        }

        public async Task<int> AddPresentationTypeAsync(AddPresentationTypeRequest request, CancellationToken cancellationToken)
        {
            var mapped = _mapper.Map<PresentationType>(request);
            await _presentationTypeRepository.AddAsync(mapped, cancellationToken);

            return mapped.ID;
        }

        public async Task DeletePresentationTypePermanentlyAsync(int id, CancellationToken cancellationToken)
        {
            if (!await _presentationTypeRepository.AnyAsync(x => x.ID == id, cancellationToken))
            {
                throw new InvalidOperationException("There is no PresentationType with given ID");
            }

            await _presentationTypeRepository.DeletePermanentlyByIdAsync(id, cancellationToken);
        }
    }
}

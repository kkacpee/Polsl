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
    public class PointOfInterestTypeService : IPointOfInterestTypeService
    {
        private readonly IPointOfInterestTypeRepository _pointOfInterestTypeRepository;
        private readonly IMapper _mapper;

        public PointOfInterestTypeService(IPointOfInterestTypeRepository pointOfInterestTypeRepository, IMapper mapper)
        {
            _pointOfInterestTypeRepository = pointOfInterestTypeRepository;
            _mapper = mapper;
        }

        public async Task<List<PointOfInterestTypeModel>> GetAllPointOfInterestTypesAsync(CancellationToken cancellationToken)
        {
            var result = await _pointOfInterestTypeRepository.GetAllAsync(cancellationToken);

            return _mapper.Map<List<PointOfInterestTypeModel>>(result);
        }

        public async Task<int> AddPointOfInterestTypeAsync(AddPointOfInterestTypeRequest request, CancellationToken cancellationToken)
        {
            var mapped = _mapper.Map<PointOfInterestType>(request);
            await _pointOfInterestTypeRepository.AddAsync(mapped, cancellationToken);

            return mapped.ID;
        }

        public async Task DeletePointOfInterestTypePermanentlyAsync(int id, CancellationToken cancellationToken)
        {
            if (!await _pointOfInterestTypeRepository.AnyAsync(x => x.ID == id, cancellationToken))
            {
                throw new InvalidOperationException("There is no PointOfInterestType with given ID");
            }

            await _pointOfInterestTypeRepository.DeletePermanentlyByIdAsync(id, cancellationToken);
        }
    }
}

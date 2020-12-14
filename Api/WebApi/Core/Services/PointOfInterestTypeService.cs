using AutoMapper;
using Core.DTO.Requests;
using Core.Interfaces.Repositories.Conference;
using Core.Interfaces.Services;
using Core.Models;
using Persistence.Models;
using System;
using System.Collections.Generic;
using System.IO;
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

        public async Task EditPointOfInterestTypeAsync(PointOfInterestTypeModel model, CancellationToken cancellationToken)
        {
            var pointOfInterestTypeToUpdate = await _pointOfInterestTypeRepository.GetByIdAsync(model.ID, cancellationToken);
            if (pointOfInterestTypeToUpdate == null)
            {
                throw new InvalidOperationException("PointOfInterestType with given id does not exist");
            }

            if (await _pointOfInterestTypeRepository.AnyAsync(x =>
             x.Name == model.Name && x.ID != model.ID, cancellationToken))
            {
                throw new InvalidOperationException("PointOfInterestType with given parameters exists");
            }

            pointOfInterestTypeToUpdate.Name = model.Name;
            pointOfInterestTypeToUpdate.PointOfInterestIconID = model.PointOfInterestIconID;

            await _pointOfInterestTypeRepository.UpdateAsync(pointOfInterestTypeToUpdate, cancellationToken);
        }

        public async Task<int> AddPointOfInterestTypeAsync(AddPointOfInterestTypeRequest request, CancellationToken cancellationToken)
        {
            if (await _pointOfInterestTypeRepository.AnyAsync(x =>
                        x.Name == request.Name, cancellationToken))
            {
                throw new InvalidOperationException("Point Of Interest Type with given parameters exists");
            }

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

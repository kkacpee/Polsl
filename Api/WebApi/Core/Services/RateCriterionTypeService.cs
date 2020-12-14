using AutoMapper;
using Core.DTO.Requests;
using Core.Interfaces.Repositories;
using Core.Interfaces.Services;
using Core.Models;
using Persistence.Models;
using System;
using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;

namespace Core.Services
{
    public class RateCriterionTypeService : IRateCriterionTypeService
    {
        private readonly IRateCriterionTypeRepository _rateCriterionTypeRepository;
        private readonly IMapper _mapper;

        public RateCriterionTypeService(IRateCriterionTypeRepository rateCriterionTypeRepository, IMapper mapper)
        {
            _rateCriterionTypeRepository = rateCriterionTypeRepository;
            _mapper = mapper;
        }

        public async Task<List<RateCriterionTypeModel>> GetAlRateCriterionTypesAsync(CancellationToken cancellationToken)
        {
            var result = await _rateCriterionTypeRepository.GetAllAsync(cancellationToken);
            return _mapper.Map<List<RateCriterionTypeModel>>(result);
        }

        public async Task<int> AddRateCriterionTypeAsync(AddRateCriterionTypeRequest request, CancellationToken cancellationToken)
        {
            if (await _rateCriterionTypeRepository.AnyAsync(x =>
                        x.Name == request.Name, cancellationToken))
            {
                throw new InvalidOperationException("RateCriterion Type with given parameters exists");
            }

            var mapped = _mapper.Map<RateCriterionType>(request);
            await _rateCriterionTypeRepository.AddAsync(mapped, cancellationToken);

            return mapped.ID;
        }

        public async Task EditRateCriterionTypeAsync(RateCriterionTypeModel model, CancellationToken cancellationToken)
        {
            var rateCriterionTypeToUpdate = await _rateCriterionTypeRepository.GetByIdAsync(model.ID, cancellationToken);
            if (rateCriterionTypeToUpdate == null)
            {
                throw new InvalidOperationException("RateCriterionType with given id does not exist");
            }

            if (await _rateCriterionTypeRepository.AnyAsync(x =>
             x.Name == model.Name, cancellationToken))
            {
                throw new InvalidOperationException("RateCriterionType with given parameters exists");
            }

            rateCriterionTypeToUpdate.Name = model.Name;

            await _rateCriterionTypeRepository.UpdateAsync(rateCriterionTypeToUpdate, cancellationToken);
        }

        public async Task DeleteRateCriterionTypePermanentlyAsync(int id, CancellationToken cancellationToken)
        {
            if (!await _rateCriterionTypeRepository.AnyAsync(x => x.ID == id, cancellationToken))
            {
                throw new InvalidOperationException("There is no RateCriterionType with given ID");
            }

            await _rateCriterionTypeRepository.DeletePermanentlyByIdAsync(id, cancellationToken);
        }
    }
}

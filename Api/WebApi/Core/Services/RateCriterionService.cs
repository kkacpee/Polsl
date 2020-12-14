using AutoMapper;
using Core.DTO.Requests;
using Core.DTO.Response;
using Core.Interfaces.Repositories;
using Core.Interfaces.Services;
using Core.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Query;
using Persistence.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;

namespace Core.Services
{
    public class RateCriterionService : IRateCriterionService
    {
        private readonly IRateCriterionRepository _rateCrtiterionRepository;
        private readonly IMapper _mapper;

        public RateCriterionService(IRateCriterionRepository rateCrtiterionRepository, IMapper mapper)
        {
            _rateCrtiterionRepository = rateCrtiterionRepository;
            _mapper = mapper;
        }

        public async Task<List<RateCriterionResponse>> GetAllRateCrtiterionsAsync(CancellationToken cancellationToken)
        {
            var include = CreateInclude();
            var result = await _rateCrtiterionRepository.GetAllAsync(cancellationToken, include);

            return _mapper.Map<List<RateCriterionResponse>>(result);
        }

        public async Task<int> AddRateCriterionAsync(AddRateCriterionRequest request, CancellationToken cancellationToken)
        {
            if (await _rateCrtiterionRepository.AnyAsync(x =>
                        x.Name == request.Name &&
                        x.RateCriterionTypeID == request.RateCriterionTypeID, cancellationToken))
            {
                throw new InvalidOperationException("Point Of Interest with given parameters exists");
            }

            var mapped = _mapper.Map<RateCriterion>(request);
            await _rateCrtiterionRepository.AddAsync(mapped, cancellationToken);

            return mapped.ID;
        }

        public async Task EditRateCriterionAsync(RateCriterionModel model, CancellationToken cancellationToken)
        {
            var rateCrtiterionToUpdate = await _rateCrtiterionRepository.GetByIdAsync(model.ID, cancellationToken);
            if (rateCrtiterionToUpdate == null)
            {
                throw new InvalidOperationException("RateCriterion with given id does not exist");
            }

            if (await _rateCrtiterionRepository.AnyAsync(x =>
             x.Name == model.Name &&
            x.RateCriterionTypeID == model.RateCriterionTypeID, cancellationToken))
            {
                throw new InvalidOperationException("RateCriterion with given parameters exists");
            }

            rateCrtiterionToUpdate.Name = model.Name;
            rateCrtiterionToUpdate.RateCriterionTypeID = model.RateCriterionTypeID;

            await _rateCrtiterionRepository.UpdateAsync(rateCrtiterionToUpdate, cancellationToken);
        }

        public async Task DeleteRateCriterionPermanentlyAsync(int id, CancellationToken cancellationToken)
        {
            if (!await _rateCrtiterionRepository.AnyAsync(x => x.ID == id, cancellationToken))
            {
                throw new InvalidOperationException("There is no RateCriterion with given ID");
            }

            await _rateCrtiterionRepository.DeletePermanentlyByIdAsync(id, cancellationToken);
        }

        private Func<IQueryable<RateCriterion>, IIncludableQueryable<RateCriterion, object>> CreateInclude()
        {
            return x => x.Include(x => x.RateCriterionType);
        }
    }
}

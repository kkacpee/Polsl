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
    public class BuildingPlanService : IBuildingPlanService
    {
        private readonly IBuildingPlanRepository _buildingPlanRepository;
        private readonly IMapper _mapper;

        public BuildingPlanService(IBuildingPlanRepository buildingPlanRepository, IMapper mapper)
        {
            _buildingPlanRepository = buildingPlanRepository;
            _mapper = mapper;
        }

        public async Task<List<BuildingPlanModel>> GetAllBuildingPlansAsync(CancellationToken cancellationToken)
        {
            var result = await _buildingPlanRepository.GetAllAsync(cancellationToken);

            return _mapper.Map<List<BuildingPlanModel>>(result);
        }

        public async Task<int> AddBuildingPlanAsync(AddBuildingPlanRequest request, CancellationToken cancellationToken)
        {
            if (await _buildingPlanRepository.AnyAsync(x =>
             x.Name == request.Name &&
             x.Description == request.Description &&
             x.Path == request.Path &&
             x.ConferenceID == request.ConferenceID, cancellationToken))
            {
                throw new InvalidOperationException("This building plan already exists");
            }

            var mapped = _mapper.Map<BuildingPlan>(request);
            await _buildingPlanRepository.AddAsync(mapped, cancellationToken);

            return mapped.ID;
        }

        public async Task DeleteBuildingPlanPermanentlyAsync(int id, CancellationToken cancellationToken)
        {
            if (!await _buildingPlanRepository.AnyAsync(x => x.ID == id, cancellationToken))
            {
                throw new InvalidOperationException("There is no BuildingPlan with given ID");
            }

            await _buildingPlanRepository.DeletePermanentlyByIdAsync(id, cancellationToken);
        }

    }
}

using Core.Models;
using Core.DTO.Requests;
using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;

namespace Core.Interfaces.Services
{
    public interface IBuildingPlanService
    {
        Task<List<BuildingPlanModel>> GetAllBuildingPlansAsync(CancellationToken cancellationToken);
        Task<int> AddBuildingPlanAsync(AddBuildingPlanRequest request, CancellationToken cancellationToken);
        Task DeleteBuildingPlanPermanentlyAsync(int id, CancellationToken cancellationToken);
    }
}

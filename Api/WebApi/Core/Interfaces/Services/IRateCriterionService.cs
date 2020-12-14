using Core.DTO.Requests;
using Core.DTO.Response;
using Core.Models;
using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;

namespace Core.Interfaces.Services
{
    public interface IRateCriterionService
    {
        Task<List<RateCriterionResponse>> GetAllRateCrtiterionsAsync(CancellationToken cancellationToken);
        Task<int> AddRateCriterionAsync(AddRateCriterionRequest request, CancellationToken cancellationToken);
        Task EditRateCriterionAsync(RateCriterionModel model, CancellationToken cancellationToken);
        Task DeleteRateCriterionPermanentlyAsync(int id, CancellationToken cancellationToken);
    }
}

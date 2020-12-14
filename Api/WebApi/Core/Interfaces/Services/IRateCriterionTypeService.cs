using Core.DTO.Requests;
using Core.Models;
using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;

namespace Core.Interfaces.Services
{
    public interface IRateCriterionTypeService
    {
        Task<List<RateCriterionTypeModel>> GetAlRateCriterionTypesAsync(CancellationToken cancellationToken);
        Task<int> AddRateCriterionTypeAsync(AddRateCriterionTypeRequest request, CancellationToken cancellationToken);
        Task EditRateCriterionTypeAsync(RateCriterionTypeModel model, CancellationToken cancellationToken);
        Task DeleteRateCriterionTypePermanentlyAsync(int id, CancellationToken cancellationToken);
    }
}

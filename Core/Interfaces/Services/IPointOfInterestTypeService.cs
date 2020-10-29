using Core.Models;
using Core.DTO.Requests;
using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;

namespace Core.Interfaces.Services
{
    public interface IPointOfInterestTypeService
    {
        Task<List<PointOfInterestTypeModel>> GetAllPointOfInterestTypesAsync(CancellationToken cancellationToken);
        Task<int> AddPointOfInterestTypeAsync(AddPointOfInterestTypeRequest request, CancellationToken cancellationToken);
        Task DeletePointOfInterestTypePermanentlyAsync(int id, CancellationToken cancellationToken);
    }
}

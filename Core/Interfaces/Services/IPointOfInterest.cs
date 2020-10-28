using Core.Models;
using Core.DTO.Requests;
using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;

namespace Core.Interfaces.Services
{
    public interface IPointOfInterestService
    {
        Task<List<PointOfInterestModel>> GetAllPointsOfInterestAsync(CancellationToken cancellationToken);
        Task<int> AddPointOfInterestAsync(AddPointOfInterestRequest request, CancellationToken cancellationToken);
        Task DeletePointOfInterestPermanentlyAsync(int id, CancellationToken cancellationToken);
    }
}

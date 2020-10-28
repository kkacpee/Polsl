using Core.DTO.Requests;
using Core.Models;
using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;

namespace Core.Interfaces.Services
{
    public interface IAccommodationService
    {
        Task<List<AccommodationModel>> GetAllAccommodations(CancellationToken cancellationToken);
        Task<int> AddAccommodationAsync(AddAccommodationRequest request, CancellationToken cancellationToken);
        Task DeleteAccommodationPermanentlyAsync(int id, CancellationToken cancellationToken);
    }
}

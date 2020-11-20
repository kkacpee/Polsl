using Core.Models;
using Core.DTO.Requests;
using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;

namespace Core.Interfaces.Services
{
    public interface IConferenceAccommodationService
    {
        Task<List<ConferenceAccommodationModel>> GetAllConferenceAccommodationsAsync(CancellationToken cancellationToken);
        Task AddAccommodationsToConferenceAsync(ConferenceAccommodationRequest request, CancellationToken cancellationToken);
        Task DeleteAccommodationFromConferencePermanentlyAsync(int id, CancellationToken cancellationToken);
    }
}

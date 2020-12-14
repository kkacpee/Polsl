using Core.Models;
using Core.DTO.Requests;
using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;
using Core.DTO.Response;

namespace Core.Interfaces.Services
{
    public interface IConferenceService
    {
        Task<List<ConferenceResponse>> GetConferencesAsync(CancellationToken cancellationToken);
        Task<int> AddConferenceAsync(AddConferenceRequest request, CancellationToken cancellationToken);
        Task DeleteConferencePermanentlyAsync(int id, CancellationToken cancellationToken);
        Task<ConferenceDetailsResponse> GetConferenceDetailsAsync(int id, CancellationToken cancellationToken);
        Task EditConferenceAsync(ConferenceModel model, CancellationToken cancellationToken);
    }
}

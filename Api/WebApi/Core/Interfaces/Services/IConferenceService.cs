using Core.Models;
using Core.DTO.Requests;
using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;

namespace Core.Interfaces.Services
{
    public interface IConferenceService
    {
        Task<List<ConferenceModel>> GetConferencesAsync(CancellationToken cancellationToken);
        Task<int> AddConferenceAsync(AddConferenceRequest request, CancellationToken cancellationToken);
        Task DeleteConferencePermanentlyAsync(int id, CancellationToken cancellationToken);
    }
}

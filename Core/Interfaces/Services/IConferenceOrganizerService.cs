using Core.Models;
using Core.DTO.Requests;
using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;

namespace Core.Interfaces.Services
{
    public interface IConferenceOrganizerService
    {
        Task<List<ConferenceOrganizerModel>> GetAllConferenceOrganizersAsync(CancellationToken cancellationToken);
        Task AddOrganizersToConferenceAsync(AddOrganizersToConferenceRequest request, CancellationToken cancellationToken);
        Task DeleteOrganizerFromConferencePermanentlyAsync(int id, CancellationToken cancellationToken);
    }
}

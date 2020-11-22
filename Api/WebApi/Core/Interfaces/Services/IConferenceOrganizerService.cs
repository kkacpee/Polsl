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
        Task AddOrganizersToConferenceAsync(ConferenceOrganizerRequest request, CancellationToken cancellationToken);
        Task DeleteOrganizerFromConferencePermanentlyAsync(ConferenceOrganizerRequest request, CancellationToken cancellationToken);
    }
}

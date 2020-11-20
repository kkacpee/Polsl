using Core.Models;
using Core.DTO.Requests;
using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;

namespace Core.Interfaces.Services
{
    public interface IOrganizerService
    {
        Task<List<OrganizerModel>> GetAllOrganizersAsync(CancellationToken cancellationToken);
        Task<int> AddOrganizerAsync(AddOrganizerRequest request, CancellationToken cancellationToken);
        Task DeleteOrganizerPermanentlyAsync(int id, CancellationToken cancellationToken);
        Task EditOrganizerAsync(OrganizerModel model, CancellationToken cancellationToken);
        Task<List<OrganizerModel>> GetOrganizersForConference(int id, CancellationToken cancellationToken);
    }
}

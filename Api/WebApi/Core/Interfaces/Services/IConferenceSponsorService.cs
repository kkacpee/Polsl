using Core.Models;
using Core.DTO.Requests;
using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;

namespace Core.Interfaces.Services
{
    public interface IConferenceSponsorService
    {
        Task<List<ConferenceSponsorModel>> GetAllConferenceSponsorsAsync(CancellationToken cancellationToken);
        Task AddSponsorsToConferenceAsync(ConferenceSponsorRequest request, CancellationToken cancellationToken);
        Task DeleteSponsorFromConferencePermanentlyAsync(ConferenceSponsorRequest request, CancellationToken cancellationToken);
    }
}

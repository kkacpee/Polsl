using Core.Models;
using Core.DTO.Requests;
using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;

namespace Core.Interfaces.Services
{
    public interface ISponsorService
    {
        Task<List<SponsorModel>> GetAllSponsorsAsync(CancellationToken cancellationToken);
        Task<int> AddSponsorAsync(AddSponsorRequest request, CancellationToken cancellationToken);
        Task DeleteSponsorPermanentlyAsync(int id, CancellationToken cancellationToken);
        Task EditSponsorAsync(SponsorModel model, CancellationToken cancellationToken);
        Task<List<SponsorModel>> GetSponsorsForConference(int id, CancellationToken cancellationToken);
    }
}

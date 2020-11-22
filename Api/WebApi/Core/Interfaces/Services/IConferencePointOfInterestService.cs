using Core.Models;
using Core.DTO.Requests;
using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;

namespace Core.Interfaces.Services
{
    public interface IConferencePointOfInterestService
    {
        Task<List<ConferencePointOfInterestModel>> GetAllConferencePointsOfInterestAsync(CancellationToken cancellationToken);
        Task AddPointsOfInterestToConferenceAsync(ConferencePointOfInterestRequest request, CancellationToken cancellationToken);
        Task DeletePointOfInterestFromConferencePermanentlyAsync(ConferencePointOfInterestRequest request, CancellationToken cancellationToken);
    }
}

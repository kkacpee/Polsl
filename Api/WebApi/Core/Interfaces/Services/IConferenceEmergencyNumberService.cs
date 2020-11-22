using Core.Models;
using Core.DTO.Requests;
using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;

namespace Core.Interfaces.Services
{
    public interface IConferenceEmergencyNumberService
    {
        Task<List<ConferenceEmergencyNumberModel>> GetAllConferenceEmergencyNumbersAsync(CancellationToken cancellationToken);
        Task AddEmergencyNumbersToConferenceAsync(ConferenceEmergencyNumberRequest request, CancellationToken cancellationToken);
        Task DeleteEmergencyNumberFromConferencePermanentlyAsync(ConferenceEmergencyNumberRequest request, CancellationToken cancellationToken);
    }
}

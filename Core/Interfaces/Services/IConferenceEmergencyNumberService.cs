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
        Task AddEmergencyNumbersToConferenceAsync(AddEmergencyNumbersToConferenceRequest request, CancellationToken cancellationToken);
        Task DeleteEmergencyNumberFromConferencePermanentlyAsync(int id, CancellationToken cancellationToken);
    }
}

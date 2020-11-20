using Core.DTO.Requests;
using Core.Models;
using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;

namespace Core.Interfaces.Services
{
    public interface IEmergencyNumberService
    {
        Task<List<EmergencyNumberModel>> GetAllEmergencyNumbers(CancellationToken cancellationToken);
        Task<int> AddEmergencyNumberAsync(AddEmergencyNumberRequest request, CancellationToken cancellationToken);
        Task DeleteEmergencyNumberPermanentlyAsync(int id, CancellationToken cancellationToken);
        Task EditEmergencyNumberAsync(EmergencyNumberModel model, CancellationToken cancellationToken);
        Task<List<EmergencyNumberModel>> GetEmergencyNumbersForConference(int id, CancellationToken cancellationToken);
    }
}

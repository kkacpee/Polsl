using Core.Models;
using Core.DTO.Requests;
using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;

namespace Core.Interfaces.Services
{
    public interface IPresentationParticipantService
    {
        Task<List<PresentationParticipantModel>> GetAllPresentationParticipantsAsync(CancellationToken cancellationToken);
        Task AddParticipantsToPresentationAsync(PresentationParticipantRequest request, CancellationToken cancellationToken);
        Task DeleteParticipantFromPresentationPermanentlyAsync(int id, CancellationToken cancellationToken);
    }
}

using Core.Models;
using Core.DTO.Requests;
using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;

namespace Core.Interfaces.Services
{
    public interface IParticipantService
    {
        Task<List<ParticipantModel>> GetAllParticipantsAsync(CancellationToken cancellationToken);
        Task<int> AddParticipantAsync(AddParticipantRequest request, CancellationToken cancellationToken);
        Task DeleteParticipantPermanentlyAsync(int id, CancellationToken cancellationToken);
        Task EditParticipantAsync(ParticipantModel model, CancellationToken cancellationToken);
        Task<List<ParticipantModel>> GetParticipantsForPresentationAsync(int id, CancellationToken cancellationToken);
    }
}
using Core.Models;
using Core.DTO.Requests;
using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;
using Core.DTO.Response;

namespace Core.Interfaces.Services
{
    public interface IParticipantService
    {
        Task<List<ParticipantResponse>> GetAllParticipantsAsync(CancellationToken cancellationToken);
        Task<int> AddParticipantAsync(AddParticipantRequest request, CancellationToken cancellationToken);
        Task DeleteParticipantPermanentlyAsync(int id, CancellationToken cancellationToken);
        Task EditParticipantAsync(ParticipantModel model, CancellationToken cancellationToken);
        Task<List<ParticipantResponse>> GetParticipantsForPresentationAsync(int id, CancellationToken cancellationToken);
    }
}
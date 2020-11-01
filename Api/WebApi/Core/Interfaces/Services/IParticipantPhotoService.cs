using Core.Models;
using Core.DTO.Requests;
using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;

namespace Core.Interfaces.Services
{
    public interface IParticipantPhotoService
    {
        Task<List<ParticipantPhotoModel>> GetAllParticipantPhotosAsync(CancellationToken cancellationToken);
        Task<int> AddParticipantPhotoAsync(AddParticipantPhotoRequest request, CancellationToken cancellationToken);
        Task DeleteParticipantPhotoPermanentlyAsync(int id, CancellationToken cancellationToken);
    }
}
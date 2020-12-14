using Core.DTO.Requests;
using System.Threading;
using System.Threading.Tasks;

namespace Core.Interfaces.Services
{
    public interface IConferencePhotoService
    {
        Task AddConferencePhoto(AddConferencePhotoRequest request, CancellationToken cancellationToken);
        Task ChangeMainPhoto(ChangeConferenceMainPhotoRequest request, CancellationToken cancellationToken);
        Task DeleteConferencePhotoPermanentlyAsync(int id, CancellationToken cancellationToken);
    }
}

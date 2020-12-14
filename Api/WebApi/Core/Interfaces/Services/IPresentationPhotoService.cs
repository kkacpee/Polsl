using Core.DTO.Requests;
using System.Threading;
using System.Threading.Tasks;

namespace Core.Interfaces.Services
{
    public interface IPresentationPhotoService
    {
        Task AddPresentationPhoto(AddPresentationPhotoRequest request, CancellationToken cancellationToken);
        Task ChangeMainPhoto(ChangePresentationMainPhotoRequest request, CancellationToken cancellationToken);
        Task DeletePresentationPhotoPermanentlyAsync(int id, CancellationToken cancellationToken);
    }
}

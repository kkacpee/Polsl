using Core.Models;
using Core.DTO.Requests;
using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;

namespace Core.Interfaces.Services
{
    public interface IPresentationTypeService
    {
        Task<List<PresentationTypeModel>> GetAllPresentationTypesAsync(CancellationToken cancellationToken);
        Task<int> AddPresentationTypeAsync(AddPresentationTypeRequest request, CancellationToken cancellationToken);
        Task DeletePresentationTypePermanentlyAsync(int id, CancellationToken cancellationToken);
        Task EditPresentationTypeAsync(PresentationTypeModel model, CancellationToken cancellationToken);
    }
}
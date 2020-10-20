using Core.Models;
using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;

namespace Core.Interfaces.Services
{
    public interface IPresentationService
    {
        Task<List<PresentationModel>> GetAllPresentations(CancellationToken cancellationToken);
    }
}

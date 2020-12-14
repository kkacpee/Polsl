using Core.DTO.Requests;
using Core.DTO.Response;
using Core.Models;
using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;

namespace Core.Interfaces.Services
{
    public interface IRateService
    {
        Task<List<RateResponse>> GetAllRatesAsync(CancellationToken cancellationToken);
        Task<List<RateResponse>> GetRatesForConference(int id, CancellationToken cancellationToken);
        Task<List<RateResponse>> GetRatesForPresentation(int id, CancellationToken cancellationToken);
        Task<int> AddRateAsync(AddRateRequest request, CancellationToken cancellationToken);
        Task EditRateAsync(RateModel model, CancellationToken cancellationToken);
        Task DeleteRatePermanentlyAsync(int id, CancellationToken cancellationToken);
    }
}

using Core.Models;
using Core.DTO.Requests;
using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Core.Interfaces.Services
{
    public interface IPointOfInterestIconService
    {
        Task<List<PointOfInterestIconModel>> GetAllPointOfInterestIconsAsync(CancellationToken cancellationToken);
        Task<int> AddPointOfInterestIconAsync(IFormFile file, CancellationToken cancellationToken);
        Task DeletePointOfInterestIconPermanentlyAsync(int id, CancellationToken cancellationToken);
        Task EditPointOfInterestIconAsync(PointOfInterestIconModel model, CancellationToken cancellationToken);
        Task<string> GetPhotoById(int id, CancellationToken cancellationToken);
    }
}

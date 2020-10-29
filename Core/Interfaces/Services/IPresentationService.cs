﻿using Core.DTO.Requests;
using Core.Models;
using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;

namespace Core.Interfaces.Services
{
    public interface IPresentationService
    {
        Task<List<PresentationModel>> GetPresentationsAsync(CancellationToken cancellationToken);
        Task<int> AddPresentationAsync(AddPresentationRequest request, CancellationToken cancellationToken);
        Task DeletePresentationPermanentlyAsync(int id, CancellationToken cancellationToken);
    }
}

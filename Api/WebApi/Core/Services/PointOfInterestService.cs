using AutoMapper;
using Core.DTO.Requests;
using Core.DTO.Response;
using Core.Interfaces.Repositories.Conference;
using Core.Interfaces.Services;
using Core.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Query;
using Persistence.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;

namespace Core.Services
{
    public class PointOfInterestService : IPointOfInterestService
    {
        private readonly IPointOfInterestRepository _pointOfInterestRepository;
        private readonly IMapper _mapper;

        public PointOfInterestService(IPointOfInterestRepository pointOfInterestRepository, IMapper mapper)
        {
            _pointOfInterestRepository = pointOfInterestRepository;
            _mapper = mapper;
        }

        public async Task<List<PointOfInterestResponse>> GetAllPointsOfInterestAsync(CancellationToken cancellationToken)
        {
            var include = CreateInclude();
            var result = await _pointOfInterestRepository.GetAllAsync(cancellationToken, include);

            return _mapper.Map<List<PointOfInterestResponse>>(result);
        }

        public async Task<int> AddPointOfInterestAsync(AddPointOfInterestRequest request, CancellationToken cancellationToken)
        {
            if (await _pointOfInterestRepository.AnyAsync(x =>
                        x.Name == request.Name &&
                        x.PointOfInterestTypeID == request.PointOfInterestTypeID &&
                        x.Address == request.Address, cancellationToken))
            {
                throw new InvalidOperationException("Point Of Interest with given parameters exists");
            }

            var mapped = _mapper.Map<PointOfInterest>(request);
            await _pointOfInterestRepository.AddAsync(mapped, cancellationToken);

            return mapped.ID;
        }

        public async Task DeletePointOfInterestPermanentlyAsync(int id, CancellationToken cancellationToken)
        {
            if (!await _pointOfInterestRepository.AnyAsync(x => x.ID == id, cancellationToken))
            {
                throw new InvalidOperationException("There is no PointOfInterest with given ID");
            }

            await _pointOfInterestRepository.DeletePermanentlyByIdAsync(id, cancellationToken);
        }

        private Func<IQueryable<PointOfInterest>, IIncludableQueryable<PointOfInterest, object>> CreateInclude()
        {
            return x => x.Include(x => x.PointOfInterestType);
        }
    }
}

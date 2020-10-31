using AutoMapper;
using Core.DTO.Requests;
using Core.Interfaces.Repositories.Conference;
using Core.Interfaces.Services;
using Core.Models;
using Persistence.Models;
using System;
using System.Collections.Generic;
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

        public async Task<List<PointOfInterestModel>> GetAllPointsOfInterestAsync(CancellationToken cancellationToken)
        {
            var result = await _pointOfInterestRepository.GetAllAsync(cancellationToken);

            return _mapper.Map<List<PointOfInterestModel>>(result);
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
    }
}

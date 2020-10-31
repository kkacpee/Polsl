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
    public class AccommodationService : IAccommodationService
    {
        private readonly IAccommodationRepository _accommodationRepository;
        private readonly IMapper _mapper;

        public AccommodationService(IAccommodationRepository accommodationRepository, IMapper mapper)
        {
            _accommodationRepository = accommodationRepository;
            _mapper = mapper;
        }

        public async Task<List<AccommodationModel>> GetAllAccommodations(CancellationToken cancellationToken)
        {
            var result = await _accommodationRepository.GetAllAsync(cancellationToken);

            return _mapper.Map<List<AccommodationModel>>(result);
        }

        public async Task<int> AddAccommodationAsync(AddAccommodationRequest request, CancellationToken cancellationToken)
        {
            if(await _accommodationRepository.AnyAsync(x => 
            x.Name == request.Name &&
            x.Number == request.Number &&
            x.Address == request.Address &&
            x.Website == request.Website ,cancellationToken))
            {
                throw new InvalidOperationException("Accommodation with given parameters exists");
            }

            var mapped = _mapper.Map<Accommodation>(request);
            await _accommodationRepository.AddAsync(mapped, cancellationToken);

            return mapped.ID;
        }

        public async Task DeleteAccommodationPermanentlyAsync(int id, CancellationToken cancellationToken)
        {
            if (!await _accommodationRepository.AnyAsync(x => x.ID == id, cancellationToken))
            {
                throw new InvalidOperationException("There is no accommodation with given ID");
            }

            await _accommodationRepository.DeletePermanentlyByIdAsync(id, cancellationToken);
        }
    }
}

using AutoMapper;
using Core.Interfaces.Repositories.Conference;
using Core.Interfaces.Repositories.Presentation;
using Core.Interfaces.Services;
using Core.Models;
using Persistence.Models;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;

namespace Core.Services
{
    public class AccommodationService : IAccommodationService
    {
        private readonly IAccommodationRepository _accommodationService;
        private readonly IMapper _mapper;

        public AccommodationService(IAccommodationRepository accommodationService, IMapper mapper)
        {
            _accommodationService = accommodationService;
            _mapper = mapper;
        }

        public async Task<List<AccommodationModel>> GetAllAccommodations(CancellationToken cancellationToken)
        {
            var result = await _accommodationService.GetAllAsync(cancellationToken);

            return _mapper.Map<List<AccommodationModel>>(result);
        }
    }
}

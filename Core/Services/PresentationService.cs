using AutoMapper;
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
    public class PresentationService : IPresentationService
    {
        private readonly IPresentationSpeakerRepository _presentationRepository;
        private readonly IMapper _mapper;

        public PresentationService(IPresentationSpeakerRepository presentationRepository, IMapper mapper)
        {
            _presentationRepository = presentationRepository;
            _mapper = mapper;
            presentationRepository.AddAsync(
                new Presentation
                {
                    Place = "text",
                    Description = "desc",
                    StartDate = new System.DateTime(2020, 10, 10),
                    EndDate = new System.DateTime(2020, 10, 10),
                    Title = "title"
                }, new CancellationToken()
                );
        }

        public async Task<List<PresentationModel>> GetAllPresentations(CancellationToken cancellationToken)
        {
            var result = await _presentationRepository.GetAllAsync(cancellationToken);

            return _mapper.Map<List<PresentationModel>>(result);
        }
    }
}

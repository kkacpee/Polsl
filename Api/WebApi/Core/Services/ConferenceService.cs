using AutoMapper;
using Core.Interfaces.Repositories.Conference;
using Core.Interfaces.Services;
using Core.Models;
using Core.DTO.Requests;
using Persistence.Models;
using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;
using System;
using Microsoft.EntityFrameworkCore.Query;
using System.Linq;
using Microsoft.EntityFrameworkCore;
using Core.DTO.Response;

namespace Core.Services
{
    public class ConferenceService : IConferenceService
    {
        private readonly IConferenceRepository _conferenceRepository;
        private readonly IConferencePhotoRepository _conferencePhotoRepository;
        private readonly IMapper _mapper;

        public ConferenceService(IConferenceRepository conferenceRepository, IConferencePhotoRepository conferencePhotoRepository, IMapper mapper)
        {
            _conferenceRepository = conferenceRepository;
            _conferencePhotoRepository = conferencePhotoRepository;
            _mapper = mapper;
        }

        public async Task<List<ConferenceResponse>> GetConferencesAsync(CancellationToken cancellationToken)
        {
            var result = await _conferenceRepository.GetAllAsync(cancellationToken);
            var mapped = _mapper.Map<List<ConferenceResponse>>(result);
            var mainPaths = await _conferencePhotoRepository.GetAsync(x => x.IsMain == true, cancellationToken);
            foreach( var conference in mapped)
            {
                conference.Photo = mainPaths.FirstOrDefault(x => x.ConferenceID == conference.ID)?.Path;
            }
            return mapped;
        }

        public async Task<int> AddConferenceAsync(AddConferenceRequest request, CancellationToken cancellationToken)
        {
            if (await _conferenceRepository.AnyAsync(x =>
                        x.Address == request.Address &&
                        x.Country == request.Country &&
                        x.EndDate == request.EndDate &&
                        x.StartDate == request.StartDate &&
                        x.Title == request.Title, cancellationToken))
            {
                throw new InvalidOperationException("Conference with given parameters exists");
            }

            var mapped = _mapper.Map<Conference>(request);
            await _conferenceRepository.AddAsync(mapped, cancellationToken);

            return mapped.ID;
        }

        public async Task EditConferenceAsync(ConferenceModel model, CancellationToken cancellationToken)
        {
            var conferenceToUpdate = await _conferenceRepository.GetByIdAsync(model.ID, cancellationToken);
            if (conferenceToUpdate == null)
            {
                throw new InvalidOperationException("Conference with given id does not exist");
            }

            if (await _conferenceRepository.AnyAsync(x =>
              x.Address == model.Address &&
              x.Country == model.Country &&
              x.EndDate == model.EndDate &&
              x.StartDate == model.StartDate &&
              x.Title == model.Title &&
              x.SocialMedia == model.SocialMedia, cancellationToken))
            {
                throw new InvalidOperationException("Conference with given parameters exists");
            }

            conferenceToUpdate.Address = model.Address;
            conferenceToUpdate.Country = model.Country;
            conferenceToUpdate.EndDate = model.EndDate;
            conferenceToUpdate.StartDate = model.StartDate;
            conferenceToUpdate.Title = model.Title;
            conferenceToUpdate.SocialMedia = model.SocialMedia;

            await _conferenceRepository.UpdateAsync(conferenceToUpdate, cancellationToken);
        }

        public async Task DeleteConferencePermanentlyAsync(int id, CancellationToken cancellationToken)
        {
            if (!await _conferenceRepository.AnyAsync(x => x.ID == id, cancellationToken))
            {
                throw new InvalidOperationException("There is no conference with given ID");
            }

            await _conferenceRepository.DeletePermanentlyByIdAsync(id, cancellationToken);
        }

        public async Task<ConferenceDetailsResponse> GetConferenceDetailsAsync(int id, CancellationToken cancellationToken)
        {
            if (!await _conferenceRepository.AnyAsync(x => x.ID == id, cancellationToken))
            {
                throw new InvalidOperationException("There is no conference with given ID");
            }

            var include = CreateInclude();

            var result = await _conferenceRepository.GetByIdAsync(id, cancellationToken, include);

            var mapped = new ConferenceDetailsResponse
            {
                ID = result.ID,
                Address = result.Address,
                Country = result.Country,
                Description = result.Description,
                SocialMedia = result.SocialMedia,
                Title = result.Title,
                StartDate = result.StartDate,
                EndDate = result.EndDate,
                BuildingPlans = _mapper.Map<ICollection<BuildingPlanResponse>>(result.BuildingPlans),
                Presentations = _mapper.Map<ICollection<PresentationResponse>>(result.Presentations),
                Rates = _mapper.Map<ICollection<RateResponse>>(result.Rates),
                Photos = _mapper.Map<ICollection<ConferencePhotoResponse>>(result.ConferencePhotos)
            };

            if(result.ConferenceAccommodations != null)
            {
                var temp = new List<Accommodation>();
                foreach (var accommodation in result.ConferenceAccommodations)
                {
                    temp.Add(accommodation.Accommodation);
                }
                mapped.Accommodations = _mapper.Map<ICollection<AccommodationResponse>>(temp);
            }

            if (result.ConferenceEmergencyNumbers != null)
            {
                var temp = new List<EmergencyNumber>();
                foreach (var conferenceEmergency in result.ConferenceEmergencyNumbers)
                {
                   temp.Add(conferenceEmergency.EmergencyNumber);
                }
                mapped.EmergencyNumbers = _mapper.Map < ICollection<EmergencyNumberResponse>>(temp);
            }

            if (result.ConferenceOrganizers != null)
            {
                var temp = new List<Organizer>();
                foreach (var organizer in result.ConferenceOrganizers)
                {
                    temp.Add(organizer.Organizer);
                }
                mapped.Organizers = _mapper.Map<ICollection<OrganizerResponse>>(temp);
            }

            if (result.ConferencePointOfInterests != null)
            {
                var temp = new List<PointOfInterest>();
                foreach (var pointOfInterest in result.ConferencePointOfInterests)
                {
                    temp.Add(pointOfInterest.PointOfInterest);
                }
                mapped.PointsOfInterest = _mapper.Map<ICollection<PointOfInterestResponse>>(temp);
            }

            if (result.ConferenceSponsors != null)
            {
                var temp = new List<Sponsor>();
                foreach (var sponsor in result.ConferenceSponsors)
                {
                    temp.Add(sponsor.Sponsor);
                }
                mapped.Sponsors = _mapper.Map<ICollection<SponsorResponse>>(temp);
            }

            return mapped;
        }

        private Func<IQueryable<Conference>, IIncludableQueryable<Conference, object>> CreateInclude()
        {
            return x => x.Include(x => x.BuildingPlans)
                        .Include(x => x.ConferenceAccommodations)
                            .ThenInclude(x => x.Accommodation)
                        .Include(x => x.ConferenceEmergencyNumbers)
                            .ThenInclude(x => x.EmergencyNumber)
                        .Include(x => x.ConferenceOrganizers)
                            .ThenInclude(x => x.Organizer)
                        .Include(x => x.ConferencePointOfInterests)
                            .ThenInclude(x => x.PointOfInterest)
                                .ThenInclude(x => x.PointOfInterestType)
                        .Include(x => x.ConferenceSponsors)
                            .ThenInclude(x => x.Sponsor)
                        .Include(x => x.Presentations)
                            .ThenInclude(x => x.PresentationType)
                        .Include(x => x.ConferencePhotos);
        }
    }
}

using AutoMapper;
using Core.DTO.Requests;
using Core.Interfaces.Repositories.Conference;
using Core.Interfaces.Services;
using Core.Models;
using Persistence.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;

namespace Core.Services
{
    public class OrganizerService : IOrganizerService
    {
        private readonly IOrganizerRepository _organizerRepository;
        private readonly IConferenceOrganizerRepository _conferenceOrganizerRepository;
        private readonly IMapper _mapper;

        public OrganizerService(IOrganizerRepository OrganizerRepository, IConferenceOrganizerRepository conferenceOrganizerRepository, IMapper mapper)
        {
            _organizerRepository = OrganizerRepository;
            _conferenceOrganizerRepository = conferenceOrganizerRepository;
            _mapper = mapper;
        }

        public async Task<List<OrganizerModel>> GetAllOrganizersAsync(CancellationToken cancellationToken)
        {
            var result = await _organizerRepository.GetAllAsync(cancellationToken);

            return _mapper.Map<List<OrganizerModel>>(result);
        }

        public async Task<List<OrganizerModel>> GetOrganizersForConference(int id, CancellationToken cancellationToken)
        {
            var conferenceOrganizerIDs = await _conferenceOrganizerRepository.SelectAsync(x => x.ConferenceID == id, x => x.OrganizerID, cancellationToken);
            var result = await _organizerRepository.GetAsync(x => !conferenceOrganizerIDs.ToList().Contains(x.ID), cancellationToken);

            return _mapper.Map<List<OrganizerModel>>(result);
        }

        public async Task<int> AddOrganizerAsync(AddOrganizerRequest request, CancellationToken cancellationToken)
        {
            if (await _organizerRepository.AnyAsync(x =>
                        x.FirstName == request.FirstName &&
                        x.LastName == request.LastName &&
                        x.Affiliation == request.Affiliation &&
                        x.Company == request.Company, cancellationToken))
            {
                throw new InvalidOperationException("Organizer with given parameters exists");
            }

            var mapped = _mapper.Map<Organizer>(request);
            await _organizerRepository.AddAsync(mapped, cancellationToken);

            return mapped.ID;
        }

        public async Task EditOrganizerAsync(OrganizerModel model, CancellationToken cancellationToken)
        {
            var organizerToUpdate = await _organizerRepository.GetByIdAsync(model.ID, cancellationToken);
            if (organizerToUpdate == null)
            {
                throw new InvalidOperationException("Organizer with given id does not exist");
            }

            if (await _organizerRepository.AnyAsync(x =>
             x.FirstName == model.FirstName &&
            x.LastName == model.LastName &&
            x.Affiliation == model.Affiliation &&
            x.Company == model.Company, cancellationToken))
            {
                throw new InvalidOperationException("Organizer with given parameters exists");
            }

            organizerToUpdate.FirstName = model.FirstName;
            organizerToUpdate.LastName = model.LastName;
            organizerToUpdate.Affiliation = model.Affiliation;
            organizerToUpdate.Company = model.Company;

            await _organizerRepository.UpdateAsync(organizerToUpdate, cancellationToken);
        }

        public async Task DeleteOrganizerPermanentlyAsync(int id, CancellationToken cancellationToken)
        {
            if (!await _organizerRepository.AnyAsync(x => x.ID == id, cancellationToken))
            {
                throw new InvalidOperationException("There is no Organizer with given ID");
            }

            await _organizerRepository.DeletePermanentlyByIdAsync(id, cancellationToken);
        }
    }
}

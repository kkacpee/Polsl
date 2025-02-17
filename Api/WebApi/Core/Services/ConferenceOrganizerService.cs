﻿using AutoMapper;
using Core.Interfaces.Repositories.Conference;
using Core.Interfaces.Services;
using Core.Models;
using Core.DTO.Requests;
using Persistence.Models;
using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;
using System;

namespace Core.Services
{
    public class ConferenceOrganizerService : IConferenceOrganizerService
    {
        private readonly IConferenceOrganizerRepository _conferenceOrganizerRepository;
        private readonly IMapper _mapper;

        public ConferenceOrganizerService(IConferenceOrganizerRepository ConferenceOrganizerRepository, IMapper mapper)
        {
            _conferenceOrganizerRepository = ConferenceOrganizerRepository;
            _mapper = mapper;
        }

        public async Task<List<ConferenceOrganizerModel>> GetAllConferenceOrganizersAsync(CancellationToken cancellationToken)
        {
            var result = await _conferenceOrganizerRepository.GetAllAsync(cancellationToken);
            return _mapper.Map<List<ConferenceOrganizerModel>>(result);
        }

        public async Task AddOrganizersToConferenceAsync(ConferenceOrganizerRequest request, CancellationToken cancellationToken)
        {
            if (await _conferenceOrganizerRepository.AnyAsync(x =>
                        request.OrganizerIDs.Contains(x.OrganizerID) &&
                        x.ConferenceID == request.ConferenceID, cancellationToken))
            {
                throw new InvalidOperationException("This Organizer for given conference exists");
            }
            var list = new List<ConferenceOrganizer>();
            foreach (var id in request.OrganizerIDs)
                list.Add(new ConferenceOrganizer
                {
                    ConferenceID = request.ConferenceID,
                    OrganizerID = id
                });
            await _conferenceOrganizerRepository.AddManyAsync(list, cancellationToken);
        }

        public async Task DeleteOrganizerFromConferencePermanentlyAsync(ConferenceOrganizerRequest request, CancellationToken cancellationToken)
        {
            if (!await _conferenceOrganizerRepository.AnyAsync(x =>
                        request.OrganizerIDs.Contains(x.OrganizerID) &&
                        x.ConferenceID == request.ConferenceID, cancellationToken))
            {
                throw new InvalidOperationException("There is no organizer with given id for given conference");
            }

            var result = await _conferenceOrganizerRepository.GetAsync(x =>
                        request.OrganizerIDs.Contains(x.OrganizerID) &&
                        x.ConferenceID == request.ConferenceID, cancellationToken);

            await _conferenceOrganizerRepository.DeleteManyPermanentlyAsync(result, cancellationToken);
        }
    }
}

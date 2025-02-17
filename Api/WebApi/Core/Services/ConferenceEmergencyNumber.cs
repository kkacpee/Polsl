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
    public class ConferenceEmergencyNumberService : IConferenceEmergencyNumberService
    {
        private readonly IConferenceEmergencyNumberRepository _conferenceEmergencyNumberRepository;
        private readonly IMapper _mapper;

        public ConferenceEmergencyNumberService(IConferenceEmergencyNumberRepository ConferenceEmergencyNumberRepository, IMapper mapper)
        {
            _conferenceEmergencyNumberRepository = ConferenceEmergencyNumberRepository;
            _mapper = mapper;
        }

        public async Task<List<ConferenceEmergencyNumberModel>> GetAllConferenceEmergencyNumbersAsync(CancellationToken cancellationToken)
        {
            var result = await _conferenceEmergencyNumberRepository.GetAllAsync(cancellationToken);
            return _mapper.Map<List<ConferenceEmergencyNumberModel>>(result);
        }

        public async Task AddEmergencyNumbersToConferenceAsync(ConferenceEmergencyNumberRequest request, CancellationToken cancellationToken)
        {
            if (await _conferenceEmergencyNumberRepository.AnyAsync(x =>
                        request.EmergencyNumberIDs.Contains(x.EmergencyNumberID) &&
                        x.ConferenceID == request.ConferenceID, cancellationToken))
            {
                throw new InvalidOperationException("This Emergency Number for given conference exists");
            }
            var list = new List<ConferenceEmergencyNumber>();
            foreach (var id in request.EmergencyNumberIDs)
                list.Add(new ConferenceEmergencyNumber
                {
                    ConferenceID = request.ConferenceID,
                    EmergencyNumberID = id
                });
            await _conferenceEmergencyNumberRepository.AddManyAsync(list, cancellationToken);
        }

        public async Task DeleteEmergencyNumberFromConferencePermanentlyAsync(ConferenceEmergencyNumberRequest request, CancellationToken cancellationToken)
        {
            if (!await _conferenceEmergencyNumberRepository.AnyAsync(x =>
                        request.EmergencyNumberIDs.Contains(x.EmergencyNumberID) &&
                        x.ConferenceID == request.ConferenceID, cancellationToken))
            {
                throw new InvalidOperationException("There is no emergency number with given id for given conference");
            }

            var result = await _conferenceEmergencyNumberRepository.GetAsync(x =>
                        request.EmergencyNumberIDs.Contains(x.EmergencyNumberID) &&
                        x.ConferenceID == request.ConferenceID, cancellationToken);

            await _conferenceEmergencyNumberRepository.DeleteManyPermanentlyAsync(result, cancellationToken);
        }
    }
}

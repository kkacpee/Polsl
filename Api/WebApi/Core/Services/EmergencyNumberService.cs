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
    public class EmergencyNumberService : IEmergencyNumberService
    {
        private readonly IEmergencyNumberRepository _emergencyNumberRepository;
        private readonly IConferenceEmergencyNumberRepository _conferenceEmergencyNumberRepository;
        private readonly IMapper _mapper;

        public EmergencyNumberService(IEmergencyNumberRepository emergencyNumberRepository, IConferenceEmergencyNumberRepository conferenceEmergencyNumberRepository, IMapper mapper)
        {
            _emergencyNumberRepository = emergencyNumberRepository;
            _conferenceEmergencyNumberRepository = conferenceEmergencyNumberRepository;
            _mapper = mapper;
        }

        public async Task<List<EmergencyNumberModel>> GetAllEmergencyNumbers(CancellationToken cancellationToken)
        {
            var result = await _emergencyNumberRepository.GetAllAsync(cancellationToken);

            return _mapper.Map<List<EmergencyNumberModel>>(result);
        }

        public async Task<List<EmergencyNumberModel>> GetEmergencyNumbersForConference(int id, CancellationToken cancellationToken)
        {
            var conferenceEmergencyNumberIDs = await _conferenceEmergencyNumberRepository.SelectAsync(x => x.ConferenceID == id, x => x.EmergencyNumberID, cancellationToken);
            var result = await _emergencyNumberRepository.GetAsync(x => !conferenceEmergencyNumberIDs.ToList().Contains(x.ID), cancellationToken);

            return _mapper.Map<List<EmergencyNumberModel>>(result);
        }

        public async Task<int> AddEmergencyNumberAsync(AddEmergencyNumberRequest request, CancellationToken cancellationToken)
        {
            if (await _emergencyNumberRepository.AnyAsync(x =>
                        x.Number == request.Number &&
                        x.Name == request.Name, cancellationToken))
            {
                throw new InvalidOperationException("Emergency Number with given parameters exists");
            }

            var mapped = _mapper.Map<EmergencyNumber>(request);
            await _emergencyNumberRepository.AddAsync(mapped, cancellationToken);

            return mapped.ID;
        }

        public async Task EditEmergencyNumberAsync(EmergencyNumberModel model, CancellationToken cancellationToken)
        {
            var emergencyNumberToUpdate = await _emergencyNumberRepository.GetByIdAsync(model.ID, cancellationToken);
            if (emergencyNumberToUpdate == null)
            {
                throw new InvalidOperationException("EmergencyNumber with given id does not exist");
            }

            if (await _emergencyNumberRepository.AnyAsync(x =>
             x.Name == model.Name &&
             x.Number == model.Number, cancellationToken))
            {
                throw new InvalidOperationException("EmergencyNumber with given parameters exists");
            }

            emergencyNumberToUpdate.Name = model.Name;
            emergencyNumberToUpdate.Number = model.Number;

            await _emergencyNumberRepository.UpdateAsync(emergencyNumberToUpdate, cancellationToken);
        }

        public async Task DeleteEmergencyNumberPermanentlyAsync(int id, CancellationToken cancellationToken)
        {
            if (!await _emergencyNumberRepository.AnyAsync(x => x.ID == id, cancellationToken))
            {
                throw new InvalidOperationException("There is no Emergency Number with given ID");
            }

            await _emergencyNumberRepository.DeletePermanentlyByIdAsync(id, cancellationToken);
        }
    }
}

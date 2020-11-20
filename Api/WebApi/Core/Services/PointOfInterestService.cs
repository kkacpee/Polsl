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
        private readonly IConferencePointOfInterestRepository _conferencePointOfInterestRepository;
        private readonly IMapper _mapper;

        public PointOfInterestService(IPointOfInterestRepository pointOfInterestRepository,IConferencePointOfInterestRepository conferencePointOfInterestRepository, IMapper mapper)
        {
            _pointOfInterestRepository = pointOfInterestRepository;
            _conferencePointOfInterestRepository = conferencePointOfInterestRepository;
            _mapper = mapper;
        }

        public async Task<List<PointOfInterestResponse>> GetAllPointsOfInterestAsync(CancellationToken cancellationToken)
        {
            var include = CreateInclude();
            var result = await _pointOfInterestRepository.GetAllAsync(cancellationToken, include);

            return _mapper.Map<List<PointOfInterestResponse>>(result);
        }

        public async Task<List<PointOfInterestModel>> GetPointsOfInterestForConference(int id, CancellationToken cancellationToken)
        {
            var conferencePointOfInterestIDs = await _conferencePointOfInterestRepository.SelectAsync(x => x.ConferenceID == id, x => x.PointOfInterestID, cancellationToken);
            var result = await _pointOfInterestRepository.GetAsync(x => !conferencePointOfInterestIDs.ToList().Contains(x.ID), cancellationToken);

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

        public async Task EditPointOfInterestAsync(PointOfInterestModel model, CancellationToken cancellationToken)
        {
            var pointOfInterestToUpdate = await _pointOfInterestRepository.GetByIdAsync(model.ID, cancellationToken);
            if (pointOfInterestToUpdate == null)
            {
                throw new InvalidOperationException("PointOfInterest with given id does not exist");
            }

            if (await _pointOfInterestRepository.AnyAsync(x =>
             x.Name == model.Name &&
            x.PointOfInterestTypeID == model.PointOfInterestTypeID &&
            x.Address == model.Address, cancellationToken))
            {
                throw new InvalidOperationException("PointOfInterest with given parameters exists");
            }

            pointOfInterestToUpdate.Name = model.Name;
            pointOfInterestToUpdate.PointOfInterestTypeID = model.PointOfInterestTypeID;
            pointOfInterestToUpdate.Address = model.Address;

            await _pointOfInterestRepository.UpdateAsync(pointOfInterestToUpdate, cancellationToken);
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

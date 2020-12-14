using AutoMapper;
using Core.DTO.Requests;
using Core.DTO.Response;
using Core.Interfaces.Repositories;
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
    public class RateService : IRateService
    {
        private readonly IRateRepository _rateRepository;
        private readonly IMapper _mapper;

        public RateService(IRateRepository rateRepository, IMapper mapper)
        {
            _rateRepository = rateRepository;
            _mapper = mapper;
        }

        public async Task<List<RateResponse>> GetAllRatesAsync(CancellationToken cancellationToken)
        {
            var include = CreateInclude();
            var result = await _rateRepository.GetAllAsync(cancellationToken, include);
            var mapped = _mapper.Map<List<RateResponse>>(result);
            foreach ( var item in mapped)
            {
                item.PresentationName = item.PresentationID.HasValue ? result.First(x => x.ID == item.ID).Presentation.Title : null;
                item.ConferenceName = item.ConferenceID.HasValue ? result.First(x => x.ID == item.ID).Conference.Title : null;
            }

            return mapped;
        }

        public async Task<List<RateResponse>> GetRatesForConference(int id, CancellationToken cancellationToken)
        {
            var result = await _rateRepository.GetAsync(x => x.ConferenceID == id, cancellationToken);

            return _mapper.Map<List<RateResponse>>(result);
        }

        public async Task<List<RateResponse>> GetRatesForPresentation(int id, CancellationToken cancellationToken)
        {
            var result = await _rateRepository.GetAsync(x => x.PresentationID == id, cancellationToken);

            return _mapper.Map<List<RateResponse>>(result);
        }

        public async Task<int> AddRateAsync(AddRateRequest request, CancellationToken cancellationToken)
        {
            if (await _rateRepository.AnyAsync(x =>
                        x.Description == request.Description &&
                        x.Value == request.Value &&
                        x.MobileUserID == request.MobileUserID && 
                        x.RateCriterionID == request.RateCriterionID &&
                        x.ConferenceID == request.ConferenceID &&
                        x.PresentationID == request.PresentationID, cancellationToken))
            {
                throw new InvalidOperationException("Rate with given parameters exists");
            }

            var mapped = _mapper.Map<Rate>(request);
            await _rateRepository.AddAsync(mapped, cancellationToken);

            return mapped.ID;
        }

        public async Task EditRateAsync(RateModel model, CancellationToken cancellationToken)
        {
            var rateToUpdate = await _rateRepository.GetByIdAsync(model.ID, cancellationToken);
            if (rateToUpdate == null)
            {
                throw new InvalidOperationException("Rate with given id does not exist");
            }

            if (await _rateRepository.AnyAsync(x =>
                        x.Description == model.Description &&
                        x.Value == model.Value &&
                        x.MobileUserID == model.MobileUserID &&
                        x.RateCriterionID == model.RateCriterionID &&
                        x.ConferenceID == model.ConferenceID &&
                        x.PresentationID == model.PresentationID, cancellationToken))
            {
                throw new InvalidOperationException("Rate with given parameters exists");
            }

            rateToUpdate.Description = model.Description;
            rateToUpdate.Value = model.Value;
            rateToUpdate.MobileUserID = model.MobileUserID;
            rateToUpdate.RateCriterionID = model.RateCriterionID;
            rateToUpdate.ConferenceID = model.ConferenceID;
            rateToUpdate.PresentationID = model.PresentationID;

            await _rateRepository.UpdateAsync(rateToUpdate, cancellationToken);
        }

        public async Task DeleteRatePermanentlyAsync(int id, CancellationToken cancellationToken)
        {
            if (!await _rateRepository.AnyAsync(x => x.ID == id, cancellationToken))
            {
                throw new InvalidOperationException("There is no Rate with given ID");
            }

            await _rateRepository.DeletePermanentlyByIdAsync(id, cancellationToken);
        }

        private Func<IQueryable<Rate>, IIncludableQueryable<Rate, object>> CreateInclude()
        {
            return x => x.Include(x => x.Presentation)
                        .Include(x => x.Conference)
                        .Include(x => x.RateCriterion);
        }
    }
}

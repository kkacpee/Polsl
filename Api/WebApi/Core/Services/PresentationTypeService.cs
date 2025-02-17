﻿using AutoMapper;
using Core.Interfaces.Repositories.Presentation;
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
    public class PresentationTypeService : IPresentationTypeService
    {
        private readonly IPresentationTypeRepository _presentationTypeRepository;
        private readonly IMapper _mapper;

        public PresentationTypeService(IPresentationTypeRepository presentationTypeRepository, IMapper mapper)
        {
            _presentationTypeRepository = presentationTypeRepository;
            _mapper = mapper;
        }

        public async Task<List<PresentationTypeModel>> GetAllPresentationTypesAsync(CancellationToken cancellationToken)
        {
            var result = await _presentationTypeRepository.GetAllAsync(cancellationToken);
            return _mapper.Map<List<PresentationTypeModel>>(result);
        }

        public async Task<int> AddPresentationTypeAsync(AddPresentationTypeRequest request, CancellationToken cancellationToken)
        {
            if (await _presentationTypeRepository.AnyAsync(x =>
                        x.Name == request.Name, cancellationToken))
            {
                throw new InvalidOperationException("Presentation Type with given parameters exists");
            }

            var mapped = _mapper.Map<PresentationType>(request);
            await _presentationTypeRepository.AddAsync(mapped, cancellationToken);

            return mapped.ID;
        }

        public async Task EditPresentationTypeAsync(PresentationTypeModel model, CancellationToken cancellationToken)
        {
            var presentationTypeToUpdate = await _presentationTypeRepository.GetByIdAsync(model.ID, cancellationToken);
            if (presentationTypeToUpdate == null)
            {
                throw new InvalidOperationException("PresentationType with given id does not exist");
            }

            if (await _presentationTypeRepository.AnyAsync(x =>
             x.Name == model.Name, cancellationToken))
            {
                throw new InvalidOperationException("PresentationType with given parameters exists");
            }

            presentationTypeToUpdate.Name = model.Name;

            await _presentationTypeRepository.UpdateAsync(presentationTypeToUpdate, cancellationToken);
        }

        public async Task DeletePresentationTypePermanentlyAsync(int id, CancellationToken cancellationToken)
        {
            if (!await _presentationTypeRepository.AnyAsync(x => x.ID == id, cancellationToken))
            {
                throw new InvalidOperationException("There is no PresentationType with given ID");
            }

            await _presentationTypeRepository.DeletePermanentlyByIdAsync(id, cancellationToken);
        }
    }
}

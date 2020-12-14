using AutoMapper;
using Core.DTO.Requests;
using Core.Interfaces.Repositories.Presentation;
using Core.Interfaces.Services;
using Persistence.Models;
using System;
using System.Collections.Generic;
using System.IO;
using System.Threading;
using System.Threading.Tasks;

namespace Core.Services
{
    public class PresentationPhotoService : IPresentationPhotoService
    {
        private readonly IPresentationPhotoRepository _presentationPhotoRepository;
        private readonly IMapper _mapper;

        public PresentationPhotoService(IPresentationPhotoRepository PresentationPhotoRepository, IMapper mapper)
        {
            _presentationPhotoRepository = PresentationPhotoRepository;
            _mapper = mapper;
        }

        public async Task AddPresentationPhoto(AddPresentationPhotoRequest request, CancellationToken cancellationToken)
        {
            var dbPath = "";

            var folderName = Path.Combine("Resources", "Presentations");
            var pathToSave = Path.Combine(Directory.GetCurrentDirectory(), folderName);

            Directory.CreateDirectory(pathToSave);

            var fileName = Guid.NewGuid() + Path.GetExtension(request.File.FileName);
            var filePath = Path.Combine(pathToSave, fileName);

            using (var strem = new FileStream(filePath, FileMode.Create))
            {
                request.File.CopyTo(strem);
            }

            dbPath = Path.Combine(folderName, fileName);

            var mapped = new PresentationPhoto
            {
                PresentationID = request.ID,
                Path = dbPath
            };

            mapped.IsMain = (await _presentationPhotoRepository.AnyAsync(x => x.PresentationID == request.ID, cancellationToken)) ?
                false : true;

            await _presentationPhotoRepository.AddAsync(mapped, cancellationToken);
        }

        public async Task ChangeMainPhoto(ChangePresentationMainPhotoRequest request, CancellationToken cancellationToken)
        {
            var oldMain = await _presentationPhotoRepository.GetSingleAsync(x => x.IsMain == true && x.PresentationID == request.PresentationID, x => x, cancellationToken);
            var newMain = await _presentationPhotoRepository.GetByIdAsync(request.PhotoID, cancellationToken);
            oldMain.IsMain = false;
            newMain.IsMain = true;
            var entities = new List<PresentationPhoto> { oldMain, newMain };
            await _presentationPhotoRepository.UpdateManyAsync(entities, cancellationToken);
        }

        public async Task DeletePresentationPhotoPermanentlyAsync(int id, CancellationToken cancellationToken)
        {
            if (!await _presentationPhotoRepository.AnyAsync(x => x.ID == id, cancellationToken))
            {
                throw new InvalidOperationException("Presentation Photo with given id does not exist");
            }

            var result = await _presentationPhotoRepository.GetByIdAsync(id, cancellationToken);

            var fullPath = Path.Combine(Directory.GetCurrentDirectory(), result.Path);
            File.Delete(fullPath);

            await _presentationPhotoRepository.DeletePermanentlyByIdAsync(id, cancellationToken);
        }
    }
}

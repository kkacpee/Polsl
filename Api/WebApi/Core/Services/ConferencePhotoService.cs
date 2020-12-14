using AutoMapper;
using Core.DTO.Requests;
using Core.Interfaces.Repositories.Conference;
using Core.Interfaces.Services;
using Persistence.Models;
using System;
using System.Collections.Generic;
using System.IO;
using System.Threading;
using System.Threading.Tasks;

namespace Core.Services
{
    public class ConferencePhotoService : IConferencePhotoService
    {
        private readonly IConferencePhotoRepository _conferencePhotoRepository;
        private readonly IMapper _mapper;

        public ConferencePhotoService(IConferencePhotoRepository ConferencePhotoRepository, IMapper mapper)
        {
            _conferencePhotoRepository = ConferencePhotoRepository;
            _mapper = mapper;
        }

        public async Task AddConferencePhoto(AddConferencePhotoRequest request, CancellationToken cancellationToken)
        {
            var dbPath = "";

            var folderName = Path.Combine("Resources", "Conferences");
            var pathToSave = Path.Combine(Directory.GetCurrentDirectory(), folderName);

            Directory.CreateDirectory(pathToSave);

            var fileName = Guid.NewGuid() + Path.GetExtension(request.File.FileName);
            var filePath = Path.Combine(pathToSave, fileName);

            using (var strem = new FileStream(filePath, FileMode.Create))
            {
                request.File.CopyTo(strem);
            }

            dbPath = Path.Combine(folderName, fileName);

            var mapped = new ConferencePhoto
            {
                ConferenceID = request.ID,
                Path = dbPath
            };

            mapped.IsMain = (await _conferencePhotoRepository.AnyAsync(x => x.ConferenceID == request.ID, cancellationToken)) ?
                false : true;

            await _conferencePhotoRepository.AddAsync(mapped, cancellationToken);
        }

        public async Task ChangeMainPhoto(ChangeConferenceMainPhotoRequest request, CancellationToken cancellationToken)
        {
            var oldMain = await _conferencePhotoRepository.GetSingleAsync(x => x.IsMain == true && x.ConferenceID == request.ConferenceID, x => x, cancellationToken);
            var newMain = await _conferencePhotoRepository.GetByIdAsync(request.PhotoID, cancellationToken);
            oldMain.IsMain = false;
            newMain.IsMain = true;
            var entities = new List<ConferencePhoto> { oldMain, newMain };
            await _conferencePhotoRepository.UpdateManyAsync(entities, cancellationToken);
        }

        public async Task DeleteConferencePhotoPermanentlyAsync(int id, CancellationToken cancellationToken)
        {
            if(!await _conferencePhotoRepository.AnyAsync(x => x.ID == id, cancellationToken))
            {
                throw new InvalidOperationException("Conference Photo with given id does not exist");
            }

            var result = await _conferencePhotoRepository.GetByIdAsync(id, cancellationToken);

            var fullPath = Path.Combine(Directory.GetCurrentDirectory(), result.Path);
            File.Delete(fullPath);

            await _conferencePhotoRepository.DeletePermanentlyByIdAsync(id, cancellationToken);
        }
    }
}

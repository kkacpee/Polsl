using AutoMapper;
using Core.DTO.Requests;
using Core.Interfaces.Repositories.Presentation;
using Core.Interfaces.Services;
using Core.Models;
using Persistence.Models;
using System;
using System.Collections.Generic;
using System.IO;
using System.Threading;
using System.Threading.Tasks;

namespace Core.Services
{
    public class ParticipantPhotoService : IParticipantPhotoService
    {
        private readonly IParticipantPhotoRepository _participantPhotoRepository;
        private readonly IMapper _mapper;

        public ParticipantPhotoService(IParticipantPhotoRepository participantPhotoRepository, IMapper mapper)
        {
            _participantPhotoRepository = participantPhotoRepository;
            _mapper = mapper;
        }

        public async Task<List<ParticipantPhotoModel>> GetAllParticipantPhotosAsync(CancellationToken cancellationToken)
        {
            var result = await _participantPhotoRepository.GetAllAsync(cancellationToken);

            return _mapper.Map<List<ParticipantPhotoModel>>(result);
        }

        public async Task<string> GetParticipantPhotoAsync(int id, CancellationToken cancellationToken)
        {
            var result = await _participantPhotoRepository.GetByIdAsync(id, cancellationToken);

            return result.Path;
        }

        public async Task<int> AddParticipantPhotoAsync(AddParticipantPhotoRequest request, CancellationToken cancellationToken)
        {
            if (await _participantPhotoRepository.AnyAsync(x =>
                        x.ParticipantID == request.ParticipantID, cancellationToken))
            {
                throw new InvalidOperationException("Photo for this participant exists");
            }
            var dbPath = "";
            if ( request.File != null)
            {
                var folderName = Path.Combine("Resources", "Participants");
                var pathToSave = Path.Combine(Directory.GetCurrentDirectory(), folderName);

                Directory.CreateDirectory(pathToSave);

                var fileName = Guid.NewGuid() + Path.GetExtension(request.File.FileName);
                var filePath = Path.Combine(pathToSave, fileName);

                using (var strem = new FileStream(filePath, FileMode.Create))
                {
                    request.File.CopyTo(strem);
                }

                dbPath = Path.Combine(folderName, fileName);
            }
            else
            {
                var folderName = Path.Combine("Resources", "Participants");

                dbPath = Path.Combine(folderName, "placeholderPhoto.png");
            }

            var mapped = new ParticipantPhoto { Path = dbPath, ParticipantID = request.ParticipantID };
            await _participantPhotoRepository.AddAsync(mapped, cancellationToken);

            return mapped.ID;
        }

        public async Task DeleteParticipantPhotoPermanentlyAsync(int id, CancellationToken cancellationToken)
        {
            var result = await _participantPhotoRepository.GetSingleOrDefaultAsync(x => x.ParticipantID == id, x =>new {x.ID, x.Path }, cancellationToken);

            if (result.ID == 0)
            {
                throw new InvalidOperationException("There is no ParticipantPhoto for participant with this ID");
            }
            if (!result.Path.Contains("placeholderPhoto"))
            {
                var fullPath = Path.Combine(Directory.GetCurrentDirectory(), result.Path);
                File.Delete(fullPath);
            }

            await _participantPhotoRepository.DeletePermanentlyByIdAsync(result.ID, cancellationToken);
        }

        public async Task EditParticipantPhotoAsync(AddParticipantPhotoRequest request, CancellationToken cancellationToken)
        {
            try
            {
               await DeleteParticipantPhotoPermanentlyAsync(request.ParticipantID, cancellationToken);
            }
            catch { }
            await AddParticipantPhotoAsync(request, cancellationToken);
        }
    }
}

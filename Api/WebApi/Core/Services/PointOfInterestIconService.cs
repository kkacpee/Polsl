using AutoMapper;
using Core.DTO.Requests;
using Core.Interfaces.Repositories.Conference;
using Core.Interfaces.Services;
using Core.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Persistence.Models;
using System;
using System.Collections.Generic;
using System.IO;
using System.Text;
using System.Threading;
using System.Threading.Tasks;
using System.Xml.Linq;

namespace Core.Services
{
    public class PointOfInterestIconService : IPointOfInterestIconService
    {
        private readonly IPointOfInterestIconRepository _pointOfInterestIconRepository;
        private readonly IMapper _mapper;

        public PointOfInterestIconService(IPointOfInterestIconRepository pointOfInterestIconRepository, IMapper mapper)
        {
            _pointOfInterestIconRepository = pointOfInterestIconRepository;
            _mapper = mapper;
        }

        public async Task<List<PointOfInterestIconModel>> GetAllPointOfInterestIconsAsync(CancellationToken cancellationToken)
        {
            var result = await _pointOfInterestIconRepository.GetAllAsync(cancellationToken);

            return _mapper.Map<List<PointOfInterestIconModel>>(result);
        }

        public async Task<string> GetPhotoById(int id, CancellationToken cancellationToken)
        {
            var result = await _pointOfInterestIconRepository.GetFirstOrDefaultAsync(x => x.ID == id, x => x.Path, cancellationToken);
            if (result == null)
            {
                throw new InvalidOperationException("No icon with given id");
            }
            var pathToFile = Path.Combine(Directory.GetCurrentDirectory(), result);

            return result;
        }

        public async Task<int> AddPointOfInterestIconAsync(IFormFile file, CancellationToken cancellationToken)
        {
            var folderName = Path.Combine("Resources", "Icons");
            var pathToSave = Path.Combine(Directory.GetCurrentDirectory(), folderName);

            Directory.CreateDirectory(pathToSave);

            var fileName = Guid.NewGuid() + Path.GetExtension(file.FileName);
            var filePath = Path.Combine(pathToSave, fileName);

            using (var strem = new FileStream(filePath, FileMode.Create))
            {
                file.CopyTo(strem);
            }

            var dbPath = fileName;

            var mapped = new PointOfInterestIcon { Path = dbPath };
            await _pointOfInterestIconRepository.AddAsync(mapped, cancellationToken);

            return mapped.ID;
        }

        public Task DeletePointOfInterestIconPermanentlyAsync(int id, CancellationToken cancellationToken)
        {
            throw new NotImplementedException();
        }

        public Task EditPointOfInterestIconAsync(PointOfInterestIconModel model, CancellationToken cancellationToken)
        {
            throw new NotImplementedException();
        }

    }
}

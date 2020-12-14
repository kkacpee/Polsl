using AutoMapper;
using Core.DTO.Requests;
using Core.Helpers;
using Core.Interfaces.Repositories;
using Core.Interfaces.Services;
using Core.Models;
using Persistence.Models;
using System;
using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;

namespace Core.Services
{
    public class MessageService : IMessageService
    {
        private readonly IMessageRepository _rateRepository;
        private readonly IMapper _mapper;
        private readonly IDateTimeProvider _dateTimeProvider;

        public MessageService(IMessageRepository rateRepository, IMapper mapper, IDateTimeProvider dateTimeProvider)
        {
            _rateRepository = rateRepository;
            _mapper = mapper;
            _dateTimeProvider = dateTimeProvider;
        }

        public async Task<List<MessageModel>> GetAllMessagesAsync(CancellationToken cancellationToken)
        {
            var result = await _rateRepository.GetAllAsync(cancellationToken);

            return _mapper.Map<List<MessageModel>>(result);
        }

        public async Task<int> AddMessageAsync(AddMessageRequest request, CancellationToken cancellationToken)
        {
            var mapped = _mapper.Map<Message>(request);
            mapped.SentDate = _dateTimeProvider.GetDateTimeNow();
            await _rateRepository.AddAsync(mapped, cancellationToken);

            return mapped.ID;
        }

        public async Task DeleteMessagePermanentlyAsync(int id, CancellationToken cancellationToken)
        {
            if (!await _rateRepository.AnyAsync(x => x.ID == id, cancellationToken))
            {
                throw new InvalidOperationException("There is no Message with given ID");
            }

            await _rateRepository.DeletePermanentlyByIdAsync(id, cancellationToken);
        }
    }
}

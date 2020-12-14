using Core.DTO.Requests;
using Core.Models;
using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;

namespace Core.Interfaces.Services
{
    public interface IMessageService
    {
        Task<List<MessageModel>> GetAllMessagesAsync(CancellationToken cancellationToken);
        Task<int> AddMessageAsync(AddMessageRequest request, CancellationToken cancellationToken);
        Task DeleteMessagePermanentlyAsync(int id, CancellationToken cancellationToken);
    }
}

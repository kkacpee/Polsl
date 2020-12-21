using Core.DTO.Requests;
using FluentValidation;

namespace Core.Validators
{
    public class AddParticipantPhotoRequestValidator : AbstractValidator<AddParticipantPhotoRequest>
    {
        public AddParticipantPhotoRequestValidator()
        {
            RuleFor(x => x.ParticipantID)
                .NotEmpty();
            RuleFor(x => x.File)
                .NotEmpty();
        }
    }
}

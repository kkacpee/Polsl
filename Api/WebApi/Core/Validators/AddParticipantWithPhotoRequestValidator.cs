using Core.DTO.Requests;
using FluentValidation;

namespace Core.Validators
{
    public class AddParticipantWithPhotoRequestValidator : AbstractValidator<AddParticipantWithPhotoRequest>
    {
        public AddParticipantWithPhotoRequestValidator()
        {
            RuleFor(x => x.FirstName)
                .NotEmpty();
            RuleFor(x => x.LastName)
                .NotEmpty();
            RuleFor(x => x.Affiliation)
                .NotEmpty();
            RuleFor(x => x.Country)
                .NotEmpty();
            RuleFor(x => x.File)
              .NotEmpty();
        }
    }
}

using Core.DTO.Requests;
using FluentValidation;

namespace Core.Validators
{
    public class AddConferencePhotoRequestValidator : AbstractValidator<AddConferencePhotoRequest>
    {
        public AddConferencePhotoRequestValidator()
        {
            RuleFor(x => x.ID)
                .NotEmpty();
            RuleFor(x => x.File)
                .NotEmpty();
        }
    }
}

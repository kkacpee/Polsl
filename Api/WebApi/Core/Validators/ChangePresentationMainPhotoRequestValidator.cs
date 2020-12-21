using Core.DTO.Requests;
using FluentValidation;

namespace Core.Validators
{
    public class ChangePresentationMainPhotoRequestValidator : AbstractValidator<ChangePresentationMainPhotoRequest>
    {
        public ChangePresentationMainPhotoRequestValidator()
        {
            RuleFor(x => x.PresentationID)
                .NotEmpty();
            RuleFor(x => x.PhotoID)
                .NotEmpty();
        }
    }
}

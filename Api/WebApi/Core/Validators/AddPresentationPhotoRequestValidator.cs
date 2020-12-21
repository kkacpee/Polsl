using Core.DTO.Requests;
using FluentValidation;

namespace Core.Validators
{
    public class AddPresentationPhotoRequestValidator : AbstractValidator<AddPresentationPhotoRequest>
    {
        public AddPresentationPhotoRequestValidator()
        {
            RuleFor(x => x.File)
                .NotEmpty();
            RuleFor(x => x.ID)
                .NotEmpty();
        }
    }
}

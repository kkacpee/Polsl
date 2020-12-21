using Core.DTO.Requests;
using FluentValidation;

namespace Core.Validators
{
    public class ChangeConferenceMainPhotoRequestValidator : AbstractValidator<ChangeConferenceMainPhotoRequest>
    {
        public ChangeConferenceMainPhotoRequestValidator()
        {
            RuleFor(x => x.ConferenceID)
                .NotEmpty();
            RuleFor(x => x.PhotoID)
                .NotEmpty();
        }
    }
}

using Core.DTO.Requests;
using FluentValidation;

namespace Core.Validators
{
    public class AddPresentationRequestValidator : AbstractValidator<AddPresentationRequest>
    {
        public AddPresentationRequestValidator()
        {
            RuleFor(x => x.ConferenceID)
                .NotEmpty();
            RuleFor(x => x.Place)
                .NotEmpty();
            RuleFor(x => x.Title)
                .NotEmpty();
            RuleFor(x => x.EndDate)
                .GreaterThanOrEqualTo(x => x.StartDate);
            RuleFor(x => x.PresentationTypeID)
                .NotEmpty();
        }
    }
}

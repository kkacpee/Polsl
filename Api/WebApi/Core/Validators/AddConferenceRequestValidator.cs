using Core.DTO.Requests;
using FluentValidation;

namespace Core.Validators
{
    public class AddConferenceRequestValidator : AbstractValidator<AddConferenceRequest>
    {
        public AddConferenceRequestValidator()
        {
            RuleFor(x => x.Address)
                .NotEmpty();
            RuleFor(x => x.Title)
                .NotEmpty();
            RuleFor(x => x.Country)
                .NotEmpty();
            RuleFor(x => x.EndDate)
                .GreaterThanOrEqualTo(x => x.StartDate);
        }
    }
}

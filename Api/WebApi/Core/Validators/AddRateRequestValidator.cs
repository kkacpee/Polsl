using Core.DTO.Requests;
using FluentValidation;

namespace Core.Validators
{
    public class AddRateRequestValidator : AbstractValidator<AddRateRequest>
    {
        public AddRateRequestValidator()
        {
            RuleFor(x => x.MobileUserID)
                .NotEmpty();
            RuleFor(x => x.RateCriterionID)
                .NotEmpty();
            RuleFor(x => x.Value)
                .NotEmpty();
        }
    }
}

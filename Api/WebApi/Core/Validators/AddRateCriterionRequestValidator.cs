using Core.DTO.Requests;
using FluentValidation;

namespace Core.Validators
{
    public class AddRateCriterionRequestValidator : AbstractValidator<AddRateCriterionRequest>
    {
        public AddRateCriterionRequestValidator()
        {
            RuleFor(x => x.Name)
                .NotEmpty();
            RuleFor(x => x.RateCriterionTypeID)
                .NotEmpty();
        }
    }
}

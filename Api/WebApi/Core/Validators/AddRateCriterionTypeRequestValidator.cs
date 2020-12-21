using Core.DTO.Requests;
using FluentValidation;

namespace Core.Validators
{
    public class AddRateCriterionTypeRequestValdator : AbstractValidator<AddRateCriterionTypeRequest>
    {
        public AddRateCriterionTypeRequestValdator()
        {
            RuleFor(x => x.Name)
                .NotEmpty();
        }
    }
}

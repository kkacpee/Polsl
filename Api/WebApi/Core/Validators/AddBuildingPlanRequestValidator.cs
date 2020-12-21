using Core.DTO.Requests;
using FluentValidation;

namespace Core.Validators
{
    public class AddBuildingPlanRequestValidator : AbstractValidator<AddBuildingPlanRequest>
    {
        public AddBuildingPlanRequestValidator()
        {
            RuleFor(x => x.ConferenceID)
                .NotEmpty();
            RuleFor(x => x.Name)
                .NotEmpty();
            RuleFor(x => x.File)
                .NotEmpty();
        }
    }
}

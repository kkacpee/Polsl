using Core.DTO.Requests;
using FluentValidation;

namespace Core.Validators
{
    public class AddPointOfInterestTypeRequestValidator : AbstractValidator<AddPointOfInterestTypeRequest>
    {
        public AddPointOfInterestTypeRequestValidator()
        {
            RuleFor(x => x.Name)
                .NotEmpty();
            RuleFor(x => x.PointOfInterestIconID)
                .NotEmpty();
        }
    }
}

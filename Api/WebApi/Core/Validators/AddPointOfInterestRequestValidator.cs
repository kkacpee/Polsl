using Core.DTO.Requests;
using FluentValidation;

namespace Core.Validators
{
    public class AddPointOfInterestRequestValidator : AbstractValidator<AddPointOfInterestRequest>
    {
        public AddPointOfInterestRequestValidator()
        {
            RuleFor(x => x.Address)
                .NotEmpty();
            RuleFor(x => x.Name)
                .NotEmpty();
            RuleFor(x => x.Contact)
                .NotEmpty();
            RuleFor(x => x.PointOfInterestTypeID)
                .NotEmpty();
        }
    }
}

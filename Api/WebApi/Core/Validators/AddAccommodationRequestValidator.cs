using Core.DTO.Requests;
using FluentValidation;

namespace Core.Validators
{
    public class AddAccommodationRequestValidator : AbstractValidator<AddAccommodationRequest>
    {
        public AddAccommodationRequestValidator()
        {
            RuleFor(x => x.Address)
                .NotEmpty();
            RuleFor(x => x.Name)
                .NotEmpty();
            RuleFor(x => x.Number)
                .NotEmpty();
        }
    }
}

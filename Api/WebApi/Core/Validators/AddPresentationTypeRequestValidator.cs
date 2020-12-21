using Core.DTO.Requests;
using FluentValidation;

namespace Core.Validators
{
    public class AddPresentationTypeRequestValidator : AbstractValidator<AddPresentationTypeRequest>
    {
        public AddPresentationTypeRequestValidator()
        {
            RuleFor(x => x.Name)
                .NotEmpty();
        }
    }
}

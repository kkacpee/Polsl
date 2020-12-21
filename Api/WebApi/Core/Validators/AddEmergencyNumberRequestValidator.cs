using Core.DTO.Requests;
using FluentValidation;

namespace Core.Validators
{
    public class AddEmergencyNumberRequestValidator : AbstractValidator<AddEmergencyNumberRequest>
    {
        public AddEmergencyNumberRequestValidator()
        {
            RuleFor(x => x.Name)
                .NotEmpty();
            RuleFor(x => x.Number)
                .NotEmpty();
        }
    }
}

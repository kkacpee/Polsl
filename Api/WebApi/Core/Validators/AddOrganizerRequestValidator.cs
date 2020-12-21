using Core.DTO.Requests;
using FluentValidation;

namespace Core.Validators
{
    public class AddOrganizerRequestValidator : AbstractValidator<AddOrganizerRequest>
    {
        public AddOrganizerRequestValidator()
        {
            RuleFor(x => x.FirstName)
                .NotEmpty();
            RuleFor(x => x.LastName)
                .NotEmpty();
            RuleFor(x => x.Affiliation)
                .NotEmpty();
            RuleFor(x => x.Contact)
                .NotEmpty();
        }
    }
}

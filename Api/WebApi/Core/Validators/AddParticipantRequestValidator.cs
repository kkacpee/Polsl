using Core.DTO.Requests;
using FluentValidation;

namespace Core.Validators
{
    public class AddParticipantRequestValidator : AbstractValidator<AddParticipantRequest>
    {
        public AddParticipantRequestValidator()
        {
            RuleFor(x => x.FirstName)
                .NotEmpty();
            RuleFor(x => x.LastName)
                .NotEmpty();
            RuleFor(x => x.Affiliation)
                .NotEmpty();
            RuleFor(x => x.Country)
                .NotEmpty();
        }
    }
}

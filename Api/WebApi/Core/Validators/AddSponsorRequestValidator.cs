using Core.DTO.Requests;
using FluentValidation;

namespace Core.Validators
{
    public class AddSponsorRequestValidator : AbstractValidator<AddSponsorRequest>
    {
        public AddSponsorRequestValidator()
        {
            RuleFor(x => x.Website)
                .NotEmpty();
            RuleFor(x => x.LogoPath)
                .NotEmpty();
            RuleFor(x => x.Name)
                .NotEmpty();
            RuleFor(x => x.Country)
                .NotEmpty();
        }
    }
}

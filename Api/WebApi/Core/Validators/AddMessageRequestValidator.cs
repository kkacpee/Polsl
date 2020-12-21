using Core.DTO.Requests;
using FluentValidation;

namespace Core.Validators
{
    class AddMessageRequestValidator : AbstractValidator<AddMessageRequest>
    {
        public AddMessageRequestValidator()
        {
            RuleFor(x => x.MobileUserID)
                .NotEmpty();
            RuleFor(x => x.Content)
                .NotEmpty();
        }
    }
}

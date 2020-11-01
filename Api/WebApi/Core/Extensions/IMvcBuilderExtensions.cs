using Core.Validators;
using FluentValidation.AspNetCore;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.DependencyInjection;
using System.Collections.Generic;
using System.Linq;

namespace Core.Extensions
{
    public static class IMvcBuilderExtensions
    {
        public static IMvcBuilder AddAndConfigureFluentValidation(this IMvcBuilder builder)
        {
            return builder
                .AddFluentValidation(options =>
                {
                    options.RegisterValidatorsFromAssemblyContaining<AddConferenceRequestValidator>();
                    options.LocalizationEnabled = false;
                    options.RunDefaultMvcValidationAfterFluentValidationExecutes = false;
                    options.ImplicitlyValidateChildProperties = true;
                })
                .ConfigureApiBehaviorOptions(options =>
                {
                    options.InvalidModelStateResponseFactory = context =>
                    {
                        var errors = new Dictionary<string, IEnumerable<string>>();

                        foreach (var key in context.ModelState.Keys)
                        {
                            var value = context.ModelState[key];
                            if (value.Errors.Any()) errors.Add(key, value.Errors.Select(x => x.ErrorMessage));
                        }

                        return new BadRequestObjectResult(new
                        {
                            StatusCode = (int)StatusCodes.Status400BadRequest,
                            ValidationErrors = errors
                        });
                    };
                });
        }
    }
}

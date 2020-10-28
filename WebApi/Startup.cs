using AutoMapper;
using Core.Extensions;
using Core.MappingConfiguration;
using Core.Repositories.Presentation;
using Core.Services;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.IdentityModel.Tokens;
using NetCore.AutoRegisterDi;
using Persistence;
using System.Linq;
using System.Threading.Tasks;

namespace WebApi
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            services.RegisterAssemblyPublicNonGenericClasses(typeof(PresentationService).Assembly).Where(x => x.Name.EndsWith("Service")).AsPublicImplementedInterfaces();
            services.RegisterAssemblyPublicNonGenericClasses(typeof(PresentationRepository).Assembly).Where(x => x.Name.EndsWith("Repository")).AsPublicImplementedInterfaces();

            services.AddDbContext<ApiDbContext>();
            services.AddControllers().AddAndConfigureFluentValidation();
            var mappingConfiguration = new MapperConfiguration(mc =>
            {
                mc.AddMaps(typeof(PresentationMapping).Assembly);
            });

            IMapper mapper = mappingConfiguration.CreateMapper();
            services.AddSingleton(mapper);
            services.AddCors();

            //// configure jwt authentication
            //var publicAuthorizationKey = Configuration.GetSection("AppSettings:PublicKey").Value;
            //services.AddAuthentication(x =>
            //{
            //    x.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
            //    x.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
            //})
            //.AddJwtBearer(x =>
            //{
            //    x.Events = new JwtBearerEvents
            //    {
            //        OnTokenValidated = context =>
            //        {
            //            var userService = context.HttpContext.RequestServices.GetRequiredService<IUserService>();
            //            var userId = int.Parse(context.Principal.Identity.Name);
            //            var user = userService.GetById(userId);
            //            if (user == null)
            //            {
            //                // return unauthorized if user no longer exists
            //                context.Fail("Unauthorized");
            //            }
            //            return Task.CompletedTask;
            //        }
            //    };
            //    x.RequireHttpsMetadata = false;
            //    x.SaveToken = true;
            //    x.TokenValidationParameters = new TokenValidationParameters
            //    {
            //        IssuerSigningKey = publicAuthorizationKey,
            //        RequireSignedTokens = true,
            //        RequireExpirationTime = true,
            //        ValidateLifetime = true,
            //        ValidateAudience = false,
            //        ValidateActor = false,
            //        ValidateIssuer = false
            //    };
            //});
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }

            app.UseRouting();
            app.UseCors(x => x
                .AllowAnyOrigin()
                .AllowAnyMethod()
                .AllowAnyHeader());
            app.UseAuthorization();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
            });
        }
    }
}

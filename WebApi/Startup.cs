using AutoMapper;
using Core.Extensions;
using Core.MappingConfiguration;
using Core.Repositories.Presentation;
using Core.Services;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.OpenApi.Models;
using NetCore.AutoRegisterDi;
using Persistence;
using System.Linq;

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
            services.AddSwaggerGen(c =>
            {
                c.SwaggerDoc("v1", new OpenApiInfo
                {
                    Version = "v1",
                    Title = "ToDo API",
                    Description = "A simple example ASP.NET Core Web API"
                });
            });
            // Set the comments path for the Swagger JSON and UI.
            // var xmlFile = $"{Assembly.GetExecutingAssembly().GetName().Name}.xml";
            //var xmlPath = Path.Combine(AppContext.BaseDirectory, xmlFile);
           // c.IncludeXmlComments(xmlPath);
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
                app.UseSwagger();
            app.UseSwaggerUI(c =>
            {
                c.SwaggerEndpoint("/swagger/v1/swagger.json", "My API V1");
                c.RoutePrefix = string.Empty;
            });
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

using AutoMapper;
using Core.MappingConfiguration;
using Core.Repositories.Presentation;
using Core.Services;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
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

            var mappingConfiguration = new MapperConfiguration(mc =>
            {
                mc.AddMaps(typeof(PresentationMapping).Assembly);
            });

            IMapper mapper = mappingConfiguration.CreateMapper();
            services.AddSingleton(mapper);

            services.AddControllers();
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }

            app.UseRouting();

            app.UseAuthorization();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
            });
        }
    }
}

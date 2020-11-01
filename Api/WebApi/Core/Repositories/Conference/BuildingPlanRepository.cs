namespace Core.Repositories.Presentation
{
    using Core.Interfaces.Repositories.Conference;
    using Persistence;
    using Persistence.Models;

    public class BuildingPlanRepository : GenericRepository<BuildingPlan>, IBuildingPlanRepository
    {
        public BuildingPlanRepository(ApiDbContext context) : base(context) { }
    }
}

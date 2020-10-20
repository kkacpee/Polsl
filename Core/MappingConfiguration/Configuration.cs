using AutoMapper;
using Core.Models;
using Persistence.Models;
using System;
using System.Collections.Generic;
using System.Text;

namespace Core.MappingConfiguration
{
    public class Configuration : Profile
    {
        public Configuration()
        {
            CreateMap<Presentation, PresentationModel>().ReverseMap();
            CreateMap<Accommodation, AccommodationModel>().ReverseMap();
        }
    }
}

﻿using AutoMapper;
using Core.Models;
using Persistence.Models;

namespace Core.MappingConfiguration
{
    public class PresentationMapping : Profile
    {
        public PresentationMapping()
        {
            CreateMap<Presentation, PresentationModel>().ReverseMap();
            CreateMap<Accommodation, AccommodationModel>().ReverseMap();
        }
    }
}

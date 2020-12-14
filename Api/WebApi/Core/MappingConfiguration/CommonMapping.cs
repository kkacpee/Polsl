using AutoMapper;
using Core.DTO.Requests;
using Core.DTO.Response;
using Core.Models;
using Persistence.Models;
using System;
using System.Collections.Generic;
using System.Text;

namespace Core.MappingConfiguration
{
    public class CommonMapping : Profile
    {
        public CommonMapping()
        {
            CreateMap<RateCriterionType, RateCriterionTypeModel>().ReverseMap();
            CreateMap<RateCriterionType, AddRateCriterionTypeRequest>().ReverseMap();

            CreateMap<RateCriterion, RateCriterionModel>().ReverseMap();
            CreateMap<RateCriterion, AddRateCriterionRequest>().ReverseMap();
            CreateMap<RateCriterion, RateCriterionResponse>()
                                .ForMember(dest => dest.RateCriterionTypeName,
                                  opt => opt.MapFrom(src => src.RateCriterionType.Name))
                                .ReverseMap();

            CreateMap<Rate, RateModel>().ReverseMap();
            CreateMap<Rate, AddRateRequest>().ReverseMap();
            CreateMap<Rate, RateResponse>()
                                .ForMember(dest => dest.RateCriterionName,
                                  opt => opt.MapFrom(src => src.RateCriterion.Name))
                                .ReverseMap();

            CreateMap<Message, MessageModel>().ReverseMap();
            CreateMap<Message, AddMessageRequest>().ReverseMap();
        }
    }
}

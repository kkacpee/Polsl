using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Persistence.Models;
using System;
using System.Collections.Generic;
using System.Text;

namespace Persistence.EntityConfiguration
{
    class MessageConfiguration : IEntityTypeConfiguration<Message>
    {
        public void Configure(EntityTypeBuilder<Message> builder)
        {
            builder.HasKey(x => x.ID);
            builder.Property(x => x.Content)
                .HasMaxLength(512);
            builder.Property(x => x.MobileUserID)
                .IsRequired();
            builder.Property(x => x.SentDate)
                .IsRequired();
        }
    }
}

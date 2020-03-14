using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;

namespace MessageBoardApi.Models
{
    public partial class MessageBoardContext : DbContext
    {
        public MessageBoardContext()
        {
        }

        public MessageBoardContext(DbContextOptions<MessageBoardContext> options)
            : base(options)
        {
        }

        public virtual DbSet<Category> Category { get; set; }
        public virtual DbSet<Content> Content { get; set; }
        public virtual DbSet<Thread> Thread { get; set; }

        //protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        //{
            //if (!optionsBuilder.IsConfigured)
            //{
#warning To protect potentially sensitive information in your connection string, you should move it out of source code. See http://go.microsoft.com/fwlink/?LinkId=723263 for guidance on storing connection strings.
        //        optionsBuilder.UseSqlServer("Server=(localdb)\\ProjectsV13;Database=MessageBoard;Trusted_Connection=True;");
        //    }
        //}

        //protected override void OnModelCreating(ModelBuilder modelBuilder)
        //{
        //    modelBuilder.Entity<Category>(entity =>
        //    {
        //        entity.Property(e => e.CategoryName)
        //            .IsRequired()
        //            .HasMaxLength(10);
        //    });

        //    modelBuilder.Entity<Content>(entity =>
        //    {
        //        entity.Property(e => e.ContentText).IsRequired();

        //        entity.Property(e => e.ContentTime).HasColumnType("datetime");

        //        entity.Property(e => e.UserName).HasMaxLength(10);

        //        entity.HasOne(d => d.Thread)
        //            .WithMany(p => p.Content)
        //            .HasForeignKey(d => d.ThreadId)
        //            .OnDelete(DeleteBehavior.ClientSetNull)
        //            .HasConstraintName("FK_Content_Thread");
        //    });

        //    modelBuilder.Entity<Thread>(entity =>
        //    {
        //        entity.HasOne(d => d.Category)
        //            .WithMany(p => p.Thread)
        //            .HasForeignKey(d => d.CategoryId)
        //            .OnDelete(DeleteBehavior.ClientSetNull)
        //            .HasConstraintName("FK_Thread_Category");
        //    });

        //    OnModelCreatingPartial(modelBuilder);
        //}

        partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
    }
}

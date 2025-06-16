using Microsoft.AspNetCore.Http.HttpResults;
using server.Helper;
using server.Logic.Base;
using server.Logic.Interfaces;
using server.Models.DataTransfer;
using server.Models.Enums;
using server.Repositories;
using server.Repositories.Interfaces;
using dataAccess = server.Models.DataAccess;
using dataTransfer = server.Models.DataTransfer;

namespace server.Logic
{
    public class ExhibitionLogic : BaseLogic<dataAccess.Exhibition, dataTransfer.Exhibition>, IExhibitionLogic
    {
        private readonly IExhibitionElementRepository _exhibitionElementRepository;
        private readonly IWebHostEnvironment _env;

        public ExhibitionLogic(IExhibitionRepository repository, IExhibitionElementRepository exhibitionElementRepository, IWebHostEnvironment env)
            : base(repository)
        {
            _exhibitionElementRepository = exhibitionElementRepository;
            _env = env;
        }

        public async Task<dataTransfer.ExhibitionElement> UploadImageAsync(int exhibitionId, dataTransfer.ExhibitionElement exhibitionElement)
        {
            var file = exhibitionElement.ImageFile;
            var folderPath = Path.Combine(_env.ContentRootPath, "uploads", $"Exhibition_{exhibitionId}");
            if (!Directory.Exists(folderPath))
            {
                Directory.CreateDirectory(folderPath);
            }

            var fileName = Guid.NewGuid() + Path.GetExtension(file.FileName);
            var savePath = Path.Combine(folderPath, fileName);

            using var stream = new FileStream(savePath, FileMode.Create);
            await file.CopyToAsync(stream);

            var element = new dataAccess.ExhibitionElement
            {
                Name = exhibitionElement.Name,
                Description = exhibitionElement.Description,
                AvailableToBuy = exhibitionElement.AvailableToBuy,
                ExhibitionId = exhibitionId,
                ImageUrl = $"/uploads/Exhibition_{exhibitionId}/{fileName}",
            };

            var created = await _exhibitionElementRepository.CreateAsync(element);

            return MapExhibitionElementToDto(created);
        }

        public async Task<Exhibition> PublishAsync(int exhibitionId)
        {
            var toPublish = await _repository.GetByIdAsync(exhibitionId);
            if (toPublish == null)
            {
                throw new KeyNotFoundException($"Ausstellung mit der ID: {exhibitionId} existiert nicht");
            }

            // Publish the exhibition by setting the new Status
            toPublish.Status = ExhibitionStatus.Public;

            // update the model in the db
            var updated = await _repository.UpdateAsync(toPublish);

            return MapToDto(updated);
        }

        protected override dataTransfer.Exhibition MapToDto(dataAccess.Exhibition entity)
        {
            return ExhibitionHelper.ToDto(entity);
        }

        protected override dataAccess.Exhibition MapToEntity(dataTransfer.Exhibition dto)
        {
            return ExhibitionHelper.ToEntity(dto);
        }

        protected dataTransfer.ExhibitionElement MapExhibitionElementToDto(dataAccess.ExhibitionElement entity)
        {
            return ExhibitionElementHelper.ToDto(entity);
        }

        protected dataAccess.ExhibitionElement MapExhibitionElementToEntity(dataTransfer.ExhibitionElement dto)
        {
            return ExhibitionElementHelper.ToEntity(dto);
        }
    }
}

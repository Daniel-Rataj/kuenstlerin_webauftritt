using Microsoft.AspNetCore.Http.HttpResults;
using server.Helper;
using server.Logic.Base;
using server.Logic.Interfaces;
using server.Models.DataTransfer;
using server.Models.Enums;
using server.Repositories;
using server.Repositories.Interfaces;
using System.Text.Json;
using dataAccess = server.Models.DataAccess;
using dataTransfer = server.Models.DataTransfer;

namespace server.Logic
{
    public class ExhibitionLogic : BaseLogic<dataAccess.Exhibition, dataTransfer.Exhibition>, IExhibitionLogic
    {
        private readonly IExhibitionRepository _exhibitionRepository;
        private readonly IExhibitionElementRepository _exhibitionElementRepository;
        private readonly IWebHostEnvironment _env;

        public ExhibitionLogic(IExhibitionRepository repository, IExhibitionElementRepository exhibitionElementRepository, IWebHostEnvironment env)
            : base(repository)
        {
            _exhibitionRepository = repository;
            _exhibitionElementRepository = exhibitionElementRepository;
            _env = env;
        }

        public async Task<dataTransfer.Exhibition> UploadBulkAsync(int exhibitionId, List<IFormFile> files, string exhibitionElementsJson)
        {
            // JSON deserialisieren
            var exhibitionElements = JsonSerializer.Deserialize<List<dataTransfer.ExhibitionElement>>(exhibitionElementsJson, new JsonSerializerOptions
            {
                PropertyNameCaseInsensitive = true
            });

            if (exhibitionElements == null || exhibitionElements.Count != files.Count)
            {
                throw new ArgumentException("Die Anzahl der Metadaten stimmt nicht mit der Anzahl der Dateien überein.");
            }

            var exhibition = await _repository.GetByIdAsync(exhibitionId);
            if (exhibition == null)
            {
                throw new KeyNotFoundException($"Exhibition mit ID {exhibitionId} wurde nicht gefunden.");
            }

            for (int i = 0; i < files.Count; i++)
            {
                var file = files[i];
                var exhibitionElement = exhibitionElements[i];

                await SaveExhibitionElementAsync(exhibitionId, file, exhibitionElement);
            }

            // Erneut laden, um die ExhibitionElements mitzuladen
            var updated = await _repository.GetByIdAsync(exhibitionId);
            if (updated == null)
            {
                throw new Exception("Fehler beim Neuladen der aktualisierten Exhibition.");
            }

            return MapToDto(updated);
        }

        private async Task<dataAccess.ExhibitionElement> SaveExhibitionElementAsync(int exhibitionId, IFormFile file, dataTransfer.ExhibitionElement exhibitionElement)
        {
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
                ImageUrl = $"/uploads/Exhibition_{exhibitionId}/{fileName}",
                PriceTag = exhibitionElement.PriceTag,
                Length = exhibitionElement.Length,
                Width = exhibitionElement.Width,
                ExhibitionId = exhibitionId,
            };

            return await _exhibitionElementRepository.CreateAsync(element);
        }

        public async Task<IEnumerable<dataTransfer.Exhibition>> GetAllPublishedAsync()
        {
            var result = new List<dataAccess.Exhibition>();

            var publishedExhibitions = await _exhibitionRepository.GetAllPublishedAsync();
            if(publishedExhibitions.Any())
            {
                result = publishedExhibitions.ToList();
            }
            return result.Select(MapToDto);

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

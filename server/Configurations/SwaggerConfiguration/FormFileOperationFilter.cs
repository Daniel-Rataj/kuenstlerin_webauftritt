using Microsoft.OpenApi.Any;
using Microsoft.OpenApi.Models;
using Swashbuckle.AspNetCore.SwaggerGen;
using System.Reflection;

public class FormFileOperationFilter : IOperationFilter
{
    public void Apply(OpenApiOperation operation, OperationFilterContext context)
    {
        // Suche den Parameter mit [FromForm] und einem komplexen Typ (DTO)
        var dtoParam = context.MethodInfo.GetParameters()
            .FirstOrDefault(p => p.GetCustomAttribute<Microsoft.AspNetCore.Mvc.FromFormAttribute>() != null);

        if (dtoParam == null) return;

        var properties = dtoParam.ParameterType.GetProperties();
        var schemaProps = new Dictionary<string, OpenApiSchema>();

        foreach (var prop in properties)
        {
            var propSchema = new OpenApiSchema();

            if (prop.PropertyType == typeof(IFormFile) || typeof(IEnumerable<IFormFile>).IsAssignableFrom(prop.PropertyType))
            {
                propSchema.Type = "array";
                propSchema.Items = new OpenApiSchema
                {
                    Type = "string",
                    Format = "binary"
                };
            }
            else if (prop.PropertyType == typeof(string))
            {
                propSchema.Type = "string";
                if (prop.Name.ToLower().Contains("metadata"))
                {
                    // Beispiel JSON einfügen
                    propSchema.Example = new OpenApiString(
                        "[\n" +
                        "  {\n" +
                        "    \"name\": \"Bild 1\",\n" +
                        "    \"description\": \"Erklärung zum Bild\",\n" +
                        "    \"availableToBuy\": true,\n" +
                        "    \"exhibitionId\": 1\n" +
                        "  }\n" +
                        "]");
                }
            }
            else if (prop.PropertyType == typeof(bool))
            {
                propSchema.Type = "boolean";
            }
            else if (prop.PropertyType == typeof(int) || prop.PropertyType == typeof(long))
            {
                propSchema.Type = "integer";
            }
            else
            {
                continue; // Nicht unterstützte Typen überspringen
            }

            schemaProps[prop.Name] = propSchema;
        }

        operation.RequestBody = new OpenApiRequestBody
        {
            Content =
            {
                ["multipart/form-data"] = new OpenApiMediaType
                {
                    Schema = new OpenApiSchema
                    {
                        Type = "object",
                        Properties = schemaProps,
                        Required = schemaProps.Keys.ToHashSet()
                    }
                }
            }
        };
    }
}

using Microsoft.OpenApi.Models;
using Swashbuckle.AspNetCore.SwaggerGen;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection;

public class FormFileOperationFilter : IOperationFilter
{
    public void Apply(OpenApiOperation operation, OperationFilterContext context)
    {
        // Find the first parameter explicitly marked with [FromForm]
        var dtoParam = context.MethodInfo.GetParameters()
            .FirstOrDefault(p => p.GetCustomAttribute<Microsoft.AspNetCore.Mvc.FromFormAttribute>() != null);

        if (dtoParam == null) return;

        var properties = dtoParam.ParameterType.GetProperties();
        var schemaProps = new Dictionary<string, OpenApiSchema>();

        foreach (var prop in properties)
        {
            var propSchema = new OpenApiSchema();

            // Map .NET property types to OpenAPI schema types
            if (prop.PropertyType == typeof(IFormFile))
            {
                propSchema.Type = "string";
                propSchema.Format = "binary"; // Required for file uploads
            }
            else if (prop.PropertyType == typeof(string))
            {
                propSchema.Type = "string";
            }
            else if (prop.PropertyType == typeof(bool))
            {
                propSchema.Type = "boolean";
            }
            else if (prop.PropertyType == typeof(int) || prop.PropertyType == typeof(long))
            {
                propSchema.Type = "integer";
            }
            else if (prop.PropertyType == typeof(float) || prop.PropertyType == typeof(double) || prop.PropertyType == typeof(decimal))
            {
                propSchema.Type = "number";
            }
            else
            {
                // Skip unsupported or complex types
                continue;
            }

            schemaProps.Add(prop.Name, propSchema);
        }

        // Inject the constructed schema into the request body for Swagger
        operation.RequestBody = new OpenApiRequestBody
        {
            Content = {
                ["multipart/form-data"] = new OpenApiMediaType
                {
                    Schema = new OpenApiSchema
                    {
                        Type = "object",
                        Properties = schemaProps
                    }
                }
            }
        };
    }
}

using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json.Linq;
using System;
using System.Net.Http;
using System.Text.Json;
using System.Threading.Tasks;

namespace WeatherBackend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class WeatherForecastController : ControllerBase
    {
        private readonly string apiKey = "API-KEY";
        private static readonly string[] Summaries = new[]
        {
        "Freezing", "Bracing", "Chilly", "Cool", "Mild", "Warm", "Balmy", "Hot", "Sweltering", "Scorching"
    };

        private readonly ILogger<WeatherForecastController> _logger;

        public WeatherForecastController(ILogger<WeatherForecastController> logger)
        {
            _logger = logger;
        }

        /*
        [HttpGet]
        public IEnumerable<WeatherForecast> Geta()
        {
            return Enumerable.Range(1, 5).Select(index => new WeatherForecast
            {
                Date = DateTime.Now.AddDays(index),
                TemperatureC = Random.Shared.Next(-20, 55),
                Summary = Summaries[Random.Shared.Next(Summaries.Length)]
            })
            .ToArray();
        }*/
        
        [HttpGet("Location")]
        public async Task<Object> Location([FromQuery]string? q)
        {
            if (q != null)
            {
                try
                {
                    using (var httpClient = new HttpClient())
                    {
                        var url = string.Format("https://api.openweathermap.org/geo/1.0/direct?q={0}&limit=5&appid={1}", q, apiKey);
                        // Send GET request
                        HttpResponseMessage response = await httpClient.GetAsync(url);

                        if (response.IsSuccessStatusCode)
                        {
                            // Read and return the content as a string
                            string content = await response.Content.ReadAsStringAsync();

                            // Configure JSON serialization options
                            return Content(content, "application/json");
                            /*
                            var options = new JsonSerializerOptions
                            {
                                Encoder = System.Text.Encodings.Web.JavaScriptEncoder.UnsafeRelaxedJsonEscaping,
                                WriteIndented = true // Optional: Makes the JSON formatted for better readability
                            };

                            var returnData = JsonSerializer.Serialize(content, options);

                            //return returnData;  
                            JObject json = JObject.Parse(returnData);
                            return json;
                            */

                        }
                        else
                        {
                            // Handle unsuccessful response
                            return $"Failed with status code: {response.StatusCode}";
                        }
                    }
                }
                catch (Exception ex)
                {
                    // Handle exceptions
                    return $"Exception: {ex.Message}";
                }


            }
            return JsonSerializer.Serialize("{}");
        }


        [HttpGet("Weather")]
        public async Task<Object> Weather([FromQuery] string? lon, string? lat)
        {
            if (lon != null && lat != null)
            {
                try
                {
                    using (var httpClient = new HttpClient())
                    {
                        var url = string.Format("https://api.openweathermap.org/data/2.5/onecall?lat={0}&lon={1}&appid={2}&units=metric",lat , lon, apiKey);
                        // Send GET request
                        HttpResponseMessage response = await httpClient.GetAsync(url);

                        if (response.IsSuccessStatusCode)
                        {
                            // Read and return the content as a string
                            string content = await response.Content.ReadAsStringAsync();

                            // Configure JSON serialization options
                            return Content(content, "application/json");
                            /*
                            var options = new JsonSerializerOptions
                            {
                                Encoder = System.Text.Encodings.Web.JavaScriptEncoder.UnsafeRelaxedJsonEscaping,
                                WriteIndented = true // Optional: Makes the JSON formatted for better readability
                            };

                            var returnData = JsonSerializer.Serialize(content, options);

                            //return returnData;  
                            JObject json = JObject.Parse(returnData);
                            return json;
                            */

                        }
                        else
                        {
                            // Handle unsuccessful response
                            return $"Failed with status code: {response.StatusCode + ", " + url}";
                        }
                    }
                }
                catch (Exception ex)
                {
                    // Handle exceptions
                    return $"Exception: {ex.Message}";
                }


            }
            return JsonSerializer.Serialize("{}");
        }
    }
}
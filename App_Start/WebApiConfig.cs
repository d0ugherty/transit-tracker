using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http.Headers;
using System.Web.Http;
using Transit_App.Controllers;

namespace Transit_App
{
    public static class WebApiConfig
    {
        public static void Register(HttpConfiguration config)
        {
            // Web API configuration and services

            // Web API routes
            config.MapHttpAttributeRoutes();

            config.Routes.MapHttpRoute(
               name: "TrainStops",
               routeTemplate: "api/stop/{agency}/{routeId}",
               defaults: new { agency = RouteParameter.Optional, routeId = RouteParameter.Optional }
               );

            config.Routes.MapHttpRoute(
                name: "TrainRoutes",
                routeTemplate: "api/routes/{agency}/{id}",
                defaults: new { agency = RouteParameter.Optional, id = RouteParameter.Optional }
                );

            config.Routes.MapHttpRoute(
                name: "TrainShapes",
                routeTemplate: "api/routes/{agency}/{id}",
                defaults: new { agency = RouteParameter.Optional, id = RouteParameter.Optional }
            );

            config.Routes.MapHttpRoute(
                name: "DefaultApi",
                routeTemplate: "api/{controller}/{id}",
                defaults: new { id = RouteParameter.Optional }
            );

            var json = GlobalConfiguration.Configuration.Formatters.JsonFormatter;
            json.SerializerSettings.Formatting = Newtonsoft.Json.Formatting.Indented;
        }
    }
}

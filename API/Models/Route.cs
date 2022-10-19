using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Transit_App.Models
{
    public class Route
    {
        public int route_id { get; set; }
        public string agency_id { get; set; }
        public string route_short_name { get; set; }
        public string route_long_name { get; set; }
        public int route_type { get; set; }
        public string route_url { get; set; }
        public string route_color { get; set; }

    }
}
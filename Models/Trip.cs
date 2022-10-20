using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Transit_App.Models
{
    public class Trip
    {
        public int route_id { get; set; }
        public int service_id { get; set; }
        public int trip_id { get; set; }
        public string trip_headsign { get; set; }
        public int direction_id { get; set; }
        public string block_id { get; set; }
        public int shape_id { get; set; }
    }
}
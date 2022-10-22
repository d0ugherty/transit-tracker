using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Transit_App.Models
{
    public class StopTime
    {
        public int trip_id { get; set; }
        public string arrival_time { get; set; }
        public string departure_time { get; set; }
        public int stop_id { get; set; }
        public int pickup_type { get; set; }
        public int drop_off_type { get; set; }
        public float shape_dist_travele { get; set; }

    }
}
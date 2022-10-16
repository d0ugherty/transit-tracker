using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Server
{
    internal class StopTime
    {
        private int trip_id { get; set; }
        private string arrival_time {get; set; }
        private string departure_time { get; set; }
        private int stop_id { get; set; }
        private int stop_sequence { get; set; }
        private int pickup_type { get; set; }
        private int dropoff_type { get; set; }
        private float shape_dist_traveled { get; set; }
    }
}

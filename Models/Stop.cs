using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Transit_App.Models
{
    public class Stop
    {
        public int stop_id { get; set; }
        public string stop_code { get; set; }
        public string stop_name { get; set; }
        public string stop_desc { get; set; }
        public double stop_lat { get; set; }
        public double stop_lon { get; set; }
        public string zone_id { get; set; }
    }
}
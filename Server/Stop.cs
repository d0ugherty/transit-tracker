using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Server
{
    internal class Stop
    {
        private int stop_id { get; set; }
        private int stop_code { get; set; }
        private string stop_name { get; set; }
        private string stop_desc { get; set; }
        private float stop_lat { get; set; }
        private float stop_lon { get; set; }
        private int zone_id { get; set; }
    }
}

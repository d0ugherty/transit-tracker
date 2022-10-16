using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Server
{
    internal class Shape
    {
        private int shape_id { get; set; }
        private float shape_pt_lat { get; set; }
        private float shape_pt_lon { get; set; }
        private int shape_pt_sequence { get; set; }
        private float shape_dist_traveled { get; set; }
    }
}

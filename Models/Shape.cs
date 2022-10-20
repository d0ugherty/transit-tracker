using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Transit_App.Models
{
    public class Shape
    {
        public int shape_id { get; set; }
        public double shape_pt_lat { get; set; }
        public double shape_pt_lon { get; set; }
        public  int shape_pt_sequence { get; set; }
        public double shape_dist_traveled { get; set; }
    }
}
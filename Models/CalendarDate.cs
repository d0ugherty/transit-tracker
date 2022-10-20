using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Transit_App.Models
{
    public class CalendarDate 
    {
        public int service_id {set; get;}
        public string date {set; get;}
        public int exception_type {set; get;}
    }
}
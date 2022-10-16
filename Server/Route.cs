namespace Server
{
    public class Route
    {
        public int route_id { set; get; }
        public string agency_id { set; get; }
        public string route_short_name { set; get; }
        public string route_long_name { set; get; }
        public int route_type { set; get; }
        public string route_url { set; get; }
        public string route_color { set; get; }
    }
}
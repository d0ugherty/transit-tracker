using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Text.Json;
using System.Web.Http;
using System.Web.Http.Results;
using Transit_App.Models;
using JsonSerializer = System.Text.Json.JsonSerializer;

namespace Transit_App.Controllers{

public class CalendarDatesController : ApiController{

    public IEnumerable<CalendarDate> getAllDates(){
            string connectionString;
            SqlConnection cnn;
            connectionString = System.IO.File.ReadAllText(@"C:\Users\tdoug\source\repos\transit-tracker\cnnstring.txt");
            cnn = new SqlConnection(connectionString);
            cnn.Open();

            SqlCommand command;
            SqlDataReader dataReader;
            string sql;

            sql = "SELECT * FROM njt_calendar_dates";

            command = new SqlCommand(sql, cnn);

            dataReader = command.ExecuteReader();

            var dates = new List<CalendarDate>();

            while (dataReader.Read())
            {
                dates.Add(new CalendarDate()
                {
                    service_id = (int)dataReader["service_id"],
                    date = (string)dataReader["date"],
                    exception_type = (int)dataReader["exception_type"]
                });
            }
            //ystem.Console.WriteLine();
            //var options = new JsonSerializerOptions { WriteIndented = true };
            //string jsonString = JsonSerializer.Serialize(dates, options);
            cnn.Close();
            Console.WriteLine(jsonString);
            return dates;
    }

     public IEnumerable<CalendarDate> getDatesById(int id){
            string connectionString;
            SqlConnection cnn;
            connectionString = System.IO.File.ReadAllText(@"C:\Users\tdoug\source\repos\transit-tracker\cnnstring.txt");
            cnn = new SqlConnection(connectionString);
            cnn.Open();

            SqlCommand command;
            SqlDataReader dataReader;
            string sql;

            sql = $"SELECT * FROM njt_calendar_dates WHERE service_id={id}";

            command = new SqlCommand(sql, cnn);

            dataReader = command.ExecuteReader();

            var dates = new List<CalendarDate>();

            while (dataReader.Read())
            {
                dates.Add(new CalendarDate()
                {
                    service_id = (int)dataReader["service_id"],
                    date = (string)dataReader["date"],
                    exception_type = (int)dataReader["exception_type"]
                });
            }
            //ystem.Console.WriteLine();
            //var options = new JsonSerializerOptions { WriteIndented = true };
            //string jsonString = JsonSerializer.Serialize(dates, options);
            cnn.Close();
            Console.WriteLine(jsonString);
            return dates;
    }
}
}
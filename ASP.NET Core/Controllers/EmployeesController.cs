using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Text.Json;
using ASP_NET_Core.Models;
using DevExpress.Utils.Serializing.Helpers;
using DevExtreme.AspNet.Data;
using DevExtreme.AspNet.Mvc;
using Microsoft.AspNetCore.Mvc;

namespace ASP_NET_Core.Controllers;

[Route("api/[controller]")]
public class EmployeesController: Controller {

    [HttpGet]
    public object Get(DataSourceLoadOptions loadOptions) {
        return DataSourceLoader.Load(SampleData.Employees, loadOptions);
    }

    [HttpPut]
    public IActionResult Put(int key, string values) {
        var employee = SampleData.Employees.FirstOrDefault(e => e.ID == key);

        JsonPopulateObjectExtensions.PopulateObject(values, employee);

        return Ok(employee);
    }
}

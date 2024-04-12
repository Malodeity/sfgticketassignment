using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using sfgticketassignment.Database;
using sfgticketassignment.Dto;

namespace sfgticketassignment.Controllers;

[ApiController]
[Route("api/[controller]")]
public class ViolationController : ControllerBase
{
    private readonly TicketFineDbContext dbContext;

    public ViolationController(TicketFineDbContext dbContext)
    {
        this.dbContext = dbContext;
    }

    [HttpPost("AddToAnnualTax")]
    public async Task<IActionResult> AddToAnnualTax(AddToAnnualTaxRequest addToAnnualTaxRequest)
    {
        try
        {
            // Step 1: Get car annual tax
            var annualTax = dbContext.AnnualTax.Include(x => x.Car).Include(x => x.Violations).FirstOrDefault(x => x.Car.NumberPlate == addToAnnualTaxRequest.NumberPlate);

            if (annualTax != null)
            {
                // Step 2: get violation
                var violation = dbContext.Violation.FirstOrDefault(x => x.Id == addToAnnualTaxRequest.ViolationId);
                if (violation != null)
                {
                    annualTax.Violations.Add(violation);
                    var result = await dbContext.SaveChangesAsync();

                    if (result > 0)
                    {
                        return Ok("Violation added to annual tax");
                    }
                }
            }
            throw new ArgumentException("invalid");
        }
        catch (Exception ex)
        {
            return BadRequest(ex.Message);
        }
    }
}

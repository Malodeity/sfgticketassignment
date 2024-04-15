using Microsoft.AspNetCore.Mvc;
using sfgticketassignment.Models;
using sfgticketassignment.Dto;
using sfgticketassignment.Database;
using System;

namespace sfgticketassignment.Controllers;

[ApiController]
[Route("api/[controller]")]
public class OfficerController : ControllerBase
{
    private readonly TicketFineDbContext dbContext;

    public OfficerController(TicketFineDbContext dbContext)
    {
        this.dbContext = dbContext;
    }

    [HttpPost("createTicket")]
    public async Task<IActionResult> CreateTicket(CreateTicketRequest createTicketRequest)
    {
        try
        {
            // Step 1: get officer details
            var officer = dbContext.Officer.FirstOrDefault(x => x.Id == createTicketRequest.OfficerId);
            if (officer != null)
            {
                // Step 2: get car details
                var car = dbContext.Car.FirstOrDefault(x => x.NumberPlate == createTicketRequest.NumberPlate);
                if (car != null)
                {
                    // Step 3: calculate amount by type
                    double ticketAmount = 0;
                    switch (createTicketRequest.TicketType)
                    {
                        case "Unauthorised Parking":
                            ticketAmount = 747;
                            break;
                        case "Double Parking":
                            ticketAmount = 142;
                            break;
                        case "Tow Away Zone Parking":
                            ticketAmount = 284;
                            break;
                        case "Over 24 Hours Parking":
                            ticketAmount = 436;
                            break;
                        default:
                            ticketAmount = 0;
                            break;
                    }

                    // Step 4: create Violation
                    var violation = new Violation
                    {
                        DateIssued = DateTime.Now,
                        IssueOfficer = officer,
                        IssuedCar = car,
                        IsPayed = false,
                        ViolationType = createTicketRequest.TicketType,
                        Amount = ticketAmount
                    };

                    // Step 5: add violation to Db
                    var violationAdded = dbContext.Violation.Add(violation);
                    var result = await dbContext.SaveChangesAsync();

                    if (result > 0)
                    {
                        return Ok($"Ticket created successfully {violationAdded.Entity.Id}");
                    }
                }
            }
            throw new ArgumentException("Invalid action");
        }
        catch (Exception ex)
        {
            return BadRequest(ex.Message);
        }
    }
}

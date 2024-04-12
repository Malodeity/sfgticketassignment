using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using sfgticketassignment.Models;
using sfgticketassignment.Database;
using sfgticketassignment.Dto;
using Microsoft.EntityFrameworkCore;

namespace sfgticketassignment.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class PaymentController : ControllerBase
    {
        private readonly TicketFineDbContext dbContext;

        public PaymentController(TicketFineDbContext dbContext)
        {
            this.dbContext = dbContext;
        }

        [HttpPost("MakePayment")]
        public async Task<IActionResult> MakePayment(MakePaymentRequest makePaymentRequest)
        {
            try
            {
                // Step 1: get the violation
                var violation = dbContext.Violation.Include(x => x.Payment).FirstOrDefault(x => x.Id == makePaymentRequest.ViolationId);
                if (violation != null)
                {
                    // Step 2: make Payment
                    var addedPayment = dbContext.Payment.Add(new Payment
                    {
                        Amount = makePaymentRequest.FineAmount,
                        ProcessDate = DateTime.Now,
                        PayMethod = "Card"
                    });
                    var result = await dbContext.SaveChangesAsync();

                    if (result > 0)
                    {
                        // Step 3: update violation status
                        violation.IsPayed = true;
                        violation.Payment = addedPayment.Entity;
                        dbContext.Violation.Update(violation);

                        var result2 = await dbContext.SaveChangesAsync();
                        if (result2 > 0)
                        {
                            return Ok("Payment successful");
                        }
                    }

                }
                throw new ArgumentException("Invalid");
            }
            catch (Exception ex)
            {

                return BadRequest(ex.Message);
            }
        }
    }
}

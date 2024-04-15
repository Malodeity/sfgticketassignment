using Microsoft.AspNetCore.Mvc;
using sfgticketassignment.Models;
using sfgticketassignment.Dto;
using sfgticketassignment.Database;
using System;

namespace sfgticketassignment.Controllers;


[ApiController]
[Route("api/[controller]")]
public class LoginController : ControllerBase
{
    private readonly TicketFineDbContext dbContext;

    public LoginController(TicketFineDbContext dbContext)
    {
        this.dbContext = dbContext;
    }

    [HttpPost("Login")]
    public async Task<IActionResult> Login(LoginRequest LoginRequest)
    {

        if (string.IsNullOrEmpty(LoginRequest.Username) || string.IsNullOrEmpty(LoginRequest.Password))
        {
            return BadRequest("Username or Password is required");
        }

        //Find the officer in the database
        dynamic user = dbContext.Officer.FirstOrDefault(u => u.UserName == LoginRequest.Username);
        if (user == null)
        {
            // Find the violator in the database
            user = dbContext.Violator.FirstOrDefault(u => u.IDNumber == LoginRequest.Username);
        }

        //check if the password matches and the user exist
        if (user == null || user.Password == LoginRequest.Password)
        {
            return Unauthorized("Invalid username or password");
        }


        return Ok(user);
    }

}

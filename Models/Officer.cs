namespace sfgticketassignment.Models;

public class Officer
{
    public Guid Id { get; set; }
    public string Name { get; set; }
    public string PhoneNumber { get; set; }
    public string EmailAddress { get; set; }
    public string UserName { get; set; }
    public string Password { get; set; }

    public string BadgeNumber { get; set; }

    public string Address { get; set; }
    public List<Violation> Violations { get; set; }

}

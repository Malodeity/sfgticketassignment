namespace sfgticketassignment.Models;

public class Violator
{
    public string IDNumber { get; set; }
    public string Password { get; set; }
    public string Name { get; set; }
    public string PhoneNumber { get; set; }
    public string EmailAddress { get; set; }
    public string Address { get; set; }
    public List<Car> Cars { get; set; }
}

namespace sfgticketassignment.Models;

public class Car
{
    public Guid Id { get; set; }
    public string NumberPlate { get; set; }
    public string Model { get; set; }
    public string VinNumber { get; set; }
    public string RegisteredOwner { get; set; }
    public string Colour { get; set; }
    public AnnualTax Tax { get; set; }
    public List<Violation> Violations { get; set; }
    public Violator Violator { get; set; }
}

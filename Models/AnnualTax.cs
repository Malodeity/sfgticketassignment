namespace sfgticketassignment.Models;

public class AnnualTax
{
    public Guid Id { get; set; }
    public DateTime DateIssued { get; set; }
    public bool IsPayed { get; set; }
    public Car Car { get; set; }
    public List<Violation> Violations { get; set; }
}

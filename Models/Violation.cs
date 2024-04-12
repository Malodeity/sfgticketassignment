namespace sfgticketassignment.Models;

public class Violation
{
    public Guid Id { get; set; }
    public double Amount { get; set; }
    public DateTime DateIssued { get; set; }
    public string ViolationType { get; set; }
    public bool IsPayed { get; set; }
    public AnnualTax AnnualTax { get; set; }
    public Officer IssueOfficer { get; set; }
    public Car IssuedCar { get; set; }
    public Payment Payment { get; set; }
}

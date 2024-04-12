namespace sfgticketassignment.Models;

public class Payment
{

    public Guid Id { get; set; }
    public string PayMethod { get; set; }

    public double Amount { get; set; }
    public Violation Violation { get; set; }
    public DateTime ProcessDate { get; set; }
}
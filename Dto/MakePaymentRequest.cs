namespace sfgticketassignment.Dto;

public class MakePaymentRequest
{
    public string CardNumber { get; set; }
    public string CardName { get; set; }

    public double FineAmount { get; set; }
    public Guid ViolationId { get; set; }
    public DateTime Expirydate { get; set; }
    public string Securitycode { get; set; }
}

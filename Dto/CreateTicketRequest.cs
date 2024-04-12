namespace sfgticketassignment.Dto;

public class CreateTicketRequest
{
    public Guid OfficerId { get; set; }
    public string NumberPlate { get; set; }
    public string Description { get; set; }
    public string TicketType { get; set; }
    public string PictureUrl { get; set; }
}

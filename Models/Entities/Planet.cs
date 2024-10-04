namespace Models.Entities
{
    public class Planet
    {
        
        public Guid Id {get;set;}
        public required string Name{get;set;}
        public required double Distance{get;set;}
        public required double Angle{get;set;}
        public required double Energy{get;set;}
        public required double Momentum{get;set;}


    }
}
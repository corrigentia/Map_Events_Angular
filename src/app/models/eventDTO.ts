export interface EventDTO {
  id_events: number;
  eventname: string;
  description: string;
  begindate: Date;
  enddate: Date;
  prixtvac: number;
  weburl: string;
  coordx: number;
  coordy: number;
  status: boolean;
}

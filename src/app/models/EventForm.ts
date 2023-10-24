import { Event_categoriesDTO } from "./Event_categoriesDTO";

export interface EventForm {
  eventname: string;
  description: string;
  begindate: Date;
  enddate: Date;
  prixtvac: number;
  weburl: string;
  coordx: number;
  coordy: number;
  categid: number;
  status: boolean;
}

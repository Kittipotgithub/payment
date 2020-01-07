import { WebInfo } from './web-info';

export interface SearchFiHead {
  accDocNoFrom: string;
  accDocNoTo: string;
  createdFrom: string;
  createdTo: string;
  dateDocFrom: string;
  dateDocTo: string;
  datePostFrom: string;
  datePostTo: string;
  docTypeTo: string;
  docTypeFrom: string;
  fiscYear: string;
  formId: string;
  period: number;
  refDocNoFrom: string;
  refDocNoTo: string;
  vendorTaxId: string;
  webInfo: WebInfo;
}

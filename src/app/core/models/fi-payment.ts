import { FiPaymentSearch } from './fi-payment-search';
import { FiPaymentItem } from './fi-payment-item';

export interface FiPayment {
  SEARCH: FiPaymentSearch;
  ITEMS: FiPaymentItem[];
}

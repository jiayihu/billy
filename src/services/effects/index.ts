import InvoicesEffects from './invoices.effects';
export { default as InvoicesEffects } from './invoices.effects';
import CustomersEffects from './customers.effects';
export { default as CustomersEffects } from './customers.effects';
import TaxesEffects from './taxes.effects';
export { default as TaxesEffects } from './taxes.effects';
import UserEffects from './user.effects';
export { default as UserEffects } from './user.effects';

export const effects = [InvoicesEffects, CustomersEffects, TaxesEffects, UserEffects];

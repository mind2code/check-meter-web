import { AddressBook } from '../models/address-book.model';

export interface CreateAddressBookDto extends Omit<AddressBook, ('id')> {}

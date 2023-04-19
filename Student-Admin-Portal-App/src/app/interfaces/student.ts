import { Address } from "./address";
import { Genders } from "./genders";

export interface Student {
  id: string;
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  email: string;
  mobile: number;
  profileImageUrl: string;
  genderId: string;
  gender: Genders;
  address: Address;
}
export interface StudentTable {
  id: number;
  firstName: string;
  lastName: string;
  dateOfBirth: number | Date | string;
  email: string;
  mobile: number;
  profileimageUrl: string;
  genderId: number;
  physicalAddress: string;
  postalAddress: string;
}
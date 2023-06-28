import { IContact } from "../api/resTypes";

// Custom comparison function to sort based on name field
export const compareNames = (a: IContact, b: IContact) => {
  const nameA = a.name.toUpperCase();
  const nameB = b.name.toUpperCase();

  if (nameA < nameB) {
    return -1;
  }
  if (nameA > nameB) {
    return 1;
  }
  return 0;
};

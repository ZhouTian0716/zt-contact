import axios from "axios";
import { IContact } from "./resTypes";

const baseUrl = "https://jsonplaceholder.typicode.com";
export const getAllContacts = async () => {
  const { data } = await axios.get<IContact[]>(`${baseUrl}/users`);
  return data;
};

export const getContactById = async (contactId: string) => {
  const { data } = await axios.get<IContact>(`${baseUrl}/users/${contactId}`);
  return data;
};

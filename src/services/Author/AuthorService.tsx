import axios from "axios";
import { Author } from "../../domain/authors/authors";

const API_URL = "https://localhost:7178/api/Authors"; // Ensure this is the correct URL

export const getAuthors = async (): Promise<Author[]> => {
  const response = await axios.get<Author[]>(API_URL);
  return response.data;
};

export const addAuthor = async (author: Author): Promise<Author> => {
  const response = await axios.post(API_URL, author);
  return response.data;
};

export const updateAuthor = async (author: Author): Promise<void> => {
  await axios.put(`${API_URL}/${author.authorID}`, author);
};

export const deleteAuthor = async (authorID: number): Promise<void> => {
  await axios.delete(`${API_URL}/${authorID}`);
};

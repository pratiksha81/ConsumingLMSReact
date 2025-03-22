import axios from "axios";
import { LoginDTO, Tokens, User } from "../../domain/Authorization/authModel";
const API_URL = 'https://localhost:7178/api/Auth';

export const login = async (credentials: LoginDTO): Promise<Tokens> => {
    const response = await axios.post(`${API_URL}/login`, credentials);
    return response.data;
  };
   
  export const signup = async (user: User): Promise<void> => {
    await axios.post(`${API_URL}/signup`, user);
  };
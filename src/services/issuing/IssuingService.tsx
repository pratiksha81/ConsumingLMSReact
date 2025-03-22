// src/services/issuing/IssuingService.tsx
import axios from "axios";
import { IssuingTransaction } from "../../domain/issuing/Issuing";

const API_URL = "https://localhost:7178/api/Transactions";

export const createTransaction = async (transaction: IssuingTransaction): Promise<void> => {
  console.log("Sending transaction payload:", JSON.stringify(transaction, null, 2));
  try {
    const response = await axios.post(API_URL, transaction, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    console.log("Response from server:", response.data);
  } catch (error) {
    console.error("Error posting transaction:");
    throw error;
  }
};
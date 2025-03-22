// src/pages/IssuingPage.tsx
import { useState } from "react";
import IssuingHeader from "../../assets/IssueBookHead.svg";
import IssuingForm from "../../components/issuing/IssuingForm";
import Navbar from "../../components/Navbar";
import { IssuingTransaction } from "../../domain/issuing/Issuing";
import { createTransaction } from "../../services/issuing/IssuingService";

const IssuingPage: React.FC = () => {
  const [error, setError] = useState<string | null>(null);

  const handleIssueBook = async (transaction: IssuingTransaction) => {
    try {
      await createTransaction(transaction);
      setError(null);
      console.log("Transaction issued successfully:", transaction);
    } catch (err: any) {
      const errorMessage =
        err.response?.data?.message ||
        err.response?.data ||
        err.message ||
        "Failed to issue book.";
      setError(JSON.stringify(errorMessage, null, 2));
      console.error("Error issuing transaction:", {
        message: err.message,
        status: err.response?.status,
        responseData: err.response?.data,
        requestPayload: transaction,
      });
    }
  };

  return (
    <div className="flex">
      <Navbar />
      <div className="ml-[222px] w-full">
        <div
          className="header"
          style={{
            height: "65px",
            background: "#fff",
            boxShadow: "0 2px 5px rgba(0, 0, 0, 0.1)",
            display: "flex",
            alignItems: "center",
            padding: "0 20px",
          }}
        >
          <img
            src={IssuingHeader}
            alt="Issue Book Icon"
            style={{ width: "35px", height: "35px", marginRight: "10px" }}
          />
          <h2 style={{ fontSize: "18px", margin: "0" }}>Issue Book</h2>
        </div>
        <div
          className="body"
          style={{
            background: "#F2F2F2",
            padding: "20px",
            height: "calc(100vh - 65px)",
            overflowY: "auto",
          }}
        >
          {error && (
            <div
              style={{
                background: "#fdd",
                color: "#d00",
                padding: "10px",
                marginBottom: "20px",
                whiteSpace: "pre-wrap",
              }}
            >
              {error}
            </div>
          )}
          <IssuingForm onSubmit={handleIssueBook} />
        </div>
      </div>
    </div>
  );
};

export default IssuingPage;
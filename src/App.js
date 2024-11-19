import React, { useState } from "react";

// JSON data
const initialData = {
  transactionDetails: {
    type: "p2p, p2m",
    mode: "qr_code, collect, intent, app-2-app, link-based",
    amount: 4500.62,
    recurringPayment: true,
    transactionPurpose: "salary, phone_recharge, credit_card_bill"
  },
  payerDetails: {
    upiId: "jon.doe@example",
    category: "individual, business",
    accountType: "savings, current, checking",
    accountAge: 369,
    payerAccountBalance: "41793.49",
    upiLimitCheck: "23000",
    deviceDetails: {
      deviceType: "mobile, tablet, desktop",
      deviceModel: "XY-123Z",
      deviceOs: "android_12, ios_14",
      ipAddress: "192.168.1.1",
      jailbroken: true,
      rooted: true,
      simChanged: true,
      newDevice: true,
      proxyUsed: false,
      mockgps: false
    },
    location: {
      latitude: 12.972151666666665,
      longitude: 77.634735
    }
  },
  payeeDetails: {
    upiId: "jane.doe@example",
    category: "individual, business",
    mcc: "9399",
    accountType: "savings, current, checking",
    accountAge: 369,
    deviceDetails: {
      deviceType: "mobile, tablet, desktop",
      deviceModel: "XY-123Z",
      deviceOs: "android_12, ios_14",
      ipAddress: "192.168.1.1",
      jailbroken: true,
      rooted: true,
      simChanged: true,
      newDevice: true,
      proxyUsed: false,
      mockgps: false
    },
    location: {
      latitude: 12.972151666666665,
      longitude: 77.634735
    }
  },
  sessionDetails: {
    payerSessionDuration: 137,
    transactionInitiationAt: 1709305619369,
    transactionCompletedAt: 1709305619369
  }
};

const App = () => {
  const [formData, setFormData] = useState(initialData);
  const [responseData, setResponseData] = useState(null);

  const handleInputChange = (section, key, subKey, value) => {
    setFormData((prevState) => {
      const updatedSection = { ...prevState[section] };
      if (subKey) {
        updatedSection[key] = { ...updatedSection[key], [subKey]: value };
      } else {
        updatedSection[key] = value;
      }
      return { ...prevState, [section]: updatedSection };
    });
  };

  const handleSubmit = async () => {
    try {
      const response = await fetch("https://api.example.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData), // Send updated formData
      });

      if (!response.ok) {
        throw new Error(`API call failed with status: ${response.status}`);
      }

      const data = await response.json(); // Parse response
      setResponseData(data); // Update UI with API response
    } catch (error) {
      console.error("Error in API call:", error);
      setResponseData({
        finalDecision: "fail",
        riskScore: 0,
        reasons: ["API call failed. Please try again later."],
      }); // Show a fail response in case of error
    }
  };


  const handlePastTransactions = () => {
    const data = [
      {
        "id": "Rand0m-uU1d-Str1nG",
        "payerId": "Rand0m-uU1d-Str1nG",
        "payeeId": "Rand0m-uU1d-Str1nG",
        "finalDecision": "pass, fail, manual_review",
        "riskScore": 84,
        "reasons": [
          "Unusual transaction amount",
          "High-risk merchant",
          "Suspicious IP address"
        ],
        "timestamp": 1709305619369
      },
      {
        "id": "Rand0m-uU1d-Str1nG",
        "payerId": "Rand0m-uU1d-Str1nG",
        "payeeId": "Rand0m-uU1d-Str1nG",
        "finalDecision": "pass, fail, manual_review",
        "riskScore": 84,
        "reasons": [
          "Unusual transaction amount",
          "High-risk merchant",
          "Suspicious IP address"
        ],
        "timestamp": 1709305619369
      },
      {
        "id": "Rand0m-uU1d-Str1nG",
        "payerId": "Rand0m-uU1d-Str1nG",
        "payeeId": "Rand0m-uU1d-Str1nG",
        "finalDecision": "pass, fail, manual_review",
        "riskScore": 84,
        "reasons": [
          "Unusual transaction amount",
          "High-risk merchant",
          "Suspicious IP address"
        ],
        "timestamp": 1709305619369
      }
    ]

    const newTab = window.open("", "_blank");
    newTab.document.write(`
      <style>
        body {
          font-family: Arial, sans-serif;
          padding: 20px;
          background-color: #f7f9fc;
        }
        .transaction {
          margin-bottom: 20px;
          padding: 10px;
          border: 1px solid #ccc;
          border-radius: 5px;
          background-color: #fff;
        }
        .transaction h4 {
          color: #555;
        }
        .transaction ul {
          padding-left: 20px;
        }
        .transaction ul li {
          color: #333;
        }
      </style>
      <h2 style="color: #007bff;">Past Transactions</h2>
      ${data
        .map(
            (transaction) => `
          <div class="transaction">
            <h4>Transaction ID: ${transaction.id}</h4>
            <p><strong>Final Decision:</strong> ${transaction.finalDecision}</p>
            <p><strong>Risk Score:</strong> ${transaction.riskScore}</p>
            <p><strong>Reasons:</strong></p>
            <ul>${transaction.reasons.map((reason) => `<li>${reason}</li>`).join("")}</ul>
            <p><strong>Timestamp:</strong> ${new Date(transaction.timestamp).toLocaleString()}</p>
          </div>
        `
        )
        .join("")}
    `);
  };

  return (
      <div style={{ display: "flex", height: "100vh", fontFamily: "Arial, sans-serif" }}>
        <div style={{ flex: 1, padding: "20px", backgroundColor: "#f8f9fa", borderRight: "1px solid #ddd" }}>
          <h2 style={{ color: "#007bff" }}>Transaction Details</h2>
          <button
              onClick={handlePastTransactions}
              style={{
                padding: "10px 15px",
                marginBottom: "15px",
                backgroundColor: "#007bff",
                color: "#fff",
                border: "none",
                borderRadius: "5px",
                cursor: "pointer"
              }}
          >
            Past Transactions
          </button>
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
            <tr style={{ backgroundColor: "#e9ecef" }}>
              <th style={{ padding: "10px", border: "1px solid #ddd", textAlign: "left" }}>Field</th>
              <th style={{ padding: "10px", border: "1px solid #ddd", textAlign: "left" }}>Value</th>
            </tr>
            </thead>
            <tbody>
            {Object.entries(formData).map(([sectionKey, section]) =>
                Object.entries(section).map(([key, value]) =>
                    typeof value === "object" ? (
                        Object.entries(value).map(([subKey, subValue]) => (
                            <tr key={`${sectionKey}-${key}-${subKey}`}>
                              <td style={{ padding: "10px", border: "1px solid #ddd" }}>{`${key} (${subKey})`}</td>
                              <td style={{ padding: "10px", border: "1px solid #ddd" }}>
                                <input
                                    type="text"
                                    value={subValue}
                                    onChange={(e) =>
                                        handleInputChange(sectionKey, key, subKey, e.target.value)
                                    }
                                    style={{ width: "100%", padding: "5px", border: "1px solid #ccc" }}
                                />
                              </td>
                            </tr>
                        ))
                    ) : (
                        <tr key={`${sectionKey}-${key}`}>
                          <td style={{ padding: "10px", border: "1px solid #ddd" }}>{key}</td>
                          <td style={{ padding: "10px", border: "1px solid #ddd" }}>
                            <input
                                type="text"
                                value={value}
                                onChange={(e) => handleInputChange(sectionKey, key, null, e.target.value)}
                                style={{ width: "100%", padding: "5px", border: "1px solid #ccc" }}
                            />
                          </td>
                        </tr>
                    )
                )
            )}
            </tbody>
          </table>
          <button
              onClick={handleSubmit}
              style={{
                marginTop: "15px",
                padding: "10px 15px",
                backgroundColor: "#28a745",
                color: "#fff",
                border: "none",
                borderRadius: "5px",
                cursor: "pointer"
              }}
          >
            Submit
          </button>
        </div>
        <div style={{ flex: 1, padding: "20px", backgroundColor: "#f7f9fc" }}>
          <h2 style={{ color: "#007bff" }}>Response Section</h2>
          {responseData ? (
              <div style={{ padding: "15px", backgroundColor: "#fff", borderRadius: "5px", border: "1px solid #ddd" }}>
                <h3 style={{ color: responseData.finalDecision === "pass" ? "green" : "red" }}>
                  {responseData.finalDecision.toUpperCase()}
                </h3>
                <p><strong>Risk Score:</strong> {responseData.riskScore}</p>
                <p><strong>Reasons:</strong></p>
                <ul>
                  {responseData.reasons.map((reason, index) => (
                      <li key={index}>{reason}</li>
                  ))}
                </ul>
              </div>
          ) : (
              <p>No response yet.</p>
          )}
        </div>
      </div>
  );
};

export default App;

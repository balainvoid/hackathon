import React, { useState } from "react";

// JSON data
const initialData = {
  transactionDetails: {
    type: "p2p",
    mode: "qr_code",
    amount: 20000,
    recurringPayment: true,
    transactionPurpose: "salary"
  },
  payerDetails: {
    upiId: "jon.doe@example",
    mobileNumber: 9876543210,
    category: "individual",
    accountType: "savings",
    accountAge: 369,
    payerAccountBalance: "500000",
    upiLimitCheck: "500000",
    deviceDetails: {
      deviceType: "mobile",
      deviceModel: "XY-123Z",
      deviceOs: "android_12",
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
    upiId: "upiId13",
    mobileNumber: 9876543211,
    category: "individual",
    mcc: "9399",
    accountType: "savings",
    accountAge: 369,
    deviceDetails: {
      deviceType: "mobile",
      deviceModel: "XY-123Z",
      deviceOs: "android_12",
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
      if(typeof formData.transactionDetails.amount === 'string')
      formData.transactionDetails.amount = Number(formData.transactionDetails.amount);

      if(typeof formData.payeeDetails.location.latitude === 'string')
      formData.payeeDetails.location.latitude = Number(formData.payeeDetails.location.latitude);

      if(typeof formData.payeeDetails.location.longitude === 'string')
      formData.payeeDetails.location.longitude = Number(formData.payeeDetails.location.longitude);

      if(typeof formData.payerDetails.location.latitude === 'string')
        formData.payerDetails.location.latitude = Number(formData.payerDetails.location.latitude);

      if(typeof formData.payerDetails.location.longitude === 'string')
        formData.payerDetails.location.longitude = Number(formData.payerDetails.location.longitude);

      if(typeof formData.transactionDetails.recurringPayment === 'string')
        formData.transactionDetails.recurringPayment = formData.transactionDetails.recurringPayment.toLowerCase() === 'true';

      const response = await fetch("https://pjmuarrjsk6gfonryic55dqghi0kzurg.lambda-url.ap-south-1.on.aws", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          'Access-Control-Allow-Origin':"*",
          'Access-Control-Allow-Headers': "*"
        },
        body: JSON.stringify(formData), // Send updated formData
        mode: "cors"
      });

      if (!response.ok) {
        throw new Error(`API call failed with status: ${response.status}`);
      }

      const data = await response.json(); // Parse response
      setResponseData(data); // Update UI with API response
    } catch (error) {
      console.error("Error in API call:", error);
      setResponseData({
        finalDecision: "REJECT",
        riskScore: 0,
        reasons: ["API call failed. Please try again later."],
      }); // Show a fail response in case of error
    }
  };
  return (
      <div style={{ display: "flex", height: "100vh", fontFamily: "Arial, sans-serif" }}>
        <div style={{ flex: 1, padding: "20px", backgroundColor: "#f8f9fa", borderRight: "1px solid #ddd" }}>
          <h2 style={{ color: "#007bff" }}>Transaction Details</h2>
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
                              <td style={{ padding: "10px", border: "1px solid #ddd" }}>{`${capitalizeFirstLetter(subKey)} (${key})`}</td>
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
                          <td style={{ padding: "10px", border: "1px solid #ddd" }}>{`${capitalizeFirstLetter(key)} (${sectionKey})`}</td>
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
                <h3 style={{ color: responseData.finalDecision.toLowerCase() === "accept" ? "green" : "red" }}>
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
function capitalizeFirstLetter(val) {
  return String(val).charAt(0).toUpperCase() + String(val).slice(1);
}
export default App;

import React, { useState } from "react";

const DiabetesPredictionForm = () => {
  const [formData, setFormData] = useState({
    gender: "", // int32
    age: "", // float64
    hypertension: "", // int64
    heart_disease: "", // int64
    smoking_history: "", // int32
    bmi: "", // float64
    HbA1c_level: "", // float64
    blood_glucose_level: "", // int64
  });

  const [result, setResult] = useState(null);

  // Mapping for categorical fields
  const genderMapping = { Male: 1, Female: 0 };
  const hypertensionMapping = { Yes: 1, No: 0 };
  const heartDiseaseMapping = { Yes: 1, No: 0 };
  const smokingHistoryMapping = {
    Never: 4,
    "No Info": 0,
    Current: 1,
    Former: 3,
    Ever: 2,
    "Not Current": 5,
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formattedData = {
      gender: genderMapping[formData.gender] || 0, // Default to 0
      age: parseFloat(formData.age), // Ensure float64
      hypertension: hypertensionMapping[formData.hypertension] || 0, // Default to 0
      heart_disease: heartDiseaseMapping[formData.heart_disease] || 0, // Default to 0
      smoking_history: smokingHistoryMapping[formData.smoking_history] || 0, // Default to 0
      bmi: parseFloat(formData.bmi), // Ensure float64
      HbA1c_level: parseFloat(formData.HbA1c_level), // Ensure float64
      blood_glucose_level: parseInt(formData.blood_glucose_level), // Ensure int64
    };

    try {
      const response = await fetch("http://localhost:8000/predict", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formattedData),
      });

      const data = await response.json();
      setResult(data);
    } catch (error) {
      console.error("Error predicting diabetes:", error);
      setResult({ error: "Failed to fetch prediction." });
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center">
      <div className="bg-white shadow-2xl rounded-lg p-6 w-full max-w-lg">
        <h1 className="text-2xl font-bold text-purple-700 text-center mb-6">
          Diabetes Prediction
        </h1>
        <form onSubmit={handleSubmit} className="space-y-2">
          {/* Gender */}
          <div>
            <label className="block text-gray-600 font-medium mb-2">
              Gender
            </label>
            <select
              name="gender"
              value={formData.gender}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            >
              <option value="">Select Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </select>
          </div>

          {/* Age */}
          <div>
            <label className="block text-gray-600 font-medium mb-2">Age</label>
            <input
              type="number"
              step="1"
              name="age"
              value={formData.age}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          {/* Hypertension */}
          <div>
            <label className="block text-gray-600 font-medium mb-2">
              Hypertension
            </label>
            <select
              name="hypertension"
              value={formData.hypertension}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            >
              <option value="">Select Option</option>
              <option value="Yes">Yes</option>
              <option value="No">No</option>
            </select>
          </div>

          {/* Heart Disease */}
          <div>
            <label className="block text-gray-600 font-medium mb-2">
              Heart Disease
            </label>
            <select
              name="heart_disease"
              value={formData.heart_disease}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            >
              <option value="">Select Option</option>
              <option value="Yes">Yes</option>
              <option value="No">No</option>
            </select>
          </div>

          {/* Smoking History */}
          <div>
            <label className="block text-gray-600 font-medium mb-2">
              Smoking History
            </label>
            <select
              name="smoking_history"
              value={formData.smoking_history}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            >
              <option value="">Select Option</option>
              <option value="Never">Never</option>
              <option value="No Info">No Info</option>
              <option value="Current">Current</option>
              <option value="Former">Former</option>
              <option value="Ever">Ever</option>
              <option value="Not Current">Not Current</option>
            </select>
          </div>

          {/* BMI */}
          <div>
            <label className="block text-gray-600 font-medium mb-2">BMI</label>
            <input
              type="number"
              step="0.1"
              name="bmi"
              value={formData.bmi}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          {/* HbA1c Level */}
          <div>
            <label className="block text-gray-600 font-medium mb-2">
              Average Blood Sugar
            </label>
            <input
              type="number"
              step="0.1"
              name="HbA1c_level"
              value={formData.HbA1c_level}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          {/* Blood Glucose Level */}
          <div>
            <label className="block text-gray-600 font-medium mb-2">
              Blood Glucose Level
            </label>
            <input
              type="number"
              name="blood_glucose_level"
              value={formData.blood_glucose_level}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-blue-500 text-white font-medium py-2 px-4 rounded-md hover:bg-blue-600 transition duration-300"
          >
            Predict
          </button>
        </form>

        {result && (
          <div className="mt-4 p-4 border rounded-md">
            {result.error ? (
              <p className="text-red-500">{result.error}</p>
            ) : (
              <p className="text-purple-500">
                <strong>Diabetes Prediction:</strong>{" "}
                <span
                  className={
                    result.prediction === 1 ? "text-red-500" : "text-green-500"
                  }
                >
                  {result.prediction === 1 ? "Positive" : "Negative"}
                </span>
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default DiabetesPredictionForm;

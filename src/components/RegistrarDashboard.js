import React, { useState } from "react";
import { ethers } from "ethers";
import { CONTRACT_ADDRESS, ABI } from "../contracts/contractConfig";
import { vaccineImages } from "../data/vaccineImages";
import axios from "axios";

const RegistrarDashboard = () => {
  const [formData, setFormData] = useState({
    identityType: "SSN",
    identityId: "",
    vaccineType: "DTaP",
    vaccineDose: "Dose 1",
    ethAddress: "",
    vaccineImage: vaccineImages["DTaP"],
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
      ...(name === "vaccineType" && { vaccineImage: vaccineImages[value] || "" }),
    }));
  };

  // Validate form data
  const validateForm = () => {
    if (!formData.identityId || !formData.ethAddress) {
      throw new Error("All fields are required. Please fill in all fields.");
    }
  };

  // Create NFT JSON data
  const createNFTJson = (data) => ({
    name: `Vaccine Certificate: ${data.vaccineType}`,
    description: `This NFT certifies that the holder has been vaccinated with ${data.vaccineType}, ${data.vaccineDose}.`,
    image: data.vaccineImage,
    attributes: [
      { trait_type: "Identity Type", value: data.identityType },
      { trait_type: "Identity ID", value: data.identityId },
      { trait_type: "Vaccine Type", value: data.vaccineType },
      { trait_type: "Dose", value: data.vaccineDose },
      { trait_type: "Ethereum Address", value: data.ethAddress },
    ],
  });

  // Upload JSON data to IPFS
  const uploadToIPFS = async (data) => {
    try {
      const apiKey = process.env.REACT_APP_FILEBASE_API_KEY.trim();
      const endpoint = process.env.REACT_APP_FILEBASE_ENDPOINT;

      // Wrap data in 'file' object
      const payload = {
        file: {
          name: "metadata.json",
          content: data,
        },
      };

      console.log("Uploading to IPFS with payload:", payload);

      const response = await axios.post(endpoint, payload, {
        headers: {
          Authorization: `Bearer ${apiKey}`,
          "Content-Type": "application/json",
        },
      });

      console.log("IPFS Upload Response:", response.data);
      return response.data.ipfsUrl;
    } catch (err) {
      console.error("Failed to upload to IPFS:", err);
      throw new Error("Failed to upload to IPFS.");
    }
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccessMessage(null);

    try {
      validateForm(); // Validate inputs

      // Generate NFT JSON
      const nftJson = createNFTJson(formData);
      console.log("Generated NFT JSON:", nftJson);

      // Upload to IPFS
      const ipfsUrl = await uploadToIPFS(nftJson);
      console.log("Uploaded to IPFS:", ipfsUrl);

      // Mint NFT using smart contract
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const contract = new ethers.Contract(CONTRACT_ADDRESS, ABI, signer);

      const tx = await contract.issue(formData.ethAddress, ipfsUrl);
      await tx.wait();

      setSuccessMessage("NFT Minted successfully!");
    } catch (err) {
      console.error("Submission failed:", err);
      setError(err.message || "Failed to mint NFT. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4 bg-gray-800 text-white">
      <h2 className="text-2xl mb-4">Registrar Dashboard</h2>
      <div>
        <h3 className="text-xl mb-2">Mint NFT</h3>
        <form className="grid gap-6" onSubmit={handleSubmit}>
          {/* Identity Type */}
          <div>
            <label htmlFor="identityType" className="block text-sm font-medium mb-1">
              Identity Type <span className="text-gray-400">(e.g., SSN)</span>
            </label>
            <select
              id="identityType"
              name="identityType"
              value={formData.identityType}
              onChange={handleChange}
              className="p-2 bg-gray-700 rounded-lg w-full"
            >
              <option value="SSN">SSN</option>
              <option value="driver license">Driver License</option>
              <option value="passport">Passport</option>
              <option value="ITIN">ITIN</option>
            </select>
          </div>

          {/* Identity ID */}
          <div>
            <label htmlFor="identityId" className="block text-sm font-medium mb-1">
              Identity ID <span className="text-gray-400">(Enter your identity ID)</span>
            </label>
            <input
              id="identityId"
              type="text"
              name="identityId"
              placeholder="Identity ID"
              value={formData.identityId}
              onChange={handleChange}
              className="p-2 bg-gray-700 rounded-lg w-full"
            />
          </div>

          {/* Vaccine Type */}
          <div>
            <label htmlFor="vaccineType" className="block text-sm font-medium mb-1">
              Vaccine Type <span className="text-gray-400">(e.g., DTaP)</span>
            </label>
            <select
              id="vaccineType"
              name="vaccineType"
              value={formData.vaccineType}
              onChange={handleChange}
              className="p-2 bg-gray-700 rounded-lg w-full"
            >
              <option value="DTaP">DTaP</option>
              <option value="MMR">MMR</option>
              <option value="IPV">IPV</option>
            </select>
          </div>

          {/* Vaccine Dose */}
          <div>
            <label htmlFor="vaccineDose" className="block text-sm font-medium mb-1">
              Vaccine Dose <span className="text-gray-400">(e.g., Dose 1)</span>
            </label>
            <select
              id="vaccineDose"
              name="vaccineDose"
              value={formData.vaccineDose}
              onChange={handleChange}
              className="p-2 bg-gray-700 rounded-lg w-full"
            >
              <option value="Dose 1">Dose 1</option>
              <option value="Dose 2">Dose 2</option>
              <option value="Dose 3">Dose 3</option>
            </select>
          </div>

          {/* Ethereum Address */}
          <div>
            <label htmlFor="ethAddress" className="block text-sm font-medium mb-1">
              Ethereum Address <span className="text-gray-400">(Enter the recipient's Ethereum address)</span>
            </label>
            <input
              id="ethAddress"
              type="text"
              name="ethAddress"
              placeholder="Ethereum Address"
              value={formData.ethAddress}
              onChange={handleChange}
              className="p-2 bg-gray-700 rounded-lg w-full"
            />
          </div>

          {/* Vaccine Image */}
          {formData.vaccineImage && (
            <div>
              <label className="block text-sm font-medium mb-1">Selected Vaccine Image</label>
              <img
                src={formData.vaccineImage}
                alt={formData.vaccineType}
                className="w-full max-w-xs rounded-lg"
              />
            </div>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            className="px-4 py-2 bg-blue-600 rounded-lg w-full"
            disabled={loading}
          >
            {loading ? "Processing..." : "Mint NFT"}
          </button>
        </form>

        {/* Success Message */}
        {successMessage && <p className="text-green-500 mt-4">{successMessage}</p>}

        {/* Error Message */}
        {error && <p className="text-red-500 mt-4">{error}</p>}
      </div>
    </div>
  );
};

export default RegistrarDashboard;

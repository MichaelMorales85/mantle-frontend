import React, { useState } from "react";
import { ethers } from "ethers";
import { CONTRACT_ADDRESS, ABI } from "../contracts/contractConfig";
import { vaccineImages } from "../data/vaccineImages";
import axios from "axios";
import CryptoJS from "crypto-js";

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

  const SALT = process.env.UNIQUE_SALT_VALUE;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
      ...(name === "vaccineType" && { vaccineImage: vaccineImages[value] || "" }),
    }));
  };

  const validateForm = () => {
    if (!formData.identityId || !formData.ethAddress) {
      throw new Error("All fields are required. Please fill in all fields.");
    }
  };

  const hashIdentityId = (identityId) => {
    const saltedId = `${identityId}:${SALT}`;
    return CryptoJS.SHA256(saltedId).toString();
  };

  const createNFTJson = (data, hashedIdentityId) => ({
    name: `Vaccine Certificate: ${data.vaccineType}`,
    description: `This NFT certifies that the holder has been vaccinated with ${data.vaccineType}, ${data.vaccineDose}.`,
    image: data.vaccineImage,
    attributes: [
      { trait_type: "Identity Type", value: data.identityType },
      { trait_type: "Hashed Identity ID", value: hashedIdentityId },
      { trait_type: "Vaccine Type", value: data.vaccineType },
      { trait_type: "Dose", value: data.vaccineDose },
    ],
  });

  const uploadToPinata = async (data) => {
    try {
      const apiKey = process.env.REACT_APP_PINATA_API_KEY;
      const apiSecret = process.env.REACT_APP_PINATA_SECRET_API_KEY;

      const url = "https://api.pinata.cloud/pinning/pinJSONToIPFS";
      const headers = {
        "Content-Type": "application/json",
        pinata_api_key: apiKey,
        pinata_secret_api_key: apiSecret,
      };

      const response = await axios.post(url, data, { headers });
      return `https://gateway.pinata.cloud/ipfs/${response.data.IpfsHash}`;
    } catch (err) {
      throw new Error("Failed to upload to Pinata.");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccessMessage(null);

    try {
      validateForm();
      const hashedIdentityId = hashIdentityId(formData.identityId);
      const nftJson = createNFTJson(formData, hashedIdentityId);
      const ipfsUrl = await uploadToPinata(nftJson);

      console.log(`ipfsUrl is at ${ipfsUrl}`);
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const contract = new ethers.Contract(CONTRACT_ADDRESS, ABI, signer);

      const tx = await contract.issue(formData.ethAddress, ipfsUrl);
      await tx.wait();

      setSuccessMessage("NFT Minted successfully!");
    } catch (err) {
      setError(err.message || "Failed to mint NFT. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-blue-600 text-white">
      <div className="bg-blue-700 text-white p-6 rounded-2xl shadow-xl w-full max-w-lg">
        <h2 className="text-2xl font-bold mb-4 text-center">Mint Vaccine NFT</h2>
        <form className="space-y-4" onSubmit={handleSubmit}>
          {/* Identity Type */}
          <div>
            <label htmlFor="identityType" className="block text-sm mb-1">
              Identity Type
            </label>
            <select
              id="identityType"
              name="identityType"
              value={formData.identityType}
              onChange={handleChange}
              className="w-full p-3 rounded-lg bg-blue-50 text-gray-800 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
            >
              <option value="SSN">SSN</option>
              <option value="driver license">Driver License</option>
              <option value="passport">Passport</option>
              <option value="ITIN">ITIN</option>
            </select>
          </div>

          {/* Identity ID */}
          <div>
            <label htmlFor="identityId" className="block text-sm mb-1">
              Identity ID
            </label>
            <input
              id="identityId"
              type="text"
              name="identityId"
              value={formData.identityId}
              onChange={handleChange}
              className="w-full p-3 rounded-lg bg-blue-50 text-gray-800 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Enter your Identity ID"
            />
          </div>

          {/* Vaccine Type */}
          <div>
            <label htmlFor="vaccineType" className="block text-sm mb-1">
              Vaccine Type
            </label>
            <select
              id="vaccineType"
              name="vaccineType"
              value={formData.vaccineType}
              onChange={handleChange}
              className="w-full p-3 rounded-lg bg-blue-50 text-gray-800 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
            >
              <option value="DTaP">DTaP</option>
              <option value="MMR">MMR</option>
              <option value="IPV">IPV</option>
            </select>
          </div>

          {/* Vaccine Dose */}
          <div>
            <label htmlFor="vaccineDose" className="block text-sm mb-1">
              Vaccine Dose
            </label>
            <select
              id="vaccineDose"
              name="vaccineDose"
              value={formData.vaccineDose}
              onChange={handleChange}
              className="w-full p-3 rounded-lg bg-blue-50 text-gray-800 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
            >
              <option value="Dose 1">Dose 1</option>
              <option value="Dose 2">Dose 2</option>
              <option value="Dose 3">Dose 3</option>
            </select>
          </div>

          {/* Ethereum Address */}
          <div>
            <label htmlFor="ethAddress" className="block text-sm mb-1">
              Ethereum Address
            </label>
            <input
              id="ethAddress"
              type="text"
              name="ethAddress"
              value={formData.ethAddress}
              onChange={handleChange}
              className="w-full p-3 rounded-lg bg-blue-50 text-gray-800 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Enter recipient's Ethereum address"
            />
          </div>

          {/* Vaccine Image */}
          {formData.vaccineImage && (
            <div className="flex flex-col items-center">
              <label className="text-sm mb-1">Selected Vaccine Image</label>
              <img
                src={formData.vaccineImage}
                alt="Vaccine"
                className="rounded-lg w-32 h-32"
              />
            </div>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full py-3 rounded-lg bg-green-500 hover:bg-green-600 text-white font-bold hover:shadow-lg transition duration-300"
            disabled={loading}
          >
            {loading ? "Processing..." : "Mint NFT"}
          </button>
        </form>

        {/* Success and Error Messages */}
        {successMessage && (
          <p className="text-green-400 text-center mt-4">{successMessage}</p>
        )}
        {error && <p className="text-red-400 text-center mt-4">{error}</p>}
      </div>
    </div>
  );
};

export default RegistrarDashboard;

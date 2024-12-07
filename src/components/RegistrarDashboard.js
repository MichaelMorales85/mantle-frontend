import React, { useState } from 'react';
import { ethers } from 'ethers';
import { CONTRACT_ADDRESS, ABI } from '../contracts/contractConfig';
import { vaccineImages } from '../data/vaccineImages';
import axios from 'axios';

const RegistrarDashboard = () => {
  const [formData, setFormData] = useState({
    identityType: 'SSN',
    identityId: '',
    vaccineType: 'DTaP',
    vaccineDose: 'Dose 1',
    ethAddress: '',
    vaccineImage: vaccineImages['DTaP'],
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => {
      const updatedData = { ...prev, [name]: value };

      // 如果修改的是疫苗类型，更新对应的图片链接
      if (name === 'vaccineType') {
        updatedData.vaccineImage = vaccineImages[value] || '';
      }

      return updatedData;
    });
  };

  const createNFTJson = (data) => {
    return {
      name: `Vaccine Certificate: ${data.vaccineType}`,
      description: `This NFT certifies that the holder has been vaccinated with ${data.vaccineType}, ${data.vaccineDose}.`,
      image: data.vaccineImage,
      attributes: [
        { trait_type: 'Identity Type', value: data.identityType },
        { trait_type: 'Identity ID', value: data.identityId },
        { trait_type: 'Vaccine Type', value: data.vaccineType },
        { trait_type: 'Dose', value: data.vaccineDose },
        { trait_type: 'Ethereum Address', value: data.ethAddress },
      ],
    };
  };
  const uploadToIPFS = async (data) => {
    try {
      const apiKey = process.env.REACT_APP_FILEBASE_API_KEY.trim(); // 确保无空格或换行符

      const response = await axios.post(
        process.env.REACT_APP_FILEBASE_ENDPOINT,
        data,
        {
          headers: {
            Authorization: `Bearer ${apiKey}`, // 如果 Filebase 不要求 Base64 直接传递
            'Content-Type': 'application/json',
          },
        }
      );

      return response.data.ipfsUrl; // 返回 IPFS URL
    } catch (err) {
      console.error('上传到 IPFS 失败:', err);
      throw new Error('上传到 IPFS 失败');
    }
  };



  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccessMessage(null);

    try {
      // 转换表单数据为 NFT JSON 格式
      const nftJson = createNFTJson(formData);

      // 上传 NFT JSON 到 IPFS
      const ipfsUrl = await uploadToIPFS(nftJson);

      // 调用智能合约的方法
      // const provider = new ethers.providers.Web3Provider(window.ethereum);
      // const signer = provider.getSigner();
      // const contract = new ethers.Contract(CONTRACT_ADDRESS, ABI, signer);

      // const tx = await contract.issue(formData.ethAddress, ipfsUrl);
      // await tx.wait();

      setSuccessMessage('NFT Mint 成功！');
    } catch (err) {
      console.error('处理失败:', err);
      setError('NFT Mint 失败，请稍后重试');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4 bg-gray-800 text-white">
      <h2 className="text-2xl mb-4">登记员仪表盘</h2>
      <div>
        <h3 className="text-xl mb-2">Mint NFT</h3>
        <form className="grid gap-6" onSubmit={handleSubmit}>
          {/* Identity Type */}
          <div>
            <label htmlFor="identityType" className="block text-sm font-medium mb-1">
              Identity Type <span className="text-gray-400">(选择身份类型，例如 SSN)</span>
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
              Identity ID <span className="text-gray-400">(输入对应的身份 ID)</span>
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
              Vaccine Type <span className="text-gray-400">(选择疫苗类型，例如 DTaP)</span>
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
              Vaccine Dose <span className="text-gray-400">(选择疫苗剂量，例如 Dose 1)</span>
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
              Ethereum Address <span className="text-gray-400">(输入接收 NFT 的以太坊地址)</span>
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

          {/* Display Vaccine Image */}
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
            {loading ? 'Processing...' : 'Mint NFT'}
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

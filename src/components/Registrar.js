import React, { useState } from 'react';
import { ethers } from 'ethers';
import { CONTRACT_ADDRESS, ABI } from '../contracts/contractConfig';

const Registrar = () => {
  const [form, setForm] = useState({
    documentType: 'SSN',
    documentId: '',
    vaccineType: 'DTaP',
    dose: 'Dose 1',
    ethAddress: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const issueNFT = async () => {
    try {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const contract = new ethers.Contract(CONTRACT_ADDRESS, ABI, signer);
      await contract.issueNFT(
        form.documentType,
        form.documentId,
        form.vaccineType,
        form.dose,
        form.ethAddress
      );
      alert('NFT 铸造成功');
    } catch (error) {
      console.error(error);
      alert('交易失败');
    }
  };

  return (
    <div className="p-4 bg-gray-800 text-white rounded-lg">
      <h2 className="text-2xl mb-4">发行 NFT</h2>
      <form className="grid gap-4">
        <select name="documentType" onChange={handleInputChange} value={form.documentType}>
          <option value="SSN">SSN</option>
          <option value="Driver License">驾驶执照</option>
          <option value="Passport">护照</option>
          <option value="ITIN">ITIN</option>
        </select>
        <input
          type="text"
          name="documentId"
          placeholder="文档 ID"
          onChange={handleInputChange}
          value={form.documentId}
        />
        <select name="vaccineType" onChange={handleInputChange} value={form.vaccineType}>
          <option value="DTaP">DTaP</option>
          <option value="MMR">MMR</option>
          <option value="IPV">IPV</option>
        </select>
        <select name="dose" onChange={handleInputChange} value={form.dose}>
          <option value="Dose 1">第 1 剂</option>
          <option value="Dose 2">第 2 剂</option>
          <option value="Dose 3">第 3 剂</option>
        </select>
        <input
          type="text"
          name="ethAddress"
          placeholder="以太坊地址"
          onChange={handleInputChange}
          value={form.ethAddress}
        />
        <button
          type="button"
          className="px-4 py-2 bg-green-600 rounded-lg"
          onClick={issueNFT}
        >
          发行 NFT
        </button>
      </form>
    </div>
  );
};

export default Registrar;

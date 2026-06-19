import React, { useState, useEffect } from 'react';
import axios from 'axios';
import InventoryForm from './components/InventoryForm';
import InventoryTable from './components/InventoryTable';
import AiReport from './components/AiReport';

const API_BASE = "http://localhost:5000/api";

function App() {
  const [products, setProducts] = useState([]);
  const [aiData, setAiData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({ name: '', quantity: '', min_stock_level: '', price: '', supplier_email: '' });

  const fetchInventory = async () => {
    try {
      const res = await axios.get(`${API_BASE}/inventory`);
      setProducts(res.data);
    } catch (err) {
      console.error("Error fetching inventory:", err);
    }
  };

  useEffect(() => {
    fetchInventory();
  }, []);

  const handleAddProduct = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${API_BASE}/inventory`, form);
      setForm({ name: '', quantity: '', min_stock_level: '', price: '', supplier_email: '' });
      fetchInventory();
    } catch (err) {
      alert("Failed to add product");
    }
  };

  const handleRunAgent = async () => {
    setLoading(true);
    setAiData(null);
    try {
      const res = await axios.get(`${API_BASE}/ai/run-agent`);
      setAiData(res.data.data);
    } catch (err) {
      alert("AI Agent failed. Check if backend is running.");
    }
    setLoading(false);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <header className="flex justify-between items-center mb-10 border-b border-slate-200 pb-5">
        <h1 className="text-3xl font-extrabold text-slate-800 flex items-center gap-3">
          <i className="fa-solid fa-boxes-stacked text-indigo-600"></i> Smart Inventory Dashboard
        </h1>
        <button
          onClick={handleRunAgent}
          disabled={loading}
          className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2.5 rounded-lg font-bold flex items-center gap-2 shadow-md hover:shadow-lg transition-all disabled:opacity-50"
        >
          <i className="fa-solid fa-wand-magic-sparkles"></i> Run AI Agent Automation
        </button>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          <InventoryForm form={form} setForm={setForm} onAdd={handleAddProduct} />
          <InventoryTable products={products} />
        </div>
        <div className="lg:col-span-1">
          <AiReport aiData={aiData} loading={loading} />
        </div>
      </div>
    </div>
  );
}

export default App;
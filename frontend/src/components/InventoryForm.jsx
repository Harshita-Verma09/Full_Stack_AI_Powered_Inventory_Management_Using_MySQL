import React from 'react';

function InventoryForm({ form, setForm, onAdd }) {
    return (
        <form onSubmit={onAdd} className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 grid grid-cols-2 gap-4">
            <h3 className="col-span-2 text-lg font-bold text-slate-700 mb-2">
                <i className="fa-solid fa-plus-circle text-indigo-600 mr-2"></i>Add New Product
            </h3>
            <input
                placeholder="Product Name"
                className="p-2 border border-slate-300 rounded focus:outline-indigo-500"
                value={form.name}
                onChange={e => setForm({ ...form, name: e.target.value })}
                required
            />
            <input
                type="number"
                placeholder="Price ($)"
                className="p-2 border border-slate-300 rounded focus:outline-indigo-500"
                value={form.price}
                onChange={e => setForm({ ...form, price: e.target.value })}
                required
            />
            <input
                type="number"
                placeholder="Quantity"
                className="p-2 border border-slate-300 rounded focus:outline-indigo-500"
                value={form.quantity}
                onChange={e => setForm({ ...form, quantity: e.target.value })}
                required
            />
            <input
                type="number"
                placeholder="Min Stock Level"
                className="p-2 border border-slate-300 rounded focus:outline-indigo-500"
                value={form.min_stock_level}
                onChange={e => setForm({ ...form, min_stock_level: e.target.value })}
                required
            />
            <input
                placeholder="Supplier Email"
                className="p-2 border border-slate-300 rounded col-span-2 focus:outline-indigo-500"
                value={form.supplier_email}
                onChange={e => setForm({ ...form, supplier_email: e.target.value })}
                required
            />
            <button className="col-span-2 bg-indigo-600 hover:bg-indigo-700 text-white py-2 rounded font-medium transition-colors">
                Add to Inventory
            </button>
        </form>
    );
}

export default InventoryForm;
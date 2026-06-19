import React from 'react';

function InventoryTable({ products }) {
    return (
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
            <table className="w-full text-left border-collapse">
                <thead className="bg-slate-100 border-b border-slate-200">
                    <tr>
                        <th className="p-4 font-semibold text-slate-700">Product Name</th>
                        <th className="p-4 font-semibold text-slate-700">Stock Qty</th>
                        <th className="p-4 font-semibold text-slate-700">Price</th>
                        <th className="p-4 font-semibold text-slate-700">Status</th>
                    </tr>
                </thead>
                <tbody>
                    {products.map(p => (
                        <tr key={p.id} className="border-b last:border-0 hover:bg-slate-50 transition-colors">
                            <td className="p-4 font-medium text-slate-800">{p.name}</td>
                            <td className="p-4 text-slate-600">{p.quantity}</td>
                            <td className="p-4 text-slate-600">${p.price}</td>
                            <td className="p-4">
                                {p.quantity <= p.min_stock_level ? (
                                    <span className="inline-flex items-center gap-1 text-amber-700 font-medium bg-amber-50 px-2 py-1 rounded text-sm border border-amber-200">
                                        <i className="fa-solid fa-triangle-exclamation"></i> Low Stock
                                    </span>
                                ) : (
                                    <span className="inline-flex items-center gap-1 text-emerald-700 font-medium bg-emerald-50 px-2 py-1 rounded text-sm border border-emerald-200">
                                        <i className="fa-solid fa-circle-check"></i> Healthy
                                    </span>
                                )}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default InventoryTable;
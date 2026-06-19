import React from 'react';

function AiReport({ aiData, loading }) {
    return (
        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 h-fit">
            <h2 className="text-xl font-bold mb-4 flex items-center gap-2 border-b pb-4 text-slate-800">
                <i className="fa-solid fa-robot text-indigo-600"></i> AI Agent Insights
            </h2>

            {loading ? (
                <div className="text-slate-500 text-center py-10 flex flex-col items-center gap-2">
                    <i className="fa-solid fa-circle-notch animate-spin text-2xl text-indigo-600"></i>
                    <span>AI Agent is analyzing database...</span>
                </div>
            ) : !aiData ? (
                <div className="text-slate-400 text-center py-10 italic">
                    Click "Run AI Agent" to scan stock & generate supplier orders.
                </div>
            ) : (
                <div className="space-y-6">
                    <div className="text-sm text-slate-700 bg-indigo-50 p-3 rounded-lg border border-indigo-100 italic">
                        <strong>Summary:</strong> "{aiData.summary}"
                    </div>

                    {aiData.orders.map((order, i) => (
                        <div key={i} className="p-4 border border-slate-200 rounded-lg bg-slate-50 space-y-3">
                            <div className="flex justify-between items-start">
                                <h4 className="font-bold text-slate-800">{order.product_name}</h4>
                                <span className="text-xs font-bold text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded border border-indigo-200">
                                    Order: +{order.suggested_quantity_to_order}
                                </span>
                            </div>
                            <p className="text-xs text-slate-500 truncate">Supplier: {order.supplier_email}</p>
                            <button
                                onClick={() => alert(`To: ${order.supplier_email}\n\n${order.email_draft}`)}
                                className="text-xs bg-white border border-slate-300 w-full py-2 rounded font-medium flex items-center justify-center gap-2 hover:bg-slate-100 text-slate-700 transition-colors"
                            >
                                <i className="fa-solid fa-envelope"></i> View Draft Email
                            </button>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

export default AiReport;
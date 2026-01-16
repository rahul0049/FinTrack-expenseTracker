import React from "react";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend } from "recharts";

const COLORS = ["#3b82f6", "#f59e0b", "#ef4444", "#10b981"];

const SummaryChart = ({ income, expense }) => {
    // Coerce to numbers to prevent string issues
    const numIncome = parseFloat(income) || 0;
    const numExpense = parseFloat(expense) || 0;

    const data = [
        { name: "Income", value: numIncome },
        { name: "Expense", value: numExpense },
    ];

    // Filter out zero values to avoid empty segments rendering weirdly
    // Also ensures we don't try to render if everything is 0
    const activeData = data.filter(item => item.value > 0);

    return (
        <div className="w-full">
            <h3 className="text-lg font-bold text-gray-800 mb-6">Summary</h3>
            <div className="h-[300px] w-full flex items-center justify-center relative">
                <ResponsiveContainer width="100%" height="100%" minWidth={0} minHeight={0}>
                    <PieChart>
                        <Pie
                            data={activeData}
                            cx="50%"
                            cy="50%"
                            innerRadius={80}
                            outerRadius={110}
                            paddingAngle={5}
                            dataKey="value"
                            cornerRadius={8}
                            stroke="none"
                        >
                            {activeData.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={entry.name === "Income" ? "#3b82f6" : "#fbbf24"} />
                            ))}
                        </Pie>
                        <Tooltip
                            contentStyle={{ backgroundColor: '#fff', borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                            itemStyle={{ color: '#374151', fontWeight: '600' }}
                        />
                        <Legend verticalAlign="bottom" height={36} iconType="circle" />
                    </PieChart>
                </ResponsiveContainer>

                {/* Center Text */}
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    {/* Can add total or text here if needed */}
                </div>
            </div>
        </div>
    );
};

export default SummaryChart;

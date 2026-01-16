import React from "react";
import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const IncomeExpenseChart = ({ data }) => {
  return (
    <div className='w-full'>
      <h3 className='text-lg font-bold mb-4'>Transaction Activity</h3>

      <ResponsiveContainer width={"100%"} height={500} className='mt-5'>
        <LineChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray='3 3' />
          <YAxis />
          <XAxis dataKey="label" />
          <Tooltip />
          <Legend />
          <Line type='monotone' dataKey={"income"} stroke='#8884d8' activeDot={{ r: 8 }} />
          <Line type='monotone' dataKey={"expense"} stroke='#82ca9d' />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default IncomeExpenseChart;

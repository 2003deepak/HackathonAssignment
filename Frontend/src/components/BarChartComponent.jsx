import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const BarChartComponent = ({ data }) => {
  return (
    <ResponsiveContainer width="100%" height={400}>
      <BarChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="postType" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="avgLikes" fill="#8884d8" />
        <Bar dataKey="avgComments" fill="#82ca9d" />
        <Bar dataKey="avgShares" fill="#ffc658" />
        <Bar dataKey="avgBookmarked" fill="#d0ed57" />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default BarChartComponent;

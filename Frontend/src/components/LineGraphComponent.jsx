import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const LineGraphComponent = ({ data }) => {
  return (
    <ResponsiveContainer width="100%" height={400}>
      <LineChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="postType" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="avgLikes" stroke="#8884d8" activeDot={{ r: 8 }} />
        <Line type="monotone" dataKey="avgComments" stroke="#82ca9d" />
        <Line type="monotone" dataKey="avgShares" stroke="#ffc658" />
        <Line type="monotone" dataKey="avgBookmarked" stroke="#d0ed57" />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default LineGraphComponent;

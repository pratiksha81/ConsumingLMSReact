import React from 'react';

interface StatsCardProps {
  icon: React.ReactNode; // Accepts an image element or string
  count: number;
  label: string;
}

const StatsCard: React.FC<StatsCardProps> = ({ icon, count, label }) => {
  return (
    <div className="bg-white rounded-md p-5 flex items-center mb-5 shadow-md">
      <div className="mr-4">{icon}</div> {/* Render JSX icon */}
      <div>
        <h3 className="text-2xl font-bold">{count}</h3>
        <p className="text-sm text-gray-500">{label}</p>
      </div>
    </div>
  );
};

export default StatsCard;

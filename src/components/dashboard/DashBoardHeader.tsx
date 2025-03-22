import React from 'react';
import Admin from '../../assets/DashboardHead.svg'

interface DashboardHeaderProps {
  username: string;
}

const DashboardHeader: React.FC<DashboardHeaderProps> = ({ username }) => {
  return (
    <div className="fixed top-0 left-[222px] right-0 h-[65px] bg-gray shadow-md flex items-center px-5 z-10">
      <img src={Admin} alt="User Icon" className="w-5 h-5 mr-2" />
      <h2 className="text-lg font-semibold">{username}</h2>
    </div>
  );
};

export default DashboardHeader;
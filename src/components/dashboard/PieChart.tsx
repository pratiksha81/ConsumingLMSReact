import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';
import RBBOOK from '../../assets/SideBook.svg'
import BorrowBOOK from '../../assets/Borrowed.svg'
import ReturnBOOK from '../../assets/Returned.svg'
import Line from '../../assets/Line.svg'
interface PieChartProps {
  totalBorrowedBooks: number;
  totalReturnedBooks: number;
}

const PieChart: React.FC<PieChartProps> = ({ totalBorrowedBooks, totalReturnedBooks }) => {
  const chartRef = useRef<HTMLCanvasElement | null>(null);
  const chartInstanceRef = useRef<Chart | null>(null);

  useEffect(() => {
    if (chartRef.current) {
      // Destroy previous chart instance if it exists
      if (chartInstanceRef.current) {
        chartInstanceRef.current.destroy();
      }

      const ctx = chartRef.current.getContext('2d');
      if (ctx) {
        chartInstanceRef.current = new Chart(ctx, {
          type: 'pie',
          data: {
            labels: ['Total Borrowed Books', 'Total Returned Books'],
            datasets: [
              {
                data: [totalBorrowedBooks, totalReturnedBooks],
                backgroundColor: ['#255D81', '#317FB1'],
              },
            ],
          },
          options: {
            responsive: true,
            maintainAspectRatio: true,
            plugins: {
              legend: {
                display: false,
              },
            },
            layout: {
              padding: {
                top: 10,
                bottom: 10,
                left: 10,
                right: 10,
              },
            },
          },
        });
      }
    }

    // Cleanup on unmount
    return () => {
      if (chartInstanceRef.current) {
        chartInstanceRef.current.destroy();
      }
    };
  }, [totalBorrowedBooks, totalReturnedBooks]);

  return (
    <div className="flex flex-col items-center">
      <canvas ref={chartRef} className="max-w-[300px] max-h-[300px] w-full h-auto" />
      <div className="w-[400px] mt-4 bg-white rounded-md p-4 flex items-center justify-center shadow-md">
        <div className="flex items-center">
          <img src={RBBOOK} alt="Book Image" className="w-16 h-16 mr-8" />
          <img src={Line} alt="line drawn side to Book" className="w-0.5 h-20 mr-8" />
          <div>
            <div className="flex items-center">
              <img src={BorrowBOOK} alt="Borrow" className="w-4 h-4 mr-1" />
              <span>Total Books Borrowed</span>
            </div>
            <div className="flex items-center">
              <img src={ReturnBOOK} alt="Return" className="w-4 h-4 mr-1" />
              <span>Total Books Returned</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PieChart;
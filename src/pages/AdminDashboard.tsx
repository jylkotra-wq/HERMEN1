
import React, { useEffect, useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Navigate } from 'react-router-dom';

export const AdminDashboard = () => {
  const { user } = useAuth();
  const [reviews, setReviews] = useState<any[]>([]);

  // NOTE: Hardcoded admin email for demonstration
  const isAdmin = user?.email === 'jyl.kotra@gmail.com'; 

  if (!user || !isAdmin) {
    return <Navigate to="/" />;
  }

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-3xl font-bold mb-4">Admin Dashboard: Amazon Product Reviews</h1>
      <div className="bg-yellow-100 p-4 rounded mb-8">
        <p><strong>Warning:</strong> Automated scraping of Amazon is against their Terms of Service. This dashboard is a skeleton. To fetch real reviews, you must use an official Amazon Product Advertising API with valid seller credentials. This dashboard currently has no data pipeline.</p>
      </div>
      <div>
        <p>This is where you would view automatically collected reviews.</p>
      </div>
    </div>
  );
};

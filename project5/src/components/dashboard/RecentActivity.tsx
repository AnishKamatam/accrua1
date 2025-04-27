import React, { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabase';
import { ActivityLog } from '../../types/database';

const RecentActivity: React.FC = () => {
  const [activities, setActivities] = useState<ActivityLog[]>([]);

  useEffect(() => {
    const fetchActivities = async () => {
      const { data } = await supabase
        .from('activity_log')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(10);

      if (data) {
        setActivities(data);
      }
    };

    fetchActivities();
  }, []);

  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <h2 className="text-xl font-semibold mb-4">Recent Activity</h2>
      
      <div className="space-y-4">
        {activities.map((activity) => (
          <div
            key={activity.id}
            className="flex items-center space-x-4 p-3 hover:bg-slate-50 rounded-lg transition-colors"
          >
            <div className="w-2 h-2 rounded-full bg-teal-500"></div>
            <div>
              <p className="text-slate-600">{activity.description}</p>
              <p className="text-sm text-slate-400">
                {new Date(activity.created_at).toLocaleString()}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecentActivity;
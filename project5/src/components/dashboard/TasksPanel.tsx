import React, { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabase';
import { Task } from '../../types/database';
import { CheckCircle2, Circle } from 'lucide-react';

const TasksPanel: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);

  useEffect(() => {
    const fetchTasks = async () => {
      const { data } = await supabase
        .from('tasks')
        .select('*')
        .eq('status', 'pending')
        .order('priority', { ascending: false });

      if (data) {
        setTasks(data);
      }
    };

    fetchTasks();
  }, []);

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'text-red-500';
      case 'medium':
        return 'text-yellow-500';
      default:
        return 'text-blue-500';
    }
  };

  const toggleTaskStatus = async (taskId: string, currentStatus: string) => {
    const newStatus = currentStatus === 'pending' ? 'completed' : 'pending';
    
    const { error } = await supabase
      .from('tasks')
      .update({ status: newStatus })
      .eq('id', taskId);

    if (!error) {
      setTasks(tasks.filter(task => task.id !== taskId));
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <h2 className="text-xl font-semibold mb-4">Tasks & Reminders</h2>
      
      <div className="space-y-4">
        {tasks.map((task) => (
          <div
            key={task.id}
            className="flex items-start space-x-3 p-3 hover:bg-slate-50 rounded-lg transition-colors"
          >
            <button
              onClick={() => toggleTaskStatus(task.id, task.status)}
              className="mt-1"
            >
              {task.status === 'completed' ? (
                <CheckCircle2 className="h-5 w-5 text-teal-500" />
              ) : (
                <Circle className="h-5 w-5 text-slate-300" />
              )}
            </button>
            
            <div className="flex-1">
              <p className="font-medium">{task.title}</p>
              <p className="text-sm text-slate-600">{task.description}</p>
              {task.due_date && (
                <p className="text-sm text-slate-500 mt-1">
                  Due: {new Date(task.due_date).toLocaleDateString()}
                </p>
              )}
            </div>
            
            <span className={`text-xs font-medium uppercase ${getPriorityColor(task.priority)}`}>
              {task.priority}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TasksPanel;
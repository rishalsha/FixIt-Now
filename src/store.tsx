import React, { createContext, useContext, useState } from 'react';
import { Job, Role, Quote, User } from './types';

interface AppState {
  role: Role;
  setRole: (role: Role) => void;
  jobs: Job[];
  addJob: (job: Omit<Job, 'id' | 'status' | 'quotes' | 'createdAt'>) => void;
  addQuote: (jobId: string, quote: Omit<Quote, 'id'>) => void;
  acceptQuote: (jobId: string, quoteId: string) => void;
  completeJob: (jobId: string) => void;
  users: User[];
  addUser: (user: Omit<User, 'id' | 'status'>) => void;
  removeUser: (userId: string) => void;
}

const mockUsers: User[] = [
  { id: 'c1', name: 'Rahul Sharma', role: 'customer', status: 'active' },
  { id: 'c2', name: 'Priya Patel', role: 'customer', status: 'active' },
  { id: 't1', name: 'Amit Singh', role: 'technician', status: 'active', rating: 4.8 },
  { id: 't2', name: 'Vikram Patel', role: 'technician', status: 'active', rating: 4.5 },
];

const mockJobs: Job[] = [
  {
    id: 'j1',
    customerId: 'c1',
    customerName: 'Rahul Sharma',
    serviceType: 'Plumbing',
    description: 'Leaking pipe under the kitchen sink. Needs urgent fix.',
    location: 'Andheri West, Mumbai',
    status: 'open',
    quotes: [],
    createdAt: new Date().toISOString(),
  },
  {
    id: 'j2',
    customerId: 'c1',
    customerName: 'Rahul Sharma',
    serviceType: 'Electrical',
    description: 'Main switchboard sparking when turning on the AC.',
    location: 'Andheri West, Mumbai',
    status: 'quoted',
    quotes: [
      {
        id: 'q1',
        techId: 't1',
        techName: 'Amit Singh',
        techRating: 4.8,
        price: 850,
        estimatedTime: '30 mins',
      },
      {
        id: 'q2',
        techId: 't2',
        techName: 'Vikram Patel',
        techRating: 4.5,
        price: 700,
        estimatedTime: '1 hour',
      }
    ],
    createdAt: new Date(Date.now() - 3600000).toISOString(),
  },
  {
    id: 'j3',
    customerId: 'c2',
    customerName: 'Priya Patel',
    serviceType: 'AC Repair',
    description: 'AC not cooling properly. Might need gas refill.',
    location: 'Bandra, Mumbai',
    status: 'accepted',
    quotes: [
      {
        id: 'q3',
        techId: 't1',
        techName: 'Amit Singh',
        techRating: 4.8,
        price: 1200,
        estimatedTime: '45 mins',
      }
    ],
    acceptedQuoteId: 'q3',
    createdAt: new Date(Date.now() - 7200000).toISOString(),
  }
];

const AppContext = createContext<AppState | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [role, setRole] = useState<Role>(null);
  const [jobs, setJobs] = useState<Job[]>(mockJobs);
  const [users, setUsers] = useState<User[]>(mockUsers);

  const addJob = (jobData: Omit<Job, 'id' | 'status' | 'quotes' | 'createdAt'>) => {
    const newJob: Job = {
      ...jobData,
      id: `j${Date.now()}`,
      status: 'open',
      quotes: [],
      createdAt: new Date().toISOString(),
    };
    setJobs([newJob, ...jobs]);
  };

  const addQuote = (jobId: string, quoteData: Omit<Quote, 'id'>) => {
    setJobs(jobs.map(job => {
      if (job.id === jobId) {
        return {
          ...job,
          status: 'quoted',
          quotes: [...job.quotes, { ...quoteData, id: `q${Date.now()}` }]
        };
      }
      return job;
    }));
  };

  const acceptQuote = (jobId: string, quoteId: string) => {
    setJobs(jobs.map(job => {
      if (job.id === jobId) {
        return { ...job, status: 'accepted', acceptedQuoteId: quoteId };
      }
      return job;
    }));
  };

  const completeJob = (jobId: string) => {
    setJobs(jobs.map(job => {
      if (job.id === jobId) {
        // Auto-delete media to save storage after fix
        return { ...job, status: 'completed', mediaUrl: undefined, mediaType: undefined };
      }
      return job;
    }));
  };

  const addUser = (userData: Omit<User, 'id' | 'status'>) => {
    const newUser: User = {
      ...userData,
      id: `${userData.role.charAt(0)}${Date.now()}`,
      status: 'active',
      rating: userData.role === 'technician' ? 5.0 : undefined,
    };
    setUsers([...users, newUser]);
  };

  const removeUser = (userId: string) => {
    setUsers(users.filter(u => u.id !== userId));
  };

  return (
    <AppContext.Provider value={{ role, setRole, jobs, addJob, addQuote, acceptQuote, completeJob, users, addUser, removeUser }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppStore = () => {
  const context = useContext(AppContext);
  if (!context) throw new Error('useAppStore must be used within AppProvider');
  return context;
};

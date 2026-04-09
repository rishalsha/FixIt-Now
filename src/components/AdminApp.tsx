import React, { useState } from 'react';
import { useAppStore } from '../store';
import { motion } from 'motion/react';
import { LayoutDashboard, Users, Briefcase, IndianRupee, LogOut, Search, Filter, Plus, Trash2, CheckCircle, Clock } from 'lucide-react';

export default function AdminApp() {
  const { jobs, users, addUser, removeUser, setRole } = useAppStore();
  const [adminView, setAdminView] = useState<'dashboard' | 'users'>('dashboard');

  // Add User Form State
  const [showAddUser, setShowAddUser] = useState(false);
  const [newUserName, setNewUserName] = useState('');
  const [newUserRole, setNewUserRole] = useState<'customer' | 'technician'>('customer');

  const totalJobs = jobs.length;
  const completedJobs = jobs.filter(j => j.status === 'completed').length;
  const activeJobs = jobs.filter(j => j.status === 'accepted').length;
  
  // Mock revenue calculation (10% commission on completed jobs)
  const estimatedRevenue = completedJobs * 150; 

  const handleAddUser = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newUserName) return;
    addUser({ name: newUserName, role: newUserRole });
    setNewUserName('');
    setShowAddUser(false);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r border-gray-200 hidden md:flex flex-col">
        <div className="p-6 border-b border-gray-100">
          <h1 className="text-2xl font-bold text-purple-600 tracking-tight">FixIt Admin</h1>
        </div>
        <nav className="flex-1 p-4 space-y-2">
          <button 
            onClick={() => setAdminView('dashboard')}
            className={`flex items-center w-full p-3 rounded-xl font-medium transition ${adminView === 'dashboard' ? 'bg-purple-50 text-purple-700' : 'text-gray-600 hover:bg-gray-50'}`}
          >
            <LayoutDashboard className="w-5 h-5 mr-3" />
            Dashboard
          </button>
          <button 
            onClick={() => setAdminView('users')}
            className={`flex items-center w-full p-3 rounded-xl font-medium transition ${adminView === 'users' ? 'bg-purple-50 text-purple-700' : 'text-gray-600 hover:bg-gray-50'}`}
          >
            <Users className="w-5 h-5 mr-3" />
            Users & Techs
          </button>
        </nav>
        <div className="p-4 border-t border-gray-100">
          <button 
            onClick={() => setRole(null)}
            className="flex items-center w-full p-3 text-gray-600 hover:bg-red-50 hover:text-red-600 rounded-xl font-medium transition"
          >
            <LogOut className="w-5 h-5 mr-3" />
            Exit Prototype
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto">
        {/* Mobile Header */}
        <header className="bg-white border-b border-gray-200 p-4 flex justify-between items-center md:hidden">
          <h1 className="text-xl font-bold text-purple-600">FixIt Admin</h1>
          <div className="flex gap-2">
            <button onClick={() => setAdminView('dashboard')} className={`p-2 rounded-lg ${adminView === 'dashboard' ? 'bg-purple-100 text-purple-600' : 'text-gray-500'}`}><LayoutDashboard className="w-5 h-5" /></button>
            <button onClick={() => setAdminView('users')} className={`p-2 rounded-lg ${adminView === 'users' ? 'bg-purple-100 text-purple-600' : 'text-gray-500'}`}><Users className="w-5 h-5" /></button>
            <button onClick={() => setRole(null)} className="p-2 text-gray-500 hover:bg-gray-100 rounded-lg"><LogOut className="w-5 h-5" /></button>
          </div>
        </header>

        <div className="p-6 md:p-8 max-w-6xl mx-auto space-y-8">
          
          {adminView === 'dashboard' && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-8">
              <div className="flex justify-between items-end">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">Platform Overview</h2>
                  <p className="text-gray-500 mt-1">Monitor marketplace activity</p>
                </div>
              </div>

              {/* Stats Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                  <div className="flex justify-between items-start mb-4">
                    <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center">
                      <Briefcase className="w-6 h-6 text-blue-600" />
                    </div>
                  </div>
                  <p className="text-gray-500 text-sm font-medium">Total Jobs</p>
                  <h3 className="text-3xl font-bold text-gray-900 mt-1">{totalJobs}</h3>
                </div>

                <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                  <div className="flex justify-between items-start mb-4">
                    <div className="w-12 h-12 bg-green-50 rounded-xl flex items-center justify-center">
                      <CheckCircle className="w-6 h-6 text-green-600" />
                    </div>
                  </div>
                  <p className="text-gray-500 text-sm font-medium">Completed</p>
                  <h3 className="text-3xl font-bold text-gray-900 mt-1">{completedJobs}</h3>
                </div>

                <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                  <div className="flex justify-between items-start mb-4">
                    <div className="w-12 h-12 bg-orange-50 rounded-xl flex items-center justify-center">
                      <Clock className="w-6 h-6 text-orange-600" />
                    </div>
                  </div>
                  <p className="text-gray-500 text-sm font-medium">Active Now</p>
                  <h3 className="text-3xl font-bold text-gray-900 mt-1">{activeJobs}</h3>
                </div>

                <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                  <div className="flex justify-between items-start mb-4">
                    <div className="w-12 h-12 bg-purple-50 rounded-xl flex items-center justify-center">
                      <IndianRupee className="w-6 h-6 text-purple-600" />
                    </div>
                  </div>
                  <p className="text-gray-500 text-sm font-medium">Est. Revenue</p>
                  <h3 className="text-3xl font-bold text-gray-900 mt-1">₹{estimatedRevenue}</h3>
                </div>
              </div>

              {/* Recent Jobs Table */}
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="p-6 border-b border-gray-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <h3 className="text-lg font-bold text-gray-900">Recent Activity</h3>
                </div>
                
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="bg-gray-50 text-gray-500 text-xs uppercase tracking-wider">
                        <th className="p-4 font-medium">Job ID</th>
                        <th className="p-4 font-medium">Service</th>
                        <th className="p-4 font-medium">Customer</th>
                        <th className="p-4 font-medium">Status</th>
                        <th className="p-4 font-medium">Quotes</th>
                        <th className="p-4 font-medium">Date</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                      {jobs.map(job => (
                        <tr key={job.id} className="hover:bg-gray-50 transition">
                          <td className="p-4 text-sm font-mono text-gray-500">{job.id}</td>
                          <td className="p-4 text-sm font-medium text-gray-900">{job.serviceType}</td>
                          <td className="p-4 text-sm text-gray-600">{job.customerName}</td>
                          <td className="p-4">
                            <span className={`text-xs px-2 py-1 rounded-full font-medium ${
                              job.status === 'open' ? 'bg-gray-100 text-gray-600' :
                              job.status === 'quoted' ? 'bg-orange-100 text-orange-600' :
                              job.status === 'accepted' ? 'bg-blue-100 text-blue-600' :
                              'bg-green-100 text-green-600'
                            }`}>
                              {job.status.toUpperCase()}
                            </span>
                          </td>
                          <td className="p-4 text-sm text-gray-600">{job.quotes.length}</td>
                          <td className="p-4 text-sm text-gray-500">
                            {new Date(job.createdAt).toLocaleDateString()}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </motion.div>
          )}

          {adminView === 'users' && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-8">
              <div className="flex justify-between items-end">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">User Management</h2>
                  <p className="text-gray-500 mt-1">Manage customers and technicians</p>
                </div>
                <button 
                  onClick={() => setShowAddUser(!showAddUser)}
                  className="bg-purple-600 text-white px-4 py-2 rounded-xl font-medium hover:bg-purple-700 transition flex items-center"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Add User
                </button>
              </div>

              {showAddUser && (
                <div className="bg-purple-50 p-6 rounded-2xl border border-purple-100">
                  <h3 className="text-lg font-bold text-purple-900 mb-4">Add New User</h3>
                  <form onSubmit={handleAddUser} className="flex flex-col sm:flex-row gap-4">
                    <input 
                      type="text" 
                      placeholder="Full Name" 
                      required
                      value={newUserName}
                      onChange={e => setNewUserName(e.target.value)}
                      className="flex-1 px-4 py-2 rounded-xl border border-purple-200 outline-none focus:ring-2 focus:ring-purple-500"
                    />
                    <select 
                      value={newUserRole}
                      onChange={e => setNewUserRole(e.target.value as any)}
                      className="px-4 py-2 rounded-xl border border-purple-200 outline-none focus:ring-2 focus:ring-purple-500 bg-white"
                    >
                      <option value="customer">Customer</option>
                      <option value="technician">Technician</option>
                    </select>
                    <button type="submit" className="bg-purple-600 text-white px-6 py-2 rounded-xl font-medium hover:bg-purple-700">
                      Save
                    </button>
                  </form>
                </div>
              )}

              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="bg-gray-50 text-gray-500 text-xs uppercase tracking-wider">
                        <th className="p-4 font-medium">User ID</th>
                        <th className="p-4 font-medium">Name</th>
                        <th className="p-4 font-medium">Role</th>
                        <th className="p-4 font-medium">Status</th>
                        <th className="p-4 font-medium text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                      {users.map(user => (
                        <tr key={user.id} className="hover:bg-gray-50 transition">
                          <td className="p-4 text-sm font-mono text-gray-500">{user.id}</td>
                          <td className="p-4 text-sm font-medium text-gray-900">
                            {user.name}
                            {user.rating && <span className="ml-2 text-xs text-yellow-600 bg-yellow-50 px-2 py-0.5 rounded-full">★ {user.rating}</span>}
                          </td>
                          <td className="p-4">
                            <span className={`text-xs px-2 py-1 rounded-full font-medium ${
                              user.role === 'customer' ? 'bg-blue-100 text-blue-700' : 'bg-green-100 text-green-700'
                            }`}>
                              {user.role.toUpperCase()}
                            </span>
                          </td>
                          <td className="p-4">
                            <span className="text-xs px-2 py-1 bg-gray-100 text-gray-700 rounded-full font-medium">
                              {user.status.toUpperCase()}
                            </span>
                          </td>
                          <td className="p-4 text-right">
                            <button 
                              onClick={() => removeUser(user.id)}
                              className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition"
                              title="Remove User"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </td>
                        </tr>
                      ))}
                      {users.length === 0 && (
                        <tr>
                          <td colSpan={5} className="p-8 text-center text-gray-500">No users found.</td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </motion.div>
          )}

        </div>
      </main>
    </div>
  );
}

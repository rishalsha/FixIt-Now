/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { AppProvider, useAppStore } from './store';
import CustomerApp from './components/CustomerApp';
import TechnicianApp from './components/TechnicianApp';
import AdminApp from './components/AdminApp';
import { Wrench, User, LayoutDashboard } from 'lucide-react';
import { motion } from 'motion/react';

function RoleSelector() {
  const { setRole } = useAppStore();

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-md w-full bg-white rounded-3xl shadow-xl p-8 text-center"
      >
        <div className="w-16 h-16 bg-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg shadow-blue-200">
          <Wrench className="w-8 h-8 text-white" />
        </div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2 tracking-tight">FixIt Now</h1>
        <p className="text-gray-500 mb-8">Select your role to enter the prototype</p>

        <div className="space-y-4">
          <button 
            onClick={() => setRole('customer')}
            className="w-full flex items-center p-4 rounded-2xl border-2 border-gray-100 hover:border-blue-500 hover:bg-blue-50 transition-all group"
          >
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center group-hover:bg-blue-600 transition-colors">
              <User className="w-6 h-6 text-blue-600 group-hover:text-white" />
            </div>
            <div className="ml-4 text-left">
              <h3 className="font-semibold text-gray-900">Customer</h3>
              <p className="text-sm text-gray-500">Book services & track</p>
            </div>
          </button>

          <button 
            onClick={() => setRole('technician')}
            className="w-full flex items-center p-4 rounded-2xl border-2 border-gray-100 hover:border-green-500 hover:bg-green-50 transition-all group"
          >
            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center group-hover:bg-green-600 transition-colors">
              <Wrench className="w-6 h-6 text-green-600 group-hover:text-white" />
            </div>
            <div className="ml-4 text-left">
              <h3 className="font-semibold text-gray-900">Technician</h3>
              <p className="text-sm text-gray-500">Find jobs & earn</p>
            </div>
          </button>

          <button 
            onClick={() => setRole('admin')}
            className="w-full flex items-center p-4 rounded-2xl border-2 border-gray-100 hover:border-purple-500 hover:bg-purple-50 transition-all group"
          >
            <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center group-hover:bg-purple-600 transition-colors">
              <LayoutDashboard className="w-6 h-6 text-purple-600 group-hover:text-white" />
            </div>
            <div className="ml-4 text-left">
              <h3 className="font-semibold text-gray-900">Admin</h3>
              <p className="text-sm text-gray-500">Manage platform</p>
            </div>
          </button>
        </div>
      </motion.div>
    </div>
  );
}

function MainLayout() {
  const { role } = useAppStore();

  if (!role) return <RoleSelector />;
  if (role === 'customer') return <CustomerApp />;
  if (role === 'technician') return <TechnicianApp />;
  if (role === 'admin') return <AdminApp />;
  return null;
}

export default function App() {
  return (
    <AppProvider>
      <MainLayout />
    </AppProvider>
  );
}

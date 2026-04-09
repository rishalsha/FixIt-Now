import React, { useState } from 'react';
import { useAppStore } from '../store';
import { motion, AnimatePresence } from 'motion/react';
import { MapPin, IndianRupee, Clock, CheckCircle, ArrowLeft, Send, LogOut, Briefcase } from 'lucide-react';

export default function TechnicianApp() {
  const { jobs, addQuote, completeJob, setRole } = useAppStore();
  const [view, setView] = useState<'home' | 'job-details'>('home');
  const [selectedJobId, setSelectedJobId] = useState<string | null>(null);

  // Quote form state
  const [price, setPrice] = useState('');
  const [estimatedTime, setEstimatedTime] = useState('');

  const techId = 't1';
  const techName = 'Amit Singh';

  // Open jobs that haven't been accepted yet
  const openJobs = jobs.filter(j => j.status === 'open' || (j.status === 'quoted' && !j.quotes.find(q => q.techId === techId)));
  
  // Jobs where I have sent a quote but not accepted yet
  const myQuotedJobs = jobs.filter(j => j.status === 'quoted' && j.quotes.find(q => q.techId === techId));

  // Jobs accepted by customer for me
  const myActiveJobs = jobs.filter(j => j.status === 'accepted' && j.quotes.find(q => q.id === j.acceptedQuoteId)?.techId === techId);

  const selectedJob = jobs.find(j => j.id === selectedJobId);

  const handleSendQuote = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedJobId || !price || !estimatedTime) return;

    addQuote(selectedJobId, {
      techId,
      techName,
      techRating: 4.8,
      price: Number(price),
      estimatedTime
    });

    setView('home');
    setPrice('');
    setEstimatedTime('');
  };

  return (
    <div className="min-h-screen bg-gray-50 flex justify-center">
      <div className="w-full max-w-md bg-white min-h-screen shadow-2xl relative overflow-hidden flex flex-col">
        
        {/* Header */}
        <header className="bg-green-600 text-white p-6 rounded-b-3xl shadow-md z-10 relative">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h1 className="text-2xl font-bold">Hi, {techName.split(' ')[0]}</h1>
              <p className="text-green-100 text-sm">Ready to earn?</p>
            </div>
            <button onClick={() => setRole(null)} className="p-2 bg-green-700 rounded-full hover:bg-green-800 transition">
              <LogOut className="w-5 h-5" />
            </button>
          </div>
          
          <div className="bg-green-700/50 rounded-2xl p-4 flex items-center justify-between">
            <div>
              <p className="text-green-200 text-sm mb-1">Today's Earnings</p>
              <div className="text-2xl font-bold flex items-center">
                <IndianRupee className="w-5 h-5" /> 0
              </div>
            </div>
            <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center">
              <Briefcase className="w-6 h-6 text-white" />
            </div>
          </div>
        </header>

        {/* Main Content Area */}
        <main className="flex-1 overflow-y-auto p-6 pb-24">
          <AnimatePresence mode="wait">
            
            {/* HOME VIEW */}
            {view === 'home' && (
              <motion.div 
                key="home"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-8"
              >
                {/* Active Jobs */}
                {myActiveJobs.length > 0 && (
                  <section>
                    <h2 className="text-lg font-bold text-gray-900 mb-4 flex items-center">
                      <span className="w-2 h-2 rounded-full bg-green-500 mr-2 animate-pulse"></span>
                      Active Jobs
                    </h2>
                    <div className="space-y-4">
                      {myActiveJobs.map(job => (
                        <div key={job.id} className="bg-green-50 border border-green-200 p-4 rounded-2xl shadow-sm">
                          <div className="flex justify-between items-start mb-2">
                            <h3 className="font-bold text-gray-900">{job.serviceType}</h3>
                            <span className="text-xs px-2 py-1 bg-green-200 text-green-800 rounded-full font-medium">ACCEPTED</span>
                          </div>
                          <p className="text-sm text-gray-600 mb-3">{job.location}</p>
                          <button 
                            onClick={() => completeJob(job.id)}
                            className="w-full py-2 bg-green-600 text-white rounded-xl font-medium hover:bg-green-700 transition"
                          >
                            Mark as Completed
                          </button>
                        </div>
                      ))}
                    </div>
                  </section>
                )}

                {/* Quoted Jobs */}
                {myQuotedJobs.length > 0 && (
                  <section>
                    <h2 className="text-lg font-bold text-gray-900 mb-4">Pending Quotes</h2>
                    <div className="space-y-4">
                      {myQuotedJobs.map(job => (
                        <div key={job.id} className="bg-white border border-gray-100 p-4 rounded-2xl shadow-sm">
                          <div className="flex justify-between items-start mb-2">
                            <h3 className="font-bold text-gray-900">{job.serviceType}</h3>
                            <span className="text-xs px-2 py-1 bg-orange-100 text-orange-600 rounded-full font-medium">WAITING</span>
                          </div>
                          <p className="text-sm text-gray-500 mb-2">{job.location}</p>
                          <div className="text-sm font-medium text-gray-900">
                            Quote sent: ₹{job.quotes.find(q => q.techId === techId)?.price}
                          </div>
                        </div>
                      ))}
                    </div>
                  </section>
                )}

                {/* Open Jobs */}
                <section>
                  <h2 className="text-lg font-bold text-gray-900 mb-4">New Requests Nearby</h2>
                  {openJobs.length === 0 ? (
                    <div className="text-center py-8 text-gray-500">No new requests right now.</div>
                  ) : (
                    <div className="space-y-4">
                      {openJobs.map(job => (
                        <div 
                          key={job.id} 
                          onClick={() => {
                            setSelectedJobId(job.id);
                            setView('job-details');
                          }}
                          className="bg-white border border-gray-100 p-4 rounded-2xl shadow-sm hover:shadow-md transition cursor-pointer"
                        >
                          <div className="flex justify-between items-start mb-2">
                            <h3 className="font-bold text-gray-900">{job.serviceType}</h3>
                            <span className="text-xs text-gray-500 flex items-center">
                              <Clock className="w-3 h-3 mr-1" />
                              Just now
                            </span>
                          </div>
                          <p className="text-sm text-gray-600 line-clamp-2 mb-3">{job.description}</p>
                          <div className="flex items-center text-sm text-gray-500">
                            <MapPin className="w-4 h-4 mr-1 text-red-400" />
                            {job.location}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </section>
              </motion.div>
            )}

            {/* JOB DETAILS / SEND QUOTE VIEW */}
            {view === 'job-details' && selectedJob && (
              <motion.div 
                key="job-details"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
              >
                <button 
                  onClick={() => setView('home')}
                  className="flex items-center text-gray-500 mb-6 hover:text-gray-900"
                >
                  <ArrowLeft className="w-5 h-5 mr-2" />
                  Back
                </button>

                <div className="bg-gray-50 rounded-2xl p-5 mb-6 border border-gray-100">
                  <h2 className="text-xl font-bold text-gray-900 mb-2">{selectedJob.serviceType}</h2>
                  <div className="flex items-center text-sm text-gray-500 mb-4">
                    <MapPin className="w-4 h-4 mr-1" />
                    {selectedJob.location}
                  </div>
                  
                  {selectedJob.mediaUrl && (
                    <div className="mb-4">
                      <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Attached Media</h4>
                      {selectedJob.mediaType === 'image' ? (
                        <img src={selectedJob.mediaUrl} alt="Issue" className="w-full h-48 object-cover rounded-xl border border-gray-200" />
                      ) : (
                        <video src={selectedJob.mediaUrl} className="w-full h-48 object-cover rounded-xl border border-gray-200" controls />
                      )}
                    </div>
                  )}

                  <div className="bg-white p-4 rounded-xl border border-gray-100">
                    <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Customer Issue</h4>
                    <p className="text-gray-700 text-sm leading-relaxed">{selectedJob.description}</p>
                  </div>
                </div>

                <h3 className="text-lg font-bold text-gray-900 mb-4">Send your quote</h3>
                <form onSubmit={handleSendQuote} className="space-y-5">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Your Price (₹)</label>
                    <div className="relative">
                      <IndianRupee className="w-5 h-5 text-gray-400 absolute left-4 top-3.5" />
                      <input 
                        required
                        type="number"
                        value={price}
                        onChange={e => setPrice(e.target.value)}
                        className="w-full border border-gray-200 rounded-xl py-3 pl-12 pr-4 outline-none focus:ring-2 focus:ring-green-500 transition"
                        placeholder="e.g. 500"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Estimated Time to Reach</label>
                    <div className="relative">
                      <Clock className="w-5 h-5 text-gray-400 absolute left-4 top-3.5" />
                      <input 
                        required
                        type="text"
                        value={estimatedTime}
                        onChange={e => setEstimatedTime(e.target.value)}
                        className="w-full border border-gray-200 rounded-xl py-3 pl-12 pr-4 outline-none focus:ring-2 focus:ring-green-500 transition"
                        placeholder="e.g. 30 mins"
                      />
                    </div>
                  </div>

                  <button 
                    type="submit"
                    className="w-full bg-green-600 text-white font-bold py-4 rounded-xl hover:bg-green-700 transition shadow-lg shadow-green-200 flex items-center justify-center"
                  >
                    <Send className="w-5 h-5 mr-2" />
                    Send Quote
                  </button>
                </form>

              </motion.div>
            )}

          </AnimatePresence>
        </main>
      </div>
    </div>
  );
}

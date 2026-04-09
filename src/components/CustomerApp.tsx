import React, { useState, useRef } from 'react';
import { useAppStore } from '../store';
import { motion, AnimatePresence } from 'motion/react';
import { Wrench, Zap, Wind, MapPin, Plus, ArrowLeft, CheckCircle, Clock, Star, IndianRupee, LogOut, Camera, Image as ImageIcon, X, LocateFixed, Sparkles, Hammer, Truck, Laptop, Plug, Tv } from 'lucide-react';

const SERVICES = [
  { id: 'Plumbing', icon: Wrench, color: 'bg-blue-100 text-blue-600' },
  { id: 'Electrical', icon: Zap, color: 'bg-yellow-100 text-yellow-600' },
  { id: 'AC Repair', icon: Wind, color: 'bg-cyan-100 text-cyan-600' },
  { id: 'Home Cleaning', icon: Sparkles, color: 'bg-purple-100 text-purple-600' },
  { id: 'Carpentry', icon: Hammer, color: 'bg-orange-100 text-orange-600' },
  { id: 'Installation', icon: Plug, color: 'bg-red-100 text-red-600' },
  { id: 'Packers & Movers', icon: Truck, color: 'bg-indigo-100 text-indigo-600' },
  { id: 'Appliance Repair', icon: Tv, color: 'bg-pink-100 text-pink-600' },
  { id: 'IT Support', icon: Laptop, color: 'bg-teal-100 text-teal-600' },
];

export default function CustomerApp() {
  const { jobs, addJob, acceptQuote, setRole } = useAppStore();
  const [view, setView] = useState<'home' | 'new-request' | 'job-details'>('home');
  const [selectedService, setSelectedService] = useState('');
  const [selectedJobId, setSelectedJobId] = useState<string | null>(null);

  // Form state
  const [description, setDescription] = useState('');
  const [location, setLocation] = useState('');
  const [media, setMedia] = useState<{url: string, type: 'image' | 'video'} | null>(null);
  
  const fileInputRef = useRef<HTMLInputElement>(null);

  const myJobs = jobs.filter(j => j.customerId === 'c1');
  const selectedJob = jobs.find(j => j.id === selectedJobId);

  const handleCreateRequest = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedService || !description || !location) return;
    
    addJob({
      customerId: 'c1',
      customerName: 'Rahul Sharma',
      serviceType: selectedService,
      description,
      location,
      mediaUrl: media?.url,
      mediaType: media?.type,
    });
    
    setView('home');
    setDescription('');
    setLocation('');
    setSelectedService('');
    setMedia(null);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setMedia({ url, type: file.type.startsWith('video') ? 'video' : 'image' });
    }
  };

  const handleGetLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          // Mocking reverse geocoding for prototype
          setLocation(`${position.coords.latitude.toFixed(4)}, ${position.coords.longitude.toFixed(4)} (Current Location)`);
        },
        () => {
          setLocation('Andheri West, Mumbai (Mocked)');
        }
      );
    } else {
      setLocation('Andheri West, Mumbai (Mocked)');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex justify-center">
      <div className="w-full max-w-md bg-white min-h-screen shadow-2xl relative overflow-hidden flex flex-col">
        
        {/* Header */}
        <header className="bg-blue-600 text-white p-6 rounded-b-3xl shadow-md z-10 relative">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h1 className="text-2xl font-bold">Hi, Rahul</h1>
              <p className="text-blue-100 text-sm">Need a fix today?</p>
            </div>
            <button onClick={() => setRole(null)} className="p-2 bg-blue-700 rounded-full hover:bg-blue-800 transition">
              <LogOut className="w-5 h-5" />
            </button>
          </div>
          
          {view === 'home' && (
            <div className="relative">
              <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
                <MapPin className="w-5 h-5 text-blue-300" />
              </div>
              <input 
                type="text" 
                placeholder="Current Location: Andheri West" 
                className="w-full bg-blue-700/50 text-white placeholder-blue-200 rounded-xl py-3 pl-12 pr-4 outline-none focus:bg-blue-700 transition"
                readOnly
              />
            </div>
          )}
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
                {/* Services */}
                <section>
                  <h2 className="text-lg font-bold text-gray-900 mb-4">Categories</h2>
                  <div className="grid grid-cols-3 gap-4">
                    {SERVICES.map(service => (
                      <button 
                        key={service.id}
                        onClick={() => {
                          setSelectedService(service.id);
                          setView('new-request');
                        }}
                        className="flex flex-col items-center p-4 bg-white border border-gray-100 rounded-2xl shadow-sm hover:shadow-md transition-shadow"
                      >
                        <div className={`w-12 h-12 rounded-full flex items-center justify-center mb-3 ${service.color}`}>
                          <service.icon className="w-6 h-6" />
                        </div>
                        <span className="text-xs font-medium text-gray-700 text-center">{service.id}</span>
                      </button>
                    ))}
                  </div>
                </section>

                {/* Recent Jobs */}
                <section>
                  <div className="flex justify-between items-center mb-4">
                    <h2 className="text-lg font-bold text-gray-900">My Requests</h2>
                  </div>
                  
                  {myJobs.length === 0 ? (
                    <div className="text-center py-8 text-gray-500">No requests yet.</div>
                  ) : (
                    <div className="space-y-4">
                      {myJobs.map(job => (
                        <div 
                          key={job.id} 
                          onClick={() => {
                            setSelectedJobId(job.id);
                            setView('job-details');
                          }}
                          className="bg-white border border-gray-100 p-4 rounded-2xl shadow-sm hover:shadow-md transition cursor-pointer"
                        >
                          <div className="flex justify-between items-start mb-2">
                            <div className="flex items-center gap-2">
                              {(() => {
                                const s = SERVICES.find(s => s.id === job.serviceType);
                                const Icon = s?.icon || Wrench;
                                const colorClass = s ? s.color.split(' ')[1] : 'text-gray-500';
                                return <Icon className={`w-4 h-4 ${colorClass}`} />;
                              })()}
                              <span className="font-semibold text-gray-900">{job.serviceType}</span>
                            </div>
                            <span className={`text-xs px-2 py-1 rounded-full font-medium ${
                              job.status === 'open' ? 'bg-gray-100 text-gray-600' :
                              job.status === 'quoted' ? 'bg-orange-100 text-orange-600' :
                              job.status === 'accepted' ? 'bg-blue-100 text-blue-600' :
                              'bg-green-100 text-green-600'
                            }`}>
                              {job.status.toUpperCase()}
                            </span>
                          </div>
                          <p className="text-sm text-gray-500 line-clamp-1 mb-3">{job.description}</p>
                          
                          {job.status === 'quoted' && (
                            <div className="flex items-center text-sm text-orange-600 font-medium bg-orange-50 p-2 rounded-lg">
                              <Clock className="w-4 h-4 mr-2" />
                              {job.quotes.length} quote(s) received
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                </section>
              </motion.div>
            )}

            {/* NEW REQUEST VIEW */}
            {view === 'new-request' && (
              <motion.div 
                key="new-request"
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
                
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Request {selectedService}</h2>
                
                <form onSubmit={handleCreateRequest} className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Describe the issue</label>
                    <textarea 
                      required
                      value={description}
                      onChange={e => setDescription(e.target.value)}
                      className="w-full border border-gray-200 rounded-xl p-4 outline-none focus:ring-2 focus:ring-blue-500 transition"
                      rows={4}
                      placeholder="E.g. The pipe under the sink is leaking..."
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Add Photo/Video (Optional)</label>
                    {media ? (
                      <div className="relative inline-block">
                        {media.type === 'image' ? (
                          <img src={media.url} alt="Preview" className="h-32 w-32 object-cover rounded-xl border border-gray-200" />
                        ) : (
                          <video src={media.url} className="h-32 w-32 object-cover rounded-xl border border-gray-200" controls />
                        )}
                        <button 
                          type="button"
                          onClick={() => setMedia(null)}
                          className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 shadow-md hover:bg-red-600"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    ) : (
                      <div className="flex gap-4">
                        <button 
                          type="button"
                          onClick={() => fileInputRef.current?.click()}
                          className="flex items-center justify-center w-full py-3 border-2 border-dashed border-gray-300 rounded-xl text-gray-500 hover:bg-gray-50 hover:border-blue-400 hover:text-blue-500 transition"
                        >
                          <Camera className="w-5 h-5 mr-2" />
                          Upload Media
                        </button>
                        <input 
                          type="file" 
                          accept="image/*,video/*" 
                          className="hidden" 
                          ref={fileInputRef}
                          onChange={handleFileChange}
                        />
                      </div>
                    )}
                    <p className="text-xs text-gray-400 mt-2">Media will be auto-deleted after the job is completed to save storage.</p>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Service Location</label>
                    <div className="relative flex items-center gap-2">
                      <div className="relative flex-1">
                        <MapPin className="w-5 h-5 text-gray-400 absolute left-4 top-3.5" />
                        <input 
                          required
                          type="text"
                          value={location}
                          onChange={e => setLocation(e.target.value)}
                          className="w-full border border-gray-200 rounded-xl py-3 pl-12 pr-4 outline-none focus:ring-2 focus:ring-blue-500 transition"
                          placeholder="Enter full address"
                        />
                      </div>
                      <button 
                        type="button"
                        onClick={handleGetLocation}
                        className="p-3 bg-blue-50 text-blue-600 rounded-xl hover:bg-blue-100 transition flex-shrink-0"
                        title="Use Current Location"
                      >
                        <LocateFixed className="w-6 h-6" />
                      </button>
                    </div>
                  </div>

                  <button 
                    type="submit"
                    className="w-full bg-blue-600 text-white font-bold py-4 rounded-xl hover:bg-blue-700 transition shadow-lg shadow-blue-200"
                  >
                    Find Technicians
                  </button>
                </form>
              </motion.div>
            )}

            {/* JOB DETAILS VIEW */}
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
                  <div className="flex justify-between items-start mb-4">
                    <h2 className="text-xl font-bold text-gray-900">{selectedJob.serviceType}</h2>
                    <span className={`text-xs px-3 py-1 rounded-full font-medium ${
                      selectedJob.status === 'open' ? 'bg-gray-200 text-gray-700' :
                      selectedJob.status === 'quoted' ? 'bg-orange-100 text-orange-700' :
                      selectedJob.status === 'accepted' ? 'bg-blue-100 text-blue-700' :
                      'bg-green-100 text-green-700'
                    }`}>
                      {selectedJob.status.toUpperCase()}
                    </span>
                  </div>
                  <p className="text-gray-600 text-sm mb-4">{selectedJob.description}</p>
                  
                  {selectedJob.mediaUrl && (
                    <div className="mb-4">
                      {selectedJob.mediaType === 'image' ? (
                        <img src={selectedJob.mediaUrl} alt="Issue" className="w-full h-48 object-cover rounded-xl border border-gray-200" />
                      ) : (
                        <video src={selectedJob.mediaUrl} className="w-full h-48 object-cover rounded-xl border border-gray-200" controls />
                      )}
                    </div>
                  )}

                  <div className="flex items-center text-sm text-gray-500">
                    <MapPin className="w-4 h-4 mr-2" />
                    {selectedJob.location}
                  </div>
                </div>

                {/* Quotes Section */}
                {selectedJob.status === 'open' && (
                  <div className="text-center py-10">
                    <div className="w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Clock className="w-8 h-8 text-blue-500 animate-pulse" />
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900">Waiting for quotes</h3>
                    <p className="text-gray-500 text-sm mt-2">Nearby technicians have been notified.</p>
                  </div>
                )}

                {selectedJob.status === 'quoted' && (
                  <div>
                    <h3 className="text-lg font-bold text-gray-900 mb-4">Received Quotes</h3>
                    <div className="space-y-4">
                      {selectedJob.quotes.map(quote => (
                        <div key={quote.id} className="bg-white border-2 border-orange-100 rounded-2xl p-5 shadow-sm">
                          <div className="flex justify-between items-start mb-4">
                            <div>
                              <h4 className="font-bold text-gray-900">{quote.techName}</h4>
                              <div className="flex items-center text-sm text-yellow-500 mt-1">
                                <Star className="w-4 h-4 fill-current mr-1" />
                                {quote.techRating}
                              </div>
                            </div>
                            <div className="text-right">
                              <div className="text-xl font-bold text-gray-900 flex items-center justify-end">
                                <IndianRupee className="w-5 h-5" />
                                {quote.price}
                              </div>
                              <div className="text-xs text-gray-500 mt-1">Est. {quote.estimatedTime}</div>
                            </div>
                          </div>
                          <button 
                            onClick={() => acceptQuote(selectedJob.id, quote.id)}
                            className="w-full bg-orange-500 text-white font-semibold py-3 rounded-xl hover:bg-orange-600 transition"
                          >
                            Accept Quote
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {selectedJob.status === 'accepted' && (
                  <div className="bg-green-50 border border-green-100 rounded-2xl p-6 text-center">
                    <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <CheckCircle className="w-8 h-8 text-green-600" />
                    </div>
                    <h3 className="text-lg font-bold text-gray-900 mb-2">Technician is on the way!</h3>
                    <p className="text-gray-600 text-sm">
                      You accepted the quote from {selectedJob.quotes.find(q => q.id === selectedJob.acceptedQuoteId)?.techName}.
                    </p>
                  </div>
                )}
                
                {selectedJob.status === 'completed' && (
                  <div className="bg-gray-50 border border-gray-200 rounded-2xl p-6 text-center">
                    <h3 className="text-lg font-bold text-gray-900 mb-2">Job Completed</h3>
                    <p className="text-gray-600 text-sm">Thank you for using FixIt Now. Attached media has been auto-deleted.</p>
                  </div>
                )}

              </motion.div>
            )}

          </AnimatePresence>
        </main>

        {/* Floating Action Button for Home */}
        {view === 'home' && (
          <button 
            onClick={() => setView('new-request')}
            className="absolute bottom-6 right-6 w-14 h-14 bg-blue-600 text-white rounded-full shadow-lg shadow-blue-300 flex items-center justify-center hover:bg-blue-700 hover:scale-105 transition-all"
          >
            <Plus className="w-6 h-6" />
          </button>
        )}
      </div>
    </div>
  );
}

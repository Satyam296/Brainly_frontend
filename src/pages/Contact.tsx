import { useState } from 'react';
import Navbar from '../components/Navbar';

export const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission here
    console.log('Form submitted:', formData);
    alert('Thank you for your message! We\'ll get back to you soon.');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-customBlack-200 via-gray-900 to-black text-white">
      <Navbar />
      
      <div className="max-w-6xl mx-auto px-4 py-16">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-6xl md:text-7xl font-bold bg-gradient-to-r from-purple-400 to-purple-600 bg-clip-text text-transparent mb-6">
            Get in Touch
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Have questions, suggestions, or just want to say hello? We'd love to hear from you!
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12">
          {/* Contact Information */}
          <div className="space-y-8">
            <div>
              <h2 className="text-3xl font-bold text-purple-400 mb-6">Let's Connect</h2>
              <p className="text-gray-300 text-lg leading-relaxed mb-8">
                Whether you're facing technical issues, have feature requests, or want to explore partnership opportunities, 
                our team is here to help you make the most of Brainly.
              </p>
            </div>

            <div className="space-y-6">
              <div className="flex items-center p-4 bg-gradient-to-r from-purple-600/20 to-purple-800/20 rounded-lg border border-purple-500/30">
                <div className="text-2xl mr-4">📧</div>
                <div>
                  <h3 className="text-lg font-semibold text-purple-300">Email Us</h3>
                  <p className="text-gray-400">hello@brainly.com</p>
                </div>
              </div>

              <div className="flex items-center p-4 bg-gradient-to-r from-purple-600/20 to-purple-800/20 rounded-lg border border-purple-500/30">
                <div className="text-2xl mr-4">💬</div>
                <div>
                  <h3 className="text-lg font-semibold text-purple-300">Live Chat</h3>
                  <p className="text-gray-400">Available 24/7 for support</p>
                </div>
              </div>

              <div className="flex items-center p-4 bg-gradient-to-r from-purple-600/20 to-purple-800/20 rounded-lg border border-purple-500/30">
                <div className="text-2xl mr-4">🐦</div>
                <div>
                  <h3 className="text-lg font-semibold text-purple-300">Follow Us</h3>
                  <p className="text-gray-400">@BrainlyApp on Twitter</p>
                </div>
              </div>
            </div>

            <div className="mt-8 p-6 bg-gradient-to-r from-gray-800/50 to-gray-900/50 rounded-xl border border-gray-700">
              <h3 className="text-xl font-semibold text-purple-300 mb-3">Response Time</h3>
              <p className="text-gray-400">
                We typically respond to all inquiries within 24 hours. For urgent matters, 
                please use our live chat feature for immediate assistance.
              </p>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-gradient-to-r from-gray-800/30 to-gray-900/30 backdrop-blur-sm border border-gray-700 rounded-2xl p-8">
            <h2 className="text-2xl font-bold text-purple-400 mb-6">Send us a Message</h2>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-2">
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 bg-gray-800/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300"
                    placeholder="Your name"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 bg-gray-800/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300"
                    placeholder="your.email@example.com"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="subject" className="block text-sm font-medium text-gray-300 mb-2">
                  Subject
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 bg-gray-800/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300"
                  placeholder="What's this about?"
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-2">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  required
                  rows={6}
                  className="w-full px-4 py-3 bg-gray-800/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300 resize-none"
                  placeholder="Tell us how we can help you..."
                />
              </div>

              <button
                type="submit"
                className="w-full bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 px-6 py-4 rounded-lg font-semibold text-white transition-all duration-300 shadow-lg hover:shadow-purple-500/25 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-gray-900"
              >
                Send Message
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

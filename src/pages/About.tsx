import Navbar from '../components/Navbar';

export const About = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-customBlack-200 via-gray-900 to-black text-white">
      <Navbar />
      
      <div className="max-w-6xl mx-auto px-4 py-16">
        {/* Hero Section */}
        <div className="text-center mb-16 animate-fade-in">
          <h1 className="text-6xl md:text-7xl font-bold bg-gradient-to-r from-purple-400 to-purple-600 bg-clip-text text-transparent mb-6">
            About Brainly
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Revolutionizing how you save, organize, and access your digital knowledge
          </p>
        </div>

        {/* Mission Section */}
        <div className="grid md:grid-cols-2 gap-12 mb-16">
          <div className="space-y-6">
            <h2 className="text-4xl font-bold text-purple-400">Our Mission</h2>
            <p className="text-gray-300 text-lg leading-relaxed">
              We believe that information should be easily accessible and organized. Brainly transforms the way you manage your digital content by providing a centralized platform where all your links, notes, and resources live harmoniously.
            </p>
            <p className="text-gray-300 text-lg leading-relaxed">
              From tweets and YouTube videos to articles and documents, we make it effortless to save, categorize, and retrieve your digital assets whenever you need them.
            </p>
          </div>
          <div className="bg-gradient-to-r from-purple-600/20 to-purple-800/20 backdrop-blur-sm border border-purple-500/30 rounded-2xl p-8">
            <h3 className="text-2xl font-semibold text-purple-300 mb-4">Why Choose Brainly?</h3>
            <ul className="space-y-3 text-gray-300">
              <li className="flex items-center">
                <span className="text-purple-400 mr-3">✓</span>
                Lightning-fast search and retrieval
              </li>
              <li className="flex items-center">
                <span className="text-purple-400 mr-3">✓</span>
                Intelligent content categorization
              </li>
              <li className="flex items-center">
                <span className="text-purple-400 mr-3">✓</span>
                Cross-platform accessibility
              </li>
              <li className="flex items-center">
                <span className="text-purple-400 mr-3">✓</span>
                Secure cloud synchronization
              </li>
            </ul>
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {[
            {
              icon: "🧠",
              title: "Smart Organization",
              description: "AI-powered categorization that learns from your behavior"
            },
            {
              icon: "🚀",
              title: "Blazing Fast",
              description: "Find any piece of content in milliseconds, not minutes"
            },
            {
              icon: "🔒",
              title: "Secure & Private",
              description: "Your data is encrypted and protected with enterprise-grade security"
            }
          ].map((feature, index) => (
            <div
              key={index}
              className="bg-gradient-to-b from-gray-800/50 to-gray-900/50 backdrop-blur-sm border border-gray-700 rounded-xl p-6 text-center hover:scale-105 transition-transform duration-300"
            >
              <div className="text-4xl mb-4">{feature.icon}</div>
              <h3 className="text-xl font-semibold text-purple-300 mb-3">{feature.title}</h3>
              <p className="text-gray-400">{feature.description}</p>
            </div>
          ))}
        </div>

        {/* Team Section */}
        <div className="text-center bg-gradient-to-r from-purple-600/10 to-purple-800/10 backdrop-blur-sm border border-purple-500/20 rounded-2xl p-12">
          <h2 className="text-4xl font-bold text-purple-400 mb-6">Built by Developers, for Developers</h2>
          <p className="text-gray-300 text-lg max-w-4xl mx-auto leading-relaxed">
            Our team understands the challenges of managing digital content because we face them every day. 
            That's why we've created Brainly - a tool that solves real problems with elegant solutions.
          </p>
          <div className="mt-8">
            <button className="bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 px-8 py-4 rounded-full font-semibold text-white transition-all duration-300 shadow-lg hover:shadow-purple-500/25 hover:scale-105">
              Join Our Community
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

import { useNavigate } from "react-router-dom";

export const Analytics = () => {
  const navigate = useNavigate();
  const handler_start = () => {
    navigate("/signup");
  };

  return (
    <div className="w-full bg-gradient-to-br from-gray-50 to-purple-50 py-24 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content Side */}
          <div className="space-y-8">
            <div className="inline-flex items-center px-4 py-2 bg-purple-100 text-purple-700 rounded-full text-sm font-semibold">
              <span className="w-2 h-2 bg-purple-500 rounded-full mr-2 animate-pulse"></span>
              SMART ORGANIZATION
            </div>
            
            <h2 className="text-5xl md:text-6xl font-bold text-gray-900 leading-tight">
              Manage Your
              <span className="block bg-gradient-to-r from-purple-600 to-purple-800 bg-clip-text text-transparent">
                Digital Life
              </span>
            </h2>
            
            <p className="text-xl text-gray-600 leading-relaxed">
              Transform scattered bookmarks into an intelligent knowledge base. 
              Our AI-powered platform automatically categorizes your content, making it instantly searchable and accessible whenever inspiration strikes.
            </p>

            <div className="grid grid-cols-2 gap-6">
              <div className="bg-white/50 backdrop-blur-sm border border-purple-200 rounded-xl p-6">
                <div className="text-2xl font-bold text-purple-600 mb-2">10x</div>
                <div className="text-gray-600">Faster content retrieval</div>
              </div>
              <div className="bg-white/50 backdrop-blur-sm border border-purple-200 rounded-xl p-6">
                <div className="text-2xl font-bold text-purple-600 mb-2">AI</div>
                <div className="text-gray-600">Smart categorization</div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <button 
                className="bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white px-8 py-4 rounded-full font-semibold transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-purple-500/25"
                onClick={handler_start}
              >
                Start Organizing
              </button>
              <button className="border border-purple-300 text-purple-700 hover:bg-purple-50 px-8 py-4 rounded-full font-semibold transition-all duration-300">
                Learn More
              </button>
            </div>
          </div>

          {/* Visual Side */}
          <div className="relative">
            {/* Background gradient */}
            <div className="absolute inset-0 bg-gradient-to-br from-purple-400/20 to-purple-600/20 rounded-3xl blur-3xl"></div>
            
            {/* Main dashboard mockup */}
            <div className="relative bg-white/80 backdrop-blur-sm border border-gray-200 rounded-2xl p-8 shadow-2xl">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-gray-900">Your Content</h3>
                <div className="flex space-x-2">
                  <div className="w-3 h-3 bg-red-400 rounded-full"></div>
                  <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
                  <div className="w-3 h-3 bg-green-400 rounded-full"></div>
                </div>
              </div>

              {/* Search bar */}
              <div className="bg-gray-50 border border-gray-200 rounded-lg p-3 mb-6">
                <div className="flex items-center text-gray-400 text-sm">
                  🔍 Search your saved content...
                </div>
              </div>

              {/* Content cards */}
              <div className="space-y-3">
                {[
                  { type: "Article", title: "React Best Practices", tag: "Development", color: "bg-blue-100 text-blue-700" },
                  { type: "Video", title: "Design System Tutorial", tag: "Design", color: "bg-green-100 text-green-700" },
                  { type: "Tweet", title: "AI Breakthrough News", tag: "Tech", color: "bg-purple-100 text-purple-700" },
                  { type: "Document", title: "Project Requirements", tag: "Work", color: "bg-orange-100 text-orange-700" }
                ].map((item, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                      <div>
                        <div className="text-sm font-medium text-gray-900">{item.title}</div>
                        <div className="text-xs text-gray-500">{item.type}</div>
                      </div>
                    </div>
                    <span className={`px-2 py-1 text-xs rounded-full ${item.color}`}>
                      {item.tag}
                    </span>
                  </div>
                ))}
              </div>

              {/* Stats */}
              <div className="flex justify-between pt-6 mt-6 border-t border-gray-200">
                <div className="text-center">
                  <div className="text-lg font-bold text-purple-600">247</div>
                  <div className="text-xs text-gray-500">Items Saved</div>
                </div>
                <div className="text-center">
                  <div className="text-lg font-bold text-purple-600">12</div>
                  <div className="text-xs text-gray-500">Categories</div>
                </div>
                <div className="text-center">
                  <div className="text-lg font-bold text-purple-600">98%</div>
                  <div className="text-xs text-gray-500">Organized</div>
                </div>
              </div>
            </div>

            {/* Floating elements */}
            <div className="absolute -top-4 -right-4 w-20 h-20 bg-gradient-to-br from-purple-400 to-purple-600 rounded-xl opacity-80 animate-bounce"></div>
            <div className="absolute -bottom-6 -left-6 w-16 h-16 bg-gradient-to-br from-purple-300 to-purple-500 rounded-full opacity-60 animate-pulse"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

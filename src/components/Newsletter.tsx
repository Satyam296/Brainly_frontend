import { useState } from "react";

export const Newsletter = () => {
    const [email, setEmail] = useState("");
    const [isSubscribed, setIsSubscribed] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!email) return;

        setIsLoading(true);
        
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        setIsSubscribed(true);
        setIsLoading(false);
        setEmail("");
    };

    if (isSubscribed) {
        return (
            <div className="w-full py-16 bg-gradient-to-br from-purple-900 via-customBlack-200 to-black text-white">
                <div className="max-w-4xl mx-auto text-center px-4">
                    <div className="text-6xl mb-6">🎉</div>
                    <h2 className="text-4xl font-bold mb-4">Welcome to the Brainly Community!</h2>
                    <p className="text-xl text-gray-300 mb-8">
                        You're all set! We'll send you the best tips and updates to enhance your productivity.
                    </p>
                    <button 
                        onClick={() => setIsSubscribed(false)}
                        className="text-purple-400 hover:text-purple-300 transition-colors duration-200"
                    >
                        Subscribe another email
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="w-full py-20 bg-gradient-to-br from-purple-900 via-customBlack-200 to-black text-white relative overflow-hidden">
            {/* Background Effects */}
            <div className="absolute inset-0">
                <div className="absolute top-10 left-10 w-72 h-72 bg-purple-500/10 rounded-full blur-3xl animate-pulse"></div>
                <div className="absolute bottom-10 right-10 w-96 h-96 bg-purple-600/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
            </div>

            <div className="relative max-w-6xl mx-auto px-4">
                <div className="grid lg:grid-cols-2 gap-12 items-center">
                    {/* Content Side */}
                    <div className="text-center lg:text-left">
                        <div className="inline-flex items-center px-4 py-2 bg-purple-600/20 text-purple-300 rounded-full text-sm font-semibold mb-6">
                            <span className="w-2 h-2 bg-purple-400 rounded-full mr-2 animate-pulse"></span>
                            PRODUCTIVITY INSIGHTS
                        </div>
                        
                        <h2 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
                            Master Your 
                            <span className="block bg-gradient-to-r from-purple-400 to-purple-600 bg-clip-text text-transparent">
                                Digital Workflow
                            </span>
                        </h2>
                        
                        <p className="text-xl text-gray-300 mb-8 leading-relaxed">
                            Join 10,000+ knowledge workers who get weekly tips, productivity hacks, 
                            and exclusive insights to optimize their digital brain.
                        </p>

                        <div className="flex items-center gap-6 mb-8">
                            <div className="flex items-center text-gray-300">
                                <span className="text-purple-400 mr-2">✓</span>
                                Weekly productivity tips
                            </div>
                            <div className="flex items-center text-gray-300">
                                <span className="text-purple-400 mr-2">✓</span>
                                No spam, ever
                            </div>
                        </div>
                    </div>

                    {/* Newsletter Form */}
                    <div className="bg-gradient-to-br from-gray-900/50 to-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-2xl p-8">
                        <h3 className="text-2xl font-bold mb-6 text-center">Stay in the Loop</h3>
                        
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <label htmlFor="newsletter-email" className="block text-sm font-medium text-gray-300 mb-2">
                                    Email Address
                                </label>
                                <input
                                    id="newsletter-email"
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="your@email.com"
                                    required
                                    className="w-full px-4 py-3 bg-gray-800/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300"
                                />
                            </div>

                            <button
                                type="submit"
                                disabled={isLoading || !email}
                                className="w-full bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 disabled:opacity-50 disabled:cursor-not-allowed px-6 py-3 rounded-lg font-semibold text-white transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-purple-500/25"
                            >
                                {isLoading ? (
                                    <span className="flex items-center justify-center">
                                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                        </svg>
                                        Subscribing...
                                    </span>
                                ) : (
                                    "Get Weekly Insights"
                                )}
                            </button>
                        </form>

                        <p className="text-xs text-gray-400 text-center mt-4">
                            We respect your privacy. Read our{" "}
                            <a href="#" className="text-purple-400 hover:text-purple-300 transition-colors duration-200">
                                Privacy Policy
                            </a>
                        </p>

                        {/* Social Proof */}
                        <div className="mt-6 pt-6 border-t border-gray-700">
                            <div className="flex items-center justify-center space-x-4">
                                <div className="flex -space-x-2">
                                    {[1, 2, 3, 4].map((i) => (
                                        <div 
                                            key={i}
                                            className="w-8 h-8 bg-gradient-to-r from-purple-400 to-purple-600 rounded-full border-2 border-gray-800 flex items-center justify-center text-white text-xs font-semibold"
                                        >
                                            {String.fromCharCode(65 + i)}
                                        </div>
                                    ))}
                                </div>
                                <span className="text-sm text-gray-400">
                                    Joined by 10,000+ professionals
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

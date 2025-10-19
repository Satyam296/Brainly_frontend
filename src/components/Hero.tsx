import { TypeAnimation } from "react-type-animation";
import { useNavigate } from "react-router-dom";

const Hero = () => {
    const navigate = useNavigate();
    const handler_start = (event: React.MouseEvent<HTMLButtonElement>) => {
        console.log("Button Clicked", event);
        navigate("/signup");
    };

    return (
        <div className="text-white relative overflow-hidden">
            
            <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-transparent to-purple-900/20"></div>
            <div className="absolute top-20 left-10 w-72 h-72 bg-purple-500/10 rounded-full blur-3xl animate-pulse"></div>
            <div className="absolute bottom-20 right-10 w-96 h-96 bg-purple-600/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
            
            <div className="relative max-w-6xl w-full min-h-screen mx-auto text-center flex flex-col justify-center px-4 pt-32 pb-16">
                
                <div className="inline-flex items-center justify-center px-4 py-2 bg-gradient-to-r from-purple-600/20 to-purple-800/20 backdrop-blur-sm border border-purple-500/30 rounded-full text-purple-300 font-semibold text-sm mb-8 mx-auto animate-fade-in">
                    <span className="w-2 h-2 bg-purple-400 rounded-full mr-2 animate-ping"></span>
                    ALL YOUR CONTENT IN ONE PLACE
                </div>

        
                <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold mb-8 bg-gradient-to-r from-white via-purple-200 to-purple-400 bg-clip-text text-transparent leading-tight">
                    Your Digital
                    <br />
                    <span className="bg-gradient-to-r from-purple-400 to-purple-600 bg-clip-text text-transparent">
                        Brain
                    </span>
                </h1>

                {/* Dynamic Text Section */}
                <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-8">
                    <p className="text-xl sm:text-2xl md:text-3xl lg:text-4xl text-gray-300 font-light">
                        Save, organize & access
                    </p>
                    <TypeAnimation 
                        className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold bg-gradient-to-r from-purple-400 to-purple-600 bg-clip-text text-transparent"
                        sequence={[
                            "Tweets", 2000,
                            "Videos", 2000,
                            "Articles", 2000,
                            "Documents", 2000,
                            "Links", 2000
                        ]} 
                        speed={50} 
                        repeat={Infinity} 
                    />
                </div>

                {/* Subtitle */}
                <p className="text-lg md:text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed mb-12">
                    Transform the chaos of scattered bookmarks into an intelligent, searchable knowledge base. 
                    Brainly helps you capture, categorize, and retrieve your digital discoveries effortlessly.
                </p>   

                {/* CTA Buttons */}
                <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                    <button 
                        className="group relative bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 px-8 py-4 rounded-full font-semibold text-white transition-all duration-300 shadow-lg hover:shadow-purple-500/25 hover:scale-105 transform"
                        onClick={handler_start}
                    >
                        <span className="relative z-10">Get Started Free</span>
                        <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-purple-600 rounded-full blur opacity-0 group-hover:opacity-50 transition-opacity duration-300"></div>
                    </button>
                    
                    <button className="px-8 py-4 border border-purple-500/50 text-purple-300 hover:text-white hover:border-purple-400 rounded-full font-semibold transition-all duration-300 hover:bg-purple-600/10">
                        Watch Demo
                    </button>
                </div>

                {/* Stats or Features */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16 max-w-4xl mx-auto">
                    <div className="text-center">
                        <div className="text-3xl font-bold text-purple-400">10K+</div>
                        <div className="text-gray-400 text-sm mt-1">Active Users</div>
                    </div>
                    <div className="text-center">
                        <div className="text-3xl font-bold text-purple-400">1M+</div>
                        <div className="text-gray-400 text-sm mt-1">Links Saved</div>
                    </div>
                    <div className="text-center">
                        <div className="text-3xl font-bold text-purple-400">99.9%</div>
                        <div className="text-gray-400 text-sm mt-1">Uptime</div>
                    </div>
                </div>
            </div> 
        </div>
    );
};

export default Hero; 
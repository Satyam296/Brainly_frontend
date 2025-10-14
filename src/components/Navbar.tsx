import { useState, useEffect } from "react";
import { Logo } from "../icons/Logo";
import { useNavigate, useLocation } from "react-router-dom";
import { AiOutlineClose, AiOutlineMenu } from "react-icons/ai";

const Navbar = () => {
    const [nav, setNav] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();

    const handleNav = () => {
        setNav(!nav);
    };

    const handleClick_1 = () => {
        navigate("/signup");
        setNav(false);
    };

    const handleClick_2 = () => {
        navigate("/signin");
        setNav(false);
    };

    const handleClick_3 = () => {
        navigate("/about");
        setNav(false);
    };

    const handleClick_4 = () => {
        navigate("/contact");
        setNav(false);
    };

    const handleHome = () => {
        navigate("/");
        setNav(false);
    };

    // Handle scroll effect
    useEffect(() => {
        const handleScroll = () => {
            const isScrolled = window.scrollY > 50;
            setScrolled(isScrolled);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <nav className={`text-white fixed w-full top-0 z-50 transition-all duration-300 ${
            scrolled ? 'bg-black/80 backdrop-blur-md border-b border-gray-800' : 'bg-transparent'
        }`}>
            <div className="flex justify-between items-center py-4 max-w-7xl mx-auto px-4 select-none">
                {/* Logo */}
                <button 
                    onClick={handleHome}
                    className="flex text-2xl md:text-3xl items-center hover:scale-105 transition-transform duration-200"
                >
                    <div className="pr-2 text-purple-600">
                        <Logo />
                    </div>
                    <span className="font-bold bg-gradient-to-r from-white to-purple-200 bg-clip-text text-transparent">
                        Brainly
                    </span>
                </button>

                {/* Desktop Menu */}
                <ul className="hidden md:flex items-center space-x-1">
                    <li>
                        <button 
                            onClick={handleHome}
                            className={`px-4 py-2 rounded-lg transition-all duration-200 hover:bg-purple-600/20 hover:text-purple-300 ${
                                location.pathname === '/' ? 'text-purple-400 bg-purple-600/10' : 'text-gray-300'
                            }`}
                        >
                            Home
                        </button>
                    </li>
                    <li>
                        <button 
                            onClick={handleClick_3}
                            className={`px-4 py-2 rounded-lg transition-all duration-200 hover:bg-purple-600/20 hover:text-purple-300 ${
                                location.pathname === '/about' ? 'text-purple-400 bg-purple-600/10' : 'text-gray-300'
                            }`}
                        >
                            About
                        </button>
                    </li>
                    <li>
                        <button 
                            onClick={handleClick_4}
                            className={`px-4 py-2 rounded-lg transition-all duration-200 hover:bg-purple-600/20 hover:text-purple-300 ${
                                location.pathname === '/contact' ? 'text-purple-400 bg-purple-600/10' : 'text-gray-300'
                            }`}
                        >
                            Contact
                        </button>
                    </li>
                    <li>
                        <button 
                            onClick={handleClick_2}
                            className="px-4 py-2 text-gray-300 hover:text-white transition-all duration-200"
                        >
                            Sign In
                        </button>
                    </li>
                    <li>
                        <button 
                            onClick={handleClick_1}
                            className="px-6 py-2 bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 rounded-full font-semibold transition-all duration-200 hover:scale-105 shadow-lg hover:shadow-purple-500/25"
                        >
                            Get Started
                        </button>
                    </li>
                </ul>

                {/* Mobile Menu Button */}
                <button 
                    onClick={handleNav}
                    className="md:hidden p-2 rounded-lg hover:bg-purple-600/20 transition-colors duration-200"
                >
                    {nav ? <AiOutlineClose size={24} /> : <AiOutlineMenu size={24} />}
                </button>

                {/* Mobile Menu */}
                <div className={`md:hidden fixed top-0 left-0 w-full h-full bg-black/95 backdrop-blur-md transition-all duration-300 ${
                    nav ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
                }`}>
                    <div className="flex flex-col h-full">
                        {/* Mobile Header */}
                        <div className="flex justify-between items-center p-4 border-b border-gray-800">
                            <div className="flex text-2xl items-center">
                                <div className="pr-2 text-purple-600">
                                    <Logo />
                                </div>
                                <span className="font-bold">Brainly</span>
                            </div>
                            <button 
                                onClick={handleNav}
                                className="p-2 rounded-lg hover:bg-purple-600/20 transition-colors duration-200"
                            >
                                <AiOutlineClose size={24} />
                            </button>
                        </div>

                        {/* Mobile Navigation */}
                        <div className="flex-1 px-4 py-8">
                            <ul className="space-y-4">
                                <li>
                                    <button 
                                        onClick={handleHome}
                                        className="w-full text-left text-xl py-4 px-4 rounded-lg hover:bg-purple-600/20 hover:text-purple-300 transition-all duration-200"
                                    >
                                        Home
                                    </button>
                                </li>
                                <li>
                                    <button 
                                        onClick={handleClick_3}
                                        className="w-full text-left text-xl py-4 px-4 rounded-lg hover:bg-purple-600/20 hover:text-purple-300 transition-all duration-200"
                                    >
                                        About
                                    </button>
                                </li>
                                <li>
                                    <button 
                                        onClick={handleClick_4}
                                        className="w-full text-left text-xl py-4 px-4 rounded-lg hover:bg-purple-600/20 hover:text-purple-300 transition-all duration-200"
                                    >
                                        Contact
                                    </button>
                                </li>
                                <li>
                                    <button 
                                        onClick={handleClick_2}
                                        className="w-full text-left text-xl py-4 px-4 rounded-lg hover:bg-purple-600/20 hover:text-purple-300 transition-all duration-200"
                                    >
                                        Sign In
                                    </button>
                                </li>
                                <li className="pt-4">
                                    <button 
                                        onClick={handleClick_1}
                                        className="w-full bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 py-4 rounded-lg font-semibold text-xl transition-all duration-200"
                                    >
                                        Get Started
                                    </button>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
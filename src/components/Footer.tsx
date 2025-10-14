import {
    FaDribbbleSquare,
    FaFacebookSquare,
    FaGithubSquare,
    FaInstagram,
    FaTwitterSquare
} from "react-icons/fa";
import { Logo } from "../icons/Logo";

export const Footer = () => {
    return (
        <footer className="bg-gradient-to-br from-customBlack-200 to-black border-t border-gray-800">
            <div className="max-w-7xl mx-auto py-16 px-4">
                <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-8">
                    {/* Brand Section */}
                    <div className="lg:col-span-1">
                        <div className="flex items-center text-3xl font-bold mb-4">
                            <div className="pr-2 text-purple-600">
                                <Logo />
                            </div>
                            <span className="bg-gradient-to-r from-white to-purple-200 bg-clip-text text-transparent">
                                Brainly
                            </span>
                        </div>
                        <p className="text-gray-400 leading-relaxed mb-6">
                            Revolutionizing how you save, organize, and access your digital knowledge. 
                            Your personal AI-powered second brain.
                        </p>
                        <div className="flex space-x-4">
                            <a href="#" className="text-gray-400 hover:text-purple-400 transition-colors duration-200">
                                <FaTwitterSquare size={28} />
                            </a>
                            <a href="#" className="text-gray-400 hover:text-purple-400 transition-colors duration-200">
                                <FaGithubSquare size={28} />
                            </a>
                            <a href="#" className="text-gray-400 hover:text-purple-400 transition-colors duration-200">
                                <FaInstagram size={28} />
                            </a>
                            <a href="#" className="text-gray-400 hover:text-purple-400 transition-colors duration-200">
                                <FaFacebookSquare size={28} />
                            </a>
                            <a href="#" className="text-gray-400 hover:text-purple-400 transition-colors duration-200">
                                <FaDribbbleSquare size={28} />
                            </a>
                        </div>
                    </div>

                    {/* Product Section */}
                    <div>
                        <h3 className="text-white font-semibold text-lg mb-4">Product</h3>
                        <ul className="space-y-3">
                            <li>
                                <a href="#" className="text-gray-400 hover:text-purple-400 transition-colors duration-200">
                                    Features
                                </a>
                            </li>
                            <li>
                                <a href="#" className="text-gray-400 hover:text-purple-400 transition-colors duration-200">
                                    Integrations
                                </a>
                            </li>
                            <li>
                                <a href="#" className="text-gray-400 hover:text-purple-400 transition-colors duration-200">
                                    API
                                </a>
                            </li>
                            <li>
                                <a href="#" className="text-gray-400 hover:text-purple-400 transition-colors duration-200">
                                    Security
                                </a>
                            </li>
                            <li>
                                <a href="#" className="text-gray-400 hover:text-purple-400 transition-colors duration-200">
                                    Pricing
                                </a>
                            </li>
                        </ul>
                    </div>

                    {/* Support Section */}
                    <div>
                        <h3 className="text-white font-semibold text-lg mb-4">Support</h3>
                        <ul className="space-y-3">
                            <li>
                                <a href="#" className="text-gray-400 hover:text-purple-400 transition-colors duration-200">
                                    Help Center
                                </a>
                            </li>
                            <li>
                                <a href="#" className="text-gray-400 hover:text-purple-400 transition-colors duration-200">
                                    Documentation
                                </a>
                            </li>
                            <li>
                                <a href="#" className="text-gray-400 hover:text-purple-400 transition-colors duration-200">
                                    Guides & Tutorials
                                </a>
                            </li>
                            <li>
                                <a href="#" className="text-gray-400 hover:text-purple-400 transition-colors duration-200">
                                    Contact Support
                                </a>
                            </li>
                            <li>
                                <a href="#" className="text-gray-400 hover:text-purple-400 transition-colors duration-200">
                                    Status Page
                                </a>
                            </li>
                        </ul>
                    </div>

                    {/* Company Section */}
                    <div>
                        <h3 className="text-white font-semibold text-lg mb-4">Company</h3>
                        <ul className="space-y-3">
                            <li>
                                <a href="/about" className="text-gray-400 hover:text-purple-400 transition-colors duration-200">
                                    About Us
                                </a>
                            </li>
                            <li>
                                <a href="#" className="text-gray-400 hover:text-purple-400 transition-colors duration-200">
                                    Blog
                                </a>
                            </li>
                            <li>
                                <a href="#" className="text-gray-400 hover:text-purple-400 transition-colors duration-200">
                                    Careers
                                </a>
                            </li>
                            <li>
                                <a href="/contact" className="text-gray-400 hover:text-purple-400 transition-colors duration-200">
                                    Contact
                                </a>
                            </li>
                            <li>
                                <a href="#" className="text-gray-400 hover:text-purple-400 transition-colors duration-200">
                                    Partners
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Newsletter Section */}
                <div className="mt-12 pt-8 border-t border-gray-800">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                        <div className="mb-4 md:mb-0">
                            <h4 className="text-white font-semibold text-lg mb-2">Stay Updated</h4>
                            <p className="text-gray-400">Get the latest features and productivity tips.</p>
                        </div>
                        <div className="flex flex-col sm:flex-row gap-3 max-w-md">
                            <input
                                type="email"
                                placeholder="Enter your email"
                                className="flex-1 px-4 py-2 bg-gray-800/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                            />
                            <button className="bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 px-6 py-2 rounded-lg font-semibold text-white transition-all duration-300 hover:scale-105">
                                Subscribe
                            </button>
                        </div>
                    </div>
                </div>

                {/* Bottom Section */}
                <div className="mt-12 pt-8 border-t border-gray-800 flex flex-col md:flex-row md:items-center md:justify-between">
                    <div className="flex flex-col sm:flex-row sm:space-x-6 text-gray-400 text-sm mb-4 md:mb-0">
                        <a href="#" className="hover:text-purple-400 transition-colors duration-200 mb-2 sm:mb-0">
                            Privacy Policy
                        </a>
                        <a href="#" className="hover:text-purple-400 transition-colors duration-200 mb-2 sm:mb-0">
                            Terms of Service
                        </a>
                        <a href="#" className="hover:text-purple-400 transition-colors duration-200 mb-2 sm:mb-0">
                            Cookie Policy
                        </a>
                    </div>
                    <p className="text-gray-400 text-sm">
                        © 2024 Brainly. All rights reserved.
                    </p>
                </div>
            </div>
        </footer>
    );
};

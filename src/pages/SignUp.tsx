import { Input } from "../components/Input";
import { Button } from "../components/Button";
import { useRef, useState } from "react";
import axios from "axios";
import { BACKEND_URL } from "../components/config";
import { useNavigate, Link } from "react-router-dom";

export function SignUp() {
    const [res, setres] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);
    const usernameRef = useRef<HTMLInputElement>(null);
    const passwordRef = useRef<HTMLInputElement>(null);
    const navigate = useNavigate();

    async function signup() {
        setLoading(true);
        setres(null);
        
        try {
            const username = usernameRef.current?.value;
            const password = passwordRef.current?.value;
            
            if (!username || !password) {
                setres("Please fill in all fields");
                setLoading(false);
                return;
            }

            const response = await axios.post(BACKEND_URL + "/api/v1/signup", {
                username,
                password
            });

            if (response.data.message === "User signed up") {
                navigate("/signin");
            } else {
                setres(response.data.message);
            }
        } catch (error: unknown) {
            if (axios.isAxiosError(error)) {
                setres(error.response?.data?.message || "Something went wrong. Please try again.");
            } else {
                setres("Something went wrong. Please try again.");
            }
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-customBlack-200 via-gray-900 to-black flex justify-center items-center px-4">
            {/* Background Effects */}
            <div className="absolute inset-0 overflow-hidden">
                <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-purple-600/10 rounded-full blur-3xl animate-pulse"></div>
                <div className="absolute bottom-1/4 left-1/4 w-96 h-96 bg-purple-800/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
            </div>

            <div className="relative w-full max-w-md">
                {/* Back to Home */}
                <div className="mb-8 text-center">
                    <Link 
                        to="/" 
                        className="inline-flex items-center text-purple-400 hover:text-purple-300 transition-colors duration-200"
                    >
                        ← Back to Home
                    </Link>
                </div>

                {/* Sign Up Card */}
                <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-700 rounded-2xl p-8 shadow-2xl">
                    {/* Header */}
                    <div className="text-center mb-8">
                        <h1 className="text-3xl font-bold text-white mb-2">Create Account</h1>
                        <p className="text-gray-400">Join thousands organizing their digital life</p>
                    </div>

                    {/* Success/Error Message */}
                    {res && (
                        <div className={`mb-6 p-4 rounded-lg ${
                            res.includes("signed up") 
                                ? "bg-green-900/30 border border-green-500/50" 
                                : "bg-red-900/30 border border-red-500/50"
                        }`}>
                            <p className={`text-sm text-center ${
                                res.includes("signed up") ? "text-green-300" : "text-red-300"
                            }`}>
                                {res}
                            </p>
                        </div>
                    )}

                    {/* Form */}
                    <div className="space-y-6">
                        <div>
                            <label htmlFor="username" className="block text-sm font-medium text-gray-300 mb-2">
                                Username
                            </label>
                            <Input 
                                reference={usernameRef} 
                                classy={`w-full px-4 py-3 bg-gray-800/50 border ${res && !res.includes("signed up") ? 'border-red-500' : 'border-gray-600'} rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300`}
                                placeholder="Choose a unique username"
                            />
                        </div>

                        <div>
                            <label htmlFor="password" className="block text-sm font-medium text-gray-300 mb-2">
                                Password
                            </label>
                            <Input 
                                reference={passwordRef} 
                                classy={`w-full px-4 py-3 bg-gray-800/50 border ${res && !res.includes("signed up") ? 'border-red-500' : 'border-gray-600'} rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300`}
                                placeholder="Create a strong password"
                                type="password"
                            />
                        </div>

                        <div className="text-xs text-gray-400">
                            By creating an account, you agree to our{" "}
                            <a href="#" className="text-purple-400 hover:text-purple-300">Terms of Service</a>
                            {" "}and{" "}
                            <a href="#" className="text-purple-400 hover:text-purple-300">Privacy Policy</a>.
                        </div>

                        <Button 
                            onClick={signup} 
                            loading={loading} 
                            variant="primary" 
                            text={loading ? "Creating Account..." : "Create Account"} 
                            fullWidth={true}
                        />
                    </div>

                    {/* Footer */}
                    <div className="mt-8 text-center">
                        <p className="text-gray-400">
                            Already have an account?{" "}
                            <Link 
                                to="/signin" 
                                className="text-purple-400 hover:text-purple-300 font-semibold transition-colors duration-200"
                            >
                                Sign in
                            </Link>
                        </p>
                    </div>
                </div>

                {/* Benefits */}
                <div className="mt-6 text-center">
                    <p className="text-gray-500 text-sm mb-4">Why join Brainly?</p>
                    <div className="flex justify-center space-x-6 text-xs text-gray-400">
                        <span>🚀 Lightning fast</span>
                        <span>🔒 Secure & private</span>
                        <span>📱 Cross-platform</span>
                    </div>
                </div>
            </div>
        </div>
    );
}
import { Input } from "../components/Input";
import { Button } from "../components/Button";
import { useRef, useState } from "react";
import axios from "axios";
import { BACKEND_URL } from "../components/config";
import { useNavigate, Link } from "react-router-dom";

export function SignIn() {
    const usernameRef = useRef<HTMLInputElement>(null);
    const passwordRef = useRef<HTMLInputElement>(null);
    const navigate = useNavigate();
    const [res, setres] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);

    async function signin() {
        setLoading(true);
        setres(null);
        
        try {
            const username = usernameRef.current?.value;
            const password = passwordRef.current?.value;
            
            const response = await axios.post(BACKEND_URL + "/api/v1/signin", {
                username,
                password
            });
            
            const jwt = response.data.token;
            
            if (!jwt || typeof jwt !== "string" || jwt.length < 10) {
                setres(response.data.message || "Invalid credentials");
            } else {
                localStorage.setItem("token", jwt);
                navigate("/dashboard");
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
                <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-600/10 rounded-full blur-3xl animate-pulse"></div>
                <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-800/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
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

                {/* Sign In Card */}
                <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-700 rounded-2xl p-8 shadow-2xl">
                    {/* Header */}
                    <div className="text-center mb-8">
                        <h1 className="text-3xl font-bold text-white mb-2">Welcome Back</h1>
                        <p className="text-gray-400">Sign in to access your digital brain</p>
                    </div>

                    {/* Error Message */}
                    {res && (
                        <div className="mb-6 p-4 bg-red-900/30 border border-red-500/50 rounded-lg">
                            <p className="text-red-300 text-sm text-center">{res}</p>
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
                                classy={`w-full px-4 py-3 bg-gray-800/50 border ${res ? 'border-red-500' : 'border-gray-600'} rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300`}
                                placeholder="Enter your username"
                            />
                        </div>

                        <div>
                            <label htmlFor="password" className="block text-sm font-medium text-gray-300 mb-2">
                                Password
                            </label>
                            <Input 
                                reference={passwordRef} 
                                classy={`w-full px-4 py-3 bg-gray-800/50 border ${res ? 'border-red-500' : 'border-gray-600'} rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300`}
                                placeholder="Enter your password"
                                type="password"
                            />
                        </div>

                        <div className="flex items-center justify-between text-sm">
                            <label className="flex items-center text-gray-400">
                                <input type="checkbox" className="mr-2 rounded bg-gray-800 border-gray-600" />
                                Remember me
                            </label>
                            <a href="#" className="text-purple-400 hover:text-purple-300 transition-colors duration-200">
                                Forgot password?
                            </a>
                        </div>

                        <Button 
                            onClick={signin} 
                            loading={loading} 
                            variant="primary" 
                            text={loading ? "Signing in..." : "Sign In"} 
                            fullWidth={true}
                        />
                    </div>

                    {/* Footer */}
                    <div className="mt-8 text-center">
                        <p className="text-gray-400">
                            Don't have an account?{" "}
                            <Link 
                                to="/signup" 
                                className="text-purple-400 hover:text-purple-300 font-semibold transition-colors duration-200"
                            >
                                Sign up
                            </Link>
                        </p>
                    </div>
                </div>

                {/* Social Login (Optional) */}
                <div className="mt-6 text-center">
                    <p className="text-gray-500 text-sm">
                        Secure authentication powered by industry-standard encryption
                    </p>
                </div>
            </div>
        </div>
    );
}
import { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { GoogleLogin } from "@react-oauth/google";

export default function AuthPage() {
    const navigate = useNavigate();
    const location = useLocation();
    const { login, signup, googleLogin } = useAuth();
    const [isLogin, setIsLogin] = useState(true);
    const [error, setError] = useState("");

    const [loginEmail, setLoginEmail] = useState("");
    const [loginPassword, setLoginPassword] = useState("");

    const [registerName, setRegisterName] = useState("");
    const [registerEmail, setRegisterEmail] = useState("");
    const [registerPassword, setRegisterPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);

    useEffect(() => {
        if (location.pathname === "/register") {
            setIsLogin(false);
        } else {
            setIsLogin(true);
        }
    }, [location.pathname]);

    const handleLoginSubmit = async (e) => {
        e.preventDefault();
        setError("");
        try {
            await login(loginEmail, loginPassword);
            navigate("/dashboard");
        } catch (err) {
            setError(err);
        }
    };

    const handleRegisterSubmit = async (e) => {
        e.preventDefault();
        setError("");
        try {
            await signup(registerName, registerEmail, registerPassword);
            navigate("/dashboard");
        } catch (err) {
            setError(err);
        }
    };

    const handleGoogleAuth = () => {
        // TODO: Add Google OAuth logic
    };

    return (
        <div className="min-h-screen w-full flex items-center justify-center p-4 gradient-bg-blue-2 overflow-hidden relative">
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0">
                <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-600/30 rounded-full mix-blend-multiply filter blur-3xl animate-blob"></div>
                <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-indigo-600/30 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-2000"></div>
                <div className="absolute bottom-1/4 left-1/3 w-96 h-96 bg-pink-600/30 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-4000"></div>
            </div>

            <div className="w-full max-w-5xl bg-white/10 backdrop-blur-lg rounded-3xl shadow-2xl overflow-hidden flex flex-col lg:flex-row relative z-10 transition-all duration-300 transform border border-white/20">
                <div className="w-full lg:w-1/2 gradient-bg-blue-3 p-12 text-white flex flex-col justify-center items-center text-center relative overflow-hidden backdrop-blur-sm">
                    <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1557683316-973673baf926?ixlib=rb-4.0.3&auto=format&fit=crop&w=2029&q=80')] bg-cover bg-center opacity-20 mix-blend-overlay"></div>

                    <div className="relative z-10 flex flex-col items-center">
                        <Link to="/" className="inline-block mb-8 hover:opacity-90 transition-transform hover:scale-105">
                            <img src="/lag.png" alt="AdVantage Gen" className="h-48 drop-shadow-2xl" />
                        </Link>

                        <h2 className="text-4xl font-extrabold mb-6 tracking-tight leading-tight">
                            Start your <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#0B2A5B] via-[#0F5FA6] to-[#16D2C7]">
                                AdGen Journey
                            </span>
                        </h2>

                        <p className="text-indigo-100 text-lg leading-relaxed mb-8 opacity-90 max-w-xs mx-auto">
                            Unleash your creativity with AI-powered advertisement generation. Create compelling content in seconds.
                        </p>

                        <div className="flex items-center justify-center space-x-4 text-sm font-medium text-indigo-200">
                            <div className="flex -space-x-2">
                                {[1, 2, 3].map(i => (
                                    <div key={i} className={`w-8 h-8 rounded-full border-2 border-indigo-600 bg-indigo-${300 + i * 100}`}></div>
                                ))}
                            </div>
                            <span>Join 10,000+ creators</span>
                        </div>
                    </div>
                </div>

                <div className="w-full lg:w-1/2 p-8 lg:p-12 bg-white/20 backdrop-blur-md border-l border-white/10">
                    <div className="max-w-md mx-auto h-full flex flex-col justify-center">
                        <div className="text-center mb-8">
                            <h3 className="text-2xl font-bold text-gray-900 mb-2">
                                {isLogin ? "Welcome Back" : "Create Account"}
                            </h3>

                            {error && (
                                <div className="mt-2 text-sm text-red-600 font-medium bg-red-50 py-2 rounded-lg border border-red-100 animate-shake">
                                    {error}
                                </div>
                            )}

                            <div className="mt-4 inline-flex bg-gray-200/50 p-1 rounded-xl w-full max-w-[240px]">
                                <button
                                    onClick={() => { setIsLogin(true); navigate("/login"); }}
                                    className={`flex-1 py-2 text-sm font-semibold rounded-lg transition-all duration-200 ${isLogin
                                        ? "bg-white text-indigo-900 shadow-sm"
                                        : "text-gray-500 hover:text-gray-900"
                                        }`}
                                >
                                    Log In
                                </button>
                                <button
                                    onClick={() => { setIsLogin(false); navigate("/register"); }}
                                    className={`flex-1 py-2 text-sm font-semibold rounded-lg transition-all duration-200 ${!isLogin
                                        ? "bg-white text-indigo-900 shadow-sm"
                                        : "text-gray-500 hover:text-gray-900"
                                        }`}
                                >
                                    Sign Up
                                </button>
                            </div>
                        </div>

                        {isLogin ? (
                            <form onSubmit={handleLoginSubmit} className="space-y-5">
                                <div>
                                    <input
                                        type="email"
                                        required
                                        value={loginEmail}
                                        onChange={(e) => setLoginEmail(e.target.value)}
                                        className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all outline-none placeholder-gray-400 text-gray-900"
                                        placeholder="Email Address"
                                    />
                                </div>

                                <div>
                                    <div className="relative">
                                        <input
                                            type={showPassword ? "text" : "password"}
                                            required
                                            value={loginPassword}
                                            onChange={(e) => setLoginPassword(e.target.value)}
                                            className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all outline-none placeholder-gray-400 text-gray-900 pr-10"
                                            placeholder="Password"
                                        />
                                        <button
                                            type="button"
                                            onClick={() => setShowPassword(!showPassword)}
                                            className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600 focus:outline-none"
                                        >
                                            <i className={`fas ${showPassword ? "fa-eye-slash" : "fa-eye"}`}></i>
                                        </button>
                                    </div>
                                    <div className="flex justify-end mt-2">
                                        <a href="#" className="text-xs text-indigo-600 hover:text-indigo-800 font-medium">Forgot Password?</a>
                                    </div>
                                </div>

                                <button type="submit" className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-3 rounded-xl font-bold shadow-lg shadow-indigo-200 transition-all transform hover:scale-[1.01]">
                                    Log In
                                </button>
                            </form>
                        ) : (
                            <form onSubmit={handleRegisterSubmit} className="space-y-4">
                                <div>
                                    <input
                                        type="text"
                                        required
                                        value={registerName}
                                        onChange={(e) => setRegisterName(e.target.value)}
                                        className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all outline-none placeholder-gray-400 text-gray-900"
                                        placeholder="Full Name"
                                    />
                                </div>
                                <div>
                                    <input
                                        type="email"
                                        required
                                        value={registerEmail}
                                        onChange={(e) => setRegisterEmail(e.target.value)}
                                        className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all outline-none placeholder-gray-400 text-gray-900"
                                        placeholder="Email Address"
                                    />
                                </div>

                                <div>
                                    <div className="relative">
                                        <input
                                            type={showPassword ? "text" : "password"}
                                            required
                                            value={registerPassword}
                                            onChange={(e) => setRegisterPassword(e.target.value)}
                                            className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all outline-none placeholder-gray-400 text-gray-900 pr-10"
                                            placeholder="Password"
                                        />
                                        <button
                                            type="button"
                                            onClick={() => setShowPassword(!showPassword)}
                                            className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600 focus:outline-none"
                                        >
                                            <i className={`fas ${showPassword ? "fa-eye-slash" : "fa-eye"}`}></i>
                                        </button>
                                    </div>
                                </div>

                                <button type="submit" className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-3 rounded-xl font-bold shadow-lg shadow-indigo-200 transition-all transform hover:scale-[1.01]">
                                    Create Account
                                </button>
                            </form>
                        )}

                        <div className="mt-8 relative">
                            <div className="absolute inset-0 flex items-center">
                                <div className="w-full border-t border-gray-200"></div>
                            </div>
                            <div className="relative flex justify-center text-xs uppercase">
                                <span className="bg-white/50 px-2 text-gray-500 font-medium tracking-wide">Or continue with</span>
                            </div>
                        </div>

                        <div className="mt-8 flex justify-center">
                            <GoogleLogin
                                onSuccess={async (credentialResponse) => {
                                    try {
                                        await googleLogin(credentialResponse.credential);
                                        navigate("/dashboard");
                                    } catch (err) {
                                        setError(err);
                                    }
                                }}
                                onError={() => {
                                    setError("Google Login Failed");
                                }}
                                theme="filled_blue"
                                shape="pill"
                                width="100%"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

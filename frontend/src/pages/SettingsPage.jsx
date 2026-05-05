import Sidebar from "../components/Sidebar";
import { useAuth } from "../context/AuthContext";

export default function SettingsPage() {
    const { user } = useAuth();

    return (
        <div className="gradient-bg-blue-3 h-screen overflow-hidden flex text-white">
            <Sidebar />
            <main className="flex-1 h-full p-8 overflow-y-auto">
                <div className="max-w-4xl mx-auto">
                    <h1 className="text-3xl font-bold text-white mb-8">Settings</h1>

                    <div className="grid gap-8">
                        <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-6 shadow-xl">
                            <div className="flex items-center justify-between mb-6">
                                <h2 className="text-xl font-bold text-white flex items-center">
                                    <i className="fas fa-user-cog mr-3 text-blue-400"></i>
                                    Account Settings
                                </h2>
                                {user?.picture && (
                                    <img src={user.picture} alt={user.name} className="w-12 h-12 rounded-full border-2 border-blue-500/50 shadow-lg" />
                                )}
                            </div>
                            <form className="space-y-4">
                                <div className="grid md:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-gray-300 text-sm mb-2">Display Name</label>
                                        <input type="text" defaultValue={user?.name || "User"} className="w-full bg-black/20 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-blue-500 transition-colors" />
                                    </div>
                                    <div>
                                        <label className="block text-gray-300 text-sm mb-2">Email Address</label>
                                        <input type="email" defaultValue={user?.email || ""} className="w-full bg-black/20 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-blue-500 transition-colors" disabled />
                                    </div>
                                </div>
                                <button type="button" className="text-blue-400 hover:text-blue-300 text-sm font-medium">Change Password?</button>
                            </form>
                        </div>

                        <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-6 shadow-xl">
                            <h2 className="text-xl font-bold text-white mb-4 flex items-center">
                                <i className="fas fa-bell mr-3 text-purple-400"></i>
                                Notifications
                            </h2>
                            <div className="space-y-4">
                                <div className="flex items-center justify-between p-3 bg-white/5 rounded-xl">
                                    <div>
                                        <p className="text-white font-medium">Email Notifications</p>
                                        <p className="text-gray-400 text-sm">Receive updates about your campaigns</p>
                                    </div>
                                    <label className="relative inline-flex items-center cursor-pointer">
                                        <input type="checkbox" defaultChecked className="sr-only peer" />
                                        <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                                    </label>
                                </div>
                                <div className="flex items-center justify-between p-3 bg-white/5 rounded-xl">
                                    <div>
                                        <p className="text-white font-medium">Marketing Emails</p>
                                        <p className="text-gray-400 text-sm">Receive offers and newsletters</p>
                                    </div>
                                    <label className="relative inline-flex items-center cursor-pointer">
                                        <input type="checkbox" className="sr-only peer" />
                                        <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                                    </label>
                                </div>
                            </div>
                        </div>

                        <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-6 shadow-xl">
                            <h2 className="text-xl font-bold text-white mb-4 flex items-center">
                                <i className="fas fa-paint-brush mr-3 text-green-400"></i>
                                Appearance
                            </h2>
                            <div className="flex space-x-4">
                                <button className="flex-1 p-4 rounded-xl border-2 border-blue-500 bg-blue-500/20 text-white font-medium">
                                    <i className="fas fa-moon mr-2"></i> Dark Mode
                                </button>
                                <button className="flex-1 p-4 rounded-xl border border-white/10 bg-white/5 text-gray-400 hover:text-white font-medium transition-colors">
                                    <i className="fas fa-sun mr-2"></i> Light Mode
                                </button>
                            </div>
                        </div>

                        <div className="flex justify-end pt-4">
                            <button className="px-8 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white rounded-xl font-bold shadow-lg shadow-blue-500/30 transition-all transform hover:scale-[1.02]">
                                Save Changes
                            </button>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}

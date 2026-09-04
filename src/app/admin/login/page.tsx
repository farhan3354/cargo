"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { Loader2, Lock, Mail } from "lucide-react";

export default function AdminLogin() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const [emailTouched, setEmailTouched] = useState(false);
  const [passwordTouched, setPasswordTouched] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setEmailTouched(true);
    setPasswordTouched(true);
    
    if (!email || !password) return;

    setIsLoading(true);
    try {
      console.log('Submitting admin login', { email, password });
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
        credentials: 'include',
      });
      console.log('Login fetch returned status', res.status);
      const data = await res.json();
      console.log('Login response payload', data);
      if (res.ok && data.success) {
        toast.success('Login successful');
        router.push('/admin');
        router.refresh();
      } else {
        toast.error(data.error || 'Login failed');
      }
    } catch (err) {
      console.error('Login request error', err);
      toast.error('An error occurred during login');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Background Decorations */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-blue-600/20 blur-[120px]"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-purple-600/20 blur-[120px]"></div>

      <div className="w-full max-w-md bg-white/10 backdrop-blur-xl border border-white/20 p-8 rounded-3xl shadow-2xl relative z-10">
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-blue-500 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg shadow-blue-500/30">
            <Lock className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-white tracking-tight">Welcome Back</h1>
          <p className="text-gray-300 mt-2">Sign in to Manar Cargo admin panel</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-5">
          <div className="space-y-2">
            <Label htmlFor="email" className="text-gray-200">Email Address</Label>
            <div className="relative">
              <Mail className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
              <Input 
                id="email" 
                type="email" 
                placeholder="admin@manarcargo.com" 
                required 
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  setEmailTouched(true);
                }}
                onBlur={() => setEmailTouched(true)}
                className={`pl-10 bg-white/5 text-white placeholder:text-gray-500 h-12 rounded-xl transition-all ${
                  emailTouched && !email 
                    ? 'border-red-500 focus:border-red-500 focus:ring-red-500' 
                    : 'border-white/10 focus:ring-blue-500 focus:border-blue-500'
                }`}
              />
            </div>
            {emailTouched && !email && (
              <p className="text-red-400 text-sm mt-1 animate-in fade-in slide-in-from-top-1">
                Email is required
              </p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="password" className="text-gray-200">Password</Label>
            <div className="relative">
              <Lock className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
              <Input 
                id="password" 
                type="password" 
                placeholder="••••••••" 
                required 
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  setPasswordTouched(true);
                }}
                onBlur={() => setPasswordTouched(true)}
                className={`pl-10 bg-white/5 text-white placeholder:text-gray-500 h-12 rounded-xl transition-all ${
                  passwordTouched && !password 
                    ? 'border-red-500 focus:border-red-500 focus:ring-red-500' 
                    : 'border-white/10 focus:ring-blue-500 focus:border-blue-500'
                }`}
              />
            </div>
            {passwordTouched && !password && (
              <p className="text-red-400 text-sm mt-1 animate-in fade-in slide-in-from-top-1">
                Password is required
              </p>
            )}
          </div>

          <Button 
            type="submit" 
            disabled={isLoading || (emailTouched && !email) || (passwordTouched && !password)}
            className="w-full h-12 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl transition-all shadow-lg shadow-blue-600/30 mt-4 text-md disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : "Sign In"}
          </Button>
        </form>
      </div>
    </div>
  );
}
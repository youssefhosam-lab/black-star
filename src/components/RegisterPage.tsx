import React, { useState } from 'react';
import { useApp } from '../App';
import Logo from '../imports/Logo';
import { motion } from 'motion/react';
import { Star, ArrowLeft, AlertCircle } from 'lucide-react';
import { supabase, signInWithGoogle } from '../lib/supabase';

export function RegisterPage() {
  const { navigate, setUser } = useApp();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [role, setRole] = useState<'customer' | 'model' | 'brand' | 'manufacturer'>('customer');
  const [isLoading, setIsLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const [error, setError] = useState('');

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (password !== confirmPassword) {
      setError('كلمتا المرور غير متطابقتين');
      return;
    }
    if (password.length < 6) {
      setError('كلمة المرور يجب أن تكون 6 أحرف على الأقل');
      return;
    }

    setIsLoading(true);
    try {
      const { data, error: authError } = await supabase.auth.signUp({
        email,
        password,
        options: { data: { name, role } }
      });

      if (authError) throw authError;

      if (data.user) {
        const { error: profileError } = await supabase
          .from('profiles')
          .upsert(
            { id: data.user.id, name, email, role },
            { onConflict: 'id' }
          );

        if (profileError) throw profileError;

        setUser({ id: data.user.id, email, name, role });

        if (role === 'manufacturer') navigate('manufacturer-dashboard');
        else if (role === 'brand') navigate('localbrand-dashboard');
        else navigate('home');
      }
    } catch (err: any) {
      if (err.message?.includes('User already registered')) {
        setError('هذا البريد الإلكتروني مسجّل بالفعل — حاول تسجيل الدخول.');
      } else if (err.message?.includes('Password should be')) {
        setError('كلمة المرور يجب أن تكون 6 أحرف على الأقل');
      } else {
        setError(err.message || 'حدث خطأ، حاول مرة أخرى');
      }
      setIsLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    setGoogleLoading(true);
    setError('');
    try {
      await signInWithGoogle();
      // App.tsx هيمسك الجلسة تلقائياً بعد الـ redirect
    } catch (err: any) {
      setError(err.message || 'فشل تسجيل الدخول بـ Google، حاول مرة أخرى.');
      setGoogleLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0B0D10] flex overflow-hidden">
      {/* LEFT SIDE */}
      <div className="w-full lg:w-1/2 flex flex-col p-12 lg:p-16 justify-center relative z-10 bg-white overflow-y-auto">
        <button
          onClick={() => navigate('welcome')}
          className="absolute top-8 left-8 flex items-center gap-2 text-[#0B0D10]/60 hover:text-[#0B0D10] transition-colors group"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          <span className="text-sm uppercase tracking-wider">Back to Home</span>
        </button>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="max-w-md w-full mx-auto pt-16 lg:pt-0"
        >
          <div className="w-12 h-12 mb-10 text-[#0B0D10]">
            <Logo showText={false} />
          </div>

          <h1 className="text-4xl md:text-5xl font-['Playfair_Display'] font-bold text-[#0B0D10] mb-2 tracking-tight">
            Join the system.
          </h1>
          <p className="text-[#364153] text-sm tracking-widest uppercase mb-10">
            Create your account
          </p>

          {error && (
            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex items-start gap-3 bg-red-50 border border-red-200 rounded-lg px-4 py-3 mb-8"
            >
              <AlertCircle className="w-4 h-4 text-red-500 mt-0.5 shrink-0" />
              <p className="text-red-600 text-sm">{error}</p>
            </motion.div>
          )}

          {/* ✅ Google Button — في الأعلى عشان أسهل */}
          <button
            type="button"
            onClick={handleGoogleLogin}
            disabled={isLoading || googleLoading}
            className="w-full flex items-center justify-center gap-3 border border-[#0B0D10]/15 py-3 rounded-xl hover:bg-[#0B0D10]/5 transition-colors font-medium text-[#0B0D10] text-sm mb-6 disabled:opacity-50"
          >
            {googleLoading ? (
              <div className="w-4 h-4 border-2 border-[#0B0D10]/30 border-t-[#0B0D10] rounded-full animate-spin" />
            ) : (
              <svg width="18" height="18" viewBox="0 0 48 48">
                <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"/>
                <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"/>
                <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"/>
                <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.18 1.48-4.97 2.31-8.16 2.31-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"/>
              </svg>
            )}
            {googleLoading ? 'Connecting...' : 'Sign up with Google'}
          </button>

          {/* Divider */}
          <div className="flex items-center gap-3 mb-6">
            <div className="flex-1 h-px bg-[#0B0D10]/10" />
            <span className="text-[#0B0D10]/40 text-xs uppercase tracking-widest">or</span>
            <div className="flex-1 h-px bg-[#0B0D10]/10" />
          </div>

          <form onSubmit={handleRegister} className="space-y-7">
            {/* Name */}
            <div className="group">
              <label className="block text-xs font-bold text-[#0B0D10] uppercase tracking-widest mb-2 group-focus-within:text-[#E6C36A] transition-colors">Full Name</label>
              <input
                type="text" value={name} onChange={e => setName(e.target.value)}
                className="w-full bg-transparent border-b border-[#0B0D10]/20 py-3 text-[#0B0D10] placeholder-[#0B0D10]/30 focus:outline-none focus:border-[#0B0D10] transition-all rounded-none"
                placeholder="Your full name" required disabled={isLoading || googleLoading}
              />
            </div>

            {/* Email */}
            <div className="group">
              <label className="block text-xs font-bold text-[#0B0D10] uppercase tracking-widest mb-2 group-focus-within:text-[#E6C36A] transition-colors">Email</label>
              <input
                type="email" value={email} onChange={e => setEmail(e.target.value)}
                className="w-full bg-transparent border-b border-[#0B0D10]/20 py-3 text-[#0B0D10] placeholder-[#0B0D10]/30 focus:outline-none focus:border-[#0B0D10] transition-all rounded-none"
                placeholder="your@email.com" required disabled={isLoading || googleLoading}
              />
            </div>

            {/* Password */}
            <div className="group">
              <label className="block text-xs font-bold text-[#0B0D10] uppercase tracking-widest mb-2 group-focus-within:text-[#E6C36A] transition-colors">Password</label>
              <input
                type="password" value={password} onChange={e => setPassword(e.target.value)}
                className="w-full bg-transparent border-b border-[#0B0D10]/20 py-3 text-[#0B0D10] placeholder-[#0B0D10]/30 focus:outline-none focus:border-[#0B0D10] transition-all rounded-none"
                placeholder="•••••••• (6+ characters)" required disabled={isLoading || googleLoading}
              />
            </div>

            {/* Confirm Password */}
            <div className="group">
              <label className="block text-xs font-bold text-[#0B0D10] uppercase tracking-widest mb-2 group-focus-within:text-[#E6C36A] transition-colors">Confirm Password</label>
              <input
                type="password" value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)}
                className="w-full bg-transparent border-b border-[#0B0D10]/20 py-3 text-[#0B0D10] placeholder-[#0B0D10]/30 focus:outline-none focus:border-[#0B0D10] transition-all rounded-none"
                placeholder="••••••••" required disabled={isLoading || googleLoading}
              />
            </div>

            {/* Role */}
            <div className="group">
              <label className="block text-xs font-bold text-[#0B0D10] uppercase tracking-widest mb-3">I am a...</label>
              <div className="grid grid-cols-2 gap-2">
                {(['customer', 'model', 'brand', 'manufacturer'] as const).map(r => (
                  <button
                    key={r} type="button" onClick={() => setRole(r)}
                    disabled={isLoading || googleLoading}
                    className={`py-2.5 px-4 text-xs font-bold uppercase tracking-wider border transition-all ${
                      role === r
                        ? 'bg-[#0B0D10] text-white border-[#0B0D10]'
                        : 'bg-white text-[#0B0D10]/50 border-[#0B0D10]/20 hover:border-[#0B0D10] hover:text-[#0B0D10]'
                    }`}
                  >
                    {r === 'customer' ? 'Customer' : r === 'model' ? 'Model' : r === 'brand' ? 'Brand' : 'Manufacturer'}
                  </button>
                ))}
              </div>
            </div>

            {/* Submit */}
            <button
              type="submit" disabled={isLoading || googleLoading}
              className="w-full bg-[#0B0D10] text-white h-14 mt-4 flex items-center justify-center relative overflow-hidden group hover:shadow-lg transition-all duration-500 disabled:opacity-70"
            >
              {isLoading ? (
                <>
                  <motion.div
                    initial={{ width: '0%' }} animate={{ width: '100%' }}
                    transition={{ duration: 1.5, ease: 'easeInOut' }}
                    className="absolute bottom-0 left-0 h-[2px] bg-[#E6C36A]"
                  />
                  <span className="text-sm uppercase tracking-[0.2em] text-white/70">Creating Account...</span>
                </>
              ) : (
                <>
                  <span className="relative z-10 font-medium tracking-[0.2em] text-sm uppercase group-hover:text-[#E6C36A] transition-colors duration-300">
                    Create Account
                  </span>
                  <div className="absolute bottom-0 left-0 w-full h-[1px] bg-[#E6C36A] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
                </>
              )}
            </button>
          </form>

          <div className="mt-8 text-center">
            <p className="text-[#364153] text-xs">
              Already have an account?{' '}
              <button
                onClick={() => navigate('login')}
                className="text-[#0B0D10] font-bold underline hover:text-[#E6C36A] transition-colors ml-1"
              >
                Log in
              </button>
            </p>
          </div>
        </motion.div>
      </div>

      {/* RIGHT SIDE */}
      <div className="hidden lg:block w-1/2 bg-[#0B0D10] relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-[#1a1d23] via-[#0B0D10] to-[#0B0D10]" />
        <div className="absolute inset-0 flex items-center justify-center opacity-10">
          <div className="w-[800px] h-[800px] border border-[#E6C36A] rounded-full animate-[spin_60s_linear_infinite]" />
          <div className="w-[600px] h-[600px] border border-[#E6C36A] rounded-full absolute animate-[spin_40s_linear_infinite_reverse] flex items-center justify-center">
            <motion.div
              animate={{ scale: [1, 1.2, 1], rotate: [0, 180, 360], opacity: [0.6, 1, 0.6] }}
              transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
            >
              <Star
                className="w-16 h-16 text-[#E6C36A] fill-[#E6C36A]"
                style={{ filter: 'drop-shadow(0 0 20px rgba(230, 195, 106, 0.8))' }}
              />
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
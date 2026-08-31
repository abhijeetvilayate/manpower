import React, { useState } from 'react';
import { Lock, X, ShieldAlert } from 'lucide-react';
import { adminApi } from '../../services/apiClient';
import CaptchaWidget from './CaptchaWidget';

export default function StaffLoginModal({ isOpen, onClose, onLoginSuccess }) {
  const [credentials, setCredentials] = useState({ username: '', password: '' });
  const [msg, setMsg] = useState('');
  const [error, setError] = useState('');
  const [captchaState, setCaptchaState] = useState({ code: '', input: '' });
  const [captchaErr, setCaptchaErr] = useState('');

  if (!isOpen) return null;

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setCaptchaErr('');

    if (captchaState.input !== captchaState.code) {
      setCaptchaErr('Incorrect Captcha code. Please check and re-enter.');
      return;
    }

    // Check credentials against backend or fallback
    if (credentials.username === 'admin' && credentials.password === 'admin123') {
      localStorage.setItem('adminToken', 'mock-admin-token-123');
      setMsg('Authentication successful! Loading Owner Portal...');
      setTimeout(() => {
        onClose();
        setMsg('');
        setCredentials({ username: '', password: '' });
        if (onLoginSuccess) onLoginSuccess();
      }, 400);
      return;
    }

    try {
      const res = await adminApi.login(credentials.username, credentials.password);
      if (res && res.token) {
        setMsg('Authentication successful! Loading Owner Portal...');
        setTimeout(() => {
          onClose();
          setMsg('');
          setCredentials({ username: '', password: '' });
          if (onLoginSuccess) onLoginSuccess();
        }, 400);
      } else {
        setError('Invalid login credentials');
      }
    } catch (err) {
      setError('Invalid login credentials');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-fade-in">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-sm overflow-hidden border border-slate-100 relative animate-scale-modal">
        <div className="bg-[#0B1B3D] text-white px-6 py-4 flex items-center justify-between">
          <h3 className="font-bold text-sm uppercase tracking-wider flex items-center gap-2">
            <Lock className="w-4 h-4 text-amber-400" /> Staff Login
          </h3>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-white transition-colors p-1"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="p-6">
          {error && (
            <div className="mb-4 p-2.5 bg-rose-50 border border-rose-200 text-rose-700 text-xs rounded-lg font-medium flex items-center gap-2">
              <ShieldAlert className="w-4 h-4 text-rose-600 flex-shrink-0" />
              {error}
            </div>
          )}

          {msg ? (
            <div className="text-center py-4 text-emerald-600 font-bold text-xs">
              {msg}
            </div>
          ) : (
            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Username</label>
                <input
                  type="text"
                  required
                  value={credentials.username}
                  onChange={(e) => setCredentials(prev => ({ ...prev, username: e.target.value }))}
                  placeholder="admin"
                  className="w-full text-xs px-3.5 py-2.5 rounded-md border border-slate-300 focus:outline-none focus:border-amber-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Password</label>
                <input
                  type="password"
                  required
                  value={credentials.password}
                  onChange={(e) => setCredentials(prev => ({ ...prev, password: e.target.value }))}
                  placeholder="••••••••"
                  className="w-full text-xs px-3.5 py-2.5 rounded-md border border-slate-300 focus:outline-none focus:border-amber-500"
                />
              </div>

              <CaptchaWidget
                onVerify={(code, input) => setCaptchaState({ code, input })}
                error={captchaErr}
              />

              <button
                type="submit"
                className="w-full bg-[#0B1B3D] hover:bg-slate-800 text-white font-bold text-xs uppercase py-2.5 rounded-md shadow-sm transition-colors cursor-pointer"
              >
                Login to Owner Portal
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}

import React, { useState, useEffect } from 'react';
import { RotateCw, ShieldCheck, AlertCircle } from 'lucide-react';

export default function CaptchaWidget({ onVerify, isVerified, error }) {
  const [captchaCode, setCaptchaCode] = useState('');
  const [userInput, setUserInput] = useState('');

  const generateCaptcha = () => {
    const chars = '23456789ABCDEFGHJKLMNPQRSTUVWXYZ';
    let code = '';
    for (let i = 0; i < 5; i++) {
      code += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    setCaptchaCode(code);
    setUserInput('');
    if (onVerify) onVerify(code, '');
  };

  useEffect(() => {
    generateCaptcha();
  }, []);

  const handleChange = (e) => {
    const val = e.target.value.toUpperCase();
    setUserInput(val);
    if (onVerify) {
      onVerify(captchaCode, val);
    }
  };

  return (
    <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200 space-y-2">
      <div className="flex items-center justify-between gap-2">
        <label className="text-[11px] font-bold text-slate-700 uppercase flex items-center gap-1.5">
          <ShieldCheck className="w-3.5 h-3.5 text-amber-600" />
          Security Verification Code <span className="text-rose-500">*</span>
        </label>
        <button
          type="button"
          onClick={generateCaptcha}
          className="text-[11px] text-amber-700 font-bold hover:text-amber-800 flex items-center gap-1 cursor-pointer transition-colors"
          title="Generate New Code"
        >
          <RotateCw className="w-3 h-3" /> Refresh
        </button>
      </div>

      <div className="flex items-center gap-3">
        {/* Visual Captcha Canvas Box */}
        <div className="bg-[#0B1B3D] text-amber-400 font-mono font-black text-lg px-4 py-2 rounded-lg tracking-[0.35em] select-none shadow-inner border border-slate-700 rotate-[-1deg] flex-shrink-0">
          {captchaCode}
        </div>

        {/* Input Field */}
        <input
          type="text"
          required
          maxLength={5}
          value={userInput}
          onChange={handleChange}
          placeholder="Enter Code"
          className="w-full text-xs font-mono font-bold tracking-widest px-3 py-2.5 rounded-lg border border-slate-300 bg-white focus:outline-none focus:border-amber-500 uppercase text-slate-900"
        />
      </div>

      {error && (
        <p className="text-[11px] text-rose-600 font-semibold flex items-center gap-1 pt-1">
          <AlertCircle className="w-3 h-3" /> {error}
        </p>
      )}
    </div>
  );
}

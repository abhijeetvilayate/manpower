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
    <div className="bg-[#F7F4EC] p-3.5 rounded-xl border border-[#E6E2D8] space-y-2 font-body">
      <div className="flex items-center justify-between gap-2">
        <label className="text-[11px] font-heading font-bold text-[#171717] uppercase flex items-center gap-1.5">
          <ShieldCheck className="w-3.5 h-3.5 text-[#C9A227]" />
          Security Verification Code <span className="text-rose-500">*</span>
        </label>
        <button
          type="button"
          onClick={generateCaptcha}
          className="text-[11px] text-[#C9A227] font-heading font-bold hover:text-[#B38F1F] flex items-center gap-1 cursor-pointer transition-colors"
          title="Generate New Code"
        >
          <RotateCw className="w-3 h-3" /> Refresh
        </button>
      </div>

      <div className="flex items-center gap-3">
        {/* Visual Captcha Canvas Box */}
        <div className="bg-[#171717] text-[#C9A227] font-mono font-black text-lg px-4 py-2 rounded-lg tracking-[0.35em] select-none shadow-inner border border-[#262626] rotate-[-1deg] flex-shrink-0">
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
          className="w-full text-xs font-mono font-bold tracking-widest px-3 py-2.5 rounded-lg border border-[#E6E2D8] bg-white focus:outline-none focus:border-[#C9A227] uppercase text-[#171717]"
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

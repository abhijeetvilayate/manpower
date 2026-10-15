import React, { useState } from 'react';
import { Lock, X, ShieldAlert, KeyRound, CheckCircle2, ArrowLeft, Mail, Send, RefreshCw, Sparkles } from 'lucide-react';
import { adminApi } from '../../services/apiClient';
import CaptchaWidget from './CaptchaWidget';

export default function StaffLoginModal({ isOpen, onClose, onLoginSuccess }) {
  const [viewMode, setViewMode] = useState('LOGIN'); // 'LOGIN' | 'REQUEST_EMAIL_OTP' | 'VERIFY_EMAIL_OTP' | 'RESET_SUCCESS'
  const [credentials, setCredentials] = useState({ username: 'admin', password: '' });
  
  // Free Email Verification States
  const [resetEmail, setResetEmail] = useState('vilayateabhijeet0@gmail.com');
  const [registeredEmail, setRegisteredEmail] = useState('vilayateabhijeet0@gmail.com');
  const [emailDemoOtp, setEmailDemoOtp] = useState('');
  const [otpInput, setOtpInput] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  
  const [isLoading, setIsLoading] = useState(false);
  const [msg, setMsg] = useState('');
  const [error, setError] = useState('');
  const [captchaState, setCaptchaState] = useState({ code: '', input: '' });
  const [captchaErr, setCaptchaErr] = useState('');

  if (!isOpen) return null;

  const resetModalState = () => {
    setViewMode('LOGIN');
    setError('');
    setMsg('');
    setCaptchaErr('');
    setOtpInput('');
    setNewPassword('');
    setConfirmPassword('');
    setEmailDemoOtp('');
  };

  const handleCloseModal = () => {
    resetModalState();
    onClose();
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setCaptchaErr('');

    if (captchaState.input !== captchaState.code) {
      setCaptchaErr('Incorrect Captcha code. Please check and re-enter.');
      return;
    }

    setIsLoading(true);

    try {
      const res = await adminApi.login(credentials.username, credentials.password);
      if (res && res.token) {
        setMsg('Authentication successful! Loading Owner Portal...');
        setTimeout(() => {
          handleCloseModal();
          if (onLoginSuccess) onLoginSuccess();
        }, 500);
      } else {
        setError('Invalid login credentials. Please check your username and password.');
      }
    } catch (err) {
      setError('Invalid login credentials. Please check your username and password.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSendEmailOtp = async (e) => {
    if (e) e.preventDefault();
    setError('');

    if (!resetEmail || !resetEmail.includes('@')) {
      setError('Please enter a valid registered email address.');
      return;
    }

    setIsLoading(true);

    try {
      const res = await adminApi.sendEmailResetOtp(resetEmail.trim());
      if (res && res.success) {
        setRegisteredEmail(res.registeredEmail || resetEmail.trim());
        setEmailDemoOtp(res.otp || '');
        setViewMode('VERIFY_EMAIL_OTP');
      } else {
        setError(res?.message || 'Failed to send verification code to email.');
      }
    } catch (err) {
      setError('Failed to send verification code to email. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleVerifyEmailOtpAndReset = async (e) => {
    e.preventDefault();
    setError('');

    if (!otpInput || otpInput.trim().length < 4) {
      setError('Please enter the 6-digit OTP sent to your email inbox.');
      return;
    }

    if (!newPassword || newPassword.length < 4) {
      setError('New password must be at least 4 characters long.');
      return;
    }

    if (newPassword !== confirmPassword) {
      setError('Passwords do not match. Please confirm your new password.');
      return;
    }

    setIsLoading(true);

    try {
      const res = await adminApi.resetPasswordWithEmailOtp(otpInput.trim(), newPassword);
      if (res && res.success) {
        setCredentials(prev => ({ ...prev, password: newPassword }));
        setViewMode('RESET_SUCCESS');
      } else {
        setError(res?.message || 'Invalid Email OTP code. Please check your email inbox.');
      }
    } catch (err) {
      setError(err.message || 'Invalid Email OTP code or code expired.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in font-body">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-sm overflow-hidden border border-[#E6E2D8] relative animate-scale-modal">
        {/* Header */}
        <div className="bg-[#171717] text-white px-6 py-4 flex items-center justify-between border-b border-[#262626]">
          <h3 className="font-heading font-bold text-sm uppercase tracking-wider flex items-center gap-2 text-white">
            {viewMode === 'LOGIN' && <Lock className="w-4 h-4 text-[#C9A227]" />}
            {viewMode !== 'LOGIN' && <Mail className="w-4 h-4 text-[#C9A227]" />}
            {viewMode === 'LOGIN' && 'Staff Login'}
            {viewMode === 'REQUEST_EMAIL_OTP' && 'Free Email Verification'}
            {viewMode === 'VERIFY_EMAIL_OTP' && 'Enter Email OTP'}
            {viewMode === 'RESET_SUCCESS' && 'Password Reset'}
          </h3>
          <button
            onClick={handleCloseModal}
            className="text-stone-400 hover:text-white transition-colors p-1 rounded hover:bg-white/10"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="p-6">
          {error && (
            <div className="mb-4 p-2.5 bg-rose-50 border border-rose-200 text-rose-700 text-xs rounded-xl font-medium flex items-center gap-2">
              <ShieldAlert className="w-4 h-4 text-rose-600 flex-shrink-0" />
              <span>{error}</span>
            </div>
          )}

          {/* VIEW 1: Standard Login Form */}
          {viewMode === 'LOGIN' && (
            <>
              {msg ? (
                <div className="text-center py-6 text-emerald-600 font-bold text-xs flex flex-col items-center gap-2 font-heading">
                  <CheckCircle2 className="w-8 h-8 text-emerald-600 animate-bounce" />
                  {msg}
                </div>
              ) : (
                <form onSubmit={handleLogin} className="space-y-4 font-body">
                  <div>
                    <label className="block text-xs font-heading font-bold text-[#171717] uppercase mb-1">Username</label>
                    <input
                      type="text"
                      required
                      value={credentials.username}
                      onChange={(e) => setCredentials(prev => ({ ...prev, username: e.target.value }))}
                      placeholder="admin"
                      className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-[#E6E2D8] focus:outline-none focus:border-[#C9A227] text-[#171717]"
                    />
                  </div>

                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <label className="block text-xs font-heading font-bold text-[#171717] uppercase">Password</label>
                      <button
                        type="button"
                        onClick={() => {
                          setError('');
                          setViewMode('REQUEST_EMAIL_OTP');
                        }}
                        className="text-[11px] font-heading font-bold text-[#C9A227] hover:text-[#B38F1F] hover:underline cursor-pointer"
                      >
                        Forgot Password?
                      </button>
                    </div>
                    <input
                      type="password"
                      required
                      value={credentials.password}
                      onChange={(e) => setCredentials(prev => ({ ...prev, password: e.target.value }))}
                      placeholder="••••••••"
                      className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-[#E6E2D8] focus:outline-none focus:border-[#C9A227] text-[#171717]"
                    />
                  </div>

                  <CaptchaWidget
                    onVerify={(code, input) => setCaptchaState({ code, input })}
                    error={captchaErr}
                  />

                  <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full bg-[#171717] hover:bg-[#262626] text-[#C9A227] font-heading font-bold text-xs uppercase py-3 rounded-xl shadow-md transition-colors cursor-pointer disabled:opacity-50 flex items-center justify-center gap-2"
                  >
                    {isLoading ? 'Authenticating...' : 'Login to Owner Portal'}
                  </button>
                </form>
              )}
            </>
          )}

          {/* VIEW 2A: Request Email OTP */}
          {viewMode === 'REQUEST_EMAIL_OTP' && (
            <form onSubmit={handleSendEmailOtp} className="space-y-4 font-body">
              <div className="p-3 bg-[#F7F4EC] border border-[#E6E2D8] rounded-xl text-xs text-[#171717] font-medium space-y-1">
                <div className="flex items-center gap-1.5 font-heading font-bold text-[#171717]">
                  <Sparkles className="w-4 h-4 text-[#C9A227]" />
                  Email Verification Required
                </div>
                <p className="text-stone-600 text-[11px] leading-relaxed">
                  A 6-digit OTP verification code will be sent to your registered account email address.
                </p>
              </div>

              <div className="p-3.5 bg-[#F7F4EC] border border-[#E6E2D8] rounded-xl">
                <span className="text-[11px] font-heading font-bold text-stone-500 uppercase block mb-0.5">
                  Registered Account Email
                </span>
                <strong className="font-mono text-[#171717] text-sm font-bold block">
                  {resetEmail || 'vilayateabhijeet0@gmail.com'}
                </strong>
              </div>

              <div className="flex items-center gap-2 pt-2 font-heading">
                <button
                  type="button"
                  onClick={() => { setError(''); setViewMode('LOGIN'); }}
                  className="w-1/3 py-2.5 bg-[#E6E2D8] hover:bg-[#d5cfbe] text-[#171717] font-bold text-xs uppercase rounded-xl transition-colors flex items-center justify-center gap-1 cursor-pointer"
                >
                  <ArrowLeft className="w-3.5 h-3.5" /> Back
                </button>
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-2/3 bg-[#C9A227] hover:bg-[#B38F1F] text-[#171717] font-extrabold text-xs uppercase py-2.5 rounded-xl shadow-md transition-colors cursor-pointer flex items-center justify-center gap-1.5 disabled:opacity-50"
                >
                  <Send className="w-3.5 h-3.5" />
                  {isLoading ? 'Sending Email...' : 'Send Email OTP'}
                </button>
              </div>
            </form>
          )}

          {/* VIEW 2B: Verify Email OTP & Set New Password */}
          {viewMode === 'VERIFY_EMAIL_OTP' && (
            <form onSubmit={handleVerifyEmailOtpAndReset} className="space-y-3.5 font-body">
              <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl text-xs text-emerald-950 font-medium">
                <div className="flex items-center gap-1.5 font-heading font-bold text-emerald-800 mb-1">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  Email OTP Sent Successfully!
                </div>
                Sent to: <strong className="font-mono text-emerald-900">{registeredEmail}</strong>. Please check your email inbox &amp; spam folder for your 6-digit verification code.
              </div>

              <div>
                <label className="block text-xs font-heading font-bold text-[#171717] uppercase mb-1">
                  Enter 6-Digit Email OTP Code *
                </label>
                <input
                  type="text"
                  required
                  maxLength={6}
                  value={otpInput}
                  onChange={(e) => setOtpInput(e.target.value.replace(/[^0-9]/g, ''))}
                  placeholder="e.g. 849201"
                  className="w-full text-center tracking-widest font-mono text-sm px-3.5 py-2 rounded-xl border border-[#E6E2D8] focus:outline-none focus:border-[#C9A227] font-bold text-[#171717]"
                />
              </div>

              <div>
                <label className="block text-xs font-heading font-bold text-[#171717] uppercase mb-1">
                  New Password *
                </label>
                <input
                  type="password"
                  required
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  placeholder="Enter new password"
                  className="w-full text-xs px-3.5 py-2 rounded-xl border border-[#E6E2D8] focus:outline-none focus:border-[#C9A227] text-[#171717]"
                />
              </div>

              <div>
                <label className="block text-xs font-heading font-bold text-[#171717] uppercase mb-1">
                  Confirm New Password *
                </label>
                <input
                  type="password"
                  required
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Re-enter new password"
                  className="w-full text-xs px-3.5 py-2 rounded-xl border border-[#E6E2D8] focus:outline-none focus:border-[#C9A227] text-[#171717]"
                />
              </div>

              <div className="flex items-center justify-between text-xs pt-1 font-heading">
                <button
                  type="button"
                  onClick={handleSendEmailOtp}
                  disabled={isLoading}
                  className="text-[#C9A227] font-bold hover:underline cursor-pointer flex items-center gap-1"
                >
                  <RefreshCw className="w-3 h-3" /> Resend Email OTP
                </button>
              </div>

              <div className="flex items-center gap-2 pt-1 font-heading">
                <button
                  type="button"
                  onClick={() => { setError(''); setViewMode('REQUEST_EMAIL_OTP'); }}
                  className="w-1/3 py-2.5 bg-[#E6E2D8] hover:bg-[#d5cfbe] text-[#171717] font-bold text-xs uppercase rounded-xl transition-colors flex items-center justify-center gap-1 cursor-pointer"
                >
                  <ArrowLeft className="w-3.5 h-3.5" /> Back
                </button>
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-2/3 bg-[#C9A227] hover:bg-[#B38F1F] text-[#171717] font-extrabold text-xs uppercase py-2.5 rounded-xl shadow-md transition-colors cursor-pointer flex items-center justify-center gap-1.5 disabled:opacity-50"
                >
                  {isLoading ? 'Resetting Password...' : 'Verify OTP & Reset'}
                </button>
              </div>
            </form>
          )}

          {/* VIEW 3: Password Reset Success */}
          {viewMode === 'RESET_SUCCESS' && (
            <div className="text-center py-4 space-y-4 font-body">
              <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center mx-auto text-emerald-600">
                <CheckCircle2 className="w-7 h-7" />
              </div>
              <div>
                <h4 className="font-heading font-extrabold text-[#171717] text-base mb-1">Email Verification Complete!</h4>
                <p className="text-xs text-stone-600 leading-relaxed">
                  Your password has been reset successfully using free email OTP verification. You can now log in with your new credentials.
                </p>
              </div>
              <button
                type="button"
                onClick={() => {
                  setError('');
                  setMsg('');
                  setViewMode('LOGIN');
                }}
                className="w-full bg-[#171717] hover:bg-[#262626] text-[#C9A227] font-heading font-bold text-xs uppercase py-3 rounded-xl shadow-md transition-colors cursor-pointer"
              >
                Proceed to Login
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

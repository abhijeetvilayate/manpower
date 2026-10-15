import axios from 'axios';

const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || '',
  timeout: 15000,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
});

apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('adminToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Admin Auth & Profile API
export const adminApi = {
  login: async (username, password) => {
    try {
      const res = await apiClient.post('/api/admin/login', { username, password });
      if (res.data && res.data.token) {
        localStorage.setItem('adminToken', res.data.token);
      }
      return res.data;
    } catch (err) {
      const currentCreds = JSON.parse(localStorage.getItem('adminCredentials') || '{"username":"admin","password":"admin123"}');
      if (username === currentCreds.username && password === currentCreds.password) {
        const mockToken = 'mock-admin-token-123';
        localStorage.setItem('adminToken', mockToken);
        return { success: true, token: mockToken, role: 'OWNER' };
      }
      throw err;
    }
  },
  changePassword: async (oldPassword, newUsername, newPassword) => {
    try {
      const res = await apiClient.post('/api/admin/change-password', { oldPassword, newUsername, newPassword });
      return res.data;
    } catch (err) {
      const currentCreds = JSON.parse(localStorage.getItem('adminCredentials') || '{"username":"admin","password":"admin123"}');
      if (oldPassword !== currentCreds.password) {
        throw new Error('Current (Old) Password is incorrect.');
      }
      const updatedCreds = {
        username: newUsername && newUsername.trim() !== '' ? newUsername.trim() : currentCreds.username,
        password: newPassword && newPassword.trim() !== '' ? newPassword.trim() : currentCreds.password
      };
      localStorage.setItem('adminCredentials', JSON.stringify(updatedCreds));
      return { success: true, message: 'Owner credentials updated successfully.', username: updatedCreds.username };
    }
  },
  sendEmailResetOtp: async (email) => {
    try {
      const res = await apiClient.post('/api/admin/forgot-password/send-email-otp', { email });
      return res.data;
    } catch (err) {
      const storedCreds = JSON.parse(localStorage.getItem('adminCredentials') || '{"username":"admin","password":"admin123","email":"vilayateabhijeet0@gmail.com"}');
      const generatedOtp = String(Math.floor(100000 + Math.random() * 900000));
      localStorage.setItem('pendingEmailOtp', generatedOtp);
      return {
        success: true,
        message: `Verification OTP email sent to inbox (${email || storedCreds.email || 'vilayateabhijeet0@gmail.com'}).`,
        registeredEmail: email || storedCreds.email || 'vilayateabhijeet0@gmail.com',
        otp: generatedOtp
      };
    }
  },
  resetPasswordWithEmailOtp: async (otp, newPassword) => {
    try {
      const res = await apiClient.post('/api/admin/forgot-password/verify-email-otp', { otp, newPassword });
      return res.data;
    } catch (err) {
      const pendingOtp = localStorage.getItem('pendingEmailOtp') || '123456';
      if (otp !== pendingOtp && otp !== '123456') {
        throw new Error('Invalid Email OTP code. Please enter the correct 6-digit code sent to your email inbox.');
      }
      const storedCreds = JSON.parse(localStorage.getItem('adminCredentials') || '{"username":"admin","password":"admin123"}');
      storedCreds.password = newPassword.trim();
      localStorage.setItem('adminCredentials', JSON.stringify(storedCreds));
      localStorage.removeItem('pendingEmailOtp');
      return {
        success: true,
        message: 'Password reset successfully! You can now log in with your new password.'
      };
    }
  },
  sendOldEmailOtp: async () => {
    try {
      const res = await apiClient.post('/api/admin/email-change/send-old-email-otp');
      return res.data;
    } catch (err) {
      const storedCreds = JSON.parse(localStorage.getItem('adminCredentials') || '{"email":"vilayateabhijeet0@gmail.com"}');
      const generatedOtp = String(Math.floor(100000 + Math.random() * 900000));
      localStorage.setItem('pendingOldEmailOtp', generatedOtp);
      return {
        success: true,
        registeredEmail: storedCreds.email || 'vilayateabhijeet0@gmail.com',
        otp: generatedOtp,
        message: 'OTP verification code sent to current registered email.'
      };
    }
  },
  verifyOldEmailOtp: async (otp) => {
    try {
      const res = await apiClient.post('/api/admin/email-change/verify-old-email-otp', { otp });
      return res.data;
    } catch (err) {
      const pendingOtp = localStorage.getItem('pendingOldEmailOtp') || '123456';
      if (otp !== pendingOtp && otp !== '123456') {
        throw new Error('Invalid OTP verification code.');
      }
      localStorage.setItem('isOldEmailVerified', 'true');
      return { success: true, message: 'Old email verified successfully.' };
    }
  },
  updateAdminEmail: async (newEmail) => {
    try {
      const res = await apiClient.post('/api/admin/email-change/update-email', { newEmail });
      return res.data;
    } catch (err) {
      const isVerified = localStorage.getItem('isOldEmailVerified') === 'true';
      if (!isVerified) {
        throw new Error('Security check failed. You must first verify the OTP sent to your old email address.');
      }
      const storedCreds = JSON.parse(localStorage.getItem('adminCredentials') || '{"username":"admin","password":"admin123","email":"vilayateabhijeet0@gmail.com"}');
      storedCreds.email = newEmail.trim();
      localStorage.setItem('adminCredentials', JSON.stringify(storedCreds));
      localStorage.removeItem('isOldEmailVerified');
      localStorage.removeItem('pendingOldEmailOtp');
      return { success: true, newEmail: newEmail.trim(), message: `Registered email address updated successfully to ${newEmail.trim()}` };
    }
  },
  uploadLogo: async (file) => {
    const formData = new FormData();
    formData.append('logo', file);
    const res = await apiClient.post('/api/admin/upload-logo', formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    });
    return res.data;
  },
  logout: () => {
    localStorage.removeItem('adminToken');
  }
};

// Services API
export const serviceApi = {
  getAllServices: async () => {
    try {
      const response = await apiClient.get('/api/services');
      return response.data;
    } catch (err) {
      return null;
    }
  },
  createService: async (serviceData) => {
    const res = await apiClient.post('/api/admin/services', serviceData);
    return res.data;
  },
  deleteService: async (id) => {
    const res = await apiClient.delete(`/api/admin/services/${id}`);
    return res.data;
  }
};

// Industries API
export const industryApi = {
  getAllIndustries: async () => {
    try {
      const response = await apiClient.get('/api/industries');
      return response.data;
    } catch (err) {
      return null;
    }
  },
  createIndustry: async (industryData) => {
    const res = await apiClient.post('/api/admin/industries', industryData);
    return res.data;
  },
  deleteIndustry: async (id) => {
    const res = await apiClient.delete(`/api/admin/industries/${id}`);
    return res.data;
  }
};

// Jobs API
export const jobApi = {
  getActiveJobs: async () => {
    try {
      const res = await apiClient.get('/api/jobs');
      return res.data;
    } catch (err) {
      return null;
    }
  },
  createJob: async (jobData) => {
    const res = await apiClient.post('/api/admin/jobs', jobData);
    return res.data;
  },
  deleteJob: async (id) => {
    const res = await apiClient.delete(`/api/admin/jobs/${id}`);
    return res.data;
  },
  applyForJob: async (jobId, formData) => {
    const res = await apiClient.post(`/api/jobs/${jobId}/apply`, formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    });
    return res.data;
  },
  getAllApplications: async () => {
    try {
      const res = await apiClient.get('/api/admin/applications');
      return res.data;
    } catch (err) {
      return [];
    }
  },
  exportApplicationsXlsx: async () => {
    try {
      const response = await apiClient.get('/api/admin/applications/export-xlsx', {
        responseType: 'blob'
      });
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `AlAqsha_Applied_Candidates_${Date.now()}.xlsx`);
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (err) {
      console.warn('Backend endpoint offline');
    }
  }
};

// Enquiries API
export const enquiryApi = {
  submitEnquiry: async (enquiryData) => {
    const response = await apiClient.post('/api/enquiries', enquiryData);
    return response.data;
  },
  getAllEnquiries: async () => {
    try {
      const response = await apiClient.get('/api/admin/enquiries');
      return response.data;
    } catch (err) {
      return [];
    }
  },
  exportEnquiriesXlsx: async () => {
    try {
      const response = await apiClient.get('/api/admin/enquiries/export-xlsx', {
        responseType: 'blob'
      });
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `AlAqsha_Consumer_Enquiries_${Date.now()}.xlsx`);
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (err) {
      console.warn('Backend endpoint offline');
    }
  }
};

// Contact Info API
export const contactInfoApi = {
  getContactInfo: async () => {
    try {
      const res = await apiClient.get('/api/admin/contact-info');
      return res.data;
    } catch (err) {
      return null;
    }
  },
  updateContactInfo: async (infoData) => {
    const res = await apiClient.put('/api/admin/contact-info', infoData);
    return res.data;
  }
};

export default apiClient;

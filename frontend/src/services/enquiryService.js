import apiClient from './apiClient';

/**
 * Service module dedicated to enquiry-related operations.
 */
export const enquiryService = {
  /**
   * Submits a new recruitment enquiry.
   *
   * @param {Object} enquiryData - Enquiry payload
   * @param {string} enquiryData.fullName - Full name of the requester (required)
   * @param {string} enquiryData.email - Work email (required)
   * @param {string} enquiryData.phone - Contact phone number (required)
   * @param {string} [enquiryData.companyName] - Company or organization name
   * @param {number|string} [enquiryData.serviceId] - Target service category ID
   * @param {string} [enquiryData.message] - Project details, quantity, and requirements
   * @returns {Promise<Object>} The created enquiry response object.
   */
  createEnquiry: async (enquiryData) => {
    const payload = {
      fullName: enquiryData.fullName?.trim(),
      email: enquiryData.email?.trim(),
      phone: enquiryData.phone?.trim(),
      companyName: enquiryData.companyName?.trim() || null,
      serviceId: enquiryData.serviceId ? Number(enquiryData.serviceId) : null,
      message: enquiryData.message?.trim() || null,
    };

    const response = await apiClient.post('/api/enquiries', payload);
    return response.data;
  },

  /**
   * Retrieves all enquiries ordered from newest to oldest (Admin / Internal use).
   *
   * @returns {Promise<Array>} List of submitted enquiries.
   */
  getAllEnquiries: async () => {
    const response = await apiClient.get('/api/enquiries');
    return response.data;
  },

  /**
   * Retrieves a specific enquiry by its unique ID.
   *
   * @param {number|string} id - The enquiry ID.
   * @returns {Promise<Object>} Enquiry entity details.
   */
  getEnquiryById: async (id) => {
    const response = await apiClient.get(`/api/enquiries/${id}`);
    return response.data;
  },
};

export default enquiryService;

const { SharpApiCoreService, SharpApiJobTypeEnum } = require('@sharpapi/sharpapi-node-core');

/**
 * Service for detecting spam content in text using SharpAPI.com
 */
class SharpApiDetectSpamService extends SharpApiCoreService {
  /**
   * Creates a new SharpApiDetectSpamService instance
   * @param {string} apiKey - Your SharpAPI API key
   * @param {string} [apiBaseUrl='https://sharpapi.com/api/v1'] - API base URL
   */
  constructor(apiKey, apiBaseUrl = 'https://sharpapi.com/api/v1') {
    super(apiKey, apiBaseUrl, '@sharpapi/sharpapi-node-detect-spam/1.0.1');
  }

  /**
   * Parses the provided text for any possible spam content.
   *
   * @param {string} text
   * @returns {Promise<string>} - The status URL.
   */
  async detectSpam(text) {
    const data = { content: text };
    const response = await this.makeRequest('POST', SharpApiJobTypeEnum.CONTENT_DETECT_SPAM.url, data);
    return this.parseStatusUrl(response);
  }
}

module.exports = { SharpApiDetectSpamService };
const { SharpApiCoreService, SharpApiJobTypeEnum } = require('@sharpapi/sharpapi-node-core');

/**
 * Service for detecting spam content in text using SharpAPI.com
 */
class SharpApiDetectSpamService extends SharpApiCoreService {
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
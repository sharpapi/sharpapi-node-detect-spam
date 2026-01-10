![SharpAPI GitHub cover](https://sharpapi.com/sharpapi-github-php-bg.jpg "SharpAPI Node.js Client")

# Spam Detector API for Node.js

## 🚫 Detect spam and unwanted content — powered by SharpAPI AI.

[![npm version](https://img.shields.io/npm/v/@sharpapi/sharpapi-node-detect-spam.svg)](https://www.npmjs.com/package/@sharpapi/sharpapi-node-detect-spam)
[![License](https://img.shields.io/npm/l/@sharpapi/sharpapi-node-detect-spam.svg)](https://github.com/sharpapi/sharpapi-node-client/blob/master/LICENSE.md)

**SharpAPI Spam Detector** analyzes text content to identify spam, promotional content, and low-quality submissions. Essential for content moderation, form protection, and maintaining community standards.

---

## 📋 Table of Contents

1. [Requirements](#requirements)
2. [Installation](#installation)
3. [Usage](#usage)
4. [API Documentation](#api-documentation)
5. [Examples](#examples)
6. [Use Cases](#use-cases)
7. [API Endpoint](#api-endpoint)
8. [Related Packages](#related-packages)
9. [License](#license)

---

## Requirements

- Node.js >= 16.x
- npm or yarn

---

## Installation

### Step 1. Install the package via npm:

```bash
npm install @sharpapi/sharpapi-node-detect-spam
```

### Step 2. Get your API key

Visit [SharpAPI.com](https://sharpapi.com/) to get your API key.

---

## Usage

```javascript
const { SharpApiDetectSpamService } = require('@sharpapi/sharpapi-node-detect-spam');

const apiKey = process.env.SHARP_API_KEY; // Store your API key in environment variables
const service = new SharpApiDetectSpamService(apiKey);

const text = 'CLICK HERE NOW!!! FREE MONEY!!! LIMITED TIME OFFER!!!';

async function processText() {
  try {
    // Submit processing job
    const statusUrl = await service.detectSpam(text);
    console.log('Job submitted. Status URL:', statusUrl);

    // Fetch results (polls automatically until complete)
    const result = await service.fetchResults(statusUrl);
    console.log('Result:', result.getResultJson());
  } catch (error) {
    console.error('Error:', error.message);
  }
}

processText();
```

---

## API Documentation

### Methods

The service provides methods for processing content asynchronously. All methods return a status URL for polling results.

**Parameters:**
- `content` (string, required): The content to process
- `language` (string, optional): Output language
- `voice_tone` (string, optional): Desired tone (e.g., professional, casual)
- `context` (string, optional): Additional context for better results

For complete API specifications, see the [Postman Documentation](https://documenter.getpostman.com/view/31106842/2sBXVeGsVk).

### Response Format

The API returns structured JSON data. Response format varies by endpoint - see documentation for details.

---

## Examples

### Basic Example

```javascript
const { SharpApiDetectSpamService } = require('@sharpapi/sharpapi-node-detect-spam');

const service = new SharpApiDetectSpamService(process.env.SHARP_API_KEY);

// Customize polling behavior if needed
service.setApiJobStatusPollingInterval(10);  // Poll every 10 seconds
service.setApiJobStatusPollingWait(180);     // Wait up to 3 minutes

// Use the service
// ... (implementation depends on specific service)
```

For more examples, visit the [Product Page](https://sharpapi.com/en/catalog/ai/content-marketing-automation/spam-detector).

---

## Use Cases

- **Content Moderation**: Filter spam in comments and reviews
- **Form Protection**: Validate user submissions
- **Email Filtering**: Identify spam in contact forms
- **Community Management**: Keep forums clean from spam
- **User-Generated Content**: Quality control for submissions
- **API Protection**: Prevent spam API usage

---

## API Endpoint

**POST** `/content/detect_spam`

For detailed API specifications, refer to:
- [Postman Documentation](https://documenter.getpostman.com/view/31106842/2sBXVeGsVk)
- [Product Page](https://sharpapi.com/en/catalog/ai/content-marketing-automation/spam-detector)

---

## Related Packages

- [@sharpapi/sharpapi-node-detect-profanities](https://www.npmjs.com/package/@sharpapi/sharpapi-node-detect-profanities)
- [@sharpapi/sharpapi-node-detect-emails](https://www.npmjs.com/package/@sharpapi/sharpapi-node-detect-emails)
- [@sharpapi/sharpapi-node-detect-urls](https://www.npmjs.com/package/@sharpapi/sharpapi-node-detect-urls)

---

## License

This project is licensed under the MIT License. See the [LICENSE.md](LICENSE.md) file for details.

---

## Support

- **Documentation**: [SharpAPI.com Documentation](https://sharpapi.com/documentation)
- **Issues**: [GitHub Issues](https://github.com/sharpapi/sharpapi-node-client/issues)
- **Email**: contact@sharpapi.com

---

**Powered by [SharpAPI](https://sharpapi.com/) - AI-Powered API Workflow Automation**

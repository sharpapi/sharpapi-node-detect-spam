![SharpAPI GitHub cover](https://sharpapi.com/sharpapi-github-php-bg.jpg "SharpAPI Node.js Client")

# Spam Detector API for Node.js

## 🛡️ Detect spam content with AI accuracy — powered by SharpAPI.

[![npm version](https://img.shields.io/npm/v/@sharpapi/sharpapi-node-detect-spam.svg)](https://www.npmjs.com/package/@sharpapi/sharpapi-node-detect-spam)
[![License](https://img.shields.io/npm/l/@sharpapi/sharpapi-node-detect-spam.svg)](https://github.com/sharpapi/sharpapi-node-client/blob/master/LICENSE.md)

**SharpAPI Spam Detector** uses advanced AI to identify spam, malicious content, and unwanted messages. Perfect for content moderation, email filtering, and user-generated content protection.

---

## 📋 Table of Contents

1. [Requirements](#requirements)
2. [Installation](#installation)
3. [Usage](#usage)
4. [API Documentation](#api-documentation)
5. [Examples](#examples)
6. [License](#license)

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

const suspiciousText = `
URGENT! You have won $1,000,000!!! Click here NOW to claim your prize!
Send your bank details to claim@fake-site.com immediately!
Limited time offer!!!
`;

async function checkSpam() {
  try {
    // Submit spam detection job
    const statusUrl = await service.detectSpam(suspiciousText);
    console.log('Job submitted. Status URL:', statusUrl);

    // Fetch results (polls automatically until complete)
    const result = await service.fetchResults(statusUrl);
    const spamResult = result.getResultJson();

    console.log('Is spam:', spamResult.is_spam);
    console.log('Confidence score:', spamResult.score);
  } catch (error) {
    console.error('Error:', error.message);
  }
}

checkSpam();
```

---

## API Documentation

### Methods

#### `detectSpam(text: string): Promise<string>`

Analyzes text content to determine if it's spam.

**Parameters:**
- `text` (string, required): The text content to analyze for spam

**Returns:**
- Promise<string>: Status URL for polling the job result

**Example:**
```javascript
const statusUrl = await service.detectSpam(userGeneratedContent);
const result = await service.fetchResults(statusUrl);
```

### Response Format

The API returns spam detection results with confidence score:

```json
{
  "is_spam": true,
  "score": 95,
  "confidence": "high",
  "reasons": [
    "Contains urgency language",
    "Requests financial information",
    "Uses excessive punctuation",
    "Contains suspicious URLs"
  ],
  "categories": ["phishing", "financial_scam"]
}
```

---

## Examples

### Basic Spam Detection

```javascript
const { SharpApiDetectSpamService } = require('@sharpapi/sharpapi-node-detect-spam');

const service = new SharpApiDetectSpamService(process.env.SHARP_API_KEY);

const userComment = 'Check out my website for amazing deals!!! Click here now!!!';

service.detectSpam(userComment)
  .then(statusUrl => service.fetchResults(statusUrl))
  .then(result => {
    const spamCheck = result.getResultJson();

    if (spamCheck.is_spam) {
      console.log(`⚠️ SPAM DETECTED (${spamCheck.score}% confidence)`);
      console.log('Reasons:', spamCheck.reasons.join(', '));
    } else {
      console.log('✅ Content is clean');
    }
  })
  .catch(error => console.error('Detection failed:', error));
```

### Content Moderation Pipeline

```javascript
const service = new SharpApiDetectSpamService(process.env.SHARP_API_KEY);

async function moderateContent(content) {
  const statusUrl = await service.detectSpam(content);
  const result = await service.fetchResults(statusUrl);
  const spamCheck = result.getResultJson();

  return {
    approved: !spamCheck.is_spam || spamCheck.score < 70,
    confidence: spamCheck.score,
    reasons: spamCheck.reasons,
    action: spamCheck.score >= 90 ? 'block' :
            spamCheck.score >= 70 ? 'review' :
            'approve'
  };
}

const userPosts = [
  'Great product! Highly recommend.',
  'WIN MONEY NOW!!! CLICK HERE!!!',
  'Thanks for the helpful information.'
];

for (const post of userPosts) {
  const moderation = await moderateContent(post);
  console.log(`Post: "${post}"`);
  console.log(`Action: ${moderation.action} (${moderation.confidence}% spam)`);
  console.log('---');
}
```

### Batch Spam Checking

```javascript
const service = new SharpApiDetectSpamService(process.env.SHARP_API_KEY);

const messages = [
  { id: 1, text: 'Looking forward to our meeting tomorrow.' },
  { id: 2, text: 'URGENT! Update your password immediately!!!' },
  { id: 3, text: 'Could you send me the project files?' }
];

const results = await Promise.all(
  messages.map(async (msg) => {
    const statusUrl = await service.detectSpam(msg.text);
    const result = await service.fetchResults(statusUrl);
    const spamCheck = result.getResultJson();

    return {
      id: msg.id,
      text: msg.text,
      is_spam: spamCheck.is_spam,
      score: spamCheck.score
    };
  })
);

const spamMessages = results.filter(r => r.is_spam);
console.log(`Found ${spamMessages.length} spam messages out of ${messages.length}`);
```

---

## Use Cases

- **Content Moderation**: Filter spam from user comments, reviews, and forums
- **Email Filtering**: Identify and block spam emails
- **Form Protection**: Prevent spam submissions on contact forms
- **Social Media**: Detect and remove spam posts and messages
- **E-commerce**: Filter fake reviews and fraudulent listings
- **Community Management**: Protect online communities from spam bots
- **API Protection**: Block automated spam attacks on your services

---

## Detection Capabilities

The spam detector identifies various types of unwanted content:

- **Phishing attempts**: Fake login pages, credential theft
- **Financial scams**: Lottery scams, investment fraud, fake prizes
- **Link spam**: Malicious URLs, affiliate link spam
- **Advertisement spam**: Unsolicited promotional content
- **Bot-generated content**: Automated spam messages
- **Social engineering**: Manipulative or deceptive content

---

## API Endpoint

**POST** `/content/detect_spam`

For detailed API specifications, refer to:
- [Postman Documentation](https://documenter.getpostman.com/view/31106842/2sBXVeGsVU)
- [Product Page](https://sharpapi.com/en/catalog/ai/content-marketing-automation/spam-detector)

---

## Related Packages

- [@sharpapi/sharpapi-node-detect-profanities](https://www.npmjs.com/package/@sharpapi/sharpapi-node-detect-profanities) - Profanity detection
- [@sharpapi/sharpapi-node-proofread](https://www.npmjs.com/package/@sharpapi/sharpapi-node-proofread) - Grammar checking
- [@sharpapi/sharpapi-node-detect-emails](https://www.npmjs.com/package/@sharpapi/sharpapi-node-detect-emails) - Email extraction
- [@sharpapi/sharpapi-node-client](https://www.npmjs.com/package/@sharpapi/sharpapi-node-client) - Full SharpAPI SDK

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

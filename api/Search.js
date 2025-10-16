// Vercel Serverless Function for Search
const axios = require('axios');

module.exports = async (req, res) => {
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { phoneNumber } = req.body;
    
    if (!phoneNumber || !/^[0-9]{10,}$/.test(phoneNumber)) {
      return res.status(400).json({ 
        error: 'Invalid phone number format',
        results: []
      });
    }

    const apiToken = process.env.LEAKOSINT_API_TOKEN;
    if (!apiToken) {
      return res.status(500).json({ 
        error: 'API token not configured',
        results: []
      });
    }

    const response = await axios.post(
      'https://leakosintapi.com/',
      {
        token: apiToken,
        request: phoneNumber,
        limit: 300,
        lang: 'en',
      },
      {
        timeout: 30000,
      }
    );

    if (response.data['Error code']) {
      return res.status(400).json({ 
        error: `API Error: ${response.data['Error code']}`,
        results: []
      });
    }

    const results = [];
    const list = response.data.List || {};

    for (const [databaseName, dbData] of Object.entries(list)) {
      const result = {
        databaseName,
        infoLeak: dbData.InfoLeak || 'No information available',
        data: dbData.Data || [],
      };
      results.push(result);
    }

    return res.json({ results });
  } catch (error) {
    console.error('Search error:', error);
    return res.status(500).json({ 
      error: 'Search failed',
      results: []
    });
  }
};

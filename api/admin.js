// Vercel Serverless Function for Admin
const bcrypt = require('bcryptjs');

const sessions = new Map();
let passwordHash = null;

function initPasswordHash() {
  if (!passwordHash) {
    const adminPassword = process.env.ADMIN_PASSWORD;
    if (!adminPassword) {
      throw new Error('ADMIN_PASSWORD not set');
    }
    passwordHash = bcrypt.hashSync(adminPassword, 10);
  }
  return passwordHash;
}

function generateSessionId() {
  return Math.random().toString(36).substring(2) + Date.now().toString(36);
}

function verifySession(sessionId) {
  const session = sessions.get(sessionId);
  if (!session) return false;
  
  const now = Date.now();
  if (now - session.createdAt > 3600000) {
    sessions.delete(sessionId);
    return false;
  }
  
  return true;
}

module.exports = async (req, res) => {
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'X-Session-Id, Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  const { method, url, headers, body } = req;
  const sessionId = headers['x-session-id'];

  try {
    if (url === '/api/admin/login' && method === 'POST') {
      const { password } = body;
      const currentPasswordHash = initPasswordHash();
      
      const isValid = bcrypt.compareSync(password, currentPasswordHash);
      
      if (isValid) {
        const newSessionId = generateSessionId();
        sessions.set(newSessionId, { createdAt: Date.now() });
        return res.json({ success: true, sessionId: newSessionId });
      }
      
      return res.status(401).json({ error: 'Invalid password' });
    }

    if (url === '/api/admin/logout' && method === 'POST') {
      if (sessionId) {
        sessions.delete(sessionId);
      }
      return res.json({ success: true });
    }

    if (!sessionId || !verifySession(sessionId)) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    if (url === '/api/admin/token' && method === 'GET') {
      const token = process.env.LEAKOSINT_API_TOKEN;
      if (!token) {
        return res.status(500).json({ error: 'Token not configured' });
      }
      return res.json({ token });
    }

    if (url === '/api/admin/update-token' && method === 'POST') {
      const { newToken } = body;
      if (!newToken) {
        return res.status(400).json({ error: 'New token required' });
      }
      
      process.env.LEAKOSINT_API_TOKEN = newToken;
      return res.json({ 
        success: true, 
        note: 'Token updated for current instance'
      });
    }

    if (url === '/api/admin/change-password' && method === 'POST') {
      const { currentPassword, newPassword } = body;
      const currentPasswordHash = initPasswordHash();
      
      if (!bcrypt.compareSync(currentPassword, currentPasswordHash)) {
        return res.status(401).json({ error: 'Incorrect password' });
      }
      
      passwordHash = bcrypt.hashSync(newPassword, 10);
      
      return res.json({ 
        success: true, 
        note: 'Password updated for current instance'
      });
    }

    return res.status(404).json({ error: 'Not found' });
    
  } catch (error) {
    console.error('Admin API error:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
};

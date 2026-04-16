import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import admin from 'firebase-admin';
import { getFirestore } from 'firebase-admin/firestore';
import cookieParser from 'cookie-parser';
import fs from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load Firebase Config
const firebaseConfig = JSON.parse(fs.readFileSync(path.join(__dirname, 'firebase-applet-config.json'), 'utf8'));

// Initialize Firebase Admin
const adminApp = admin.initializeApp({
  projectId: firebaseConfig.projectId
});

const db = getFirestore(adminApp, firebaseConfig.firestoreDatabaseId);
const auth = admin.auth();

const app = express();
app.use(express.json());
app.use(cookieParser());

// API: Validate Challenge Completion
app.post('/api/validate-challenge', async (req, res) => {
  const { challengeId, flag, idToken } = req.body;

  if (!challengeId || !flag || !idToken) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  try {
    // 1. Verify User
    const decodedToken = await auth.verifyIdToken(idToken);
    const uid = decodedToken.uid;

    // 2. Validate Flag
    const flagDoc = await db.collection('flags').doc(challengeId).get();
    if (!flagDoc.exists) {
      return res.status(404).json({ error: 'Challenge flag not configured' });
    }

    const { flag: correctFlag } = flagDoc.data();

    if (correctFlag !== flag) {
      return res.status(403).json({ error: 'Invalid flag' });
    }

    // 3. Update User Progress
    const userRef = db.collection('users').doc(uid);
    const userDoc = await userRef.get();

    if (!userDoc.exists) {
      return res.status(404).json({ error: 'User not found' });
    }

    const userData = userDoc.data();
    const completed = userData.completed || [];

    if (!completed.includes(challengeId)) {
      const newCompleted = [...completed, challengeId];
      const newXp = (userData.xp || 0) + 100;
      const newFlags = (userData.flags || 0) + 1;
      
      // Calculate Level (Simple logic: 1 level every 500 XP)
      const newLevel = Math.floor(newXp / 500) + 1;

      await userRef.update({
        completed: newCompleted,
        xp: newXp,
        flags: newFlags,
        level: newLevel
      });

      // 4. Log Submission
      const submissionId = `${uid}_${challengeId}`;
      await db.collection('submissions').doc(submissionId).set({
        userId: uid,
        challengeId,
        flag,
        timestamp: new Date().toISOString(),
        validated: true
      });

      return res.json({ success: true, xp: newXp, flags: newFlags, level: newLevel });
    }

    return res.json({ success: true, message: 'Already completed' });
  } catch (error) {
    console.error('Validation Error:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
});

// API: Validate Level Progression
app.post('/api/validate-level', async (req, res) => {
  const { world, step, value, idToken } = req.body;

  if (world === undefined || step === undefined || !idToken) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  try {
    // 1. Verify User
    const decodedToken = await auth.verifyIdToken(idToken);
    const uid = decodedToken.uid;
    const levelId = `${world}.${step}`;

    // 2. Validate Logic
    let isValid = false;
    const world0Flags = {
      "0.1": "reveal", "0.2": "modify", "0.3": "remove", "0.4": "identity", "0.5": "control"
    };
    const world1Flags = {
      "1.1": "port", "1.2": "service", "1.3": "fingerprint", "1.4": "brute", "1.5": "subdomain"
    };
    const world2Flags = {
      "2.1": "sqli", "2.2": "xss", "2.3": "cookie", "2.4": "path", "2.5": "auth"
    };
    const world3Flags = {
      "3.1": "command", "3.2": "rce", "3.3": "root", "3.4": "overflow", "3.5": "payload"
    };
    const world4Flags = {
      "4.1": "backdoor", "4.2": "cron", "4.3": "key", "4.4": "user", "4.5": "token"
    };
    const world5Flags = {
      "5.1": "vault", "5.2": "core", "5.3": "zero", "5.4": "control", "5.5": "byte"
    };

    if (step === 0) {
      isValid = true; // Level X.0 is always valid (entry)
    } else if (world === 0) {
      isValid = value?.toLowerCase() === world0Flags[levelId];
    } else if (world === 1) {
      isValid = value?.toLowerCase() === world1Flags[levelId];
    } else if (world === 2) {
      isValid = value?.toLowerCase() === world2Flags[levelId];
    } else if (world === 3) {
      isValid = value?.toLowerCase() === world3Flags[levelId];
    } else if (world === 4) {
      isValid = value?.toLowerCase() === world4Flags[levelId];
    } else if (world === 5) {
      isValid = value?.toLowerCase() === world5Flags[levelId];
    }

    if (!isValid) {
      return res.status(403).json({ error: 'Invalid payload' });
    }

    // 3. Update User Progress
    const userRef = db.collection('users').doc(uid);
    const userDoc = await userRef.get();

    if (!userDoc.exists) {
      return res.status(404).json({ error: 'User not found' });
    }

    const userData = userDoc.data();
    const completed = userData.completed || [];

    if (!completed.includes(levelId)) {
      const newCompleted = [...completed, levelId];
      const nextLevel = `${world}.${step + 1}`;
      
      // Fetch level points
      const levelDoc = await db.collection('levels').doc(levelId).get();
      const points = levelDoc.exists ? (levelDoc.data().points || 100) : 100;

      const newXp = (userData.xp || 0) + points;
      const newLevel = Math.floor(newXp / 500) + 1;

      await userRef.update({
        completed: newCompleted,
        currentLevel: nextLevel,
        xp: newXp,
        level: newLevel
      });

      return res.json({ success: true, xp: newXp, currentLevel: nextLevel });
    }

    return res.json({ success: true, message: 'Already completed' });
  } catch (error) {
    console.error('Level Validation Error:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
});

// Serve Static Files
const distPath = path.join(__dirname, 'dist');
if (fs.existsSync(distPath)) {
  app.use(express.static(distPath));
  
  // Handle SPA routing
  app.get('*all', (req, res) => {
    res.sendFile(path.join(distPath, 'index.html'));
  });
} else {
  app.get('/', (req, res) => {
    res.send('App is building... please refresh in a few seconds.');
  });
}

const PORT = 3000;
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running on http://0.0.0.0:${PORT}`);
});

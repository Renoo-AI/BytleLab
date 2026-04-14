import admin from 'firebase-admin';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const firebaseConfig = JSON.parse(fs.readFileSync(path.join(__dirname, 'firebase-applet-config.json'), 'utf8'));

admin.initializeApp({
  projectId: firebaseConfig.projectId
});

const db = admin.firestore(admin.apps[0], firebaseConfig.firestoreDatabaseId);

const challenges = JSON.parse(fs.readFileSync(path.join(__dirname, 'challenges', 'challenges.json'), 'utf8'));

const flags = {
  'web-basics-1': 'FLAG{web_basics_master}',
  'web-basics-2': 'FLAG{cookie_monster_123}',
  'web-basics-3': 'FLAG{hidden_in_plain_sight}',
  'input-tampering-1': 'FLAG{input_is_not_trusted}',
  'input-tampering-2': 'FLAG{client_side_is_a_lie}'
};

async function seed() {
  console.log('Seeding challenges...');
  for (let i = 0; i < challenges.length; i++) {
    const challenge = challenges[i];
    challenge.order = i;
    await db.collection('challenges').doc(challenge.id).set(challenge);
    console.log(`Added challenge: ${challenge.id}`);
  }

  console.log('Seeding flags...');
  for (const [id, flag] of Object.entries(flags)) {
    await db.collection('flags').doc(id).set({ challengeId: id, flag });
    console.log(`Added flag for: ${id}`);
  }

  console.log('Seeding global settings...');
  await db.collection('settings').doc('global').set({
    appName: 'ByteLearn',
    description: 'The ultimate cybersecurity learning platform.',
    version: '1.0.0',
    maintenanceMode: false
  });

  console.log('Seed complete!');
  process.exit(0);
}

seed().catch(err => {
  console.error('Seed failed:', err);
  process.exit(1);
});

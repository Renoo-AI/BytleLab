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

  console.log('Seeding World 0-5 levels...');
  const allLevels = [
    // World 0: Basics
    { id: '0.0', world: 0, step: 0, title: 'Entry', description: 'Welcome to the system. No validation required.', type: 'entry', points: 0 },
    { id: '0.1', world: 0, step: 1, title: 'Reveal hidden data', description: 'Find the hidden data in the interface.', type: 'challenge', points: 100 },
    { id: '0.2', world: 0, step: 2, title: 'Modify value', description: 'Change a value to bypass a check.', type: 'challenge', points: 100 },
    { id: '0.3', world: 0, step: 3, title: 'Remove restriction', description: 'Disable a restriction preventing access.', type: 'challenge', points: 100 },
    { id: '0.4', world: 0, step: 4, title: 'Change identity', description: 'Spoof your identity to gain privileges.', type: 'challenge', points: 100 },
    { id: '0.5', world: 0, step: 5, title: 'Control interface', description: 'Take full control of the system interface.', type: 'challenge', points: 100 },
    
    // World 1: Reconnaissance
    { id: '1.0', world: 1, step: 0, title: 'Passive Recon', description: 'Gather information without direct interaction.', type: 'entry', points: 0 },
    { id: '1.1', world: 1, step: 1, title: 'Port Scanning', description: 'Identify open ports on the target system.', type: 'challenge', points: 150 },
    { id: '1.2', world: 1, step: 2, title: 'Service Discovery', description: 'Determine the services running on open ports.', type: 'challenge', points: 150 },
    { id: '1.3', world: 1, step: 3, title: 'OS Fingerprinting', description: 'Identify the operating system of the target.', type: 'challenge', points: 150 },
    { id: '1.4', world: 1, step: 4, title: 'Directory Brute-forcing', description: 'Find hidden directories on the web server.', type: 'challenge', points: 150 },
    { id: '1.5', world: 1, step: 5, title: 'Subdomain Enumeration', description: 'Discover subdomains associated with the target.', type: 'challenge', points: 150 },

    // World 2: Web Vulnerabilities
    { id: '2.0', world: 2, step: 0, title: 'Broken Access Control', description: 'Understand how access controls can be bypassed.', type: 'entry', points: 0 },
    { id: '2.1', world: 2, step: 1, title: 'Cryptographic Failures', description: 'Exploit weak encryption or hashing.', type: 'challenge', points: 200 },
    { id: '2.2', world: 2, step: 2, title: 'Injection', description: 'Perform basic injection attacks.', type: 'challenge', points: 200 },
    { id: '2.3', world: 2, step: 3, title: 'Insecure Design', description: 'Identify flaws in the application design.', type: 'challenge', points: 200 },
    { id: '2.4', world: 2, step: 4, title: 'Security Misconfiguration', description: 'Exploit common configuration errors.', type: 'challenge', points: 200 },
    { id: '2.5', world: 2, step: 5, title: 'Vulnerable Components', description: 'Find and exploit known vulnerabilities in libraries.', type: 'challenge', points: 200 },

    // World 3: Network Attacks
    { id: '3.0', world: 3, step: 0, title: 'ARP Spoofing', description: 'Learn about local network redirection.', type: 'entry', points: 0 },
    { id: '3.1', world: 3, step: 1, title: 'DNS Poisoning', description: 'Redirect traffic by poisoning DNS cache.', type: 'challenge', points: 250 },
    { id: '3.2', world: 3, step: 2, title: 'Man-in-the-Middle', description: 'Intercept and modify network traffic.', type: 'challenge', points: 250 },
    { id: '3.3', world: 3, step: 3, title: 'Packet Sniffing', description: 'Capture and analyze network packets.', type: 'challenge', points: 250 },
    { id: '3.4', world: 3, step: 4, title: 'Replay Attacks', description: 'Capture and re-send valid network transmissions.', type: 'challenge', points: 250 },
    { id: '3.5', world: 3, step: 5, title: 'Denial of Service', description: 'Understand how to disrupt service availability.', type: 'challenge', points: 250 },

    // World 4: Social Engineering
    { id: '4.0', world: 4, step: 0, title: 'Phishing', description: 'Learn the basics of deceptive communication.', type: 'entry', points: 0 },
    { id: '4.1', world: 4, step: 1, title: 'Pretexting', description: 'Create a fabricated scenario to steal data.', type: 'challenge', points: 300 },
    { id: '4.2', world: 4, step: 2, title: 'Baiting', description: 'Use a false promise to pique curiosity.', type: 'challenge', points: 300 },
    { id: '4.3', world: 4, step: 3, title: 'Quid Pro Quo', description: 'Offer a service in exchange for information.', type: 'challenge', points: 300 },
    { id: '4.4', world: 4, step: 4, title: 'Tailgating', description: 'Gain physical access by following an authorized person.', type: 'challenge', points: 300 },
    { id: '4.5', world: 4, step: 5, title: 'Vishing', description: 'Perform social engineering over the phone.', type: 'challenge', points: 300 },

    // World 5: Post-Exploitation
    { id: '5.0', world: 5, step: 0, title: 'Privilege Escalation', description: 'Gain higher-level permissions on the system.', type: 'entry', points: 0 },
    { id: '5.1', world: 5, step: 1, title: 'Persistence', description: 'Maintain access to the target system.', type: 'challenge', points: 400 },
    { id: '5.2', world: 5, step: 2, title: 'Lateral Movement', description: 'Navigate through the internal network.', type: 'challenge', points: 400 },
    { id: '5.3', world: 5, step: 3, title: 'Data Exfiltration', description: 'Stealthily move data out of the network.', type: 'challenge', points: 400 },
    { id: '5.4', world: 5, step: 4, title: 'Covering Tracks', description: 'Remove evidence of your presence.', type: 'challenge', points: 400 },
    { id: '5.5', world: 5, step: 5, title: 'Final Objective', description: 'Achieve the ultimate goal of the operation.', type: 'challenge', points: 500 }
  ];

  for (const level of allLevels) {
    await db.collection('levels').doc(level.id).set(level);
    console.log(`Added level: ${level.id}`);
  }

  console.log('Seed complete!');
  process.exit(0);
}

seed().catch(err => {
  console.error('Seed failed:', err);
  process.exit(1);
});

import admin from 'firebase-admin';
import path from 'path';

// Initialize Firebase Admin SDK
 // const serviceAccount = require(''); // path.resolve(__dirname, '../../../../../')
// import serviceAccount from './aim-construction-firebase-adminsdk-fbsvc-5fd17ceb32.json'
import serviceAccount from './aim-construction-d864e-firebase-adminsdk-fbsvc-a79b881f12.json'

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
});

export default admin;
// import { google } from 'googleapis';
// import * as fs from 'fs';
// import * as readline from 'readline';
// import { promisify } from 'util';
// import * as dotenv from 'dotenv';

// dotenv.config();

// const readFileAsync = promisify(fs.readFile);

// // Load client secrets from environment variables
// const client_id: string = process.env.CLIENT_ID!;
// const client_secret: string = process.env.CLIENT_SECRET!;
// const redirect_uri: string = process.env.REDIRECT_URI!;

// const oAuth2Client = new google.auth.OAuth2(
//   client_id,
//   client_secret,
//   redirect_uri,
// );

// // Set up OAuth2 client
// async function authorize(): Promise<google.auth.OAuth2> {
//   // Check if we have previously stored a token
//   try {
//     const token = await readFileAsync('token.json');
//     oAuth2Client.setCredentials(JSON.parse(token.toString()));
//     return oAuth2Client;
//   } catch (err) {
//     return getAccessToken();
//   }
// }

// // Get new access token using refresh token
// async function refreshAccessToken(): Promise<google.auth.OAuth2 | null> {
//   try {
//     const token = await oAuth2Client.getAccessToken();
//     oAuth2Client.setCredentials(token.res?.data);
//     return oAuth2Client;
//   } catch (err) {
//     console.error('Error refreshing access token:', err);
//     return null;
//   }
// }

// // Get access token by using the authorization code
// async function getAccessToken(): Promise<google.auth.OAuth2 | null> {
//   const authUrl = oAuth2Client.generateAuthUrl({
//     access_type: 'offline',
//     scope: ['https://www.googleapis.com/auth/gmail.readonly'],
//   });
//   console.log('Authorize this app by visiting this URL:', authUrl);

//   const rl = readline.createInterface({
//     input: process.stdin,
//     output: process.stdout,
//   });

//   rl.question('Enter the code from that page here: ', async (code) => {
//     rl.close();
//     try {
//       const { tokens } = await oAuth2Client.getToken(code);
//       oAuth2Client.setCredentials(tokens);
//       fs.writeFile('token.json', JSON.stringify(tokens), (err) => {
//         if (err) return console.error('Error writing token to file:', err);
//         console.log('Token stored to token.json');
//       });
//       return oAuth2Client;
//     } catch (err) {
//       console.error('Error retrieving access token:', err);
//       return null;
//     }
//   });

//   return null;
// }

// async function main() {
//   const auth = await authorize();
//   if (!auth) return;

//   // Use the auth object to make requests to Gmail API
//   const gmail = google.gmail({ version: 'v1', auth });

//   // Example: list labels
//   const res = await gmail.users.labels.list({ userId: 'me' });
//   console.log(res.data.labels);
// }

// export default main;
// // main().catch(console.error);

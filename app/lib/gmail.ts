import { google } from 'googleapis';
import open from 'open';
import { TokenDB } from './definitions';
import { sql } from '@vercel/postgres';
import { unstable_noStore as noStore } from 'next/cache';

// Load client secrets from environment variables
const client_id: string = process.env.CLIENT_ID!;
const client_secret: string = process.env.CLIENT_SECRET!;
const redirect_uri: string = process.env.REDIRECT_URI!;

const oAuth2Client = new google.auth.OAuth2(
  client_id,
  client_secret,
  redirect_uri,
);

function isExpiredDate(token: TokenDB) {
  const now: number = Date.now();
  const expiryDate: number = token.expiry_date!;

  if (now > expiryDate) {
    return true;
  } else {
    return false;
  }
}

// get token in db
async function getTokenFromDB() {
  noStore();
  try {
    const data =
      await sql<TokenDB>`SELECT * FROM auth ORDER BY id DESC LIMIT 1`;
    console.log('GET Token from DB');
    console.log(data.rows[0]);

    return data.rows[0];
  } catch (error) {
    console.error('Failed to fetch user:', error);
    throw new Error('Failed to fetch user.');
  }
}

// inser token to db
async function setTokenIntoDB(token: TokenDB): Promise<TokenDB | null> {
  noStore();
  console.log(token, 'token setTokenIntoDB');
  try {
    await sql<TokenDB>`INSERT INTO auth (access_token, code, refresh_token, scope, token_type, expiry_date) 
      VALUES (
        ${token.access_token},
        ${token.code},
        ${token.refresh_token},
        ${token.scope},
        ${token.token_type},
        ${token.expiry_date}
      )`;
    console.log('Success inserted token into db');
    return null;
  } catch (error) {
    console.error('Failed to inserted token into db:', error);
    throw new Error('Failed to inserted token into db.');
  }
}

// Get new access token using refresh token
async function refreshAccessToken(token: TokenDB) {
  oAuth2Client.setCredentials(token);
  const { credentials } = await oAuth2Client.refreshAccessToken();
  // console.log('Refreshed token:', credentials);
  if (credentials) {
    await setTokenIntoDB(credentials);
  }
  return credentials;
}

// Get access token by using the authorization code
async function getAccessToken() {
  const authUrl = oAuth2Client.generateAuthUrl({
    access_type: 'offline',
    // scope: ['https://www.googleapis.com/auth/gmail.readonly'],
    scope: [
      'https://mail.google.com',
      'https://www.googleapis.com/auth/gmail.readonly',
    ],
    include_granted_scopes: true,
  });
  // console.log('Authorize this app by visiting this URL:', authUrl);
  await open(authUrl);
  return null;
}

export async function getNewToken(code: string) {
  const { tokens }: { tokens: any } = await oAuth2Client.getToken(code);
  tokens.code = code;
  oAuth2Client.setCredentials(tokens);
  if (tokens) {
    await setTokenIntoDB(tokens);
  }
  return tokens;
}

export async function authGmail() {
  const token = await getTokenFromDB();
  if (token && isExpiredDate(token) === false) {
    console.log('token not expired');
    return token;
  } else if (token && isExpiredDate(token) === true) {
    const refreshToken = await refreshAccessToken(token);
    return refreshToken;
  } else {
    try {
      await getAccessToken();
      // const newToken = await getNewToken(code);
      // return newToken;
    } catch (error) {
      console.error('Failed to authenticate:', error);
      throw new Error('Failed to authenticate.');
    }
  }
}

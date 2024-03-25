import './style.css';
import {discordSdk} from './discordSdk';
import type {AsyncReturnType} from 'type-fest';

type Auth = AsyncReturnType<typeof discordSdk.commands.authenticate>;
let auth: Auth;

setupDiscordSdk().then(() => {
  console.log("Setup is done");
});

async function setupDiscordSdk() {
  await discordSdk.ready();

  // Authorize with Discord Client
  const {code} = await discordSdk.commands.authorize({
    client_id: import.meta.env.VITE_CLIENT_ID,
    response_type: 'code',
    state: '',
    prompt: 'none',
    scope: [
      //"applications.builds.upload",
      //"applications.builds.read",
      // "applications.store.update",
      //"applications.entitlements",
      // "bot",
      'identify',
      // "connections",
      // "email",
      // "gdm.join",
      //'guilds',
      // "guilds.join",
      // "guilds.members.read",
      // "messages.read",
      // "relationships.read",
      // 'rpc.activities.write',
      // "rpc.notifications.read",
      // "rpc.voice.write",
      // 'rpc.voice.read',
      // "webhook.incoming",
    ],
  });

  // Retrieve an access_token from your activity's server
  const response = await fetch('/api/token', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      code,
    }),
  });
  const {access_token} = await response.json();

  // Authenticate with Discord client (using the access_token)
  auth = await discordSdk.commands.authenticate({
    access_token,
  });

  console.log(`Got auth`);

  if (auth == null) {
    throw new Error('Authenticate command failed');
  }
}
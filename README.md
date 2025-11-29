# DMON Discord Bot

A modern Discord bot built using **Discord.js v14**, featuring both **prefix** and **slash** commands, a clean handler system, and simple labeled code that makes the bot easy to edit, maintain, and distribute.

---

## 📁 Folder Structure

Below is the real folder layout of this bot:

DMON Discord Bot/
│
├── botconfig.json
├── config.json
├── index.js
│
├── commands/
│ ├── moderation/
│ │ ├── ban.js
│ │ ├── kick.js
│ │ ├── unban.js
│ │ └── clear.js
│ │
│ └── user/
│ ├── say.js
│ ├── key.js
│ ├── rules.js
│ ├── post.js
│ └── updates.js
│
├── events/
│ ├── client/
│ │ └── clientReady.js
│ │
│ └── guild/
│ └── messageCreate.js
│
├── handlers/
│ ├── command.js
│ └── events.js
│
└── package.json

## 🚀 Features

- Works with **Prefix & Slash commands**
- Auto slash-command registration
- Clean modern code with labels for beginners
- Moderation tools:
  - Ban
  - Kick
  - Unban (ID-based)
  - Clear/Purge
- Utility tools:
  - Say
  - Key system (auto delete old key)
  - Rules embed
  - Updates embed
  - Post embed
- Organized file structure
- Easy to edit and release

---

## 🛠️ Installation

### 1. Install Node.js 18+
Download from: https://nodejs.org/

### 2. Install dependencies
```
npm install
```

### 3. Setup your bot token
Edit **botconfig.json**:
```
json
{
  "token": "YOUR_BOT_TOKEN"
}
```
Edit **config.json**;
```
{
  "prefix": "!",
  "clientId": "YOUR_CLIENT_ID",
  "guildId": "YOUR_GUILD_ID"
}
```

▶️ Starting the Bot

```
node index.js
```
🧩 Commands

Moderation Commands

| Command              | Type   | Description     |
| -------------------- | ------ | --------------- |
| `!ban @user reason`  | Prefix | Ban a user      |
| `/ban user reason`   | Slash  | Ban a user      |
| `!kick @user reason` | Prefix | Kick a user     |
| `/kick user reason`  | Slash  | Kick a user     |
| `!unban USERID`      | Prefix | Unban by ID     |
| `/unban userid`      | Slash  | Unban by ID     |
| `!clear 20`          | Prefix | Delete messages |
| `/clear amount`      | Slash  | Delete messages |

User Commands

| Command                | Type   | Description                    |
| ---------------------- | ------ | ------------------------------ |
| `!say text`            | Prefix | Bot repeats your message       |
| `/say channel message` | Slash  | Send message to channel        |
| `/key keytext`         | Slash  | Posts a key + auto deletes old |
| `!post`                | Prefix | Sends announcement embed       |
| `!updates`             | Prefix | Sends version update embed     |
| `!rules`               | Prefix | Sends rules embed              |

📝 Configuration Notes

All command files include simple labels to make editing easy.

Slash commands auto-register on startup.

Commands are loaded from the /commands folder based on type (moderation/user).

Events inside /events/client/ and /events/guild/ are auto-loaded.

📌 Requirements

Node.js 18

Discord bot token

Discord.js v14

Correct permissions in your server

👤 Credits

Made by qdft
Built for the DMON community

⭐ Support This Project

```
If you like this bot, star the repository!
```

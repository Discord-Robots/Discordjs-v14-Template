# Discordjs-v14-Template

Discord.js v14 Template using Rest API

Features:

- Based on FusionTerrors v14 Handler
- Supports Only Slash Commands
  - ~~Will support cooldowns soon~~ Supports Cooldowns!!!
    - Supports Component Cooldowns
- Executes the bot In a Base Class
- Custom Handler for Components
- Anti-Crash Handler

**Logs Everything to the console when starting**

![Imgur](https://i.imgur.com/FxUCwtnl.png)

**Easy to Read**

**_Slash Command:_**

```js
const { SlashCommandBuilder, PermissionsBitField } = require("discord.js");

module.exports = {
    owner: boolean, //  whether command can only be used by the bot owner?
    developer: boolean, // weather the command is for developer guild or global: true or false
    category: "category",
    cooldown: Number,
    data: new SlashCommandBuilder()
        .setName('name') // command name
        .setDescription('description') // command description
        .setDefalultMemberPermissions(PermissionsBitField.Flags.<permission>), // member permissions
  async execute (interaction, client) => {
    // Code here
  },
};
```

**_Components:_**

```js
module.exports = {
    cooldown: Number,
    data: {
      name: "Name",
    }, // member permissions
  async execute (interaction, client) => {
    // Code here
  },
};
```

# Getting Started

Click `Use this template` at the top of this page.

- Rename `.env.example` to `.env` (THIS FILE CANNOT HAVE ANY SPACES)

  - Paste in your `BotToken`, `AppID`, `ClientSecret` from the [Discord Developer Portal](https://discord.com/developers/applications)
  - Insert your Developer Guild ID for testing purposes in `DevGuild`
  - Insert a channel id of your choosing to send logs to in `DevChannel`
  - Insert your own UserID as `BotOwnerID`
    - If this is not done, `reload` command will not function correctly.
  - Insert your mongoose connection string as `Connect`, Get your free connection string [Here](https://www.mongodb.com/)
    - If you don't know how to get this string, there are videos on this like [this one](https://tinyurl.com/mongo-setup)
  - The `WebhookURL` will setup your anti-crash system. You can create this in `Discord Settings > Integrations > Webhooks`
    - Be careful! This link will have very sensitve data!
    - Paste the long link into `WebhookURL`. DO NOT SHARE IT!!!

- After you have edited and saved the `env` file to your needs, you are ready ready to start the bot!
  - Install all dependencies with `npm install` << Remember, DO NOT INCLUDE ANY PACKAGE NAMES HERE!
  - Run the bot with `nodemon`.
  - Customize the project to your liking and enjoy!

Found any bugs or have any suggestion about the template? Create an issue or pull request!

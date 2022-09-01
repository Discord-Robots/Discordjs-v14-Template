# Discordjs-v14-Template

Discord.js v14 Template using Rest API

Features:

- Based on FusionTerrors v14 Handler (Just more advanced)
- Supports Only Slash Commands
  - Cannot run any interaction commands in Bot's DMs
  - Supports Cooldowns
    - Supports Component Cooldowns
- Executes the bot In a Base Class
- Custom Handler for Components
- Custom Handler for Pagination Embeds
- Anti-Crash Handler
- Sends an embed to the guilds system channel when a member joins and leaves.
- Sends a message to the DevChannel when the bot is added to a new guild (and removed).

**Logs Everything to the console when starting**

![Imgur](https://i.imgur.com/FxUCwtnl.png)

**Easy to Read**

**_Slash Command:_**
Example Location of command: "./src/commands/(category)/(command)"

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
Example Location of component: "./src/components/(type)/(category)/(command)/(component)"
type: button/select menu/ modal
category: should match the command category
command: folder is named the same as the command name
component: file that matches the custom id that you created

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
  **_*Required*_**

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

- For the member add and remove events to work, the guild MUST have the `System Channel` enabled.

Found any bugs or have any suggestion about the template? Create an issue or pull request!

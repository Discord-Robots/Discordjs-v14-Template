# Discordjs-v14-Template

Features:

- Advanced DJS v14 Handler
- ~~Supports Only Slash Commands~~ Now Supports Legacy Commands as well!!!
  - Legacy commands are meant for bots which are in less than 100 guilds.
    - If you plan to use this in more than 100 guilds, You will have to apply for the MessageContent Intent through Discord.
    - Legacy Commands are meant for the developer of the bot only!
  - Cooldowns enabled on Legacy Commands
  - Cannot run any interaction commands in Bot's DMs
  - Supports Cooldowns
    - Supports Component Cooldowns
- Executes the bot In a Base Class
- Custom Handler for Components
- Custom Handler for Pagination Embeds
- Sends an embed to the guilds system channel when a member joins and leaves.
- Sends a message to the DevChannel when the bot is added to a new guild (and removed).
- Added the ability to block guilds from using/inviting the bot.
  - Will be adding ability for users to appeal directly in Bot's DM's (Will be checking to see if it is the owner of the appealed guild).
- I am not adding a reload command due to having too many issues with the function.

#

**Logs Everything to the console when starting**

![Imgur](https://i.imgur.com/MXaA4Ww.png)

#

**Easy to Read**

Slash Commands:

- Example Location of command: "./src/commands/(category)/(command)"

```js
const { SlashCommandBuilder, PermissionsFlagsBits } = require("discord.js");

module.exports = {
    owner: boolean, //  whether command can only be used by the bot owner?
    developer: boolean, // weather the command is for developer guild or global: true or false
    category: "category",
    cooldown: Number,
    data: new SlashCommandBuilder()
        .setName('name') // command name - Must be lowercase!!
        .setDescription('description') // command description
        .setDefalultMemberPermissions(PermissionsFlagsBits.<permission>), // member permissions
  async execute (interaction, client) => {
    // Code here
  },
};
```

#

Legacy Commands:

- Example Location of command: "./src/legacyCommands/(category)/(command)"

```js
module.exports = {
    // The following properties can be in any order and Required options are NAME and EXECUTE function.
    name: "name",
    description: "description",
    category: "category",
    cooldown: Number, // how many seconds to wait for the command to be used again.
    owner: boolean, // whether command can only be used by the bot owner?
    enabled: boolean, // whether the command can be executed?
    aliases: [], // other words that can activate this command. separate with commas: ["test", "te", "t"]
  async execute (interaction, client) => {
    // Code here
  },
};
```

#

Components:

- Example Location of component: "./src/components/(type)/(category)/(command)/(component)"
- type: button/ select menu/ modal
- category: should match the command category
- command: folder is named the same as the command name
- component: file that matches the custom id that you created

```js
module.exports = {
    cooldown: Number,
    data: {
      id: "custom_id", // Must be lowercase
    },
  async execute (interaction, client) => {
    // Code here
  },
};
```

# Getting Started

Click `Use this template` at the top of this page or fork the repo to your own profile.

- Rename `.env.example` to `.env` (THIS FILE CANNOT HAVE ANY SPACES)

  - REQUIRED:

    - Paste in your `BotToken` and `AppID` from the [Discord Developer Portal](https://discord.com/developers/applications)
    - Insert your Developer Guild ID for testing purposes in `DevGuild`
    - Insert a channel id of your choosing to send logs to in `DevChannel`
    - Insert your own UserID as `BotOwnerID`
      - If this is not done, commands with `ownerOnly` will not function and your project will error and crash.
    - Insert your mongoose connection string as `Connect`, Get your free connection string [Here](https://www.mongodb.com/)
      - If you don't know how to get this string, there are videos on this like [this one](https://tinyurl.com/mongo-setup)
    - Insert your desired legacy command prefix as `Prefix`.

- After you have edited and saved the `env` file to your needs, you are ready ready to start the bot!

#

## Important installation prerequisites for MACOS users!

- In order to install certain packages namely: [node-canvas](https://npmjs.com/package/canvas), the following is REQUIRED.
- Please install homebrew from the terminal using the following command:
  - Please copy and paste these commands exactly into a terminal!
    - `/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"`
    - `arch -arm64 brew install pkg-config cairo pango libpng jpeg giflib librsvg`
  - These commands do take a while to download and install so be patient.
  - After the second one is finished, it will tell you to export a few paths to finish as shown below. Please do these or it won't work. ![Imgur](https://i.imgur.com/lE3ThaC.png)

#

- Install all dependencies with `npm install` << Remember, DO NOT INCLUDE ANY PACKAGE NAMES HERE!
- Run the bot with `nodemon`.
- Customize the project to your liking and enjoy!

#

- Member add event fires a canvas to welcome the new member.
- For the member remove events to work, the guild MUST have the `System Channel` enabled.

#

Found any bugs or have any suggestion about the template? Create an issue or pull request!

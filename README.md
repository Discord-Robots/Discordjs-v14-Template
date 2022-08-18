# Discordjs-v14-Template

Discord.js v14 Template using Rest API

Features:

- Based on FusionTerrors v14 Handler
- Supports Only Slash Commands
- Executes the bot In a Base Class
- Custom Handler for Components

**Logs Everything to the console when starting**
![consoleLogs](https://imgur.com/FxUCwtn)

**Easy to Read**

```js
module.exports = {
    developer: boolean, // weather the command is for developer guild or global
    category: "",
    data: new SlashCommandBuilder()
        .setName('name') // command name
        .setDescription('description') // command description
        .setDefalultMemberPermissions(PermissionsBitField.Flags.<permission>), // member permissions
  async execute = (interaction, client) => {
    // Code here
  },
};
```

Found any bugs, have any suggestion about the bot? Create a issue or pull request!

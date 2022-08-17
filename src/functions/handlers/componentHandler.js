module.exports = (client) => {
  const { buttons, selectMenus, modals } = client;

  client.handleComponents = async () => {
    const componentsFolder = client.rds(`./src/components`);
    for (const folder of componentsFolder) {
      const componentDirs = client
        .rds(`./src/components/${folder}`);

      switch (folder) {
        case "buttons":
          let but = 0;
          for (const dir of componentDirs) {
            const componentFiles = client
              .rds(`./src/components/${folder}/${dir}`)
              .filter((file) => file.endsWith(".js"));
            for (const file of componentFiles) {
              const button = require(`../../components/${folder}/${dir}/${file}`);
              but++
              buttons.set(button.data.name, button);
            }
          }
          console.log(client.chalk.blue(`[HANDLER] - Loaded ${but} Button(s)!`))
          break;

        case "selectMenus":
          let sm = 0;
          for (const dir of componentDirs) {
            const componentFiles = client
              .rds(`./src/components/${folder}/${dir}`)
              .filter((file) => file.endsWith(".js"));
            for (const file of componentFiles) {
              const selectMenu = require(`../../components/${folder}/${dir}/${file}`);
              sm++
              selectMenus.set(selectMenu.data.name, selectMenu);
            }
          }
          console.log(client.chalk.blue(`[HANDLER] - Loaded ${sm} Select Menu(s)!`))
          break;

        case "modals":
          let modalss = 0;
          for (const dir of componentDirs) {
            const componentFiles = client
              .rds(`./src/components/${folder}/${dir}`)
              .filter((file) => file.endsWith(".js"));
            for (const file of componentFiles) {
              const modal = require(`../../components/${folder}/${dir}/${file}`);
              modalss++
              modals.set(modal.data.name, modal);
            }
          }
          console.log(client.chalk.blue(`[HANDLER] - Loaded ${modalss} Modal(s)!`))

          break;

        default:
          break;
      }
    }
  };
};

module.exports = (client) => {
  const { buttons, selectMenus, modals } = client;

  client.handleComponents = async () => {
    const componentsFolder = client.rds(`./src/components`);
    for (const type of componentsFolder) {
      const componentDirs = client.rds(`./src/components/${type}`);

      switch (type) {
        case "buttons":
          let but = 0;
          for (const category of componentDirs) {
            const categories = client.rds(
              `./src/components/${type}/${category}`
            );
            for (const commandName of categories) {
              const componentFiles = client
                .rds(`./src/components/${type}/${category}/${commandName}`)
                .filter((componentID) => componentID.endsWith(".js"));
              for (const componentID of componentFiles) {
                const button = require(`../../components/${type}/${category}/${commandName}/${componentID}`);
                but++;
                buttons.set(button.data.id, button);
              }
            }
          }
          if (but > 0) {
            console.log(
              client.chalk.blue(`[HANDLER] - Loaded ${but} Button(s)!`)
            );
          }

          break;

        case "selectMenus":
          let sm = 0;
          for (const category of componentDirs) {
            const categories = client.rds(
              `./src/components/${type}/${category}`
            );
            for (const commandName of categories) {
              const componentFiles = client
                .rds(`./src/components/${type}/${category}/${commandName}`)
                .filter((componentID) => componentID.endsWith(".js"));
              for (const componentID of componentFiles) {
                const selectMenu = require(`../../components/${type}/${category}/${commandName}/${componentID}`);
                sm++;
                selectMenus.set(selectMenu.data.id, selectMenu);
              }
            }
          }
          if (sm > 0) {
            console.log(
              client.chalk.blue(`[HANDLER] - Loaded ${sm} Select Menus(s)!`)
            );
          }
          break;

        case "modals":
          let mod = 0;
          for (const category of componentDirs) {
            const categories = client.rds(
              `./src/components/${type}/${category}`
            );
            for (const commandName of categories) {
              const componentFiles = client
                .rds(`./src/components/${type}/${category}/${commandName}`)
                .filter((componentID) => componentID.endsWith(".js"));
              for (const componentID of componentFiles) {
                const modal = require(`../../components/${type}/${category}/${commandName}/${componentID}`);
                mod++;
                modals.set(modal.data.id, modal);
              }
            }
          }
          if (mod > 0) {
            console.log(
              client.chalk.blue(`[HANDLER] - Loaded ${mod} Modals(s)!`)
            );
          }

          break;

        default:
          break;
      }
    }
  };
};

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
                .filter((componentName) => componentName.endsWith(".js"));
              for (const componentName of componentFiles) {
                const button = require(`../../components/${type}/${category}/${commandName}/${componentName}`);
                but++;
                buttons.set(button.data.name, button);
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
                .filter((componentName) => componentName.endsWith(".js"));
              for (const componentName of componentFiles) {
                const selectMenu = require(`../../components/${type}/${category}/${commandName}/${componentName}`);
                sm++;
                selectMenus.set(selectMenu.data.name, selectMenu);
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
                .filter((componentName) => componentName.endsWith(".js"));
              for (const componentName of componentFiles) {
                const modal = require(`../../components/${type}/${category}/${commandName}/${componentName}`);
                mod++;
                modals.set(modal.data.name, modal);
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

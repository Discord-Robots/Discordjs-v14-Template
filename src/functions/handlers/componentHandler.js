module.exports = (client) => {
  const { buttons, selectMenus, modals } = client;

  client.handleComponents = async () => {
    const componentsFolder = client.rds(`./src/components`);
    for (const folder of componentsFolder) {
      const componentDirs = client
        .rds(`./src/components/${folder}`);

      switch (folder) {
        case "buttons":
          for (const dir of componentDirs) {
            const componentFiles = client
              .rds(`./src/components/${folder}/${dir}`)
              .filter((file) => file.endsWith(".js"));
            for (const file of componentFiles) {
              const button = require(`../../components/${folder}/${dir}/${file}`);
              buttons.set(button.data.name, button);
              console.log(`Button ${button.data.name} Loaded`)
            }
          }
          break;

        case "selectMenus":
          for (const dir of componentDirs) {
            const componentFiles = client
              .rds(`./src/components/${folder}/${dir}`)
              .filter((file) => file.endsWith(".js"));
            for (const file of componentFiles) {
              const selectMenu = require(`../../components/${folder}/${dir}/${file}`);
              selectMenus.set(selectMenu.data.name, selectMenu);
              console.log(`Select Menu: ${selectMenu.data.name} Loaded`)
            }
          }
          break;

        case "modals":
          for (const dir of componentDirs) {
            const componentFiles = client
              .rds(`./src/components/${folder}/${dir}`)
              .filter((file) => file.endsWith(".js"));
            for (const file of componentFiles) {
              const modal = require(`../../components/${folder}/${dir}/${file}`);
              modals.set(modal.data.name, modal);
              console.log(`Modal: ${modal.data.name} Loaded`)
            }
          }
          break;

        default:
          break;
      }
    }
  };
};

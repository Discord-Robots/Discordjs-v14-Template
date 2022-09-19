module.exports = (client) => {
  const { buttons, selectMenus, modals } = client;

  client.handleComponents = async () => {
    const componentsFolder = global.rds(`./src/components`);
    for (const type of componentsFolder) {
      const componentDirs = global.rds(`./src/components/${type}`);

      switch (type) {
        case "buttons":
          for (const category of componentDirs) {
            const categories = global.rds(
              `./src/components/${type}/${category}`
            );
            for (const commandName of categories) {
              const componentFiles = global
                .rds(`./src/components/${type}/${category}/${commandName}`)
                .filter((componentID) => componentID.endsWith(".js"));
              for (const componentID of componentFiles) {
                const button = require(`../../components/${type}/${category}/${commandName}/${componentID}`);
                buttons.set(button.data.id, button);
              }
            }
          }

          break;

        case "selectMenus":
          for (const category of componentDirs) {
            const categories = global.rds(
              `./src/components/${type}/${category}`
            );
            for (const commandName of categories) {
              const componentFiles = global
                .rds(`./src/components/${type}/${category}/${commandName}`)
                .filter((componentID) => componentID.endsWith(".js"));
              for (const componentID of componentFiles) {
                const selectMenu = require(`../../components/${type}/${category}/${commandName}/${componentID}`);
                selectMenus.set(selectMenu.data.id, selectMenu);
              }
            }
          }

          break;

        case "modals":
          for (const category of componentDirs) {
            const categories = global.rds(
              `./src/components/${type}/${category}`
            );
            for (const commandName of categories) {
              const componentFiles = global
                .rds(`./src/components/${type}/${category}/${commandName}`)
                .filter((componentID) => componentID.endsWith(".js"));
              for (const componentID of componentFiles) {
                const modal = require(`../../components/${type}/${category}/${commandName}/${componentID}`);
                modals.set(modal.data.id, modal);
              }
            }
          }

          break;

        default:
          break;
      }
    }
  };
};

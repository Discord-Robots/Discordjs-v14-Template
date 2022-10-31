/**
 *
 * @param {import("../../Structures/bot")} client
 */
module.exports = (client) => {
  const { components, rds } = client;
  const { buttons, selectMenus, modals } = components;

  client.handleComponents = async () => {
    const componentsFolder = rds(`./src/components`);
    for (const type of componentsFolder) {
      const componentDirs = rds(`./src/components/${type}`);

      switch (type) {
        case "buttons":
          for (const category of componentDirs) {
            const categories = rds(`./src/components/${type}/${category}`);
            for (const commandName of categories) {
              const componentFiles = rds(
                `./src/components/${type}/${category}/${commandName}`
              ).filter((componentID) => componentID.endsWith(".js"));
              for (const componentID of componentFiles) {
                const button = require(`../../components/${type}/${category}/${commandName}/${componentID}`);
                buttons.set(button.data.id, button);
              }
            }
          }

          break;

        case "selectMenus":
          for (const category of componentDirs) {
            const categories = rds(`./src/components/${type}/${category}`);
            for (const commandName of categories) {
              const componentFiles = rds(
                `./src/components/${type}/${category}/${commandName}`
              ).filter((componentID) => componentID.endsWith(".js"));
              for (const componentID of componentFiles) {
                const selectMenu = require(`../../components/${type}/${category}/${commandName}/${componentID}`);
                selectMenus.set(selectMenu.data.id, selectMenu);
              }
            }
          }

          break;

        case "modals":
          for (const category of componentDirs) {
            const categories = rds(`./src/components/${type}/${category}`);
            for (const commandName of categories) {
              const componentFiles = rds(
                `./src/components/${type}/${category}/${commandName}`
              ).filter((componentID) => componentID.endsWith(".js"));
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

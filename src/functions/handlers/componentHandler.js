module.exports = (client) => {
  const { buttons, selectMenus, contextMenus, modals } = client;

  client.handleComponents = async () => {
    const componentFolders = client.rds(`./src/components`);
    for (const folder of componentFolders) {
      const componentFiles = client
        .rds(`./src/compnents/${folder}`)
        .filter((file) => file.endsWith(".js"));

      switch (folder) {
        case "buttons":
          for (const file of componentFiles) {
            const button = require(`../../components/${folder}/${folder}/${file}`);
            buttons.set(button.data.name, button);
          }

          break;
        case "selectMenus":
          for (const file of componentFiles) {
            const Smenu = require(`../../components/${folder}/${file}`);
            selectMenus.set(Smenu.data.name, Smenu);
          }
          break;

        case "modals":
          for (const file of componentFiles) {
            const modal = require(`../../components/${folder}/${folder}/${file}`);
            modals.set(modal.data.name, modal);
          }
          break;

        default:
          break;
      }
    }
  };
};

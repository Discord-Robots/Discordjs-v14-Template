module.exports = (client) => {
  const { buttons, selectMenus, modals } = client;

  client.handleComponents = async () => {
    const componentsFolder = client.rds(`./src/components`);
    for (const type of componentsFolder) {
      const componentDirs = client
        .rds(`./src/components/${type}`)

      switch (type) {
        case "buttons":
          let but = 0;
          for (const category of componentDirs) {
            const categories = client
              .rds(`./src/components/${type}/${category}`)
            for (const commandName of categories) {
              const componentFiles = client
                .rds(`./src/components/${type}/${category}/${commandName}`)
                .filter((componentName) => componentName.endsWith(".js"));
              for (const componentName of componentFiles) {
                const button = require(`../../components/${type}/${category}/${commandName}/${componentName}`);
                but++
                buttons.set(button.data.name, button);
              }
            }
          }
          console.log(client.chalk.blue(`[HANDLER] - Loaded ${but} Button(s)!`))
          break;

        case "selectMenus":
          let sm = 0;
          for (const category of componentDirs) {
            const categories = client
              .rds(`./src/components/${type}/${category}`)
            for (const commandName of categories) {
              const componentFiles = client
                .rds(`./src/components/${type}/${category}/${commandName}`)
                .filter((componentName) => componentName.endsWith(".js"));
              for (const componentName of componentFiles) {
                const selectMenu = require(`../../components/${type}/${category}/${commandName}/${componentName}`);
                sm++
                selectMenus.set(selectMenu.data.name, selectMenu);
              }
            }
          }
          console.log(client.chalk.blue(`[HANDLER] - Loaded ${sm} Select Menus(s)!`))
          break;

        case "modals":
          let modalss = 0;
          for (const category of componentDirs) {
            const categories = client
              .rds(`./src/components/${type}/${category}`)
            for (const commandName of categories) {
              const componentFiles = client
                .rds(`./src/components/${type}/${category}/${commandName}`)
                .filter((componentName) => componentName.endsWith(".js"));
              for (const componentName of componentFiles) {
                const modal = require(`../../components/${type}/${category}/${commandName}/${componentName}`);
                modalss++
                modals.set(modal.data.name, modal);
              }
            }
          }
          console.log(client.chalk.blue(`[HANDLER] - Loaded ${modalss} Modals(s)!`))
          break;

        default:
          break;
      }
    }
  }
}

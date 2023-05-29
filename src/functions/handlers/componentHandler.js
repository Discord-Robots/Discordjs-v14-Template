import { client } from "#client";

export async function handleComponents() {
  const { components, rds } = client;
  const { buttons, selectMenus, modals } = components;
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
              const button = await import(
                `../../components/${type}/${category}/${commandName}/${componentID}`
              );
              buttons.set(button.default.data.id, button);
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
              const selectMenu = await import(
                `../../components/${type}/${category}/${commandName}/${componentID}`
              );
              selectMenus.set(selectMenu.default.data.id, selectMenu);
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
              const modal = await import(
                `../../components/${type}/${category}/${commandName}/${componentID}`
              );
              modals.set(modal.default.data.id, modal);
            }
          }
        }

        break;

      default:
        break;
    }
  }
}

import "dotenv/config";
import { Client, Collection, Partials } from "discord.js";
const {
  Channel,
  GuildMember,
  GuildScheduledEvent,
  Message,
  Reaction,
  ThreadMember,
  User,
} = Partials;
import { readdirSync } from "fs";
const { BotToken, Prefix } = process.env;
import Util from "./Utils.js";
import { config } from "./config.js";
import {
  handleCommands,
  handleEvents,
  handleComponents,
  handleLegacyCommands,
} from "#handlers";

export default class BOT extends Client {
  constructor() {
    super({
      intents: 3276799,
      partials: [
        Channel,
        GuildMember,
        GuildScheduledEvent,
        Message,
        Reaction,
        ThreadMember,
        User,
      ],
    });
    this.config = config;
    this.setMaxListeners(0);
    this.events = new Collection();
    this.legacyCommands = new Collection();
    this.aliases = new Collection();
    this.commands = new Collection();
    this.components = {
      buttons: new Collection(),
      modals: new Collection(),
      selectMenus: new Collection(),
    };
    this.cooldowns = {
      legacyCommands: new Collection(),
      buttons: new Collection(),
      commands: new Collection(),
      modals: new Collection(),
      selectMenus: new Collection(),
    };
    this.commandArray = new Array();
    this.developerArray = new Array();
    this.legacyArray = new Array();
    this.colors = {
      green: 0x22b14c,
    };
    this.rds = readdirSync;
    this.utils = new Util(this);
  }

  async start() {
    this.login(BotToken).then(async () => {
      await this.utils.logger();
      await handleEvents();
      await handleCommands();
      await handleComponents();
      if (Prefix) handleLegacyCommands();
    });
  }
}

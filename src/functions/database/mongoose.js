const mongoose = require("mongoose");
const { Connect } = process.env;

module.exports = (client) => {
  if (!Connect) return;
  const dbOptions = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    autoIndex: true,
    connectTimeoutMS: 10000,
    family: 4,
  };

  mongoose.connect(Connect, dbOptions);
  mongoose.Promise = global.Promise;

  mongoose.connection.on("connected", () => {
    console.log(client.chalk.greenBright("[DATABASE] - Mongoose has successfully connected!"));
  });

  mongoose.connection.on("connecting", () => {
    console.log(client.chalk.yellowBright("[DATABASE] - Mongoose is connecting..."));
  });

  mongoose.connection.on("err", (err) => {
    console.error(client.chalk.redBright(`[DATABASE] - Mongoose connection error: \n${err.stack}`));
  });

  mongoose.connection.on("disconnected", () => {
    console.warn(client.chalk.black("[DATABASE] - Mongoose connection lost"));
  });
};

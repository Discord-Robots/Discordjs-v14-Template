const { createCanvas, loadImage } = require("canvas");
const { AttachmentBuilder } = require("discord.js");

async function welcomeCreate(member, guildName, memberCount, channel) {
  const welcomeCanvas = {};
  welcomeCanvas.create = createCanvas(1024, 500);
  welcomeCanvas.context = welcomeCanvas.create.getContext("2d");
  welcomeCanvas.context.font = "68px sans-serif";
  welcomeCanvas.context.fillStyle = "#ffffff";

  const url = "https://i.imgur.com/KoJFmQW.jpeg";
  await loadImage(url).then(async (img) => {
    welcomeCanvas.context.drawImage(img, 0, 0, 1024, 500);
    welcomeCanvas.context.fillText("Welcome!", 350, 75);
    welcomeCanvas.context.beginPath();
    welcomeCanvas.context.arc(512, 245, 128, 0, Math.PI * 2, true);
    welcomeCanvas.context.stroke();
    welcomeCanvas.context.fill();
  });

  let canvas = welcomeCanvas;
  canvas.context.font = "42px sans-serif";
  canvas.context.textAlign = "center";
  canvas.context.fillText(member.user.tag.toUpperCase(), 512, 425);
  canvas.context.font = "28px sans-serif";
  canvas.context.fillText(`${memberCount} members`, 512, 475);
  canvas.context.beginPath();
  canvas.context.arc(512, 245, 119, 0, Math.PI * 2, true);
  canvas.context.closePath();
  canvas.context.clip();
  const url2 = `https://cdn.discordapp.com/avatars/${member.id}/${member.user.avatar}.png?size=1024`;
  await loadImage(`${url2}`).then((img2) => {
    canvas.context.drawImage(img2, 393, 125, 238, 238);
  });
  let Attachment = new AttachmentBuilder(canvas.create.toBuffer(), {
    name: `welcome-${member.id}.png`,
    description: `test`,
  });

  try {
    channel.send({
      content: `:wave: Welcome to ${guildName}, ${member} `,
      files: [Attachment],
    });
  } catch (error) {
    console.log(error);
  }
}

module.exports = { welcomeCreate };

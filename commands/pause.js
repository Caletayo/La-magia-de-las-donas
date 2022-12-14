const { Message, CommandInteraction } = require("discord.js");
const { Manager, Player } = require("erela.js");
const { Client } = require("undici");
const ms = require("parse-ms");
const { respond, editRespond } = require("../components/respond");
const { readFileSync } = require("fs");
const config = JSON.parse(
  readFileSync(process.cwd() + "/config.def", { encoding: "utf-8" })
);

module.exports = {
  name: "pause",
  description: "⏸ Pauses the currently playing track.",
  options: [],

  /**
   *
   * @param {Client} client
   * @param {CommandInteraction | null} interaction
   * @param {Message<boolean> | null} message
   * @param {boolean} isSlash
   * @param {string[] | null} args
   * @param {Manager} manager
   */

  run: async(client, interaction, message, isSlash, args, manager) => {
    let memberVoiceChannel =
      isSlash == true
        ? interaction.guild.members.cache.get(interaction.user.id)?.voice
            ?.channel
        : message.member.voice?.channel;
    let botVoiceChannel =
      isSlash == true
        ? interaction.guild.me.voice?.channel
        : message.guild.me.voice?.channel;
    if (!memberVoiceChannel)
      return respond(
        interaction,
        message,
        {
          content: "<:uo_music:981602843091939398> You must join a voice channel to use that!",
        },
        isSlash
      );
    if (botVoiceChannel && botVoiceChannel.id !== memberVoiceChannel.id)
      return respond(
        interaction,
        message,
        {
          content: `<:uo_music:981602843091939398> You must be listening in **${botVoiceChannel.name}** to use that!`,
        },
        isSlash
      );
    let player = manager.players.get(
      isSlash == true ? interaction.guildId : message.guildId
    );
    if (!player || !player.queue.current)
      return respond(
        interaction,
        message,
        {
          content: "<:uo_music:981602843091939398> There must be music playing to use that!",
        },
        isSlash
      );
    if (player.paused)  return respond(
        interaction,
        message,
        {
          content: "<:uo_music:981602843091939398> The player is already paused! Use `/resume to` unpause!",
        },
        isSlash
      );
    await player?.pause(true);
    respond(
      interaction,
      message,
      {
        content:
          `<:uo_music:981602843091939398> Paused **${player.queue.current.title}** Type \`/play\` to unpause!`,
      },
      isSlash
    );
  },
};

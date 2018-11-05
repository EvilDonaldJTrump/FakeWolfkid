const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {
            var bedrockMsg = message.content.toLowerCase().split(" ");
            if (bedrockMsg[1] == null) return message.reply('Command usage: /bedrock <ip> [port]')
            if (bedrockMsg[2] == null) bedrockMsg[2] = 19132;
            unirest.get('https://use.gameapis.net/mcpe/query/extensive/' + bedrockMsg[1] + ':' + bedrockMsg[2])
            .header("Accept", "application/json").end(resources => {
              if (resources.status == 200){
                if (resources.body.error != null){
                  var errorStatus = new Discord.RichEmbed()
                     .setTitle('Bedrock Query Error')
                     .setDescription('❌ You have entered a invalid **IP** and **Port**, or this server is __offline__!')
                     .setColor('RANDOM')
		     .setTimestamp(new Date())
		     .setFooter(`Please try again later, ${message.author.username}`, `${message.author.avatarURL}`)
                  sendEmbed(message.channel, errorStatus);
                  return;
                }
                if (resources.body.list == null){ 
                  resources.body.list = ['None'];
                } else if (resources.body.list.join(', ').length > 1024) resources.body.list = ['Too limit!'];
                if (resources.body.plugins == null){ 
                  resources.body.plugins = ['None'];
                } else if (typeof resources.body.plugins == "string"){ resources.body.plugins = [resources.body.plugins];
                } else if(resources.body.plugins.join(', ').length > 1024) resources.body.plugins = ['Too limit!'];
                    var query = new Discord.RichEmbed()
		      .setTitle('Bedrock Query')
		      .setDescription('**IP**: __' + bedrockMsg[1] + '__ | **Port**: __' + bedrockMsg[2] + '__')
                      .addField('MOTD', '```' + resources.body.motd + '```')
                      .addField('Software', '```' + resources.body.software + '```')
                      .addField('Game Version', '```' + resources.body.version + '```')
                      .addField('Protocol', '```' + resources.body.protocol + '```')
                      .addField('Map', '```' + resources.body.map + '```')
                      .addField('Players [' + resources.body.players.online + '/' + resources.body.players.max + ']', '```' + resources.body.list.join(', ') + '```')
                      .addField('?Plugins', '```' + resources.body.plugins.join(', ') + '```')
                      .setColor('RANDOM')
		      .setTimestamp(new Date())
		      .setFooter(Whitelist: ${resources.body.whitelist == 'on'}`);
                    sendEmbed(message.channel, query);
                 } else {
                    message.reply('Bedrock Query Error: There is a problem to send a Query API request. Please try again later.')
                    .then(function (message) {
                    }).catch(function() {});
 }
  module.exports.help = {
  name:"query"
}
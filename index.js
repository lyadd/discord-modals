const dotenv = require('dotenv').config();
const { Client } = require('discord.js');
const axios = require('axios');
const client = new Client({ intents: 32767 }); 

client.on('ready', () => { console.log(`Connecté sur ${client.user.tag}`); });

client.on('messageCreate', (message) => {
	if (message.content === 'modal') {
		message.channel.send({
			content: 'Cliquez ci-dessous pour postuler au mod !',
			components: [{
				type: 1, components: [{
					type: 2, custom_id: 'button', label: 'Appliquer', style: 'PRIMARY',
				}]
			}],
		});
	}
});

client.on('interactionCreate', async (interaction) => {
	await axios({
		method: 'POST',
		url: `https://discord.com/api/interactions/${interaction.id}/${interaction.token}/callback`,
		headers: {
			Authorization: `Bot ${client.token}`,
		},
		data: {
			type: 9,
			data: {
				title: 'mod',
				custom_id: 'modal',
				components: [
					{
						type: 1,
						components: [
							{
								type: 4,
								custom_id: 'modalll',
								label: 'Pourquoi veux-tu être mod ?',
								style: 1,
								min_length: 2,
								max_length: 400,
								required: true,
							},
						],
					},
				],
			},
		},
	});
});

client.login(process.env.token);

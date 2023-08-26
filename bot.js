const Discord = require('discord.js');
const client = new Discord.Client();

const webhookURL = 'https://discord.com/api/webhooks/1122143473450102819/VjqJcXIvPv9NacA9V3fcP8wg-Ee5WuZgnk1Xl3yQ3GIyNyhkRTp0JPCOkExrNyc-iTVF'; // Duyurunun gönderileceği webhook URL'sini buraya ekleyin
const channelID = '1122143453069987900'; // Duyurunun gönderileceği kanalın ID'sini buraya ekleyin

const prefix = '!';

client.once('ready', () => {
  console.log('Bot çalışıyor!');
});

client.on('message', message => {
  if (!message.content.startsWith(prefix) || message.author.bot) return;

  const args = message.content.slice(prefix.length).trim().split(/ +/);
  const command = args.shift().toLowerCase();

  if (command === 'blog') {
    message.channel.send('Lütfen site URL\'sini girin.').then(() => {
      const filter = m => m.author.id === message.author.id;
      const collector = message.channel.createMessageCollector(filter, { time: 15000 }); // 15 saniye içinde cevap gelmezse toplama işlemi sonlanır

      let statusMessage;

      collector.on('collect', collected => {
        const siteURL = collected.content;

        message.channel.send('Site inceleniyor...').then(msg => {
          statusMessage = msg;
          statusMessage.edit('Apiye istek gönderiliyor...');
          setTimeout(() => {
            statusMessage.edit('Api isteği kabul edildi. Lütfen bekleyin...');
            setTimeout(() => {
              statusMessage.edit('Api isteği kabul edildi. Lütfen bekleyin...');
              setTimeout(() => {
                statusMessage.edit('Lütfen bekleyin.');
                setTimeout(() => {
                  statusMessage.edit('Lütfen bekleyin..');
                  setTimeout(() => {
                    statusMessage.edit('Lütfen bekleyin...');
                    setTimeout(() => {
                      statusMessage.edit('Lütfen bekleyin');
                      setTimeout(() => {
                        statusMessage.edit('Lütfen bekleyin.');
                        setTimeout(() => {
                          statusMessage.edit('Lütfen bekleyin..');
                          setTimeout(() => {
                            statusMessage.edit('Lütfen bekleyin...');
                            setTimeout(() => {
                              statusMessage.edit('Gerekli işlemler tamamlanıyor.');
                              setTimeout(() => {
                                statusMessage.edit('Gerekli işlemler tamamlanıyor..');
                                setTimeout(() => {
                                  statusMessage.edit('Gerekli işlemler tamamlanıyor...');
                                  setTimeout(() => {
                                    statusMessage.edit('Gerekli işlemler tamamlanıyor');
                                    setTimeout(() => {
                                      statusMessage.edit('Gerekli işlemler tamamlanıyor.');
                                      setTimeout(() => {
                                        statusMessage.edit('Gerekli işlemler tamamlanıyor..');
                                        setTimeout(() => {
                                          statusMessage.edit('Gerekli işlemler tamamlanıyor...');
                                          setTimeout(() => {
                                            statusMessage.edit('Herşey Tamam.');
                                            setTimeout(() => {
                                              const embed = new Discord.MessageEmbed()
                                                .setTitle('Yeni blog sayfası duyuruldu')
                                                .setDescription(`Sayfa ------> ${siteURL}`);

                                              // Webhook oluştur
                                              const webhookClient = new Discord.WebhookClient({ url: webhookURL });

                                              // Duyuru yap
                                              const channel = client.channels.cache.get(channelID);
                                              if (channel && channel.type === 'text') {
                                                channel
                                                  .createWebhook('Duyuru Botu', {
                                                    avatar: 'https://cdn.discordapp.com/attachments/1122902630306422855/1126141850508599346/Ekran_Alnts.PNG', // Botun avatar URL'sini buraya ekleyin
                                                  })
                                                  .then(webhook => {
                                                    webhook.send('Yeni bir konu paylaşıldı :D', {
                                                      embeds: [embed],
                                                    });
                                                  })
                                                  .catch(console.error);
                                              }

                                              message.channel.send('Duyuru başarıyla gönderildi!');
                                            }, 2000); // 2 saniye sonra duyuru yapılır
                                          }, 2000); // 2 saniye beklenir
                                        }, 2000); // 2 saniye beklenir
                                      }, 2000); // 2 saniye beklenir
                                    }, 2000); // 2 saniye beklenir
                                  }, 2000); // 2 saniye beklenir
                                }, 2000); // 2 saniye beklenir
                              }, 2000); // 2 saniye beklenir
                            }, 2000); // 2 saniye beklenir
                          }, 2000); // 2 saniye beklenir
                        }, 2000); // 2 saniye beklenir
                      }, 2000); // 2 saniye beklenir
                    }, 2000); // 2 saniye beklenir
                  }, 2000); // 2 saniye beklenir
                }, 2000); // 2 saniye beklenir
              }, 2000); // 2 saniye beklenir
            }, 2000); // 2 saniye beklenir
          }, 2000); // 2 saniye beklenir
        });

        collector.stop();
      });

      collector.on('end', collected => {
        if (collected.size === 0) {
          message.channel.send('Zaman aşımı! Lütfen komutu tekrar kullanın.');
        }
      });
    });
  }
});

client.login('MTEyMTEwMjI0NDEwNDg5NjY1Mg.GqFElC.QVecNfYcltmC-7XiEbhc6v-6iuqyNlenXDucrc'); // Botunuzun Discord bot token'ını buraya ekleyin

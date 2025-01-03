const { Client, GatewayIntentBits } = require('discord.js');
const schedule = require('node-schedule');

// 創建 Discord 客戶端，設定必要的權限
// Guilds: 允許機器人接收伺服器相關事件
// GuildMessages: 允許機器人接收訊息相關事件
const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages] });

// 當機器人成功登入時觸發此事件
client.once('ready', () => {
    console.log(`Logged in as ${client.user.tag}`);
    
    // 設定定時任務，使用 cron 表達式
    // '0 8 * * *' 表示：
    // 0: 0 分
    // 8: 8 點
    // *: 每天
    // *: 每月
    // *: 每週
    schedule.scheduleJob('0 8 * * *', async () => {
        // 獲取指定的頻道
        const channel = client.channels.cache.get('YOUR_CHANNEL_ID');
        
        if (channel) {
            // TODO: 這裡之後可以替換成實際的經文獲取邏輯
            const dailyVerse = '這裡是每日經文內容';
            channel.send(dailyVerse);
        }
    });
});

// 監聽訊息創建事件
// 當有人發送 !verse 指令時，機器人會立即回應
client.on('messageCreate', message => {
    if (message.content === '!verse') {
        message.channel.send('Today\'s verse will be here!');
    }
});

// 使用 Token 登入 Discord
client.login('YOUR_DISCORD_BOT_TOKEN');

export default function handler(req, res) {
    const clientId = process.env.DISCORD_CLIENT_ID;

    const redirectUri =
        "https://chill-zone-dashboard11-iqmzzpb1c-discord-bot9.vercel.app/api/auth/discord";

    const discordUrl =
        "https://discord.com/oauth2/authorize" +
        "?client_id=" + clientId +
        "&response_type=code" +
        "&redirect_uri=" + encodeURIComponent(redirectUri) +
        "&scope=identify%20guilds";

    res.redirect(302, discordUrl);
}

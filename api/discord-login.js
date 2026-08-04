export default async function handler(req, res) {
    const clientId = process.env.DISCORD_CLIENT_ID;
    const clientSecret = process.env.DISCORD_CLIENT_SECRET;

    const redirectUri =
        "https://chill-zone-dashboard11-iqmzzpb1c-discord-bot9.vercel.app/api/discord-login";

    // Discord has sent the user back with an authorization code
    if (req.query.code) {
        const response = await fetch(
            "https://discord.com/api/oauth2/token",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded"
                },
                body: new URLSearchParams({
                    client_id: clientId,
                    client_secret: clientSecret,
                    grant_type: "authorization_code",
                    code: req.query.code,
                    redirect_uri: redirectUri
                })
            }
        );

        if (!response.ok) {
            return res.status(400).send("Discord login failed.");
        }

        return res.redirect("/dashboard.html");
    }

    // Start Discord login
    const discordUrl =
        "https://discord.com/oauth2/authorize" +
        "?client_id=" + encodeURIComponent(clientId) +
        "&response_type=code" +
        "&redirect_uri=" + encodeURIComponent(redirectUri) +
        "&scope=" + encodeURIComponent("identify guilds");

    return res.redirect(302, discordUrl);
}

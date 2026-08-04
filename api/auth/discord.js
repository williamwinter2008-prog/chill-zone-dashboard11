export default async function handler(req, res) {
    const clientId = process.env.DISCORD_CLIENT_ID;

    const redirectUri =
        "https://chill-zone-dashboard11-iqmzzpb1c-discord-bot9.vercel.app/api/auth/discord";

    // If Discord has returned an error instead of a code
    if (req.query.error) {
        return res.status(400).send(
            "Discord authorization failed: " + req.query.error
        );
    }

    // If Discord has returned an authorization code,
    // exchange it for an access token.
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
                    client_secret: process.env.DISCORD_CLIENT_SECRET,
                    grant_type: "authorization_code",
                    code: req.query.code,
                    redirect_uri: redirectUri
                })
            }
        );

        const data = await response.json();

        if (!response.ok) {
            return res.status(400).json(data);
        }

        // Login succeeded
        return res.redirect("/dashboard.html");
    }

    // Start Discord OAuth2 login
    const discordUrl =
        "https://discord.com/oauth2/authorize" +
        "?client_id=" + encodeURIComponent(clientId) +
        "&response_type=code" +
        "&redirect_uri=" + encodeURIComponent(redirectUri) +
        "&scope=" + encodeURIComponent("identify guilds");

    return res.redirect(302, discordUrl);
}

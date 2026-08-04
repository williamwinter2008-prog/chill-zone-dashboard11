export default async function handler(req, res) {
    try {
        const { code } = req.query;

        if (!code) {
            return res.status(400).send("Missing Discord authorization code.");
        }

        const clientId = process.env.DISCORD_CLIENT_ID;
        const clientSecret = process.env.DISCORD_CLIENT_SECRET;

        if (!clientId || !clientSecret) {
            return res.status(500).send(
                "Discord environment variables are missing in Vercel."
            );
        }

        const redirectUri =
            "https://chill-zone-dashboard11-iqmzzpb1c-discord-bot9.vercel.app/api/auth/discord";

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
                    code: code,
                    redirect_uri: redirectUri
                })
            }
        );

        const data = await response.json();

        if (!response.ok) {
            return res.status(400).json(data);
        }

        return res.redirect(302, "/dashboard.html");

    } catch (error) {
        console.error("Discord OAuth Error:", error);

        return res.status(500).send(
            "Discord login failed. Please check your Vercel environment variables and OAuth2 settings."
        );
    }
}

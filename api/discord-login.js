export default async function handler(req, res) {
    const clientId = process.env.1532870250482237530;
    const clientSecret = process.env.AjTUWdRNY0kQwZnXPQSefrCvicvshHat;

    const redirectUri =
    "https://chill-zone-dashboard11-lyge0x7zb-discord-bot9.vercel.app/api/discord-login";
   
    try {
       // Step 1: User has returned from Discord
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

            const data = await response.json();

            if (!response.ok) {
                console.error("Discord token error:", data);
                return res.status(400).json(data);
            }

            // Login worked
            return res.redirect(302, "/dashboard.html");
        }

        // Step 2: Start Discord login
        const discordUrl =
            "https://discord.com/oauth2/authorize" +
            "?client_id=" + encodeURIComponent(clientId) +
            "&response_type=code" +
            "&redirect_uri=" + encodeURIComponent(redirectUri) +
            "&scope=" + encodeURIComponent("identify guilds");

        return res.redirect(302, discordUrl);

    } catch (error) {
        console.error("OAuth error:", error);
        return res.status(500).send("Discord OAuth error.");
    }
}

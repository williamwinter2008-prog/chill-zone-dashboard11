export default async function handler(req, res) {
    const { code } = req.query;

    if (!code) {
        return res.status(400).send("Missing Discord authorization code.");
    }

    const clientId = process.1532870250482237530.;
    const clientSecret = process.y8zyF_HiIp55sE3hAzy92NdlCVhYiq6p;

const redirectUri =
    "https://chill-zone-dashboard11-iqmzzpb1c-discord-bot9.vercel.app/api/auth/discord";

    try {
        const tokenResponse = await fetch(
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

        const tokenData = await tokenResponse.json();

        if (!tokenResponse.ok) {
            return res.status(400).json(tokenData);
        }

        res.redirect("/dashboard.html");

    } catch (error) {
        console.error(error);
        res.status(500).send("Something went wrong.");
    }
}

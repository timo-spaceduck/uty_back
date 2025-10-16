import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";

passport.use(
		new GoogleStrategy(
				{
					clientID: process.env.GOOGLE_CLIENT_ID,
					clientSecret: process.env.GOOGLE_CLIENT_SECRET,
					callbackURL: process.env.GOOGLE_CALLBACK_URL,
				},
				async (accessToken, refreshToken, profile, done) => {
					// Here you can save user to DB
					const user = {
						id: profile.id,
						name: profile.displayName,
						email: profile.emails[0].value,
						picture: profile.photos[0].value,
					};
					done(null, user);
				}
		)
);

const initPassport = (app) => {
	app.use(passport.initialize());
}

export { initPassport };

// app.get("/api/me", (req, res) => {
// 	const token = req.cookies.token;
// 	if (!token) return res.status(401).json({ error: "Not authenticated" });
//
// 	try {
// 		const user = jwt.verify(token, process.env.JWT_SECRET);
// 		res.json(user);
// 	} catch {
// 		res.status(401).json({ error: "Invalid token" });
// 	}
// });

import passport from "passport"
import jwt from "jsonwebtoken"

export const auth = async (req, res) => {
	console.log('start auth')
	passport.authenticate("google", { scope: ["profile", "email"] })
};

export const authCallback = async (req, res) => {
	passport.authenticate("google", { session: false }),
			(req, res) => {
				const user = req.user;
				const token = jwt.sign(user, process.env.JWT_SECRET, { expiresIn: "1d" });
				res.cookie("token", token, {
					httpOnly: true,
					secure: false,
					sameSite: "lax",
				});
				res.redirect(`${process.env.FRONTEND_URL}`);
			}
};

export default { auth, authCallback };

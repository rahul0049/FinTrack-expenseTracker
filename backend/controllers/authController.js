import { comparePassword, createJWT, hashPassword } from "../libs/index.js";
import { pool } from "../libs/database.js";
const signupUser = async (req, res) => {
    try {
        const { firstname, email, password } = req.body;
        if (!firstname || !email || !password) {
            return res.status(404).json({
                status: "failed",
                message: "please provide all required fields"
            })
        }
        const userExist = await pool.query({
            text: "SELECT EXISTS (SELECT * FROM tbluser WHERE email=$1)",
            values: [email],
        })
        if (userExist.rows[0].exists ) {
            return res.status(409).json({
                status: "false",
                message: "email address already exists. Try login"
            })
        };
        const hashedPassword = await hashPassword(password);
        const user = await pool.query({
            text: `INSERT INTO tbluser (firstname,email,password) VALUES ($1,$2,$3) RETURNING *`,
            values: [firstname, email, hashedPassword]
        })
        user.rows[0].password = undefined;

        res.status(201).json({
            status: "success",
            message: "user account created successfully",
            user: user.rows[0],
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({ status: "failed", message: error.message });
    }
}

const signinUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(404).json({
                status: "failed",
                message: "Please provide email or password"
            })
        }
        const result = await pool.query({
            text: `SELECT * FROM tbluser WHERE email=$1`,
            values: [email]
        });
        const user = result.rows[0];
        if (!user) {
            return res.status(404).json({ status: "failed", message: "Invalid email" })
        }
        const isMatch = await comparePassword(password, user?.password)
        if (!isMatch) {
            return res.status(404).json({
                status: "failed",
                message: "invalid password"
            })
        }
        const token = createJWT(user.id);
        user.password = undefined
        res.status(200).json({ status: "success", message: "Login successfully", user, token })

    } catch (error) {
        console.log(error);
        res.status(500).json({ status: "failed", message: error.message });
    }
}


export { signupUser, signinUser }
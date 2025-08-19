

export const Authenticated = async (req, res, next) => {
    const token = req.header("Authorization")

    if(!token) {
        return res.json({
            message: "Login First"
        })
    }
}
const jwt = require("jsonwebtoken");

const getDataFromToken = (request) => {
    try {
        const token = request.cookies.get("token")?.value || "";
        const decodedToken = jwt.verify(token, process.env.TOKEN_SECRET);
        if (typeof decodedToken === "object" && "id" in decodedToken) {
            return decodedToken.id;
        }
        throw new Error("Invalid token payload");
    } catch (error) {
        if (error instanceof Error) {
            return { error: error.message };
        }
        return { error: "An unknown error occurred" };
    }
};

module.exports = { getDataFromToken };

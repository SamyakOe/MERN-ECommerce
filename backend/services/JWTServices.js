import jwt from 'jsonwebtoken'
//Extract Bearer Token
export function extractBearerToken(header) {
    if (!header || !header.startsWith("Bearer")) {
        return null;
    }
    // Get token from header (Bearer <token>)
    const token = header.split(" ")[1];
    return token;
}

//Generate Access Token
export function generateAccessToken(payload) {
    const tokenPayload = {
        id: payload.id,
        role: payload.role,
        type: 'access',
    }
    return jwt.sign(
        tokenPayload,
        process.env.JWT_ACCESS_SECRET,
        { expiresIn: process.env.JWT_ACCESS_EXPIRY }
    );
}

//Generate Refresh Token
export function generateRefreshToken(payload) {
    const tokenPayload = {
        id: payload.id,
        type: 'refresh',
    }
    return jwt.sign(
        tokenPayload,
        process.env.JWT_REFRESH_SECRET,
        { expiresIn: process.env.JWT_REFRESH_EXPIRY }
    );
}

//Generate Token Pair
export function generateTokenPair(payload) {
    const accessToken = generateAccessToken(payload);
    const refreshToken = generateRefreshToken(payload);
    return { accessToken, refreshToken };
}

//Verify Access Token
export function verifyAccessToken(token) {
    return jwt.verify(token, process.env.JWT_ACCESS_SECRET);
}

//Verify Refresh Token
export function verifyRefreshToken(token) {
    return jwt.verify(token, process.env.JWT_REFRESH_SECRET);
}


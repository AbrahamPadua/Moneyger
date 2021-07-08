import jwt from "jsonwebtoken";

const SECRET = process.env.JWT_SECRET;
const REFRESH_SECRET = process.env.REFRESH_TOKEN_SECRET;

export const createAccessToken = ({ _id, email } = {}) => {
  try {
    const data = { id: _id, email };
    return jwt.sign(data, SECRET, { expiresIn: `15m` });
  } catch (err) {
    console.error(err);
    return false;
  }
};

export const createRefreshToken = ({ _id, tokenVersion } = {}, inc = false) => {
  try {
    // If increment by 1
    tokenVersion = inc ? tokenVersion + 1 : tokenVersion;
    const data = { id: _id, tokenVersion };
    return jwt.sign(data, REFRESH_SECRET, { expiresIn: `1d` });
  } catch (err) {
    console.error(err);
    throw new Error("Error creating refresh token.");
  }
};

export const verifyRefreshToken = (token) => {
  try {
    return jwt.verify(token, REFRESH_SECRET, (err, data) => {
      if (!err) return jwt.decode(token, { complete: true }).payload;
      console.log(err);
      return null;
    });
  } catch (err) {
    console.log(err);
    throw new Error("Error in verifying refresh token");
  }
};

// Validates whether a token is valid.
export const verify = async (req, res, next) => {
  try {
    let {
      headers: { authorization: token },
    } = req;
    console.log(req.route.path);
    console.log(`verifying token...`);
    if (token) {
      token = token.slice(7);

      if (typeof token !== `undefined`) {
        return jwt.verify(token, SECRET, (err, data) => {
          err ? console.log(err) : console.log(`token verified!`);
          return err
            ? res.status(401).send({ auth: `Failed. Invalid Token.` })
            : next();
          // }
        });
      }

      return null;
    } else {
      res.status(403).json({ message: `Please provide a token.` });
    }
  } catch (err) {
    console.error(err);
  }
};

// Transforming tokens into user details.
export const decode = (token) => {
  if (typeof token !== `undefined`) {
    token = token.slice(7);
    return jwt.verify(token, SECRET, (err, data) => {
      return err ? null : jwt.decode(token, { complete: true }).payload;
    });
  }

  return null;
};

// Verify then checks if an admin.
export const forAdminsOnly = [
  verify,
  async (req, res, next) => {
    try {
      const user = decode(req.headers.authorization);
      user.isAdmin
        ? next()
        : res
            .status(403)
            .json({ message: `You must be an admin to access this page.` });
    } catch (err) {
      console.log(err);
      res.status(400).send(`Something went wrong`);
    }
  },
];

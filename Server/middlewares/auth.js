import User from "../models/user";

export const authenticate = async (req, res, next) => {
  console.log(req.body.query)
  next()
  // try {
  //   let { headers: { authorization: token } } = req
  //   if (token) {
  //     token = token.slice(7);

  //     if (typeof token !== `undefined`) {
  //       return jwt.verify(token, SECRET, (err, data) => {
  //         err ? console.log(err) : console.log(`token verified!`);
  //         return err
  //           ? res.status(401).send({ auth: `Failed. Invalid Token.` })
  //           : next();
  //         // }
  //       });
  //     }

  //     return null;
  //   } else {
  //     res.status(403).json({ message: `Please provide a token.` });
  //   }
  // } catch (err) {
  //   console.error(err);
  // }
}
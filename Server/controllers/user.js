// AUTH
import {
  createAccessToken,
  createRefreshToken,
  verifyRefreshToken,
  decode,
} from "./auth";
import { OAuth2Client } from "google-auth-library";
// UTILITIES
import fetch from "node-fetch";
import dayjs from "dayjs";
import { hashSync, compareSync } from "bcrypt";
// MODELS
import User from "../models/user";
import Quote from "../models/quote";
import LoggedIn from "../models/loggedIn";

// CONSTANTS
const SALT = 12;
const CLIENT_ID = process.env.CLIENT_ID;
const tokenExpiry = 15 * 60; // 15 mins.

//    //    //    //
// Primary Goals  //
//    //    //    //

// 1. REGISTER
export const register = async ({
  firstName,
  lastName,
  email,
  mobileNo,
  password,
  loginType,
}) => {
  try {
    email = email.toLowerCase()
    if (!(await emailExists(email))) {
      if (loginType === "Google") {
        return [false, "You must login with google."];
      } else {
        // If loginType === "form" or "both"
        let newUser = new User({
          firstName,
          lastName,
          email,
          mobileNo,
          password: hashSync(password, SALT),
          loginType,
        });

        await newUser.save();
        console.log();
        return [true, `succesfully added ${email} in the database`];
      }
    } else {
      return [false, `The email ${email} already exist.`];
    }
  } catch (err) {
    console.log(err);
  }

  return;
};

// 2. CREATE CATEGORY
export const addCategory = async ({
  headers,
  body: { name, type, icon, iconColor },
}) => {
  try {
    const { id: userId } = decode(headers.authorization);
    const user = await User.findById(userId);
    for (let category of user.categories) {
      if (category.name.toLowerCase() === name.toLowerCase()) {
        return [false, `The Category ${name} already exist.`];
      }
    }
    user.categories.push({ name, type, icon, iconColor });
    await user.save();
    console.log(`succesfully added the category ${name}`);
    return [true, `succesfully added the category ${name}`];
  } catch (err) {
    console.log(err);
    return [false, err];
  }
};

// 3. LOGIN
export const login = async ({ email, password, loginType, ...data }, res) => {
  /* 
    STEPS:
      1. Check what type of login the user did. ["form", "google"]
      2. Check if email exists
        // FORM
          2.1. Check credentials
        // GOOGLE
          2.1 Get Credentials
          2.2 
      3. Add the refresh token in the database temporarily
      4. Return response
  */
  try {
    // Step 1
    if (loginType === "form") {
      // Step 2
      email = email.toLowerCase()
      const user = await emailExists(email)
      if (user) {
        // Verify Password
        let matched = compareSync(password, user.password);
        if (matched) {
          // const log = new LoggedIn({
          //   refresh_token,
          //   userId: user.id,
          //   tokenVersion: user.tokenVersion,
          // });
          // log.save();

          const refresh_token = createRefreshToken(user);
          process.env.MODE == "DEVELOPMENT"
            ? res.cookie("jid", refresh_token, {
              sameSite: "lax",
            })
            : res.cookie("jid", refresh_token, {
              httpOnly: true,
              sameSite: "none",
              secure: true,
            });
          console.log(user)

          return [
            true,
            {
              accessToken: createAccessToken(user.toObject()),
              tokenExpiry,
              userId: user._id
            },
          ];
        } else {
          return [false, `The password does not match`];
        }
      } else {
        return [false, `There is no user with the email ${email}`];
      }
    } else if (loginType === "google") {
      let [success, tokenData] = await verifyGoogleToken(data, res);
      if (!success) return [success, tokenData];

      const refresh_token = createRefreshToken(tokenData[1]);
      console.log(refresh_token);

      process.env.MODE == "DEVELOPMENT"
        ? res.cookie("jid", refresh_token, {
          sameSite: "lax",
        })
        : res.cookie("jid", refresh_token, {
          httpOnly: true,
          sameSite: "none",
          secure: true,
        });

      return [success, tokenData[0]];
    }
  } catch (err) {
    console.error(err);
    return [false, "Something went wrong"];
  }
};

// 4. CREATE NEW RECORD
export const addRecord = async ({ headers, body }) => {
  try {
    const { id: userId } = decode(headers.authorization);
    const user = await User.findById(userId);

    switch (body.type.toLowerCase()) {
      case "expense":
        user.currentBalance -= body.amount;
        break;
      case "income":
        user.currentBalance += eval(body.amount);
    }

    user.transactions.push({
      ...body,
      balanceAfterTransaction: user.currentBalance,
    });
    await user.save();
    return [true, "Transaction successfully added!"];
  } catch (error) {
    console.log(error);
    return [false, "Transaction failed :/"];
  }
};

// 5. Retrieve Transactions
export const getRecords = async ({ headers: { authorization }, body }) => {
  // Getting userDetails
  const { id: userId } = decode(authorization);
  const user = await User.findById(userId);
  if (!user) return [false, "Can't find user"];

  const { transactions } = user;

  if (!Object.keys(body).length) {
    // RETURN ALL
    return [true, transactions];
  } else {
    // RETURN THE QUERIED TRANSACTION
    const queried = transactions.find(
      (transaction) => transaction.id === body.id
    );

    let i = transactions.indexOf(queried);
    const data =
      i == 0
        ? { current: queried, next: transactions[i + 1] }
        : i == transactions.length - 1
          ? { prev: transactions[i - 1], current: queried }
          : { prev: transactions[i - 1], current: queried, next: transactions[i + 1] };

    return [true, data];
  }
};

// 6. Retrieve Categories
export const getCategories = async ({ headers: { authorization } }) => {
  const { id: userId } = decode(authorization);
  const user = await User.findById(userId);
  if (user) {
    return [true, user.categories];
  } else {
    return [false, "Can't find user"];
  }
};

export const getCategory = async ({
  headers: { authorization, cookie },
  body,
  cookies,
}) => {
  console.log(authorization);
  let decoded = decode(authorization);
  if (cookies) {
    decoded = decode(cookie.jid);
  }
  console.log(decoded);
  const { id: userId } = decoded;
  const user = await User.findById(userId);
  if (user) {
    return [true, user.categories];
  } else {
    return [false, "Can't find user"];
  }
};

/* RECORDS BREAKDOWN */
export const getBreakdownByRange = async (
  { authorization: userId },
  { from, to }
) => {
  const user = await User.findById(userId);
  const summary = user.categories.map((category) => {
    return { categoryName: category.name, totalAmount: 0 };
  });
  const transactions = user.transactions.forEach(({ dateAdded }) => {
    return (
      dayjs(dateAdded).isSameOrAfter(from, "day") &&
      dayjs(dateAdded).isSameOrBefore(to, "day")
    );
  });
  return [true, transactions];
};

/*


//    //    //    //
// Stretch Goals  //
//    //    //    //

*/

// 1. EMAIL EXISTS
export const emailExists = async (email) => {
  const user = await User.findOne({ email });
  return user ? user : false;
};

// 2. GOOGLE REGISTER/LOGIN
export const verifyGoogleToken = async ({ tokenId }, res) => {
  try {
    const client = new OAuth2Client(CLIENT_ID);
    const data = await client.verifyIdToken({
      idToken: tokenId,
      audience: CLIENT_ID,
    });

    const { email_verified, email, given_name, family_name } =
      data.getPayload();

    // Check first if email is verified by google
    if (email_verified) {
      // Check if email is already registered.
      let user = await emailExists(email);
      if (user) {
        if (user.loginType === "google" || user.loginType === "both") {
          return [
            true,
            [
              {
                accessToken: createAccessToken(user.toObject()),
                tokenExpiry,
                userId: user._id
              },
              user,
            ],
          ];
        } else {
          return [
            false,
            "The email has been registered with a different procedure.",
          ];
        }
      } else {
        const newUser = new User({
          firstName: given_name,
          lastName: family_name,
          email,
          loginType: "google",
        });
        await newUser.save();
        const theUser = await User.find(U => U.email === newUser.email)
        return [
          true,
          [
            {
              accessToken: createAccessToken(newUser.toObject()),
              tokenExpiry,
              userId: theUser._id
            },
            newUser,
          ],
        ];
      }
    } else {
      // I don't know what I should do if email is not verified
      return [false, "You must verify your google account first."];
    }
  } catch (err) {
    console.log(err);
  }
};

// For removing the cookie and reseting the tokenVersion
export const logout = async ({ jid: token }) => {
  try {
    console.log(`logging out user...`);
    const payload = verifyRefreshToken(token);
    if (!payload) return [false, "Invalid token for logout."];
    // Restoring the tokenVersion to default 0
    await User.findByIdAndUpdate(payload.id, { tokenVersion: 0 });
    console.log(`logged out successfully :)`);
    return [true, "Logout succesfully"];
  } catch (err) {
    console.log(`logout unsuccessful :/`);
    console.log(err);
    return [false, "tokenVersion update is unsuccessful."];
  }
};

// Refreshing Refresh Token
export const refreshToken = async (
  { cookies: { jid: refresh_token }, body: { accessToken } },
  res
) => {
  if (!refresh_token) return [false, "No Refresh Token"];

  const payload = verifyRefreshToken(refresh_token);
  if (!payload) return [false, "Invalid Refresh Token"];

  LoggedIn.findOneAndDelete({ refresh_token });

  const user = await User.findById(payload.id);
  if (!user) return [false, "Invalid Refresh Token"];

  if (user.tokenVersion !== payload.tokenVersion) {
    await User.findByIdAndUpdate(payload.id, { tokenVersion: 0 });
    return [false, "Invalid Token Version"];
  }

  // If the revocation of the last token is successful
  if (await revokeToken(user)) {
    const newCookie = createRefreshToken(user, true);
    const token = createAccessToken(user);
    // const newLog = new LoggedIn({
    //   refresh_token: newCookie,
    //   tokenVersion: user.tokenVersion + 1,
    //   userId: user.id,
    // });
    // newLog.save();
    process.env.MODE == "DEVELOPMENT"
      ? res.cookie("jid", newCookie, {
        sameSite: "lax",
      })
      : res.cookie("jid", newCookie, {
        httpOnly: true,
        sameSite: "none",
        secure: true,
      });
    return [true, { token, tokenExpiry }];
  } else {
    return [false, "The revocation of token is unsuccessful"];
  }
};

// For Blacklisting previous tokens.
const revokeToken = async ({ _id }) => {
  try {
    await User.findByIdAndUpdate(_id, { $inc: { tokenVersion: 1 } });
    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
};

// Get User Details
export const getDetails = async (token) => {
  try {
    if (!token) return [false, "Please provide a token"];
    const { id: userId } = decode(token);
    const user = await User.findById(userId);
    if (!user) return [false, "Can't find user in the database."];
    return [true, user];
  } catch (err) {
    console.log(err);
    return [false, "Retrieval of user failed."];
  }
};

// Set A New Budget
export const addBudget = async (
  { authorization: token },
  { categoryName, amount }
) => {
  const { id: userId } = decode(token);
  const user = await User.findById(userId);
  if (!user) return [false, "Invalid Token"];
  user.budgets.push(categoryName, amount);
};

export const getQuote = async () => {
  const today = new Date();
  const quotes = await Quote.find({});
  // IF THERE IS NOT QUOTE OF THE DAY IN THE DATABASE

  try {
    if (!quotes.length || !dayjs(today).isSame(quotes[0].date, "day")) {
      if (quotes.length) await Quote.findByIdAndDelete(quotes[0]._id)
      const res = await fetch(
        `http://quotes.rest/qod.json?category=management`
      );
      const data = await res.json();
      const { quote, author, date } = data.contents.quotes[0];
      const newQuote = new Quote({ quote, author, date: new Date(date) });
      await newQuote.save();
      return [true, newQuote];
    } else {
      return [true, quotes[0]];
    }
  } catch (err) {
    console.log(err)
    return [false, err];
  }
};

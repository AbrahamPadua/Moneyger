import { Router } from "express";
import * as UserController from "../controllers/user";
import { decode, verify } from "../controllers/auth";
import { auth } from "google-auth-library";

const router = Router();

/* - - - - - - - - - - - - AUTHENTICATION - - - - - - - - - - - - */

/* REGISTER */
router.route("/register").post(async (req, res) => {
  const [success, data] = await UserController.register(req.body);
  success
    ? res.status(201).json({ message: "succesfully registered user", data })
    : res.status(400).send(data);
});

/* LOGIN */
router.route("/login").post(async (req, res) => {
  try {
    let [success, data] = await UserController.login(req.body, res);
    success
      ? res.status(200).json({ message: "Succesfully Logged in", data })
      : res.status(400).send(data);
  } catch (err) {
    console.log(err);
  }
});

/* LOGOUT */
router.route("/logout").post(async (req, res) => {
  try {
    const [success, data] = await UserController.logout(req.cookies);
    success
      ? res
        .status(200)
        .cookie("jid", "", { httpOnly: true, sameSite: "none", secure: true })
        .send(data)
      : res.status(400).send(data);
  } catch (err) {
    console.log(err);
    res.status(400).send(`Something Went wrong`);
  }
});

/* REFRESH TOKEN */
router.route("/refresh_token").get(async (req, res) => {
  const [success, data] = await UserController.refreshToken(req, res);
  success
    ? res.status(200).json({ message: "Success refresh token", data })
    : res.status(400).send(data);
});

/* - - - - - - - - - - - - GETTERS - - - - - - - - - - - - */

/* GET USER DETAILS */
router.route("/user").get(verify, async (req, res) => {
  const [success, data] = await UserController.getDetails(
    req.headers.authorization
  );
  success ? res.status(200).json(data) : res.status(400).json(data);
});

/* TRANSACTION/S RETRIEVAL */
router.route("/transaction").post(verify, async (req, res) => {
  const [success, data] = await UserController.getRecords(req);
  success
    ? res.status(201).json({ message: "Succesful retrieval", data })
    : res.status(400).send(data);
});

/* CATEGORY/IES RETRIEVAL */
router
  .route("/category")
  .post(verify, async (req, res) => {
    const [success, data] = await UserController.getCategory(req);
    success
      ? res.status(201).json({ message: "Succesful retrieval", data })
      : res.status(400).send(data);
  })
  .get(verify, async (req, res) => {
    // get ALL category
    const [success, data] = await UserController.getCategories(req);
    success
      ? res.status(201).json({ message: "Succesful retrieval", data })
      : res.status(400).send(data);
  });

/* RETRIEVE RECORDS BREAKDOWN */
router
  .route("/get-records-breakdown-by-range")
  .post(verify, async (req, res) => {
    await UserController.getBreakdownByRange(req.headers, req.body);
  });

router.route("/quote-of-the-day").get(verify, async (req, res) => {
  const [success, data] = await UserController.getQuote();
  success ? res.status(200).json({ data }) : res.status(400).send(data);
});

//                                                         //
/* - - - - - - - - - - - - SETTERS - - - - - - - - - - - - */
//                                                         //

/* CREATING NEW CATEGORY */
router.route("/add-category").post(async (req, res) => {
  const [success, data] = await UserController.addCategory(req);
  success
    ? res.status(201).json({ message: "successfully added a category", data })
    : res.status(400).send(data);
});

/* CREATING NEW RECORD */
router.route("/add-transaction").post(async (req, res) => {
  const [success, data] = await UserController.addRecord(req);
  success ? res.status(201).send(data) : res.status(400).send(data);
});

/* CREATE NEW BUDGET */
router.route("/add-budget", (req, res) => { });

export default router;

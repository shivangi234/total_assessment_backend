const db = require("../config/db");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const createUser = async (req, res) => {
  const {
    user_id,
    user_code,
    user_name,
    password,
    firstName,
    middileName,
    lastName,
    role_code,
    col_1,
    col_2,
    phone_no,
    org_code,
    email_id,
    profile_image_url,
    approved_status,
    can_verify,
    created_by,
    created_on,
    updated_by,
    updated_on,
    record_status,
    login_type,
    registration_status,
    school_name,
    institude_code,
    password_change_status,
    archieve_status,
  } = req.body;

  console.log("Request Body:", req.body);

  try {
    // Check if the user already exists
    const existingUser = await db("usermaster").where({ user_id }).first();
    if (existingUser) {
      return res
        .status(409)
        .json({ status: 409, message: "User already exists." });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10); // You can adjust the salt rounds if needed

    // If user doesn't exist, insert the new user
    const data = await db("usermaster")
      .insert({
        user_id,
        user_code,
        user_name,
        password: hashedPassword,
        first_name: firstName,
        middile_name: middileName,
        last_name: lastName,
        role_code,
        col_1,
        col_2,
        phone_no,
        org_code,
        email_id,
        profile_image_url,
        approved_status,
        can_verify,
        created_by,
        created_on,
        updated_by,
        updated_on,
        record_status,
        login_type,
        registration_status,
        school_name,
        institude_code,
        password_change_status,
        archieve_status,
      })
      .returning("id");

    res.status(200).json({ message: "User created successfully", data });
  } catch (error) {
    res.status(500).json({ error: "Error retrieving data" });
  }
};

const getUsers = async (req, res) => {
  try {
    const user = await db("usermaster");
    res.status(200).json({ message: "Data get successfully", user });
  } catch (error) {
    res.status(500).json({ error: "Error retrieving data" });
  }
};
// const verifyUser = async (req, res) => {
//     const { user_code, user_name, org_code } = req.body;

//     try {
//         // Check if user_code matches the concatenation of user_name and org_code
//         if (user_code === user_name + org_code) {
//             // User verified successfully
//             res.status(200).json({ status: 200, message: "User verified successfully" });
//         } else {
//             // User verification failed
//             res.status(400).json({ status: 400, message: "User verification failed" });
//         }
//     } catch (error) {
//         console.error(error);
//         res.status(500).json({ error: "Error verifying user" });
//     }
// }

const verifyUser = async (req, res) => {
  const { userName, password, orgCode } = req.body;
  const userCode = userName + orgCode;
  console.log(req.body.userName);
  try {
    console.log("Before fetching user details...");

    // Fetch user details
    const user = await db("usermaster as A")
      .select(
        "A.*",
        "B.logo_url",
        "B.org_name",
        "C.examinee_cat1_name",
        "D.examinee_cat2_name"
      )
      .leftJoin("organizationmaster as B", "A.org_code", "B.org_code")
      .leftJoin(
        "org_examinee_category1_master as C",
        "A.col_1",
        "C.examinee_cat1_code"
      )
      .leftJoin(
        "org_examinee_category2_master as D",
        "A.col_2",
        "D.examinee_cat2_code"
      )
      .where("user_code", userCode)
      .first();

    console.log("User details fetched...");

    if (!user) {
      console.log("Invalid credentials...");
      return res
        .status(401)
        .json({ status: 401, message: "Invalid Credential." });
    }

    // Check password
    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      console.log("Password does not match...");
      return res
        .status(401)
        .json({ status: 401, message: "Invalid Credential." });
    }

    console.log("Setting session data...");

    // Session data
    const session = req.session;
    session.userName = userName;
    session.userCode = user.user_code;
    session.roleCode = user.role_code;
    session.firstName = user.first_name;
    session.lastName = user.last_name;
    session.email = user.email_id;
    session.phoneNumber = user.phone_no;
    session.profileImageUrl = user.profile_image_url;
    session.cat1 = user.examinee_cat1_name;
    session.cat2 = user.examinee_cat2_name;
    session.logoUrl = user.logo_url;
    session.orgCode = user.org_code;
    session.orgName = user.org_name;

    console.log("Session data set...");

    // Generate JWT token
    const token = jwt.sign(
      { username: userName, user_id: user.user_id, user_code: user.user_code },
      process.env.ENCRYPTION_KEY,
      { expiresIn: "1hr" }
    );
    console.log(token);
    console.log("Token generated...");

    return res
      .status(200)
      .json({
        status: 200,
        message: "SignIn Successfull",
        result: user,
        token,
      });
  } catch (error) {
    console.error("Error occurred:", error);
    return res
      .status(500)
      .json({
        status: 500,
        message: "Something went wrong. Contact Support.",
        error,
      });
  }
};

module.exports = { createUser, getUsers, verifyUser };

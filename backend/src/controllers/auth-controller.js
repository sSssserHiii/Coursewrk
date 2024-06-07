const db =  require('../services/db')
const sha256 = require("sha256");
const jwt = require("jsonwebtoken");


class AuthController {

  async signIn(req, res) {
    try {
      const { username, password, role} = req.body;
      console.log('Received credentials:', username, password, role);
      let foundUser; 
  if (role === "Employee" || role ==="Administrator"){
     foundUser = await db("connect_user").query(
      `select full_name, category from employeeuser where employeeuser.full_name = $1 and employeeuser.login_password = $2`,
      [username, sha256(password)]
      
    );
    console.log('Query result:', foundUser);

  }
  else if(role === "Provider"){
   
     foundUser = await db("connect_user").query(
        `select full_name, category from provider where provider.full_name = $1 and provider.login_password = $2`,
        [username, sha256(password)]
      );
  }
  console.log('Query result:', foundUser);

  if (!foundUser || !foundUser.rowCount || foundUser.rowCount === 0) throw "no such user yet";
      // if select returned nothing then throw error
      console.log('Number of rows:', foundUser.rowCount);
      const accessToken = jwt.sign(
        { username, role: foundUser.rows[0].category },
        "12343412",
        { expiresIn: "1h" }
      );
      const refreshToken = jwt.sign(
        { username, role: foundUser.rows[0].category },
        "12343412",
        { expiresIn: "24h" }
      );
      res.cookie("jwt", refreshToken, {
        httpOnly: true,
        maxAge: 24 * 60 * 60 * 1000,
      });
      res.json({
        accessToken,
        role: foundUser.rows[0].category,
      fullName: role === "employeeuser" || role === "administrator" || role === "provider" 
                ? foundUser.rows[0].employee_full_name 
                : foundUser.rows[0].full_name_of_contact_face
      
              });
    } catch (err) {
      console.log(err);
      return res.status(401).json({ error: "invalid username or password" }); // unauthorized
    }
  }
  



      // signout
      signOutUser(req, res) {
        const cookies = req.cookies;
        if (!cookies?.jwt) return res.sendStatus(204); // no content
        res.clearCookie("jwt", { httpOnly: true, sameSite: "None", secure: true });
        res.sendStatus(204);
      }
    



}

module.exports = new AuthController();
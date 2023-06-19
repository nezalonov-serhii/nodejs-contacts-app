const mongoose = require("mongoose");
const request = require("supertest");

const app = require("../../app");
const { User } = require("../../models");

const { DB_HOST_TEST, PORT } = process.env;

describe("test signin route", () => {
   let server = null;
   beforeAll(async () => {
      await mongoose.connect(DB_HOST_TEST);
      server = app.listen(PORT);
   });

   afterAll(async () => {
      await mongoose.connection.close();
      server.close();
   });

   test("test correct signup data", async () => {
      const signinData = {
         email: "examplet@example.com",
         password: "examplepassword",
      };

      const { body, statusCode } = await request(app)
         .post("/users/login")
         .send(signinData);

      expect(statusCode).toBe(200);

      const { email, token, subscription } = await User.findOne({
         email: signinData.email,
      });

      expect(email).toBe(body.user.email);
      expect(subscription).toBe(body.user.subscription);
      expect(token).toBe(body.token);
   });
});

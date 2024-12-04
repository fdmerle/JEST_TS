import request from "supertest";
import { createUniqueUser, createUser, deleteUser } from "./user_utils";
const BASE_URL = "https://gorest.co.in/public/v2/";
let userId: number | null = null;
const TOKEN =
  "e244a0fb62b368b5191c24a5847429cb58eea1c0707ecf515ded41e9e47f566a";

const newUser = {
  name: "John Doe",
  email: `john.doe${Math.random().toString(36).substring(7)}@example.com`,
  gender: "male",
  status: "active",
};


describe("Test Cleanup", () => {
  afterEach(async () => {
    if (userId !== null) {
      await deleteUser(userId);
      userId = null; 
    }
  });

  describe("GoRest API v2", () => {
    it("should validate read procedure", async () => {
      const response = await request(BASE_URL)
        .get("/users")
        .set("Authorization", `Bearer ${TOKEN}`);
      expect(response.status).toBe(200);
      expect(Array.isArray(response.body)).toBe(true);
    });

    describe("GoRest API v2", () => {
      it("should create a new user", async () => {
        const userData = await createUser(newUser);
        expect(userData).toHaveProperty("id");
        expect(userData).toHaveProperty("name", newUser.name);
        expect(userData).toHaveProperty("email", newUser.email);
        expect(userData).toHaveProperty("gender", newUser.gender);
        expect(userData).toHaveProperty("status", newUser.status);
      });
    });

    describe("GoRest API v2", () => {
      it("should verify user data for user with ID ", async () => {
        const userCreationData = await createUniqueUser();
        const userId = userCreationData.id;
        const response = await request(BASE_URL)
          .get(`users/${userId}`)
          .set("Authorization", `Bearer ${TOKEN}`);
        expect(response.status).toBe(200);
        const userData = response.body;
        expect(userData).toHaveProperty("id", userId);
        expect(userData).toHaveProperty("name");
        expect(userData).toHaveProperty("email");
        expect(userData).toHaveProperty("gender");
        expect(userData).toHaveProperty("status");
      });
    });
  });

  describe("GoRest API v2", () => {
    it("should delete a user", async () => {
      const userCreationData = await createUniqueUser();
      const userId = userCreationData.id;

      await deleteUser(userId);

      const fetchResponse = await request(BASE_URL)
        .get(`/users/${userId}`)
        .set("Authorization", `Bearer ${TOKEN}`);

      expect(fetchResponse.status).toBe(404);
    });
  });
});

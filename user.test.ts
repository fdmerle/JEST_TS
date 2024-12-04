import request from "supertest";
import {
  createUniqueUser,
  createUser,
  deleteUser,
  getUserDetails,
  readUsrArray,
} from "./user_utils";
let userId: number | null = null;

const newUser = {
  name: "John Doe",
  email: `john.doe${Math.random().toString(36).substring(7)}@example.com`,
  gender: "male",
  status: "active",
};

describe("GoRest API v2", () => {
  afterEach(async () => {
    if (userId !== null) {
      await deleteUser(userId);
      userId = null;
    }
  });

  it("should validate read procedure", async () => {
    const response = await readUsrArray();
    expect(Array.isArray(response)).toBe(true);
  });

  it("should create a new user", async () => {
    const userData = await createUser(newUser);
    userId = userData.id;
    expect(userData).toHaveProperty("id");
    expect(userData).toHaveProperty("name", newUser.name);
    expect(userData).toHaveProperty("email", newUser.email);
    expect(userData).toHaveProperty("gender", newUser.gender);
    expect(userData).toHaveProperty("status", newUser.status);
  });

  it("should verify user data for user with ID ", async () => {
    const userCreationData = await createUniqueUser();
    userId = userCreationData.id;
    const response = await getUserDetails(userCreationData.id);
    const userData = response;
    expect(userData).toHaveProperty("id", userId);
    expect(userData).toHaveProperty("name");
    expect(userData).toHaveProperty("email");
    expect(userData).toHaveProperty("gender");
    expect(userData).toHaveProperty("status");
  });
});
it("should delete a user", async () => {
  const userCreationData = await createUniqueUser();
  await deleteUser(userCreationData.id);
  userId = null;
  try {
    await getUserDetails(userCreationData.id);
  } catch (error) {
    if (error instanceof Error) {
      console.log(error.message);
      expect(error.message).toContain("Failed to fetch user: 404");
    } else {
      throw new Error("Unexpected error type");
    }
  }
});

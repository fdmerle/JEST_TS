import request from "supertest";

const BASE_URL = "https://gorest.co.in/public/v2";
const TOKEN =
  "e244a0fb62b368b5191c24a5847429cb58eea1c0707ecf515ded41e9e47f566a";

export async function createUser(user: {
  name: string;
  email: string;
  gender: string;
  status: string;
}) {
  const response = await request(BASE_URL)
    .post("/users")
    .set("Authorization", `Bearer ${TOKEN}`)
    .send(user);

  if (response.status !== 201) {
    throw new Error(`Failed to create user: ${response.statusCode}`);
  }

  return response.body;
}

export async function deleteUser(userId: number) {
  const response = await request(BASE_URL)
    .delete(`/users/${userId}`)
    .set("Authorization", `Bearer ${TOKEN}`);

  if (response.status !== 204) {
    throw new Error(`Failed to delete user: ${response.statusCode}`);
  }
}

export async function createUniqueUser() {
  const newUser = {
    name: "John Doe",
    email: `john.doe${Math.random().toString(36).substring(7)}@example.com`,
    gender: "male",
    status: "active",
  };
  return await createUser(newUser);
}

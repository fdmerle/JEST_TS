import request from "supertest";
import dotenv from 'dotenv'; 
dotenv.config();
const BASE_URL = "https://gorest.co.in/public/v2";
const TOKEN = process.env.GOREST_TOKEN;
if (!TOKEN) { throw new Error('GOREST_TOKEN is not defined in the environment variables'); }
  ;

export async function createUser(user: {
  name: string;
  email: string;
  gender: string;
  status: string;
}) {
  const respond = await makeRequest("post", "/users", user);
  if (respond.id == null) {
    throw Error("respond is wrong: " + respond);
  }
  return respond;
}

export async function deleteUser(userId: number) {
  return makeRequest("delete", `/users/${userId}`);
}

export async function getUserDetails(userId: number) {
  const response = await makeRequest("get", `/users/${userId}`);
  if (response == null) {
    throw Error("respond is wrong: " + response);
  }
  return response;
}

export async function readUsrArray() {
  return makeRequest("get", `/users`);
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

export async function makeRequest(
  method: "get" | "post" | "put" | "delete",
  endpoint: string,
  data?: any
) {
  let req_send = request(BASE_URL)
    [method](endpoint)
    .set("Authorization", `Bearer ${TOKEN}`);
  if (data) {
    req_send = req_send.send(data);
  }
  const response = await req_send;
  if (response.statusCode == 404) {
    throw new Error("Failed to fetch user: 404");
  }
  return response.body;
}

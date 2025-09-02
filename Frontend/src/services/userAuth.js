import apiClient from "./apiClient";

export async function getCurrentUser() {
  const {data} = await apiClient.get("/users/me")
  return data
}

export async function userlogin(email,password) {
  const {data} = await apiClient.post("/users/login",{email,password})
  return data
  
}

export async function usersignup(firstName, lastName, email, password ) {

  const {data} =await apiClient.post("/users/signup",{firstName, lastName, email, password })
  return data
  
  
}
export async function logout() {
  await apiClient.get("/users/logout")

}
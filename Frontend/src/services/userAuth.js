import apiClient from "./apiClient";

export async function login(email,password) {

  const {data} = await apiClient.post("/users/login",{email,password})
  return data
  
}

export async function register(firstName, lastName, email, password ) {

  const {data} =await apiClient.post("/users/signup",{firstName, lastName, email, password })
  return data
  
  
}
export async function logout() {
  await apiClient.get("/users/logout")

}
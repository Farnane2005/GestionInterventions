import apiFetch from "./api";

export const login = async (credentials) => {
  const payload = {
    login: credentials.username,
    password: credentials.password
  };

  const user = await apiFetch("/auth/login", { 
    method: "POST", 
    body: JSON.stringify(payload) 
  });

  return {
    token: 'simple-token-' + user.id,
    user: user
  };
};
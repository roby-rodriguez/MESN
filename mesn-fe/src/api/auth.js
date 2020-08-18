import Api from "../services/api";

export const signIn = async (request) => {
  try {
    const response = await Api.post("/signin", request);
    return response;
  } catch (error) {
    return error;
  }
};

export const signUp = async (request) => {
  try {
    const response = await Api.post("/signup", request);
    return response;
  } catch (error) {
    return error;
  }
};



import Store from "../store";

export const authHeader = () => {
  const { currentUser } = Store.state;

  return {
    "content-type": "application/json",
    Authorization: "Bearer " + currentUser?.token,
  };
};

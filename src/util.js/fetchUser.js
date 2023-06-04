export const fetchUser = () => {
  const userInfo =
    localStorage.getItem("user") !== "undefined"
      ? localStorage.getItem("user")
      : localStorage.clear();
  const userinfo = JSON.parse(userInfo);
  return userinfo;
};

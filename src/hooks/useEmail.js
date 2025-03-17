import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

function useEmail() {
  const [email, setEmail] = useState("");
  const user = useSelector((state) => state.auth.user);

  useEffect(() => {
    if (user?.email) {
      const newEmail = `${user.email}?${new Date().getTime()}`;
      setEmail(newEmail);
    }
  }, [user?.email]);

  return email;
}

export default useEmail;

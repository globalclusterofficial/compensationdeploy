import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import UserProfilePic from "../assets/images/userProfile.jpg";
import { BASE_URL } from "../services/api.js";

function useProfilePicture() {
  const [profilePicture, setProfilePicture] = useState(UserProfilePic);
  const user = useSelector((state) => state.auth.user);

  useEffect(() => {
    let newProfilePicture = UserProfilePic;
    if (user?.profile_picture) {
      newProfilePicture = `${BASE_URL}${user.profile_picture}`;
    } else if (user?.profile?.profile_picture) {
      newProfilePicture =
        user.profile.profile_picture.split("/")[1] === "media"
          ? `${BASE_URL}${user.profile.profile_picture}`
          : `${BASE_URL}/media/${user?.profile.profile_picture}`;
    }

    setProfilePicture(newProfilePicture);
  }, [user]);

  return profilePicture;
}

export default useProfilePicture;

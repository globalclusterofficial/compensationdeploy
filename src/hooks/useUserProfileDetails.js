import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import UserProfilePic from "../assets/images/userProfile.jpg";
import { BASE_URL } from "../services/api.js";

function useProfileDetails() {
  const user = useSelector((state) => state.auth.user);

  const [profileDetails, setProfileDetails] = useState({
    profilePicture: UserProfilePic,
    email: user?.email || "",
    name: user?.name || "",
    phone: user?.profile?.phone || "",
    address: user?.profile?.address || "",
    gender: user?.profile?.gender || "",
    country: user?.profile?.country || "",
    city: user?.profile?.city || "",
    state: user?.profile?.state || "",
  });

  useEffect(() => {
    if (user) {
      const {
        profile: {
          email = "",
          name = "",
          phone = "",
          address = "",
          gender = "",
          country = "",
          city = "",
          state = "",
          profile_picture = "",
        } = {},
        profile_picture: userProfilePicture,
      } = user;

      const newProfilePicture = userProfilePicture
        ? `${BASE_URL}${userProfilePicture}`
        : profile_picture
          ? `${profile_picture}`
          : UserProfilePic;

      setProfileDetails({
        profilePicture: newProfilePicture,
        email,
        name,
        phone,
        address,
        gender,
        country,
        city,
        state,
      });
    }
  }, [user]);

  return profileDetails;
}

export default useProfileDetails;

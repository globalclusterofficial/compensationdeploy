// import React, { useState } from "react";
// import { useForm } from "react-hook-form";
// import { useUser } from "../../hooks/auth/useUser";
// import { useUpdateUserProfileMutation } from "../../features/auth/authApiSlice";
// import { useUpdateBusinessProfileMutation } from "../../features/business/businessApiSlice";
// import Notification from "./Notification";
// import { useDispatch } from "react-redux";
// import { updateUserProfileAction } from "../../features/auth/authSlice.js";
// import genders from "../../lib/genders.json";
// import useProfilePic from "../../hooks/useProfilePic.js";
//
// function PersonalDetailsForm() {
//   const { userData } = useUser();
//   const { profilePicture } = useProfilePic();
//   const [profilePic, setProfilePic] = useState(profilePicture);
//   const [updateUserProfile] = useUpdateUserProfileMutation();
//   const [updateBusinessProfile] = useUpdateBusinessProfileMutation();
//   const [notification, setNotification] = useState(null);
//   const dispatch = useDispatch();
//
//   const {
//     register,
//     handleSubmit,
//     formState: { errors },
//   } = useForm({
//     defaultValues: {
//       name: userData?.profile?.name || userData?.name || "",
//       profile_picture: userData?.profile?.profile_picture || "",
//       email: userData?.email || "",
//     },
//   });
//
//   const onSubmit = async (data) => {
//     try {
//       const formData = new FormData();
//       Object.keys(data).forEach((key) => {
//         if (key !== "profile_picture") {
//           formData.append(key, data[key]);
//         }
//       });
//       if (profilePic) {
//         formData.append("profile_picture", profilePic, profilePic.name);
//       }
//       let responseData;
//       if (userData?.user_type) {
//         const updateProfile =
//           userData?.user_type === "company"
//             ? updateBusinessProfile
//             : updateUserProfile;
//         responseData = await updateProfile({
//           id: userData.user_id,
//           data: formData,
//         }).unwrap();
//       }
//       if (responseData) {
//         dispatch(updateUserProfileAction(responseData));
//         setNotification({
//           message: "Profile updated successfully!",
//           type: "success",
//         });
//         setTimeout(() => setNotification(null), 3000);
//       }
//     } catch (error) {
//       if (error.response) {
//         setNotification({
//           message: "Error updating profile. Please try again.",
//           type: "error",
//         });
//         setTimeout(() => setNotification(null), 3000);
//         console.error("Server Error:", JSON.stringify(error.response.data));
//       } else if (error.request) {
//         console.error("Network Error:", error.message);
//       } else {
//         console.error("Error:", JSON.stringify(error));
//       }
//     }
//   };
//
//   const handleProfilePicChange = (e) => {
//     if (e.target.files && e.target.files[0]) {
//       setProfilePic(e.target.files[0]);
//     }
//   };
//
//   return (
//     <div className="flex flex-col gap-16 py-20 px-14">
//       {notification && (
//         <Notification message={notification.message} type={notification.type} />
//       )}
//       <h2 className="text-3xl font-semibold">Account Settings</h2>
//
//       <form
//         onSubmit={handleSubmit(onSubmit)}
//         className="flex flex-col gap-10"
//         encType="multipart/form-data"
//       >
//         {userData?.user_type === "individual" && (
//           <>
//             <div className=" gap-x-6 grid grid-cols-2 w-3/3 lg:w-1/3">
//               <div className="flex w-full flex-col gap-2 text-gray-500">
//                 <label htmlFor="first_name">First Name</label>
//                 <input
//                   className="outline-none border border-gray-300 rounded-md px-4 py-3 w-full focus:border-primary-light transition-all duration-300 ease-in-out"
//                   type="text"
//                   id="first_name"
//                   placeholder="First Name"
//                   {...register("first_name")}
//                 />
//                 {errors.first_name && (
//                   <span className="text-red-500">
//                     {errors.first_name.message}
//                   </span>
//                 )}
//               </div>
//               <div className="flex flex-col w-full gap-2 text-gray-500">
//                 <label htmlFor="last_name">Last Name</label>
//                 <input
//                   className="outline-none border border-gray-300 rounded-md px-4 py-3 w-full focus:border-primary-light transition-all duration-300 ease-in-out"
//                   type="text"
//                   id="last_name"
//                   placeholder="Last Name"
//                   {...register("last_name")}
//                 />
//                 {errors.last_name && (
//                   <span className="text-red-500">
//                     {errors.last_name.message}
//                   </span>
//                 )}
//               </div>
//             </div>
//             <div className="flex flex-col gap-2 text-gray-500">
//               <label htmlFor="gender">Gender</label>
//               <select
//                 className="outline-none border border-gray-300 rounded-md px-4 py-3 w-3/3 lg:w-1/3 focus:border-primary-light transition-all duration-300 ease-in-out"
//                 id="gender"
//                 {...register("gender")}
//               >
//                 {genders.genders.gender.map((gender, index) => (
//                   <option key={index} value={gender.sex}>
//                     {gender.sex}
//                   </option>
//                 ))}
//               </select>
//               {errors.gender && (
//                 <span className="text-red-500">{errors.gender.message}</span>
//               )}
//             </div>
//           </>
//         )}
//         {userData?.user_type === "company" && (
//           <div className="flex flex-col gap-2 text-gray-500">
//             <label htmlFor="name">Business Name</label>
//             <input
//               className="outline-none border border-gray-300 rounded-md px-4 py-3 w-3/3 lg:w-1/3 focus:border-primary-light transition-all duration-300 ease-in-out"
//               type="text"
//               id="name"
//               placeholder="Global Cluster"
//               {...register("name")}
//             />
//             {errors.name && (
//               <span className="text-red-500">{errors.name.message}</span>
//             )}
//           </div>
//         )}
//         <div className="flex flex-col gap-2 text-gray-500">
//           <label htmlFor="email">Email Address</label>
//           <input
//             className="outline-none border border-gray-300 rounded-md px-4 py-3 w-3/3 lg:w-1/3 focus:border-primary-light transition-all duration-300 ease-in-out"
//             type="email"
//             id="email"
//             placeholder="example@gmail.com"
//             {...register("email")}
//           />
//           {errors.email && (
//             <span className="text-red-500">{errors.email.message}</span>
//           )}
//         </div>
//         <div className="flex flex-col gap-2 text-gray-500">
//           <label htmlFor="profile_picture">Profile Picture</label>
//           <input
//             className="outline-none border border-gray-300 rounded-md px-4 py-3 w-3/3 lg:w-1/3 focus:border-primary-light transition-all duration-300 ease-in-out"
//             type="file"
//             accept="image/png, image/jpeg, image/jpg, image/tiff"
//             onChange={handleProfilePicChange}
//             id="profile_picture"
//           />
//           {errors.profile_picture && (
//             <span className="text-red-500">
//               {errors.profile_picture.message}
//             </span>
//           )}
//         </div>
//         <button
//           type="submit"
//           className="bg-primary-light text-white w-fit px-6 rounded-md py-4"
//         >
//           Save Changes
//         </button>
//       </form>
//     </div>
//   );
// }
//
// export default PersonalDetailsForm;

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import {
  useUpdateUserProfileMutation,
  useUpdateAdminProfileMutation,
} from "../../features/auth/authApiSlice";
import { useUpdateBusinessProfileMutation } from "../../features/business/businessApiSlice";
import Notification from "./Notification";
import { useDispatch } from "react-redux";
import { updateUserProfileAction } from "../../features/auth/authSlice.js";
import genders from "../../lib/genders.json";
import useProfilePic from "../../hooks/useProfilePic.js";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";

function PersonalDetailsForm({ userData }) {
  const { profilePicture } = useProfilePic();
  const [profilePic, setProfilePic] = useState(profilePicture);
  const [updateUserProfile] = useUpdateUserProfileMutation();
  const [updateBusinessProfile] = useUpdateBusinessProfileMutation();
  const [updateAdminProfile] = useUpdateAdminProfileMutation();
  const [notification, setNotification] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      first_name: userData?.name.split(" ")[0] || "",
      last_name: userData?.name.split(" ")[1] || "",
      name: userData?.user_type === "company" ? userData?.name : "",
      profile_picture: userData?.profile_picture || "",
      email: userData?.email || "",
      gender: userData?.gender || genders.genders.gender[0].sex,
    },
  });

  const onSubmit = async (data) => {
    try {
      const formData = new FormData();
      if (userData?.user_type !== "company") {
        // Combine first_name and last_name into name
        const fullName = `${data.first_name} ${data.last_name}`;
        formData.append("name", fullName);
      } else {
        formData.append("name", data?.name);
      }

      // Add other fields to formData, excluding first_name and last_name
      Object.keys(data).forEach((key) => {
        if (
          key !== "first_name" &&
          key !== "last_name" &&
          key !== "profile_picture" &&
          key !== "name"
        ) {
          formData.append(key, data[key]);
        }
      });
      if (profilePic) {
        formData.append("profile_picture", profilePic, profilePic.name);
      }
      let responseData;
      if (userData?.user_type) {
        const updateProfile =
          userData?.user_type === "company"
            ? updateBusinessProfile
            : userData?.user_type === "admin"
              ? updateAdminProfile
              : updateUserProfile;
        responseData = await updateProfile({
          id: userData.user_id,
          data: formData,
        }).unwrap();
      }
      if (responseData) {
        dispatch(updateUserProfileAction(responseData));
        setNotification({
          message: "Profile updated successfully!",
          type: "success",
        });
        setTimeout(() => setNotification(null), 3000);
      }
      navigate(0);
    } catch (error) {
      if (error.response) {
        setNotification({
          message: "Error updating profile. Please try again.",
          type: "error",
        });
        setTimeout(() => setNotification(null), 3000);
        console.error("Server Error:", JSON.stringify(error.response.data));
      } else if (error.request) {
        console.error("Network Error:", error.message);
      } else {
        console.error("Error:", JSON.stringify(error));
      }
    }
  };

  const handleProfilePicChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setProfilePic(e.target.files[0]);
    }
  };

  return (
    <div className="flex flex-col gap-16 py-20 px-14">
      {notification && (
        <Notification message={notification.message} type={notification.type} />
      )}
      <h2 className="text-3xl font-semibold">Account Settings</h2>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-10"
        encType="multipart/form-data"
      >
        {(userData?.user_type === "individual" ||
          userData?.user_type === "admin") && (
          <>
            <div className=" gap-x-6 grid grid-cols-2 w-3/3 lg:w-1/3 lg:w-3/3 lg:w-1/3">
              <div className="flex w-full flex-col gap-2 text-gray-500">
                <label htmlFor="first_name">First Name</label>
                <input
                  className="outline-none border border-gray-300 rounded-md px-4 py-3 w-full focus:border-primary-light transition-all duration-300 ease-in-out"
                  type="text"
                  id="first_name"
                  placeholder="First Name"
                  {...register("first_name")}
                />
                {errors.first_name && (
                  <span className="text-red-500">
                    {errors.first_name.message}
                  </span>
                )}
              </div>
              <div className="flex flex-col w-full gap-2 text-gray-500">
                <label htmlFor="last_name">Last Name</label>
                <input
                  className="outline-none border border-gray-300 rounded-md px-4 py-3 w-full focus:border-primary-light transition-all duration-300 ease-in-out"
                  type="text"
                  id="last_name"
                  placeholder="Last Name"
                  {...register("last_name")}
                />
                {errors.last_name && (
                  <span className="text-red-500">
                    {errors.last_name.message}
                  </span>
                )}
              </div>
            </div>
            {userData?.user_type !== "admin" && (
              <div className="flex flex-col gap-2 text-gray-500">
                <label htmlFor="gender">Gender</label>
                <select
                  className="outline-none border border-gray-300 rounded-md px-4 py-3 w-3/3 lg:w-1/3 focus:border-primary-light transition-all duration-300 ease-in-out"
                  id="gender"
                  {...register("gender")}
                >
                  {genders.genders.gender.map((gender, index) => (
                    <option key={index} value={gender.sex}>
                      {String(gender.sex[0]).toUpperCase() +
                        String(gender.sex).slice(1)}
                    </option>
                  ))}
                </select>
                {errors.gender && (
                  <span className="text-red-500">{errors.gender.message}</span>
                )}
              </div>
            )}
          </>
        )}
        {userData?.user_type === "company" && (
          <div className="flex flex-col gap-2 text-gray-500">
            <label htmlFor="name">Business Name</label>
            <input
              className="outline-none border border-gray-300 rounded-md px-4 py-3 w-3/3 lg:w-1/3 focus:border-primary-light transition-all duration-300 ease-in-out"
              type="text"
              id="name"
              placeholder="Global Cluster"
              {...register("name")}
            />
            {errors.name && (
              <span className="text-red-500">{errors.name.message}</span>
            )}
          </div>
        )}
        <div className="flex flex-col gap-2 text-gray-500">
          <label htmlFor="email">Email Address</label>
          <input
            className="outline-none border border-gray-300 rounded-md px-4 py-3 w-3/3 lg:w-1/3 focus:border-primary-light transition-all duration-300 ease-in-out"
            type="email"
            id="email"
            placeholder="example@gmail.com"
            {...register("email")}
          />
          {errors.email && (
            <span className="text-red-500">{errors.email.message}</span>
          )}
        </div>
        <div className="flex flex-col gap-2 text-gray-500">
          <label htmlFor="profile_picture">Profile Picture</label>
          <input
            className="outline-none border border-gray-300 rounded-md px-4 py-3 w-3/3 lg:w-1/3 focus:border-primary-light transition-all duration-300 ease-in-out"
            type="file"
            accept="image/png, image/jpeg, image/jpg, image/tiff"
            onChange={handleProfilePicChange}
            id="profile_picture"
          />
          {errors.profile_picture && (
            <span className="text-red-500">
              {errors.profile_picture.message}
            </span>
          )}
        </div>
        <button
          type="submit"
          className="bg-primary-light text-white w-fit px-6 rounded-md py-4"
        >
          Save Changes
        </button>
      </form>
    </div>
  );
}

PersonalDetailsForm.propTypes = {
  userData: PropTypes.object,
};

export default PersonalDetailsForm;

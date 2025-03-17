// import PropTypes from 'prop-types';
// import React, { useEffect, useState } from 'react';

// function TakeInput({ type, setLinkValue }) {
//   const [input, setInput] = useState('');

//   useEffect(() => {
//     setLinkValue(input);
//   }, [input, setLinkValue]);

//   return (
//     <div
//       className={`take-input transition-transform transform ${
//         type ? 'translate-y-0 opacity-100' : 'translate-y-full opacity-0'
//       }`}
//     >
//       {type === 'whatsapp' && (
//         <div className="flex flex-col gap-4">
//           <label htmlFor="whatsappNo">Whatsapp No</label>
//           <input
//             type="text"
//             className="outline-none border p-4 rounded-xl"
//             value={input}
//             onChange={e => setInput(e.target.value)}
//           />
//         </div>
//       )}
//       {type === 'website' && (
//         <div className="flex flex-col gap-4">
//           <label htmlFor="websiteUrl">Website Url</label>
//           <input
//             type="text"
//             className="outline-none border p-4 rounded-xl"
//             value={input}
//             onChange={e => setInput(e.target.value)}
//           />
//         </div>
//       )}
//       {type === 'phone' && (
//         <div className="flex flex-col gap-4">
//           <label htmlFor="phoneNo">Phone No</label>
//           <input
//             type="text"
//             className="outline-none border p-4 rounded-xl"
//             value={input}
//             onChange={e => setInput(e.target.value)}
//           />
//         </div>
//       )}
//     </div>
//   );
// }

// TakeInput.propTypes = {
//   type: PropTypes.string,
//   setLinkValue: PropTypes.func.isRequired,
// };

// export default TakeInput;
import PropTypes from "prop-types";
import React from "react";

function TakeInput({ type, register, errors }) {
  return (
    <div
      className={`take-input transition-transform transform ${
        type ? "translate-y-0 opacity-100" : "translate-y-full opacity-0"
      }`}
    >
      {type === "whatsapp" && (
        <div className="flex flex-col gap-4">
          <label htmlFor="whatsappNo">Whatsapp No</label>
          <input
            type="text"
            id="whatsappNo"
            className="outline-none border p-4 rounded-xl"
            {...register("linkValue", {
              required: "Whatsapp number is required",
            })}
          />
          {errors.linkValue && (
            <p className="text-red-500">{errors.linkValue.message}</p>
          )}
        </div>
      )}
      {type === "website" && (
        <div className="flex flex-col gap-4">
          <label htmlFor="websiteUrl">Website Url</label>
          <input
            type="text"
            id="websiteUrl"
            className="outline-none border p-4 rounded-xl"
            {...register("linkValue", {
              required: "Website URL is required",
              validate: (value) => {
                if (type === "website" && value.includes("https")) {
                  return false;
                }
              },
            })}
          />
          {errors.linkValue && (
            <p className="text-red-500">{errors.linkValue.message}</p>
          )}
          {errors.linkValue?.type === "validate" && (
            <p className="text-red-500">Website cannot contain https</p>
          )}
        </div>
      )}
      {type === "phone" && (
        <div className="flex flex-col gap-4">
          <label htmlFor="phoneNo">Phone No</label>
          <input
            type="text"
            id="phoneNo"
            className="outline-none border p-4 rounded-xl"
            {...register("linkValue", { required: "Phone number is required" })}
          />
          {errors.linkValue && (
            <p className="text-red-500">{errors.linkValue.message}</p>
          )}
        </div>
      )}
    </div>
  );
}

TakeInput.propTypes = {
  type: PropTypes.string,
  register: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired,
};

export default TakeInput;

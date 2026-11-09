// import React from 'react';
// import './Thoughts.css';
// import Swal from 'sweetalert2'


// function Thoughts() {

//   const onSubmit = async (event) => {
//     event.preventDefault();
//     const formData = new FormData(event.target);

//     formData.append("access_key", "6649cfe5-e72b-4818-aa36-de58ef34225d");

//     const object = Object.fromEntries(formData);
//     const json = JSON.stringify(object);

//     const res = await fetch("https://api.web3forms.com/submit", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//         Accept: "application/json"
//       },
//       body: json
//     }).then((res) => res.json());

//     if (res.success) {
//       Swal.fire({
//         title: "Thank you!",
//         text: "Message sent successfully!",
//         icon: "success"
//       });
//     }
//   };


//   return (
//     <div className='thoughts-container'>
//       <p className='thoughts-top1'>PLACE YOUR THOUGHTS</p>
//       <p className='thoughts-top2'>
//         We would love to hear feedbacks and questions from your end.
//       </p>
//       <form onSubmit={onSubmit}>
//       <div className='thoughts-form'>
//         <div className='thoughts-input'>
//           <input
//             type='text'
//             placeholder='Full Name' name='name'
//          required/>
//         </div>

//         <div className='thoughts-input'>
//           <input
//             type='email'
//             placeholder='Email Address'
//             name='email'
//           required/>
//         </div>
//         <div className='thoughts-input'>
//           <textarea
//             className='thoughts-input-field'
//             placeholder='Your Thoughts' name='message'
//           required/>
//         </div>
//         <div className='submit'>
//           <button className='thoughts-submit'>
//             Submit
//           </button>
//         </div>
//       </div>
//       </form>
//     </div>
//   );
// }


// export default Thoughts;



import React from "react";
import Swal from "sweetalert2";

function Thoughts() {
  const onSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    formData.append("access_key", "6649cfe5-e72b-4818-aa36-de58ef34225d");

    const object = Object.fromEntries(formData);
    const json = JSON.stringify(object);

    const res = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: json,
    }).then((res) => res.json());

    if (res.success) {
      Swal.fire({
        title: "Thank you!",
        text: "Message sent successfully!",
        icon: "success",
      });
    }
  };

  return (
    <div className="bg-gray-100 py-8 px-4 text-center" id='thoughts'>
      <p className="text-xl text-black font-semibold">PLACE YOUR THOUGHTS</p>
      <p className="text-base text-green-800 mt-2">
        We would love to hear feedback and questions from you.
      </p>
      <form onSubmit={onSubmit} className="mt-6 max-w-xs mx-auto bg-[#bad8bb] p-4 rounded-lg shadow-md">
        <div className="mb-3">
          <input
            type="text"
            placeholder="Full Name"
            name="name"
            required
            className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:outline-none"
          />
        </div>
        <div className="mb-3">
          <input
            type="email"
            placeholder="Email Address"
            name="email"
            required
            className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:outline-none"
          />
        </div>
        <div className="mb-3">
          <textarea
            placeholder="Your Thoughts"
            name="message"
            required
            className="w-full p-2 border border-gray-300 rounded-lg h-16 focus:ring-2 focus:ring-green-500 focus:outline-none"
          ></textarea>
        </div>
        <button
          type="submit"
          className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition duration-300"
        >
          Submit
        </button>
      </form>
    </div>
  );
}

export default Thoughts;

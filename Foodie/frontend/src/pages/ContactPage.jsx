import React, { useState } from "react";
import axios from "axios";

const Contact = () => {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("https://foodie-0b.onrender.com/api/contact", form);
      if (res.data.success) {
        setStatus("Message sent successfully!");
        setForm({ name: "", email: "", message: "" });
      }
    } catch (err) {
      setStatus("Failed to send message. Try again later.");
    }
    resetForm();
  };

  return (
 <div className="min-h-screen ml-2 mr-2 bg-gray-50 ">
  <div className="bg-gradient-to-r from-red-400 to-orange-400 font-serif text-white rounded-2xl py-12 text-center">
    <h1 className="text-4xl font-bold">Contact Us</h1>
    <p className="mt-2 font-bold text-lg">We’d love to hear from you!</p>
  </div>

  <div className="grid grid-cols-1 md:grid-cols-2  px-3 py-8">
    
    <div className="bg-white p-6 space-y-4 ">
      <form onSubmit={handleSubmit}>
        <h2 className="text-3xl font-bold text-orange-500 mb-4">Message Us</h2>
        <label className="block text-lg font-medium text-gray-700">Name</label>
        <input
          type="text"
          name="name"
          placeholder="Enter Your Name"
          value={form.name}
          onChange={handleChange}
          className="w-full p-3 border rounded-lg"
        />

        <label className="block text-lg font-medium text-gray-700">Email</label>
        <input
          type="email"
          name="email"
          placeholder="Enter Your Email"
          value={form.email}
          onChange={handleChange}
          className="w-full p-3 border rounded-lg"
        />

        <label className="block text-lg font-medium text-gray-700">Message</label>
        <textarea
          name="message"
          placeholder="Enter Your Message"
          rows="5"
          value={form.message}
          onChange={handleChange}
          className="w-full p-3 border rounded-lg"
        ></textarea>

        <button
          type="submit"
          className="w-full bg-orange-500 hover:bg-orange-600 text-white py-3 rounded-lg font-semibold"
        >
          Send Message
        </button>

        {status && <p className="mt-2 text-center">{status}</p>}
      </form>
    </div>


    <div className="bg-white p-6  flex flex-col justify-start font-normal">
      <h2 className="text-3xl font-bold text-orange-500 mb-4">About Us</h2>
      <p className="text-gray-700 leading-relaxed text-base">
        We are passionate about bringing you the best food experiences.  
        Our mission is to connect food lovers with amazing restaurants, 
        ensuring every meal is memorable and delightful.  
      </p>
      <p className="text-gray-700 leading-relaxed text-base mt-4">
        Whether you have questions, feedback, or just want to say hello,
        we're here to listen. Reach out to us anytime!
      </p>
      <h1 className="text-3xl font-bold text-orange-500 mt-6 mb-4">Contact Information</h1>
      <p className="text-gray-700 leading-relaxed text-base">
        Email: support@foodie.com
      </p>
      <p className="text-gray-700 leading-relaxed text-base">
        Phone: +91 7769386891
      </p>
    </div>

  </div>
</div>
  );
};

export default Contact;

"use client";
import React, { useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import ReCAPTCHA from 'react-google-recaptcha';

const Page = () => {
  const [formData, setFormData] = useState({
    name: '',
    mobile: '',
    city: '',
    message: '',
    email:'',
    isRobotVerified: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handleCaptchaChange = (value) => {
    setFormData({
      ...formData,
      isRobotVerified: !!value,
    });
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
    // if (!formData.isRobotVerified) {
    //   alert('Please confirm you are not a robot.');
    //   return;
    // }
    try {
      const response = await fetch('/api/sendenquiry', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },  
        body: JSON.stringify(formData),
      });
      if (response.ok) {        
        setFormData({
          name: '',
          mobile: '',
          city: '',
          message: '',
          email:'',
          isRobotVerified: false, 
        })
      }
    } catch (error) {
      console.error('Error submitting form:', error);
    }
    // console.log('Form submitted:', formData);
  };

  return (
    <div className="min-h-screen font-montserrat h-fit flex items- justify-center px-4">
      <div className="h-fit px-8 py-8 w-full max-w-md">
        <h1 className="text-2xl font-bold mb-6 text-center">Contact Us</h1>
        <form onSubmit={handleSubmit} className="space-y-4 h-fit">
          <div>
            {/* <label className="block text-gray-700">Name:</label> */}
            <input
              type="text"
              name="name"
              placeholder='Name'
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-sky-500 "
            />
          </div>
          <div>
            {/* <label className="block text-gray-700">Name:</label> */}
            <input
              type="text"
              name="email"
              placeholder='Email'
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-sky-500 "
            />
          </div>
          <div>
            {/* <label className="block text-gray-700">Mobile:</label> */}
            <input
              type="tel"
              name="mobile"
              placeholder='+91'
              value={formData.mobile}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-sky-500"
            />
          </div>
          <div>
            <input
              type="text"
              name="city"
              placeholder='City'
              value={formData.city}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-sky-500"
            />
          </div>
          <div>
            <textarea
              name="message"
              placeholder='Message'
              value={formData.message}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-sky-500"
            ></textarea>
          </div>



{/*           
          <div>
            <ReCAPTCHA
              sitekey="6LdKmKMqAAAAAIm78MX5--WmodZ2vF3GV8jrRv3T"
              onChange={handleCaptchaChange}
              className="w-full flex items-center justify-center"
            />
          </div> */}

          <div>
            <Button
            href='/contact'
            type="submit"
            className="w-full bg-sky-500 text-white py-2 px-4 rounded-md  focus:outline-none focus:ring focus:sky-500">
              Submit
            </Button>
          </div>




        </form>
      </div>
    </div>
  );
};

export default Page;

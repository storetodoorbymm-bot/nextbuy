import React from "react";
import { Mail, Phone } from "lucide-react";

const ContactUs = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#dfe9f3] to-[#f3f7fa] flex flex-col items-center justify-center px-4 py-10">
      <div className="max-w-2xl w-full bg-white shadow-lg rounded-2xl p-8 text-center">
        <h1 className="text-3xl font-bold text-green-600 mb-6">Contact Us</h1>
        <p className="text-gray-600 mb-8">
          Have questions or need help? We're here for you. Reach out via email or phone, and we’ll respond as soon as possible.
        </p>

        <div className="space-y-6 text-gray-700">
          <div className="flex items-center justify-center gap-3">
            <Mail className="text-green-500 w-6 h-6" />
            <a
              href="mailto:storetodoorbymm@gmail.com"
              className="text-lg hover:text-green-600 transition-colors"
            >
              storetodoorbymm@gmail.com
            </a>
          </div>

          <div className="flex items-center justify-center gap-3">
            <Phone className="text-green-500 w-6 h-6" />
            <div className="text-lg">
              <p>+91 6280869120</p>
              <p>+91 7681980837</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;

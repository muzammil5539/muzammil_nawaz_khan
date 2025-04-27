"use client";
import { useTheme } from "@/context/ThemeContext";
import { useForm, ValidationError } from "@formspree/react";
import { useState } from "react";

export default function Contact() {
  const { isDarkMode } = useTheme();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [state, handleSubmit] = useForm("FORM_API"); // Replace with your Formspree form ID

  if (state.succeeded) {
    return (
      <section
        id="contact"
        className={`py-24 ${isDarkMode ? "bg-gray-900" : "bg-gray-50"}`}
      >
        <div className="container mx-auto px-6 text-center">
          <h2
            className={`text-4xl font-bold mb-4 ${
              isDarkMode ? "text-white" : "text-gray-800"
            }`}
          >
            Thank You!
          </h2>
          <p
            className={`text-lg ${
              isDarkMode ? "text-gray-300" : "text-gray-700"
            }`}
          >
            Your message has been sent successfully. We will get back to you
            shortly.
          </p>
        </div>
      </section>
    );
  }

  return (
    <section
      id="contact"
      className={`py-24 ${isDarkMode ? "bg-gray-900" : "bg-gray-50"}`}
    >
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2
            className={`text-4xl font-bold mb-4 ${
              isDarkMode ? "text-white" : "text-gray-800"
            }`}
          >
            Get in Touch
          </h2>
          <p
            className={`text-lg ${
              isDarkMode ? "text-gray-300" : "text-gray-700"
            }`}
          >
            Feel free to reach out for collaborations or just a friendly hello
          </p>
          <div className="w-24 h-1 bg-blue-600 mx-auto mt-4"></div>
        </div>

        <div className="max-w-3xl mx-auto">
          <div
            className={`rounded-lg p-8 transition-all duration-500 ease-in-out 
                        shadow-lg hover:shadow-2xl
                        ${
                          isDarkMode
                            ? "bg-gray-800 hover:shadow-blue-500/30 shadow-gray-900/30"
                            : "bg-white hover:shadow-blue-500/20 shadow-gray-200/50"
                        }`}
          >
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label
                    htmlFor="name"
                    className={`block text-sm font-medium mb-2 
                                            ${
                                              isDarkMode
                                                ? "text-gray-200"
                                                : "text-gray-700"
                                            }`}
                  >
                    Name
                    <span className="text-red-500 ml-1">*</span>
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    className={`w-full px-4 py-2 rounded-lg border transition-colors placeholder:text-gray-500
                                            ${
                                              isDarkMode
                                                ? "bg-gray-700 border-gray-600 text-white focus:border-blue-500"
                                                : "bg-white border-gray-300 text-gray-900 focus:border-blue-500"
                                            } focus:outline-none focus:ring-2 focus:ring-blue-500/50`}
                    placeholder="Your full name"
                    title="Please enter your full name"
                    required
                  />
                </div>
                <div>
                  <label
                    htmlFor="email"
                    className={`block text-sm font-medium mb-2 
                                            ${
                                              isDarkMode
                                                ? "text-gray-200"
                                                : "text-gray-700"
                                            }`}
                  >
                    Email
                    <span className="text-red-500 ml-1">*</span>
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                    className={`w-full px-4 py-2 rounded-lg border transition-colors placeholder:text-gray-500
                                            ${
                                              isDarkMode
                                                ? "bg-gray-700 border-gray-600 text-white focus:border-blue-500"
                                                : "bg-white border-gray-300 text-gray-900 focus:border-blue-500"
                                            } focus:outline-none focus:ring-2 focus:ring-blue-500/50`}
                    placeholder="your.email@example.com"
                    title="Please enter a valid email address"
                    required
                  />
                  <ValidationError
                    prefix="Email"
                    field="email"
                    errors={state.errors}
                  />
                </div>
              </div>
              <div>
                <label
                  htmlFor="subject"
                  className={`block text-sm font-medium mb-2 
                                        ${
                                          isDarkMode
                                            ? "text-gray-200"
                                            : "text-gray-700"
                                        }`}
                >
                  Subject
                  <span className="text-red-500 ml-1">*</span>
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={(e) =>
                    setFormData({ ...formData, subject: e.target.value })
                  }
                  className={`w-full px-4 py-2 rounded-lg border transition-colors placeholder:text-gray-500
                                        ${
                                          isDarkMode
                                            ? "bg-gray-700 border-gray-600 text-white focus:border-blue-500"
                                            : "bg-white border-gray-300 text-gray-900 focus:border-blue-500"
                                        } focus:outline-none focus:ring-2 focus:ring-blue-500/50`}
                  placeholder="e.g., Project Collaboration"
                  title="Please enter the subject of your message"
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="message"
                  className={`block text-sm font-medium mb-2 
                                        ${
                                          isDarkMode
                                            ? "text-gray-200"
                                            : "text-gray-700"
                                        }`}
                >
                  Message
                  <span className="text-red-500 ml-1">*</span>
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={5}
                  value={formData.message}
                  onChange={(e) =>
                    setFormData({ ...formData, message: e.target.value })
                  }
                  className={`w-full px-4 py-2 rounded-lg border transition-colors placeholder:text-gray-500
                                        ${
                                          isDarkMode
                                            ? "bg-gray-700 border-gray-600 text-white focus:border-blue-500"
                                            : "bg-white border-gray-300 text-gray-900 focus:border-blue-500"
                                        } focus:outline-none focus:ring-2 focus:ring-blue-500/50`}
                  placeholder="Your message here... Feel free to share project details, questions, or just say hello!"
                  title="Please enter your message"
                  required
                ></textarea>
                <ValidationError
                  prefix="Message"
                  field="message"
                  errors={state.errors}
                />
                <p
                  className={`mt-2 text-xs ${
                    isDarkMode ? "text-gray-400" : "text-gray-600"
                  }`}
                >
                  All fields marked with <span className="text-red-500">*</span>{" "}
                  are required
                </p>
              </div>
              <div>
                <button
                  type="submit"
                  disabled={state.submitting}
                  className={`w-full py-3 px-6 rounded-lg font-medium transition-all duration-300
                                        transform hover:scale-[1.02] hover:shadow-lg
                                        ${
                                          isDarkMode
                                            ? "bg-blue-600 text-white hover:bg-blue-700"
                                            : "bg-blue-600 text-white hover:bg-blue-700"
                                        }`}
                >
                  {state.submitting ? "Sending..." : "Send Message"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

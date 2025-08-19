import React, { memo } from "react";
import GlobeDemo from "@/components/ui/globe-demo";
import Footer from "@/components/sections/Footer";
import {
  User2,
  Mail,
  MessageSquareText,
  SendHorizonal,
  ArrowLeft,
} from "lucide-react";

const ContactPage: React.FC = () => {
  return (
    <div className="bg-black" >
      <button
        onClick={() => (window.location.href = "/")}
        className="inline-flex items-center gap-2 px-5 py-7 md:px-16 md:pt-10 text-white rounded-lg transition-colors duration-300 hover:scale-110  hover:text-gray-300"
      >
        <ArrowLeft className="w-5 h-5" />
        Back to Home
      </button>
      <div className="text-center bg-black text-white pb-10">
        <h1
          className="relative inline-block text-5xl md:text-8xl font-semibold leading-tight
             before:content-[''] before:absolute before:bottom-0 before:left-0 
             before:w-full before:h-[4px] before:bg-white 
             before:scale-x-0 before:origin-right
             before:transition-transform before:duration-500
             hover:before:scale-x-100 hover:before:origin-left"
        >
          Contact Me
        </h1>
      </div>

      <div className="min-h-screen w-full bg-black text-white flex flex-col">
        {/* Content */}
        <main className="flex-1 container mx-auto px-6 py-16 md:pt-1 md:pb-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
            {/* Left: Minimal, organized form */}
            <section aria-labelledby="contact-heading" className="w-full">
              <header className="mb-8">
                <h1
                  id="contact-heading"
                  className="text-4xl md:text-6xl font-bold leading-tight"
                >
                  Questions to ask or visions to blend?
                  <br />
                  Reach out today,
                  <br />
                  <span className="text-white">let’s start to trend.</span>
                </h1>
                <p className="mt-6 text-zinc-300 max-w-xl">
                  Open to new projects and creative discussions—tech, design, or
                  anything in between. Drop me a line, and I’ll get back to you
                  soon.
                </p>
              </header>

              <form
                action="https://api.web3forms.com/submit"
                method="POST"
                className="w-full"
              >
                {/* Web3Forms required fields */}
                <input
                  type="hidden"
                  name="access_key"
                  value="1d3f99da-da32-4946-aece-2aacd13aaf2f"
                />
                <input type="hidden" name="redirect" value="/" />

                {/* Name + Email row */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <label className="group block">
                    <span className="sr-only">Your name</span>
                    <div className="flex items-center gap-3 text-zinc-300">
                      <User2 className="h-4 w-4" />
                      <span>Your name</span>
                    </div>
                    <input
                      type="text"
                      name="name"
                      required
                      className="mt-2 w-full bg-transparent text-white placeholder-zinc-500 outline-none border-0 border-b border-zinc-700 focus:border-white transition-colors px-0 py-3"
                      placeholder="Name"
                    />
                  </label>

                  <label className="group block">
                    <span className="sr-only">Your email</span>
                    <div className="flex items-center gap-3 text-zinc-300">
                      <Mail className="h-4 w-4" />
                      <span>Your email</span>
                    </div>
                    <input
                      type="email"
                      name="email"
                      required
                      className="mt-2 w-full bg-transparent text-white placeholder-zinc-500 outline-none border-0 border-b border-zinc-700 focus:border-white transition-colors px-0 py-3"
                      placeholder="you@example.com"
                    />
                  </label>
                </div>

                {/* Message */}
                <label className="group block mt-10">
                  <span className="sr-only">Your message</span>
                  <div className="flex items-center gap-3 text-zinc-300">
                    <MessageSquareText className="h-4 w-4" />
                    <span>Your message</span>
                  </div>
                  <textarea
                    name="message"
                    required
                    rows={8}
                    className="mt-2 w-full bg-transparent text-white placeholder-zinc-500 outline-none border-0 border-b border-zinc-700 focus:border-white transition-colors resize-y px-0 py-3"
                    placeholder="Write your message here..."
                  />
                </label>

                <div className="mt-10">
                  <button
                    type="submit"
                    className="inline-flex items-center gap-2 rounded-full bg-white text-black px-6 py-3 font-medium hover:bg-zinc-900 hover:text-white hover:border-white border-2 border-transparent transition-colors"
                  >
                    <SendHorizonal className="h-4 w-4" />
                    Send Message
                  </button>
                </div>
              </form>
            </section>

            {/* Right: Globe component (provided) */}
            <section className="w-full md:sticky md:top-24">
              <GlobeDemo />
            </section>
          </div>
        </main>
      </div>
    </div>
  );
};

export default memo(ContactPage);

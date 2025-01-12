"use client";

import React, { useState } from "react";
import { Textarea } from "./ui/textarea";
// import { Label } from "./ui/label";
import { ArrowUp, File, ImageIcon } from "lucide-react";

type message = {
  type: "user" | "ai";
  content: string;
};

const Landing = () => {
  const [prompt, setPrompt] = useState<string>("");
  const [response, setResponse] = useState<message[]>([]);
  //   const [loading, setLoading] = useState(false);
  //   const [error, setError] = useState<string>("");

  console.log(response);

  const handleSubmit = async (): Promise<void> => {
    if (!prompt.trim()) return;

    const userMessage: message = { type: "user", content: prompt };
    setResponse((prev) => [...prev, userMessage]);

    fetch("/api/gpt", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ prompt }),
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error(`Server error: ${res.statusText}`);
        }
        return res.json();
      })
      .then((data) => {
        console.log("Response Data:", data);
        setResponse((prev) => [
          ...prev,
          { type: "ai", content: data.response.prompt },
        ]);
      })
      .catch((error: Error) => {
        console.error("Error:", error);
        // setError(error.message || "Something went wrong.");
      });
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>): void => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  return (
    <div className="flex flex-col  items-center w-full">
      <div className="flex flex-col justify-center items-center w-2/3 overflow-y-auto p-4 space-y-4">
        {response.map((message, index) => (
          <div
            key={index}
            className={`flex w-full ${message.type === "user" ? " justify-end" : "justify-start"}`}
          >
            <div
              className={`max-w-[80%] whitespace-normal break-words rounded-lg p-4 ${
                message.type === "user"
                  ? "bg-blue-600 text-white"
                  : "bg-gray-700 text-white"
              }`}
            >
              {message.content}
            </div>
          </div>
        ))}
      </div>

      <div className="flex justify-center items-end w-full sticky bottom-0">
        <form
          className="w-full max-w-xl mb-6 p-4 bg-gray-900 rounded-lg shadow-lg"
          onSubmit={(e) => {
            e.preventDefault();
            handleSubmit();
          }}
        >
          {/* <Label className="text-2xl font-semibold text-white mb-4">
              Prompt
              </Label> */}
          <div className="relative">
            <Textarea
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Ask a question"
              className="w-full p-4 text-xl text-white border border-gray-500 placeholder:text-white placeholder:opacity-70"
            />
            <ArrowUp
              onClick={handleSubmit}
              className="text-2xl w-8 h-8 rounded-full bg-black text-white absolute top-4 right-4 z-20 cursor-pointer hover:bg-blue-400 transition duration-300 ease-in-out"
            />
          </div>
          <div className="flex gap-4  text-white mt-2 ml-1">
            <ImageIcon className="text-2xl" />
            <File className="text-2xl" />
          </div>
        </form>
      </div>
    </div>
  );
};

export default Landing;

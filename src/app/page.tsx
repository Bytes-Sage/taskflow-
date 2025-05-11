"use client";

// import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  return (
    <div className="flex flex-col min-h-screen">
      {/* Navigation */}
      <nav className="w-full p-4 flex justify-between items-center bg-white/70 dark:bg-gray-800/70 backdrop-blur-md border-b border-gray-200 dark:border-gray-700">
        <div className="flex items-center gap-2">
          <div className="h-8 w-8 rounded-md bg-indigo-500 flex items-center justify-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 text-white"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z" />
              <path
                fillRule="evenodd"
                d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h3a1 1 0 100-2h-3zm-3 4a1 1 0 100 2h.01a1 1 0 100-2H7zm3 0a1 1 0 100 2h3a1 1 0 100-2h-3z"
                clipRule="evenodd"
              />
            </svg>
          </div>
          <h1 className="text-xl font-bold">TaskFlow</h1>
        </div>
        <div className="flex gap-2">
          <Link href="/login" className="btn btn-outline">
            Log In
          </Link>
          <Link href="/signup" className="btn btn-primary">
            Sign Up
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="flex-1 flex flex-col md:flex-row items-center max-w-6xl mx-auto px-4 py-12">
        <div
          className="md:w-1/2 md:pr-8 space-y-6 animate-fade-in"
          style={{ animationDelay: "0.1s" }}
        >
          <h1 className="text-4xl md:text-5xl font-bold">
            Organize your tasks with
            <span className="text-indigo-500"> TaskFlow</span>
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300">
            A sleek, modern to-do application designed to boost your
            productivity and help you stay organized.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <button
              onClick={() => router.push("/signup")}
              className="btn btn-primary text-center py-3 text-lg"
            >
              Get Started - It is Free
            </button>
            <button
              onClick={() => router.push("/login")}
              className="btn btn-outline text-center py-3 text-lg"
            >
              Log In
            </button>
          </div>
          <div className="pt-4">
            <div className="flex items-center gap-x-2">
              <div className="flex -space-x-2">
                {[1, 2, 3, 4].map((i) => (
                  <div
                    key={i}
                    className={`w-8 h-8 rounded-full border-2 border-white dark:border-gray-800 bg-gray-${
                      100 + i * 100
                    }`}
                  ></div>
                ))}
              </div>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Join <span className="font-semibold">2,000+</span> users
                organizing their lives
              </p>
            </div>
          </div>
        </div>
        <div
          className="md:w-1/2 mt-12 md:mt-0 animate-fade-in"
          style={{ animationDelay: "0.3s" }}
        >
          <div className="relative">
            <div className="absolute -inset-1 bg-gradient-to-r from-pink-500 to-indigo-500 rounded-lg blur-lg opacity-50"></div>
            <div className="card p-1 relative">
              <div className="bg-gray-50 dark:bg-gray-900 p-6 rounded-lg">
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <h3 className="font-bold">Today Tasks</h3>
                    <span className="text-sm text-gray-500">
                      3 of 5 completed
                    </span>
                  </div>
                  <div className="space-y-2">
                    {[
                      { title: "Review project proposal", completed: true },
                      { title: "Team meeting at 2:00 PM", completed: true },
                      { title: "Complete weekly report", completed: true },
                      { title: "Research new tools", completed: false },
                      { title: "Update documentation", completed: false },
                    ].map((task, index) => (
                      <div
                        key={index}
                        className="flex items-center p-3 bg-white dark:bg-gray-800 rounded-md shadow-sm"
                      >
                        <div
                          className={`h-5 w-5 rounded-full border ${
                            task.completed
                              ? "bg-green-500 border-green-500"
                              : "border-gray-300 dark:border-gray-600"
                          } mr-3 flex items-center justify-center`}
                        >
                          {task.completed && (
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="h-3 w-3 text-white"
                              viewBox="0 0 20 20"
                              fill="currentColor"
                            >
                              <path
                                fillRule="evenodd"
                                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                clipRule="evenodd"
                              />
                            </svg>
                          )}
                        </div>
                        <span
                          className={
                            task.completed ? "line-through text-gray-400" : ""
                          }
                        >
                          {task.title}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-6 border-t border-gray-200 dark:border-gray-700">
        <div className="max-w-6xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-gray-500">
            © 2025 TaskFlow. All rights reserved.
          </p>
          <div className="flex gap-6 mt-4 md:mt-0">
            <a
              href="#"
              className="text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
            >
              Terms
            </a>
            <a
              href="#"
              className="text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
            >
              Privacy
            </a>
            <a
              href="#"
              className="text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
            >
              Help
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}

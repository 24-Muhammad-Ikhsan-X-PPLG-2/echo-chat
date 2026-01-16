"use client";
import SignInIllustration from "@/components/SignIn/SignInIllustration";
import Loading from "@/components/ui/loading";
import { Eye, EyeOff, Github, Lock, Mail, X } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import useLogin from "@/hooks/useLogin";
import BackButton from "@/components/SignIn/back-button";
import ErrorMessage from "@/components/SignIn/error-message";
import SuccessMessage from "@/components/SignIn/success-message";
import Header from "@/components/SignIn/header";

const Signin = () => {
  const {
    errorMessage,
    errors,
    handleLogin,
    register,
    handleSubmit,
    isLoading,
    successMessage,
  } = useLogin();
  const [showPassword, setShowPassword] = useState(false);
  return (
    <div className="min-h-screen bg-linear-to-br from-purple-50 via-blue-50 to-white dark:from-gray-950 dark:via-purple-950/20 dark:to-gray-900 flex items-center justify-center p-4">
      {/* Back button */}
      <BackButton />

      <div className="w-full max-w-6xl">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Left side - Sign In Form */}
          <div className="w-full max-w-md mx-auto">
            <div className="bg-white dark:bg-gray-900 rounded-3xl shadow-2xl p-8 sm:p-10 border border-gray-100 dark:border-gray-800">
              {/* Header */}
              <Header />

              {/* Error message */}
              <ErrorMessage errorMessage={errorMessage} />
              <SuccessMessage successMessage={successMessage} />

              {/* Sign In Form */}
              <form onSubmit={handleSubmit(handleLogin)} className="space-y-5">
                {/* Email Input */}
                <div className="space-y-2">
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                  >
                    Email address
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                      <Mail className="w-5 h-5 text-gray-400" />
                    </div>
                    <input
                      id="email"
                      type="email"
                      className={`w-full pl-11 pr-4 py-3 bg-gray-50 dark:bg-gray-800 border ${
                        errors.email
                          ? "border-red-500"
                          : "border-gray-200 dark:border-gray-700"
                      } rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-all text-gray-900 dark:text-white placeholder-gray-400`}
                      placeholder="you@example.com"
                      {...register("email")}
                    />
                  </div>
                  {errors.email && (
                    <p className="text-sm text-red-600 dark:text-red-400 flex items-center gap-1">
                      <X className="w-4 h-4" />
                      {errors.email.message}
                    </p>
                  )}
                </div>

                {/* Password Input */}
                <div className="space-y-2">
                  <label
                    htmlFor="password"
                    className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                  >
                    Password
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                      <Lock className="w-5 h-5 text-gray-400" />
                    </div>
                    <input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      className={`w-full pl-11 pr-12 py-3 bg-gray-50 dark:bg-gray-800 border ${
                        errors.password
                          ? "border-red-500"
                          : "border-gray-200 dark:border-gray-700"
                      } rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-all text-gray-900 dark:text-white placeholder-gray-400`}
                      placeholder="••••••••"
                      {...register("password")}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
                    >
                      {showPassword ? (
                        <EyeOff className="w-5 h-5" />
                      ) : (
                        <Eye className="w-5 h-5" />
                      )}
                    </button>
                  </div>
                  {errors.password && (
                    <p className="text-sm text-red-600 dark:text-red-400 flex items-center gap-1">
                      <X className="w-4 h-4" />
                      {errors.password.message}
                    </p>
                  )}
                </div>

                {/* Remember me & Forgot password */}
                <div className="flex items-center justify-between">
                  <label className="flex items-center gap-2 cursor-pointer group">
                    <input
                      type="checkbox"
                      className="w-4 h-4 rounded border-gray-300 text-purple-600 focus:ring-purple-500 focus:ring-offset-0 cursor-pointer"
                      {...register("rememberMe")}
                    />
                    <span className="text-sm text-gray-600 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-gray-200 transition-colors">
                      Remember me
                    </span>
                  </label>
                  <a
                    href="#forgot-password"
                    className="text-sm text-purple-600 dark:text-purple-400 hover:text-purple-700 dark:hover:text-purple-300 font-medium transition-colors"
                  >
                    Forgot password?
                  </a>
                </div>

                {/* Sign In Button */}
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full py-3 bg-linear-to-r from-purple-600 to-blue-600 text-white rounded-xl font-medium hover:shadow-lg hover:shadow-purple-500/50 dark:hover:shadow-purple-500/30 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:shadow-none cursor-pointer"
                >
                  {isLoading ? (
                    <span className="flex items-center justify-center gap-2">
                      <Loading />
                      Signing in...
                    </span>
                  ) : (
                    "Sign in"
                  )}
                </button>
              </form>

              {/* Divider */}
              <div className="my-6 flex items-center gap-4">
                <div className="flex-1 h-px bg-gray-200 dark:bg-gray-700"></div>
                <span className="text-sm text-gray-500 dark:text-gray-400">
                  or continue with
                </span>
                <div className="flex-1 h-px bg-gray-200 dark:bg-gray-700"></div>
              </div>

              {/* Social Login Buttons */}
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => {}}
                  className="flex items-center justify-center gap-2 py-3 px-4 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-750 hover:border-gray-300 dark:hover:border-gray-600 transition-all"
                >
                  <svg className="w-5 h-5" viewBox="0 0 24 24">
                    <path
                      fill="#4285F4"
                      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                    />
                    <path
                      fill="#34A853"
                      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                    />
                    <path
                      fill="#FBBC05"
                      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                    />
                    <path
                      fill="#EA4335"
                      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                    />
                  </svg>
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    Google
                  </span>
                </button>

                <button
                  type="button"
                  onClick={() => {}}
                  className="flex items-center justify-center gap-2 py-3 px-4 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-750 hover:border-gray-300 dark:hover:border-gray-600 transition-all"
                >
                  <Github className="w-5 h-5 text-gray-700 dark:text-gray-300" />
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    GitHub
                  </span>
                </button>
              </div>

              {/* Sign Up Link */}
              <div className="mt-6 text-center">
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Don't have an account?{" "}
                  <Link
                    href="/signup"
                    className="text-purple-600 dark:text-purple-400 hover:text-purple-700 dark:hover:text-purple-300 font-medium transition-colors"
                  >
                    Sign up
                  </Link>
                </p>
              </div>
            </div>

            {/* Terms text */}
            <p className="mt-6 text-center text-xs text-gray-500 dark:text-gray-400 max-w-md mx-auto">
              By signing in, you agree to our{" "}
              <a
                href="#terms"
                className="text-purple-600 dark:text-purple-400 hover:underline"
              >
                Terms of Service
              </a>{" "}
              and{" "}
              <a
                href="#privacy"
                className="text-purple-600 dark:text-purple-400 hover:underline"
              >
                Privacy Policy
              </a>
            </p>
          </div>

          {/* Right side - Illustration (hidden on mobile) */}
          <div className="hidden lg:block h-150">
            <SignInIllustration />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signin;

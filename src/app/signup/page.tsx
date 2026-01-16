"use client";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  MessageCircle,
  Mail,
  Lock,
  Eye,
  EyeOff,
  Github,
  User,
  Check,
  X,
} from "lucide-react";
import SignInIllustration from "@/components/SignIn/SignInIllustration";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { FormSchemaSignUp } from "@/schema/schema-zod";
import { SignUpServerAction } from "./action";
import ErrorMessage from "@/components/SignIn/error-message";
import SuccessMessage from "@/components/SignIn/success-message";

// Zod validation schema

type SignUpFormData = z.infer<typeof FormSchemaSignUp>;

function SignUp() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<SignUpFormData>({
    resolver: zodResolver(FormSchemaSignUp),
    mode: "onChange",
  });

  const password = watch("password", "");

  // Password strength indicators
  const passwordStrength = {
    length: password.length >= 8,
    uppercase: /[A-Z]/.test(password),
    lowercase: /[a-z]/.test(password),
    number: /[0-9]/.test(password),
  };

  const passwordStrengthScore =
    Object.values(passwordStrength).filter(Boolean).length;
  const passwordStrengthLabel =
    passwordStrengthScore === 0
      ? ""
      : passwordStrengthScore <= 1
      ? "Weak"
      : passwordStrengthScore <= 2
      ? "Fair"
      : passwordStrengthScore === 3
      ? "Good"
      : "Strong";

  const onSubmit: SubmitHandler<SignUpFormData> = async ({
    fullName,
    email,
    password,
  }) => {
    setIsLoading(true);
    setSuccessMessage(null);
    setErrorMessage(null);
    const formData = new FormData();
    formData.set("fullName", fullName);
    formData.set("email", email);
    formData.set("password", password);

    const { error } = await SignUpServerAction(formData);
    if (error) {
      setErrorMessage(error);
      setIsLoading(false);
    } else {
      setSuccessMessage(
        "Account created successfully! Redirecting to sign in..."
      );
      setIsLoading(false);
      setTimeout(() => {
        router.push("/signin");
      }, 2000);
    }
  };

  const handleSocialSignUp = (provider: string) => {
    console.log(`Sign up with ${provider}`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-white dark:from-gray-950 dark:via-purple-950/20 dark:to-gray-900 flex items-center justify-center p-4">
      <div className="w-full max-w-6xl">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Left side - Sign Up Form */}
          <div className="w-full max-w-md mx-auto">
            <div className="bg-white dark:bg-gray-900 rounded-3xl shadow-2xl p-8 sm:p-10 border border-gray-100 dark:border-gray-800">
              {/* Header */}
              <div className="mb-8 space-y-4">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 rounded-xl bg-gradient-to-br from-purple-600 to-blue-600 shadow-lg shadow-purple-500/30">
                    <MessageCircle className="w-7 h-7 text-white" />
                  </div>
                  <span className="text-2xl font-bold text-gray-900 dark:text-white">
                    EchoChat
                  </span>
                </div>
                <div>
                  <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                    Create your account
                  </h1>
                  <p className="text-gray-600 dark:text-gray-400 mt-2">
                    Join EchoChat and start connecting with your team
                  </p>
                </div>
              </div>

              {/* Success message */}
              <SuccessMessage successMessage={successMessage} />
              <ErrorMessage errorMessage={errorMessage} />

              {/* Sign Up Form */}
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                {/* Full Name Input */}
                <div className="space-y-2">
                  <label
                    htmlFor="fullName"
                    className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                  >
                    Full Name
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                      <User className="w-5 h-5 text-gray-400" />
                    </div>
                    <input
                      id="fullName"
                      type="text"
                      {...register("fullName")}
                      className={`w-full pl-11 pr-4 py-3 bg-gray-50 dark:bg-gray-800 border ${
                        errors.fullName
                          ? "border-red-500"
                          : "border-gray-200 dark:border-gray-700"
                      } rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-all text-gray-900 dark:text-white placeholder-gray-400`}
                      placeholder="John Doe"
                    />
                  </div>
                  {errors.fullName && (
                    <p className="text-sm text-red-600 dark:text-red-400 flex items-center gap-1">
                      <X className="w-4 h-4" />
                      {errors.fullName.message}
                    </p>
                  )}
                </div>

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
                      {...register("email")}
                      className={`w-full pl-11 pr-4 py-3 bg-gray-50 dark:bg-gray-800 border ${
                        errors.email
                          ? "border-red-500"
                          : "border-gray-200 dark:border-gray-700"
                      } rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-all text-gray-900 dark:text-white placeholder-gray-400`}
                      placeholder="you@example.com"
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
                      {...register("password")}
                      className={`w-full pl-11 pr-12 py-3 bg-gray-50 dark:bg-gray-800 border ${
                        errors.password
                          ? "border-red-500"
                          : "border-gray-200 dark:border-gray-700"
                      } rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-all text-gray-900 dark:text-white placeholder-gray-400`}
                      placeholder="••••••••"
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

                  {/* Password strength indicator */}
                  {password && (
                    <div className="space-y-2">
                      <div className="flex gap-1">
                        {[1, 2, 3, 4].map((level) => (
                          <div
                            key={level}
                            className={`h-1.5 flex-1 rounded-full transition-all ${
                              level <= passwordStrengthScore
                                ? passwordStrengthScore <= 1
                                  ? "bg-red-500"
                                  : passwordStrengthScore <= 2
                                  ? "bg-yellow-500"
                                  : passwordStrengthScore === 3
                                  ? "bg-blue-500"
                                  : "bg-green-500"
                                : "bg-gray-200 dark:bg-gray-700"
                            }`}
                          />
                        ))}
                      </div>
                      {passwordStrengthLabel && (
                        <p className="text-xs text-gray-600 dark:text-gray-400">
                          Password strength:{" "}
                          <span className="font-medium">
                            {passwordStrengthLabel}
                          </span>
                        </p>
                      )}
                    </div>
                  )}

                  {/* Password requirements */}
                  <div className="text-xs space-y-1 mt-2">
                    <p className="text-gray-600 dark:text-gray-400">
                      Password must contain:
                    </p>
                    <div className="grid grid-cols-2 gap-1">
                      <div
                        className={`flex items-center gap-1 ${
                          passwordStrength.length
                            ? "text-green-600"
                            : "text-gray-500"
                        }`}
                      >
                        {passwordStrength.length ? (
                          <Check className="w-3 h-3" />
                        ) : (
                          <X className="w-3 h-3" />
                        )}
                        <span>8+ characters</span>
                      </div>
                      <div
                        className={`flex items-center gap-1 ${
                          passwordStrength.uppercase
                            ? "text-green-600"
                            : "text-gray-500"
                        }`}
                      >
                        {passwordStrength.uppercase ? (
                          <Check className="w-3 h-3" />
                        ) : (
                          <X className="w-3 h-3" />
                        )}
                        <span>Uppercase</span>
                      </div>
                      <div
                        className={`flex items-center gap-1 ${
                          passwordStrength.lowercase
                            ? "text-green-600"
                            : "text-gray-500"
                        }`}
                      >
                        {passwordStrength.lowercase ? (
                          <Check className="w-3 h-3" />
                        ) : (
                          <X className="w-3 h-3" />
                        )}
                        <span>Lowercase</span>
                      </div>
                      <div
                        className={`flex items-center gap-1 ${
                          passwordStrength.number
                            ? "text-green-600"
                            : "text-gray-500"
                        }`}
                      >
                        {passwordStrength.number ? (
                          <Check className="w-3 h-3" />
                        ) : (
                          <X className="w-3 h-3" />
                        )}
                        <span>Number</span>
                      </div>
                    </div>
                  </div>

                  {errors.password && (
                    <p className="text-sm text-red-600 dark:text-red-400 flex items-center gap-1">
                      <X className="w-4 h-4" />
                      {errors.password.message}
                    </p>
                  )}
                </div>

                {/* Confirm Password Input */}
                <div className="space-y-2">
                  <label
                    htmlFor="confirmPassword"
                    className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                  >
                    Confirm Password
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                      <Lock className="w-5 h-5 text-gray-400" />
                    </div>
                    <input
                      id="confirmPassword"
                      type={showConfirmPassword ? "text" : "password"}
                      {...register("confirmPassword")}
                      className={`w-full pl-11 pr-12 py-3 bg-gray-50 dark:bg-gray-800 border ${
                        errors.confirmPassword
                          ? "border-red-500"
                          : "border-gray-200 dark:border-gray-700"
                      } rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-all text-gray-900 dark:text-white placeholder-gray-400`}
                      placeholder="••••••••"
                    />
                    <button
                      type="button"
                      onClick={() =>
                        setShowConfirmPassword(!showConfirmPassword)
                      }
                      className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
                    >
                      {showConfirmPassword ? (
                        <EyeOff className="w-5 h-5" />
                      ) : (
                        <Eye className="w-5 h-5" />
                      )}
                    </button>
                  </div>
                  {errors.confirmPassword && (
                    <p className="text-sm text-red-600 dark:text-red-400 flex items-center gap-1">
                      <X className="w-4 h-4" />
                      {errors.confirmPassword.message}
                    </p>
                  )}
                </div>

                {/* Terms and Conditions */}
                <div className="space-y-2">
                  <label className="flex items-start gap-2 cursor-pointer group">
                    <input
                      type="checkbox"
                      {...register("terms")}
                      className={`w-4 h-4 mt-0.5 rounded border-gray-300 ${
                        errors.terms ? "border-red-500" : ""
                      } text-purple-600 focus:ring-purple-500 focus:ring-offset-0 cursor-pointer`}
                    />
                    <span className="text-sm text-gray-600 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-gray-200 transition-colors">
                      I agree to the{" "}
                      <a
                        href="#terms"
                        className="text-purple-600 dark:text-purple-400 hover:underline font-medium"
                      >
                        Terms of Service
                      </a>{" "}
                      and{" "}
                      <a
                        href="#privacy"
                        className="text-purple-600 dark:text-purple-400 hover:underline font-medium"
                      >
                        Privacy Policy
                      </a>
                    </span>
                  </label>
                  {errors.terms && (
                    <p className="text-sm text-red-600 dark:text-red-400 flex items-center gap-1">
                      <X className="w-4 h-4" />
                      {errors.terms.message}
                    </p>
                  )}
                </div>

                {/* Sign Up Button */}
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-xl font-medium hover:shadow-lg hover:shadow-purple-500/50 dark:hover:shadow-purple-500/30 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:shadow-none"
                >
                  {isLoading ? (
                    <span className="flex items-center justify-center gap-2">
                      <svg
                        className="animate-spin h-5 w-5 text-white"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                      </svg>
                      Creating account...
                    </span>
                  ) : (
                    "Create account"
                  )}
                </button>
              </form>

              {/* Divider */}
              <div className="my-6 flex items-center gap-4">
                <div className="flex-1 h-px bg-gray-200 dark:bg-gray-700"></div>
                <span className="text-sm text-gray-500 dark:text-gray-400">
                  or sign up with
                </span>
                <div className="flex-1 h-px bg-gray-200 dark:bg-gray-700"></div>
              </div>

              {/* Social Sign Up Buttons */}
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => handleSocialSignUp("Google")}
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
                  onClick={() => handleSocialSignUp("GitHub")}
                  className="flex items-center justify-center gap-2 py-3 px-4 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-750 hover:border-gray-300 dark:hover:border-gray-600 transition-all"
                >
                  <Github className="w-5 h-5 text-gray-700 dark:text-gray-300" />
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    GitHub
                  </span>
                </button>
              </div>

              {/* Sign In Link */}
              <div className="mt-6 text-center">
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Already have an account?{" "}
                  <Link href={"/signin"}>
                    <button
                      type="button"
                      className="text-purple-600 dark:text-purple-400 hover:text-purple-700 dark:hover:text-purple-300 font-medium transition-colors"
                    >
                      Sign in
                    </button>
                  </Link>
                </p>
              </div>
            </div>
          </div>

          {/* Right side - Illustration (hidden on mobile) */}
          <div className="hidden lg:block h-[700px]">
            <SignInIllustration />
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignUp;

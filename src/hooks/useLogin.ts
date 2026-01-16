"use client";
import { SignInServerAction } from "@/app/signin/action";
import { FormSchemaSignIn } from "@/schema/schema-zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import z from "zod";

type FormSchemaType = z.infer<typeof FormSchemaSignIn>;

const useLogin = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<FormSchemaType>({
    resolver: zodResolver(FormSchemaSignIn),
    defaultValues: {
      email: "",
      password: "",
      rememberMe: false,
    },
  });
  const handleLogin: SubmitHandler<FormSchemaType> = async ({
    email,
    password,
    rememberMe,
  }) => {
    const formData = new FormData();
    formData.append("email", email);
    formData.append("password", password);
    if (rememberMe) {
      formData.append("rememberMe", "true");
    }
    setIsLoading(true);
    setErrorMessage(null);
    setSuccessMessage(null);
    const { error } = await SignInServerAction(formData);
    setIsLoading(false);
    if (error) {
      if (error === "Invalid login credentials") {
        setError("password", {
          message: "Invalid email or password.",
        });
        setError("email", {
          message: "Invalid email or password.",
        });
      } else {
        setErrorMessage(error);
      }
      setSuccessMessage(null);
    } else {
      setSuccessMessage("Successfully signed in!");
      setErrorMessage(null);
      router.push("/chat");
    }
  };
  return {
    isLoading,
    successMessage,
    errorMessage,
    register,
    handleSubmit,
    errors,
    handleLogin,
  };
};

export default useLogin;

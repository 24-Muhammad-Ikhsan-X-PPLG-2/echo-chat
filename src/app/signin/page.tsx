import { Metadata } from "next";
import Signin from "./client";

export const metadata: Metadata = {
  title: "Sign In - EchoChat",
  description: "Sign in to your EchoChat account",
};

const Page = () => {
  return <Signin />;
};

export default Page;

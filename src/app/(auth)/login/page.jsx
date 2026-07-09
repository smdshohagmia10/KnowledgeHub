"use client";

import { useState } from "react";
import {
  Input,
  Button,
  TextField,
  Label,
  InputGroup,
  Separator,
} from "@heroui/react";
import { FaEye, FaEyeSlash, FaGoogle } from "react-icons/fa";
import Link from "next/link";
import { authClient } from "@/lib/auth-client";
import { useRouter, useSearchParams } from "next/navigation";
import { toast } from "react-toastify";

const SignInClient = () => {
  const searchParams = useSearchParams();
  const redirectPath = searchParams.get("redirect") || "/";

  const router = useRouter();
  const [isVisible, setIsVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);

  const handelSignIn = async () => {
    setIsGoogleLoading(true);
    const { error } = await authClient.signIn.social({
      provider: "google",
      callbackURL: redirectPath,
    });

    if (error) {
      console.error(error);
      toast.error(error.message || "Google sign in failed");
      setIsGoogleLoading(false);
    }
  };

  const handelSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    const formData = new FormData(e.currentTarget);
    const userData = Object.fromEntries(formData.entries());

    const { email, password } = userData;

    const { data, error } = await authClient.signIn.email({
      email,
      password,
    });

    if (error) {
      toast.error(error.message);
      setIsLoading(false);
      return;
    }

    if (data) {
      toast.success("Welcome back!");
      router.push(redirectPath);
    }
  };

  return (
    <section className="min-h-screen flex items-center justify-center px-4 py-10 bg-[#121212] bg-linear-to-b from-[#121212] to-black">
      <div className="w-full max-w-md rounded-2xl border border-white/10 bg-[#121212]/80 backdrop-blur-xl shadow-2xl transition-all duration-300 hover:border-orange-500/20">
        <div className="p-8">
          
          <div className="mb-8 text-center">
            <h1 className="text-3xl font-bold text-white tracking-tight">
              Welcome <span className="text-orange-500">Back</span>
            </h1>
            <p className="text-zinc-400 text-sm mt-2">
              Sign in to manage your account
            </p>
          </div>

         
          <form onSubmit={handelSubmit} className="space-y-5">
            <TextField className="w-full text-white" name="email" type="email">
              <Label className="text-zinc-300 font-medium mb-1.5 block text-sm">Email</Label>
              <Input
                name="email"
                placeholder="Enter your email"
                required
                className="bg-zinc-900/50 border-white/5 text-white focus:border-orange-500/50"
              />
            </TextField>

            <TextField className="w-full text-white">
              <Label className="text-zinc-300 font-medium mb-1.5 block text-sm">Password</Label>
              <InputGroup className="bg-zinc-900/50 border border-white/10 rounded-xl focus-within:border-orange-500/50">
                <InputGroup.Input
                  name="password"
                  type={isVisible ? "text" : "password"}
                  placeholder="Enter your password"
                  required
                  className="text-white placeholder:text-zinc-500 bg-transparent"
                />
                <InputGroup.Suffix>
                  <Button
                    isIconOnly
                    variant="light"
                    size="sm"
                    type="button"
                    className="text-zinc-400 hover:text-white"
                    aria-label={isVisible ? "Hide password" : "Show password"}
                    onPress={() => setIsVisible(!isVisible)}
                  >
                    {isVisible ? (
                      <FaEyeSlash className="size-4" />
                    ) : (
                      <FaEye className="size-4" />
                    )}
                  </Button>
                </InputGroup.Suffix>
              </InputGroup>
            </TextField>
            
            <div className="flex justify-end">
              <Link
                href="/forgot-password"
                className="text-sm text-orange-500 hover:text-orange-400 font-medium transition"
              >
                Forgot Password?
              </Link>
            </div>
       
            <Button
              type="submit"
              isLoading={isLoading}
              className="w-full h-11 bg-orange-500 hover:bg-orange-600 text-white font-semibold rounded-xl transition duration-200 shadow-lg shadow-orange-500/10"
            >
              Sign In
            </Button>
          </form>
      
          <div className="my-6 flex items-center gap-3">
            <Separator className="flex-1 bg-white/10" />
            <span className="text-xs text-zinc-500 font-medium uppercase tracking-wider">OR</span>
            <Separator className="flex-1 bg-white/10" />
          </div>
  
          <Button
            onPress={handelSignIn}
            isLoading={isGoogleLoading}
            className="w-full h-11 bg-zinc-900 hover:bg-zinc-800 text-white border border-white/10 font-medium rounded-xl transition duration-200 flex items-center justify-center gap-2 group"
          >
            {!isGoogleLoading && <FaGoogle className="text-md text-orange-500 group-hover:scale-105 transition-transform" />}
            Sign in with Google
          </Button>

          <p className="text-center text-sm text-zinc-400 mt-6">
            Don't have an account?{" "}
            <Link
              href={`/signup?redirect=${redirectPath}`}
              className="text-orange-500 font-semibold hover:underline"
            >
              Sign Up
            </Link>
          </p>

        </div>
      </div>
    </section>
  );
};

export default SignInClient;
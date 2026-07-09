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
import { FiUploadCloud, FiX } from "react-icons/fi";
import Link from "next/link";
import Image from "next/image";
import { toast } from "react-toastify";
import { authClient } from "@/lib/auth-client";
import { redirect } from "next/navigation";

const SignUp = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const [confirmVisible, setConfirmVisible] = useState(false);

  const [isUploading, setIsUploading] = useState(false);
  const [imagePreview, setImagePreview] = useState(null);
  const [imageUrl, setImageUrl] = useState("");

  const IMGBB_API_KEY = process.env.NEXT_PUBLIC_IMAGE_BB_UPLOAD_API;

  const handleImageChange = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!IMGBB_API_KEY) {
      toast.error("Configuration error: image upload key not found.");
      return;
    }

    setImagePreview(URL.createObjectURL(file));
    setIsUploading(true);

    try {
      const uploadData = new FormData();
      uploadData.append("image", file);

      const response = await fetch(
        `https://api.imgbb.com/1/upload?key=${IMGBB_API_KEY}`,
        {
          method: "POST",
          body: uploadData,
        },
      );

      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      const result = await response.json();

      if (result.success) {
        setImageUrl(result.data.url);
        toast.success("Profile picture uploaded successfully!");
      } else {
        throw new Error(result.error?.message || "Upload failed");
      }
    } catch (error) {
      console.error("Upload error:", error);
      setImagePreview(null);
      setImageUrl("");
      const input = document.getElementById("avatar-input");
      if (input) input.value = "";
      toast.error("Image upload failed. Please try again.");
    } finally {
      setIsUploading(false);
    }
  };

  const handleRemovePreview = (e) => {
    e.preventDefault();
    setImagePreview(null);
    setImageUrl("");
    const input = document.getElementById("avatar-input");
    if (input) input.value = "";
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (isUploading) {
      toast.warning("Please wait until your avatar finishes uploading.");
      return;
    }

    setLoading(true);

    const formData = new FormData(e.currentTarget);
    const { name, email, password, confirmPassword } = Object.fromEntries(
      formData.entries(),
    );

    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      setLoading(false);
      return;
    }

    const { data, error } = await authClient.signUp.email({
      name,
      email,
      password,
      image: imageUrl || undefined,
      callbackURL: "/select-role",
    });

    setLoading(false);
    console.log("DATA:", data);
    console.log("ERROR:", error);
    if (error) {
      console.error(error);
      toast.error(error.message || "Something went wrong. Try again!");
      return;
    }

    if (data) {
      toast.success("Account created successfully!");
      redirect("/select-role");
    }
  };

  // Google Sign Up
  const handleGoogleSignUp = async () => {
    setGoogleLoading(true);
    const { error } = await authClient.signIn.social({
      provider: "google",
      callbackURL: "/select-role",
    });

    if (error) {
      console.error(error);
      toast.error(error.message || "Google registration failed");
      setGoogleLoading(false);
    }
  };

  return (
    <>
      <section className="min-h-screen flex items-center justify-center px-4 py-10 ">
        <div className="w-full max-w-md rounded-2xl border border-white/10 bg-[#121212]/80 backdrop-blur-xl shadow-2xl transition-all duration-300 hover:border-orange-500/20">
          <div className="p-8">
            <div className="mb-8 text-center">
              <h1 className="text-3xl font-bold text-white tracking-tight">
                Create <span className="text-orange-500">Account</span>
              </h1>
              <p className="text-zinc-400 text-sm mt-2">
                Sign up to get started with our platform
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              <TextField className="w-full text-white">
                <Label className="text-zinc-300 font-medium mb-1.5 block text-sm">
                  Name
                </Label>
                <Input
                  name="name"
                  type="text"
                  placeholder="Enter your name"
                  required
                  className="bg-zinc-900/50 border-white/5 text-white focus:border-orange-500/50"
                />
              </TextField>

              <TextField className="w-full text-white">
                <Label className="text-zinc-300 font-medium mb-1.5 block text-sm">
                  Email
                </Label>
                <Input
                  name="email"
                  type="email"
                  placeholder="Enter your email"
                  required
                  className="bg-zinc-900/50 border-white/5 text-white focus:border-orange-500/50"
                />
              </TextField>

              {/* Profile Picture (বাকি ইনপুট ফিল্ডগুলোর মতোই স্টাইল করা) */}
              <TextField className="w-full text-white">
                <Label className="text-zinc-300 font-medium mb-1.5 block text-sm">
                  Picture
                </Label>
                {imagePreview ? (
                  <div className="flex h-11 items-center justify-between rounded-xl border border-white/10 bg-zinc-900/50 px-3">
                    <div className="flex items-center gap-2.5">
                      <div className="relative h-6 w-6 overflow-hidden rounded-md border border-white/10">
                        <Image
                          src={imagePreview}
                          alt="Preview"
                          fill
                          className="object-cover"
                        />
                      </div>
                      <span className="text-xs text-zinc-400">
                        {isUploading ? (
                          <span className="animate-pulse text-orange-400 font-medium">
                            Uploading…
                          </span>
                        ) : (
                          "Image selected"
                        )}
                      </span>
                    </div>
                    <button
                      onClick={handleRemovePreview}
                      className="rounded-lg p-1.5 text-zinc-500 hover:text-red-400 hover:bg-white/5 transition-all"
                      title="Remove picture"
                    >
                      <FiX className="text-base" />
                    </button>
                  </div>
                ) : (
                  <label className="flex h-11 cursor-pointer items-center gap-2 rounded-xl border border-white/10 bg-zinc-900/50 px-3 transition-all duration-200 hover:bg-zinc-900 hover:border-orange-500/30 group">
                    <FiUploadCloud className="text-zinc-500 text-sm group-hover:text-orange-500 transition-colors" />
                    <span className="text-sm text-zinc-500 group-hover:text-zinc-400 transition-colors">
                      Upload profile picture
                    </span>
                    <input
                      id="avatar-input"
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={handleImageChange}
                    />
                  </label>
                )}
              </TextField>

              {/* Password */}
              <TextField className="w-full text-white">
                <Label className="text-zinc-300 font-medium mb-1.5 block text-sm">
                  Password
                </Label>
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
                      onPress={() => setIsVisible(!isVisible)}
                      aria-label={isVisible ? "Hide password" : "Show password"}
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
              {/* confrim password */}
              <TextField className="w-full text-white">
                <Label className="text-zinc-300 font-medium mb-1.5 block text-sm">
                  Confirm Password
                </Label>

                <InputGroup className="bg-zinc-900/50 border border-white/10 rounded-xl focus-within:border-orange-500/50">
                  <InputGroup.Input
                    name="confirmPassword"
                    type={confirmVisible ? "text" : "password"}
                    placeholder="Confirm your password"
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
                      onPress={() => setConfirmVisible(!confirmVisible)}
                    >
                      {confirmVisible ? (
                        <FaEyeSlash className="size-4" />
                      ) : (
                        <FaEye className="size-4" />
                      )}
                    </Button>
                  </InputGroup.Suffix>
                </InputGroup>
              </TextField>

              {/* Submit Button */}
              <Button
                type="submit"
                isLoading={loading}
                disabled={isUploading}
                className="w-full h-11 bg-orange-500 hover:bg-orange-600 text-white font-semibold rounded-xl transition duration-200 shadow-lg shadow-orange-500/10 mt-2 disabled:opacity-50"
              >
                Create Account
              </Button>
            </form>

            {/* Divider */}
            <div className="my-6 flex items-center gap-3">
              <Separator className="flex-1 bg-white/10" />
              <span className="text-xs text-zinc-500 font-medium uppercase tracking-wider">
                OR
              </span>
              <Separator className="flex-1 bg-white/10" />
            </div>

            {/* Google Auth */}
            <Button
              onPress={handleGoogleSignUp}
              isLoading={googleLoading}
              className="w-full h-11 bg-zinc-900 hover:bg-zinc-800 text-white border border-white/10 font-medium rounded-xl transition duration-200 flex items-center justify-center gap-2 group"
            >
              {!googleLoading && (
                <FaGoogle className="text-md text-orange-500 group-hover:scale-105 transition-transform" />
              )}
              Continue with Google
            </Button>

            {/* Footer */}
            <p className="text-center text-sm text-zinc-400 mt-6">
              Already have an account?{" "}
              <Link
                href={`/signin`}
                className="text-orange-500 font-semibold hover:underline"
              >
                Sign In
              </Link>
            </p>
          </div>
        </div>
      </section>
    </>
  );
};

export default SignUp;

"use client";

import { useState } from "react";
import {
  Button,
  TextField,
  Label,
  Input,
} from "@heroui/react";
import { FiUploadCloud, FiX } from "react-icons/fi";
import Image from "next/image";
import { toast } from "react-toastify";
import { postBookData } from "@/lib/action/books";
import { authClient } from "@/lib/auth-client";

const textInputClass =
  "w-full rounded-xl border border-white/10 bg-zinc-900/50 px-3 py-2  placeholder-zinc-500 focus:border-orange-500/50 focus:outline-none focus:ring-1 focus:ring-orange-500/30 transition";

const textAreaClass =
  "w-full rounded-xl border border-white/10 bg-zinc-900/50 px-3 py-2  placeholder-zinc-500 focus:border-orange-500/50 focus:outline-none focus:ring-1 focus:ring-orange-500/30 transition resize-none";

const triggerClasses =
  "w-full rounded-xl border border-white/10 bg-zinc-900/50 px-3 py-2  focus:border-orange-500/50 focus:outline-none transition text-left";

const popoverClasses =
  "rounded-xl border border-white/10 bg-zinc-900 shadow-xl  mt-1";

const BookAddingForm = () => {
  const { data: session } = authClient.useSession();
  const user = session?.user;
  console.log(user);

  const [isUploading, setIsUploading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
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
        { method: "POST", body: uploadData },
      );

      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      const result = await response.json();

      if (result.success) {
        setImageUrl(result.data.url);
        toast.success("Cover image uploaded successfully!");
      } else {
        throw new Error(result.error?.message || "Upload failed");
      }
    } catch (error) {
      console.error("Upload error:", error);
      setImagePreview(null);
      setImageUrl("");
      const input = document.getElementById("cover-input");
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
    const input = document.getElementById("cover-input");
    if (input) input.value = "";
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.target
    if (isUploading) {
      toast.warning("Please wait until the cover image finishes uploading.");
      return;
    }
    if (!user) {
      toast.error("Please login first");
      return;
    }

    setIsSubmitting(true);

    const formData = new FormData(e.currentTarget);
    const bookData = {
      title: formData.get("title"),
      author: formData.get("author"),
      price: formData.get("price"),
      category: formData.get("category"),
      publisher: formData.get("publisher"),
      publicationYear: formData.get("publicationYear"),
      language: formData.get("language"),
      coverImage: imageUrl || formData.get("coverImageUrl"),
      description: formData.get("description"),
      librarianId: user?.id,
      approvalStatus: "pending",
      publishStatus: "published",
    };

    try {
      await postBookData(bookData);
      console.log("Book data to submit:", bookData);
      toast.success("Book added successfully!");
      form.reset();
      setImagePreview(null);
      setImageUrl("");
    } catch (error) {
      console.error("Submit error:", error);
      toast.error("Failed to add book. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="min-h-screen flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-2xl rounded-2xl border border-white/10  backdrop-blur-xl shadow-2xl transition-all duration-300 hover:border-orange-500/20">
        <div className="p-8">
          {/* Header */}
          <div className="mb-8 text-center">
            <h1 className="text-3xl font-bold  tracking-tight">
              Add New <span className="text-orange-500">Book</span>
            </h1>
            <p className="text-zinc-400 text-sm mt-2">
              Fill in the details to add a book to the library
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-8">
            {/* ── Book Information ── */}
            <fieldset className="space-y-6">
              <legend className="text-lg font-semibold  border-b border-zinc-800 pb-2 w-full">
                Book Information
              </legend>

              {/* Title & Author */}
              <div className="grid md:grid-cols-2 gap-6">
                <TextField name="title" className="w-full ">
                  <Label className=" font-medium mb-1.5 block text-sm">
                    Book Title <span className="text-orange-500">*</span>
                  </Label>
                  <Input
                    required
                    className={textInputClass}
                    placeholder="e.g. Atomic Habits"
                  />
                </TextField>

                <TextField name="author" className="w-full ">
                  <Label className=" font-medium mb-1.5 block text-sm">
                    Author Name <span className="text-orange-500">*</span>
                  </Label>
                  <Input
                    required
                    className={textInputClass}
                    placeholder="e.g. James Clear"
                  />
                </TextField>
              </div>

              {/* ISBN & Category */}
              <div className="grid md:grid-cols-2 gap-6">
                <TextField name="price" className="w-full ">
                  <Label className=" font-medium mb-1.5 block text-sm">
                    Price
                  </Label>
                  <Input type="number" className={textInputClass} placeholder="50$" />
                </TextField>

                <div className="w-full ">
                  <label className=" font-medium mb-1.5 block text-sm">
                    Category
                  </label>
                  <select
                    required
                    name="category"
                    className={triggerClasses}
                    defaultValue=""
                  >
                    <option value="" disabled>
                      Select a category
                    </option>
                    <option value="programming">Programming</option>
                    <option value="fiction">Fiction</option>
                    <option value="science">Science</option>
                    <option value="history">History</option>
                    <option value="Mystery">Mystery</option>
                    <option value="biography">Biography</option>
                    <option value="religion">Religion</option>
                    <option value="children">Children</option>
                    <option value="Classic">Classic</option>
                  </select>
                </div>
              </div>

              {/* Publisher, Year, Copies */}
              <div className="grid md:grid-cols-2 gap-6">
                <TextField name="publisher" className="w-full ">
                  <Label className=" font-medium mb-1.5 block text-sm">
                    Publisher
                  </Label>
                  <Input
                    className={textInputClass}
                    placeholder="e.g. Penguin"
                  />
                </TextField>

                <TextField name="publicationYear" className="w-full ">
                  <Label className=" font-medium mb-1.5 block text-sm">
                    Publication Year
                  </Label>
                  <Input
                    type="number"
                    min="1000"
                    max={new Date().getFullYear()}
                    className={textInputClass}
                    placeholder="e.g. 2024"
                  />
                </TextField>
              </div>

              {/* Language */}
              <div className="grid  gap-6">
                <div className="w-full text-white">
                  <label className=" font-medium mb-1.5 block text-sm">
                    Language
                  </label>
                  <select
                    name="language"
                    className={triggerClasses}
                    defaultValue="english"
                  >
                    <option value="english">English</option>
                    <option value="bangla">Bangla</option>
                    <option value="arabic">Arabic</option>
                    <option value="hindi">Hindi</option>
                    <option value="urdu">Urdu</option>
                  </select>
                </div>
              </div>
            </fieldset>

            {/* ── Cover Image ── */}
            <fieldset className="space-y-4">
              <legend className="text-lg font-semibold border-b border-zinc-800 pb-2 w-full">
                Cover Image
              </legend>

              <div className="">
                <label className=" font-medium mb-1.5 block text-sm">
                  Upload Cover
                </label>

                {imagePreview ? (
                  <div className="flex h-11 items-center justify-between rounded-xl border border-white/10 bg-zinc-900/50 px-3">
                    <div className="flex items-center gap-2.5">
                      <div className="relative h-7 w-7 overflow-hidden rounded-md border border-white/10">
                        <Image
                          src={imagePreview}
                          alt="Cover Preview"
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
                          <span className="text-green-400">
                            Cover image ready
                          </span>
                        )}
                      </span>
                    </div>
                    <button
                      onClick={handleRemovePreview}
                      className="rounded-lg p-1.5 text-zinc-500 hover:text-red-400 hover:bg-white/5 transition-all"
                      title="Remove cover"
                    >
                      <FiX className="text-base" />
                    </button>
                  </div>
                ) : (
                  <label className="flex h-11 cursor-pointer items-center gap-2 rounded-xl border border-white/10 bg-zinc-900/50 px-3 transition-all duration-200 hover:bg-zinc-900 hover:border-orange-500/30 group">
                    <FiUploadCloud className="text-zinc-500 text-sm group-hover:text-orange-500 transition-colors" />
                    <span className="text-sm text-zinc-500 group-hover:text-zinc-400 transition-colors">
                      Upload cover image
                    </span>
                    <input
                      id="cover-input"
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={handleImageChange}
                    />
                  </label>
                )}

                {/* OR paste URL */}
                {!imagePreview && (
                  <>
                    <div className="flex items-center gap-3 my-3">
                      <div className="flex-1 h-px bg-zinc-800" />
                      <span className="text-xs text-zinc-500">or</span>
                      <div className="flex-1 h-px bg-zinc-800" />
                    </div>
                    <TextField name="coverImageUrl" className="w-full ">
                      <Input
                        className={textInputClass}
                        placeholder="Paste image URL: https://example.com/cover.jpg"
                      />
                    </TextField>
                  </>
                )}
              </div>
            </fieldset>

            {/* ── Description ── */}
            <fieldset className="space-y-4">
              <legend className="text-lg font-semibold  border-b border-zinc-800 pb-2 w-full">
                Book Description
              </legend>

              <div className="w-full ">
                <label className=" font-medium mb-1.5 block text-sm">
                  Description
                </label>
                <textarea
                  name="description"
                  rows={5}
                  className={textAreaClass}
                  placeholder="Write a short summary of the book..."
                />
              </div>
            </fieldset>

            {/* ── Submit ── */}
            <Button
              type="submit"
              isLoading={isSubmitting}
              disabled={isUploading || isSubmitting}
              className="w-full h-11 bg-orange-500 hover:bg-orange-600  font-semibold rounded-xl transition duration-200 shadow-lg shadow-orange-500/10 disabled:opacity-50"
            >
              {isSubmitting ? "Adding Book…" : "Add Book to Library"}
            </Button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default BookAddingForm;

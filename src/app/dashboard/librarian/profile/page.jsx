import { userSession } from "@/lib/core/session";
import Image from "next/image";
import { Card } from "@heroui/react";
import {
  FaBookOpen,
  FaEnvelope,
  FaUserShield,
  FaCalendarAlt,
} from "react-icons/fa";

const ProfilePage = async () => {
  const user = await userSession();


  return (
    <div className="max-w-5xl mx-auto px-4 py-10">
      <Card className="p-8 shadow-lg">
        {/* Profile Header */}
        <div className="flex flex-col md:flex-row items-center gap-6 border-b pb-8">
          <Image
            src={
              user?.image ||
              "https://ui-avatars.com/api/?name=Librarian&background=random"
            }
            alt="Profile"
            width={120}
            height={120}
            className="rounded-full border-4 border-primary object-cover"
          />

          <div className="text-center md:text-left">
            <h1 className="text-3xl font-bold">
              {user?.name || "Librarian"}
            </h1>

            <p className="flex items-center gap-2 justify-center md:justify-start text-default-500 mt-2">
              <FaEnvelope />
              {user?.email}
            </p>

            <div className="inline-flex items-center gap-2 mt-4 bg-primary/10 text-primary px-4 py-2 rounded-full">
              <FaUserShield />
              Librarian
            </div>
          </div>
        </div>

        {/* Profile Info */}
        <div className="mt-8">
          <h2 className="text-2xl font-semibold mb-5">
            Profile Information
          </h2>

          <div className="grid md:grid-cols-2 gap-5">
            <div className="border rounded-xl p-5">
              <p className="text-sm text-default-500">Full Name</p>
              <p className="font-semibold">{user?.name || "N/A"}</p>
            </div>

            <div className="border rounded-xl p-5">
              <p className="text-sm text-default-500">Email Address</p>
              <p className="font-semibold">{user?.email || "N/A"}</p>
            </div>

            <div className="border rounded-xl p-5">
              <p className="text-sm text-default-500">Role</p>
              <p className="font-semibold">
                {user?.role || "Librarian"}
              </p>
            </div>

            <div className="border rounded-xl p-5">
              <p className="text-sm text-default-500 flex items-center gap-2">
                <FaCalendarAlt />
                Joined Date
              </p>

              <p className="font-semibold">
                {user?.createdAt
                  ? new Date(user.createdAt).toLocaleDateString()
                  : "N/A"}
              </p>
            </div>
          </div>
        </div>

        
      </Card>
    </div>
  );
};

export default ProfilePage;
"use client"
import { updateuserAsLibrarian, updateuserAsUser } from '@/lib/action/users';
import { Button, Table } from '@heroui/react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import React from 'react';
import { toast } from 'react-toastify';
import { UserDeleteAlart } from './UserDeleteAlart';
import { AdminAlart } from './AdminAlart';

const AllUsersTable = ({ allUsers }) => {
const router = useRouter()

    const handleUserRoleChange = async (id) => {
        try {
            const payload={
                role : "user"
            }
            const res = await updateuserAsUser(payload,id)
            if(res){
                toast.success("Updated as a Reader")
                router.refresh()
            }
        } catch (error) {
            console.error("Failed to change user role", error);
        }
    };
    const handleLibrarianRoleChange = async (id, newRole) => {
        try {
            const payload={
                role : "librarian"
            }
            const res = await updateuserAsLibrarian(payload,id)
            if(res){
                toast.success("Updated as a Librarian")
                router.refresh()
            }
        } catch (error) {
            console.error("Failed to change user role", error);
        }
    };

    const headers = [
        "Avatar",
        "Name", 
        "Email",
        "Joined Date",
        "Role",
        "Actions",
    ];

    return (
        <Table aria-label="All Users Table">
            <Table.ScrollContainer>
                <Table.Content className="min-w-[900px]">
                    
                    {/* TABLE HEAD */}
                    <Table.Header>
                        {headers.map((h) => (
                            <Table.Column isRowHeader key={h} className="text-center">
                                {h}
                            </Table.Column>
                        ))}
                    </Table.Header>

                    {/* TABLE BODY */}
                    <Table.Body emptyContent={"No users found"}>
                        {allUsers?.map((user) => {
                            const isAdmin = user.role === "admin";
                            const isLibrarian = user.role === "librarian";

                            return (
                                <Table.Row key={user._id} id={user._id}>

                                    {/* Avatar */}
                                    <Table.Cell>
                                        <div className="relative w-10 h-10 shrink-0 rounded-full overflow-hidden border border-zinc-700">
                                            <Image
                                                src={user.image || "/avatar-placeholder.png"}
                                                alt={user.name}
                                                fill
                                                className="object-cover"
                                            />
                                        </div>
                                    </Table.Cell>

                                    {/* Name */}
                                    <Table.Cell>
                                        <div className="font-medium text-zinc-200">
                                            {user.name}
                                        </div>
                                    </Table.Cell>

                                    {/* Email */}
                                    <Table.Cell>
                                        <span className="text-zinc-400">{user.email}</span>
                                    </Table.Cell>

                                    {/* Joined Date */}
                                    <Table.Cell>
                                        <span className="text-xs text-zinc-400">
                                            {new Date(user.createdAt).toLocaleDateString("en-GB", {
                                                day: "2-digit",
                                                month: "short",
                                                year: "numeric",
                                            })}
                                        </span>
                                    </Table.Cell>

                                    {/* Role Badge */}
                                    <Table.Cell>
                                        <span className={`px-2.5 py-0.5 rounded-full text-xs border capitalize font-medium ${
                                            isAdmin
                                                ? "bg-red-500/10 text-red-400 border-red-500/20"
                                                : isLibrarian
                                                ? "bg-blue-500/10 text-blue-400 border-blue-500/20"
                                                : "bg-zinc-500/10 text-zinc-400 border-zinc-500/20"
                                        }`}>
                                            {user.role}
                                        </span>
                                    </Table.Cell>

                                    {/* Actions */}
                                    <Table.Cell>
                                        <div className="flex items-center justify-end gap-2">
                                            {isAdmin ? (
                                                <span className="text-xs bg-red-500/20 text-red-400 border border-red-500/30 px-3 py-1 rounded-md font-semibold tracking-wide">
                                                    Admin 👑
                                                </span>
                                            ) : (
                                                
                                                <div className="flex gap-1.5">
                                                    
                                                    {user.role !== "librarian" && (
                                                        <Button
                                                            size="sm"
                                                            onClick={() => handleLibrarianRoleChange(user._id)}
                                                            className="border border-blue-500/20 bg-blue-500/10 text-blue-400 hover:bg-blue-500 hover:text-white transition font-medium"
                                                        >
                                                            Make Librarian
                                                        </Button>
                                                    )}

                                                    {user.role !== "user" && (
                                                        <Button
                                                            size="sm"
                                                            onClick={() => handleUserRoleChange(user._id)}
                                                            className="border border-zinc-700 bg-zinc-800 text-zinc-300 hover:bg-zinc-700 transition font-medium"
                                                        >
                                                            Make User
                                                        </Button>
                                                    )}
                                                    <AdminAlart userId={user._id}></AdminAlart>
                                                    <UserDeleteAlart userId={user._id}></UserDeleteAlart>
                                                </div>
                                            )}
                                        </div>
                                    </Table.Cell>

                                </Table.Row>
                            );
                        })}
                    </Table.Body>

                </Table.Content>
            </Table.ScrollContainer>
        </Table>
    );
};

export default AllUsersTable;
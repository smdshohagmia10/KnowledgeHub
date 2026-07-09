import { userSession } from '@/lib/core/session';
import { Avatar, Button, Card,  Chip, Separator,  } from '@heroui/react';
import Image from 'next/image';

const ProfilePage = async () => {
    const user = await userSession();

    const initials = user?.name
        ? user.name.split(' ').map((n) => n[0]).join('').toUpperCase().slice(0, 2)
        : '??';

    const joinedDate = user?.createdAt
        ? new Date(user.createdAt).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })
        : 'Unknown';

    return (
        <div className="min-h-screen bg-background px-4 py-12">
            <div className="mx-auto max-w-2xl">

                {/* Cover */}
                <div className="h-40 rounded-t-2xl bg-gradient-to-br from-violet-700 via-purple-600 to-cyan-500 relative overflow-hidden">
                    <div
                        className="absolute inset-0 opacity-10"
                        style={{
                            backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)',
                            backgroundSize: '20px 20px',
                        }}
                    />
                </div>

                {/* Main card */}
                <Card className="rounded-t-none rounded-b-2xl border-t-0 shadow-none">
                    <div className="px-6 pb-8 pt-0">

                        {/* Avatar + Edit button */}
                        <div className="flex items-end justify-between -mt-12 mb-4">
                            {
                                user.image? <Image
                            src={user?.image}
                            alt={user?.name}
                            width={80}
                            height={80}
                            ></Image> : <p>{user.name.slice[0]}</p>
                            }
                            <Button variant="bordered" size="sm" radius="lg" className="mb-1 font-medium">
                                Edit Profile
                            </Button>
                        </div>

                        {/* Name + role */}
                        <div className="mb-3">
                            <div className="flex items-center gap-2 flex-wrap">
                                <h1 className="text-2xl font-bold tracking-tight">
                                    {user?.name ?? 'Anonymous'}
                                </h1>
                                <Chip size="sm" variant="flat" color="secondary" className="capitalize font-semibold">
                                    {user?.role ?? 'user'}
                                </Chip>
                            </div>
                            <p className="text-default-400 text-sm mt-0.5">{user?.email}</p>
                        </div>

                        {/* Meta chips */}
                        <div className="flex flex-wrap gap-2 mb-6">
                            <Chip
                                size="sm"
                                variant="flat"
                                color={user?.emailVerified ? 'success' : 'warning'}
                            >
                                {user?.emailVerified ? '✓ Email Verified' : '⚠ Email Not Verified'}
                            </Chip>
                            <Chip size="sm" variant="flat">
                                Joined {joinedDate}
                            </Chip>
                        </div>

                        <Separator className="mb-6" />

                        {/* Account details */}
                        <p className="text-xs font-semibold uppercase tracking-widest text-default-400 mb-3">
                            Account Details
                        </p>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                            {[
                                { label: 'Name',   value: user?.name  ?? '—' },
                                { label: 'Email',  value: user?.email ?? '—' },
                                { label: 'Role',   value: user?.role  ?? '—' },
                                { label: 'User ID', value: user?.id  ?? '—' },
                            ].map(({ label, value }) => (
                                <div
                                    key={label}
                                    className="bg-default-50 dark:bg-default-100 rounded-xl px-4 py-3 border border-divider"
                                >
                                    <p className="text-xs uppercase tracking-wider text-default-400 mb-1">
                                        {label}
                                    </p>
                                    <p className="text-sm font-medium truncate">{value}</p>
                                </div>
                            ))}
                        </div>

                    </div>
                </Card>

            </div>
        </div>
    );
};

export default ProfilePage;
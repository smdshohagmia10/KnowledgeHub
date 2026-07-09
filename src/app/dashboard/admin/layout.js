export const dynamic = "force-dynamic";

import { requerRole } from "@/lib/core/session";

const AdminLayout = async ({ children }) => {
    await requerRole("admin");
    return children;
};

export default AdminLayout;
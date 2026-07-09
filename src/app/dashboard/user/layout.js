export const dynamic = "force-dynamic";

import { requerRole } from "@/lib/core/session";

const ReaderLayout = async ({ children }) => {
    await requerRole("user");
    return children;
};

export default ReaderLayout;
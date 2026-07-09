export const dynamic = "force-dynamic";

import { requerRole } from "@/lib/core/session";

const LibrarianLayout = async ({ children }) => {
    await requerRole("librarian");
    return children;
};

export default LibrarianLayout;
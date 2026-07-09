import { auth } from "@/lib/auth";

export async function PATCH(req) {
  const session = await auth.api.getSession({ headers: req.headers });
  if (!session?.user) return Response.json({ error: "Unauthorized" }, { status: 401 });

  const { role } = await req.json();
  const allowedRoles = ["user", "librarian"];
  if (!allowedRoles.includes(role)) return Response.json({ error: "Invalid role" }, { status: 400 });

  await auth.api.updateUser({
    headers: req.headers,
    body: { role },
  });

  return Response.json({ success: true });
}
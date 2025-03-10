import { Role } from "@prisma/client";

export type AuthAccess = "pelanggan" | "petugas" | "private";
export interface AuthToken {
  id: string;
  username: string;
  role: Role;
}

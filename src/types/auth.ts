import { Role } from "@prisma/client";

export type AuthRole = "pelanggan" | "petugas" | "private";
export interface AuthToken {
  id: string;
  username: string;
  role: Role;
}

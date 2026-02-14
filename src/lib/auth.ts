"use client";

type User = {
  fname: string;
  lname: string;
  email: string;
  passwordHash: string;
};

const USERS_KEY = "vs_users";
const SESSION_KEY = "vs_session";

async function hashPassword(password: string) {
  try {
    if (typeof window !== "undefined" && window.crypto && window.crypto.subtle) {
      const enc = new TextEncoder();
      const data = enc.encode(password);
      const hashBuffer = await window.crypto.subtle.digest("SHA-256", data);
      const hashArray = Array.from(new Uint8Array(hashBuffer));
      const hashHex = hashArray.map((b) => b.toString(16).padStart(2, "0")).join("");
      return hashHex;
    }
  } catch (e) {
    // fall through to fallback
  }
  // fallback (not cryptographically secure) for environments without SubtleCrypto
  return btoa(password);
}

function readUsers(): User[] {
  try {
    const raw = localStorage.getItem(USERS_KEY);
    if (!raw) return [];
    return JSON.parse(raw) as User[];
  } catch (e) {
    return [];
  }
}

function writeUsers(users: User[]) {
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
}

export async function registerUser({ fname, lname, email, password }:{fname:string; lname:string; email:string; password:string}) {
  const users = readUsers();
  const exists = users.find((u) => u.email.toLowerCase() === email.toLowerCase());
  if (exists) {
    return { success: false, message: "User with this email already exists" };
  }
  const passwordHash = await hashPassword(password);
  users.push({ fname, lname, email, passwordHash });
  writeUsers(users);
  return { success: true };
}

export async function loginUser({ email, password }:{email:string; password:string}) {
  const users = readUsers();
  const user = users.find((u) => u.email.toLowerCase() === email.toLowerCase());
  if (!user) return { success: false, message: "User not found" };
  const passwordHash = await hashPassword(password);
  if (passwordHash !== user.passwordHash) return { success: false, message: "Invalid credentials" };
  const session = { email: user.email, fname: user.fname, loggedAt: Date.now() };
  localStorage.setItem(SESSION_KEY, JSON.stringify(session));
  return { success: true, user: session };
}

export function logout() {
  localStorage.removeItem(SESSION_KEY);
}

export function getCurrentUser() {
  try {
    const raw = localStorage.getItem(SESSION_KEY);
    if (!raw) return null;
    return JSON.parse(raw);
  } catch (e) {
    return null;
  }
}

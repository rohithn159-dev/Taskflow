export interface AuthUser {
  name: string;
  email: string;
  role: "admin" | "project-manager" | "team-member";
  loggedIn: boolean;
}

export interface Account extends AuthUser {
  password: string;
}

let account: Account | null = null;
let currentUser: AuthUser | null = null;

export function registerAccount(newAccount: Account) {
  account = newAccount;
  currentUser = newAccount;
}

export function loginAccount(email: string, password: string) {
  if (!account || account.email !== email || account.password !== password) return null;
  currentUser = { ...account, loggedIn: true };
  return currentUser;
}

export function getCurrentUser() {
  return currentUser;
}

export function logoutAccount() {
  currentUser = null;
}

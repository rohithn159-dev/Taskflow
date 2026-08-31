"use client";

import { FormEvent, useState } from "react";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import Input from "@/components/ui/Input";

export default function TeamPage() {
  const [email, setEmail] = useState("");
  const [members, setMembers] = useState<string[]>([]);
  const [error, setError] = useState("");
  const invite = (event: FormEvent<HTMLFormElement>) => { event.preventDefault(); if (!/^\S+@\S+\.\S+$/.test(email.trim())) { setError("Enter a valid team member email."); return; } setMembers([...members, email.trim().toLowerCase()]); setEmail(""); setError(""); };
  return <main className="max-w-2xl space-y-6"><div><h1 className="text-3xl font-bold text-gray-900">Team</h1><p className="mt-2 text-gray-500">Invite people to collaborate on your projects.</p></div><Card><form onSubmit={invite} className="flex flex-col gap-3 sm:flex-row sm:items-end"><Input id="member-email" label="Member email" type="email" value={email} onChange={(event) => setEmail(event.target.value)} placeholder="name@example.com" /><Button type="submit">Invite Member</Button></form>{error && <p role="alert" className="mt-3 text-sm text-red-600">{error}</p>}</Card><Card><h2 className="font-semibold text-gray-900">Invited members</h2>{members.length === 0 ? <p className="mt-3 text-sm text-gray-500">No team members invited yet.</p> : <ul className="mt-3 space-y-2">{members.map((member) => <li key={member} className="rounded-lg bg-gray-50 px-3 py-2 text-sm text-gray-700">{member}</li>)}</ul>}</Card></main>;
}
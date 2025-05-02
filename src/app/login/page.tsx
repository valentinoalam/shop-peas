import { LoginForm } from "@/components/auth/login-form"
import { getServerSession } from "next-auth/next"
import { authOptions } from "@/lib/auth"
import { redirect } from "next/navigation"

export default async function LoginPage({
  searchParams,
}: {
  searchParams: { registered?: string }
}) {
  // Check if user is already logged in
  const session = await getServerSession(authOptions)
  if (session) {
    redirect("/")
  }

  const registered = searchParams.registered === "true"

  return (
    <div className="container mx-auto py-10">
      <div className="flex flex-col items-center justify-center min-h-[60vh]">
        {registered && (
          <div className="mb-4 p-4 bg-green-100 text-green-800 rounded-md">
            Registration successful! Please log in with your new account.
          </div>
        )}
        <LoginForm />
      </div>
    </div>
  )
}

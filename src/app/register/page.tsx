import { RegisterForm } from "@/components/auth/register-form"
import { getServerSession } from "next-auth/next"
import { authOptions } from "@/lib/auth"
import { redirect } from "next/navigation"

export default async function RegisterPage() {
  // Check if user is already logged in
  const session = await getServerSession(authOptions)
  if (session) {
    redirect("/")
  }

  return (
    <div className="container mx-auto py-10">
      <div className="flex flex-col items-center justify-center min-h-[60vh]">
        <RegisterForm />
      </div>
    </div>
  )
}

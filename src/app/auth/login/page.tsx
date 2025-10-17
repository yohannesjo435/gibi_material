"use client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuthRedirect } from "@/hooks/useAuthRedirect";
import { formatPhone, phoneToEmail } from "@/lib/phone";
import { supabase } from "@/lib/supabaseClient";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

function Loginpage() {
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { loading: authLoading } = useAuthRedirect();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);

    const formatedPhone = formatPhone(phone);

    if (!formatedPhone) {
      toast.error("Enter a valid Ethiopian phone number");
      setLoading(false);
      return;
    }

    const email = phoneToEmail(formatedPhone);
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    setLoading(false);
    if (error) {
      toast.error(error.message);
    } else {
      router.push("/dashboard");
    }
  }
  return (
    <div className="grid h-[80vh] w-[90%] max-w-[600px] m-auto md:mt-4">
      <div className="my-10">
        <h1 className="text-5xl h-max text-center mb-3">Welcome Back</h1>
        <h4 className=" text-gray-500 text-[13px] text-center">
          login and manage the Courses
        </h4>
      </div>

      <div className="w-[80%] mx-auto">
        <Card>
          <CardHeader>
            <CardTitle>Login to your Account</CardTitle>
            <CardDescription>
              Enter your phone number to login to your account
            </CardDescription>
            <CardAction>
              <Button variant={"link"}>Login</Button>
            </CardAction>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit}>
              <div className="flex flex-col gap-6">
                <div className="grid gap-2">
                  <Label htmlFor="phoneNumber">phoneNumber</Label>
                  <Input
                    id="phoneNumber"
                    type="text"
                    placeholder="0911121314"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    required
                  />
                </div>
                <div className="grid gap-2">
                  <div className="flex items-center">
                    <Label htmlFor="password">Password</Label>
                    <Link
                      href="#"
                      className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
                    >
                      Forgot your password?
                    </Link>
                  </div>
                  <Input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>
              </div>
              <div className="mt-5">
                <Button type="submit" className="w-full" disabled={loading}>
                  Login
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export default Loginpage;

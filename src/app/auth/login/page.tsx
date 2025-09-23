import { Button } from "@/components/ui/button";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";

function page() {
  return (
    <div className="grid h-[80vh] w-[90%] max-w-[600px] m-auto md:mt-10">
      <h1 className="text-4xl -mb-5 text-center">Welcome Back</h1>
      <h4 className=" text-gray-500 text-[13px] text-center">
        login and manage the Courses
      </h4>
      <div className="w-[80%] m-auto">
        <Card>
          <CardHeader>
            <CardTitle>Login to your Account</CardTitle>
            <CardDescription>
              Enter your email to login to your account
            </CardDescription>
            <CardAction>
              <Button variant={"link"}>Login</Button>
            </CardAction>
          </CardHeader>
          <CardContent>
            <form>
              <div className="flex flex-col gap-6">
                <div className="grid gap-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="m@example.com"
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
                  <Input id="password" type="password" required />
                </div>
              </div>
            </form>
          </CardContent>
          <CardFooter className="flex-col gap-2">
            <Button type="submit" className="w-full">
              Login
            </Button>
            <Button variant="outline" className="w-full">
              Login with Google
            </Button>
          </CardFooter>{" "}
        </Card>
      </div>
    </div>
  );
}

export default page;

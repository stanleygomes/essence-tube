import React, { useRef } from "react";
import { Button } from "@repo/ui/button";
import { Input } from "@repo/ui/input";
import { Label } from "@repo/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@repo/ui/card";

interface EmailFormProps {
  email: string;
  setEmail: (email: string) => void;
  handleProceed: () => void;
}

export default function EmailForm({
  email,
  setEmail,
  handleProceed,
}: EmailFormProps) {
  const emailRef = useRef<HTMLInputElement>(null);

  React.useEffect(() => {
    if (emailRef.current) {
      emailRef.current.focus();
    }
  }, []);

  return (
    <Card className="w-full max-w-sm p-10">
      <CardHeader>
        <CardTitle>
          <strong>Login to your account</strong>
        </CardTitle>
        <CardDescription>
          Enter your email to access your account. You will receive an access
          code via email.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form>
          <div className="flex flex-col gap-6">
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                ref={emailRef}
                type="email"
                value={email}
                onChange={(e: any) => setEmail(e.target.value)}
                placeholder="Enter your email here"
                className="w-full"
                required
              />
            </div>
          </div>
        </form>
      </CardContent>
      <CardFooter className="flex-col gap-2">
        <Button
          variant="default"
          onClick={handleProceed}
          disabled={!email}
          className="w-full"
        >
          Proceed
        </Button>
      </CardFooter>
    </Card>
  );
}

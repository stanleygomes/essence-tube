import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Icon } from "@iconify/react";
import { Button } from "@logos/ui/button";
import { Input } from "@logos/ui/input";
import { Label } from "@logos/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@logos/ui/card";

const emailSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
});

type EmailFormData = z.infer<typeof emailSchema>;

interface EmailFormProps {
  onSubmit: (data: EmailFormData) => void;
}

export default function EmailForm({ onSubmit }: EmailFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    setFocus,
  } = useForm<EmailFormData>({
    mode: "onChange",
    defaultValues: { email: "" },
  });

  React.useEffect(() => {
    setFocus("email");
  }, [setFocus]);

  const validateEmail = (value: string) => {
    try {
      emailSchema.parse({ email: value });
      return true;
    } catch {
      return "Please enter a valid email address";
    }
  };

  return (
    <Card className="w-full max-w-lg p-12">
      <CardHeader>
        <CardTitle className="text-3xl font-bold text-left">
          <Icon icon="lucide:clipboard-pen" className="w-12 h-12 my-2" />
          <div>your account</div>
        </CardTitle>
        <CardDescription className="mt-2">
          Enter your email to access your account. You will receive an access
          code via email.
        </CardDescription>
      </CardHeader>
      <CardContent className="mt-4">
        <form id="email-form" onSubmit={handleSubmit(onSubmit)}>
          <div className="flex flex-col gap-6">
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                {...register("email", { validate: validateEmail })}
                placeholder="Enter your email here"
                className="w-full"
                required
              />
              {errors.email && (
                <p className="text-sm text-red-500">{errors.email.message}</p>
              )}
            </div>
          </div>
        </form>
      </CardContent>
      <CardFooter className="flex-col gap-2">
        <Button
          type="submit"
          form="email-form"
          variant="default"
          disabled={!isValid}
          className="w-full"
          onClick={handleSubmit(onSubmit)}
        >
          Proceed
        </Button>
      </CardFooter>
    </Card>
  );
}

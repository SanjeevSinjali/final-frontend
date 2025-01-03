"use client";
import { toast } from "react-toastify";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardTitle } from "./ui/card";
import { api } from "@/lib/api-client";

const formSchema = z.object({
  first_name: z.string().min(2, {
    message: "First name must be at least 2 characters.",
  }),
  last_name: z.string().min(2, {
    message: "Last name must be at least 2 characters.",
  }),
  email: z.string().email().min(5),
  address: z.string().min(5, {
    message: "Address must be at least 5 characters.",
  }),
  pincode: z.string().regex(/^\d{6}$/, {
    message: "PIN code must be a 6-digit number",
  }),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters long." })
    .max(64, { message: "Password must not exceed 64 characters." })
    .regex(/[A-Z]/, {
      message: "Password must contain at least one uppercase letter.",
    })
    .regex(/[a-z]/, {
      message: "Password must contain at least one lowercase letter.",
    })
    .regex(/[0-9]/, { message: "Password must contain at least one number." })
    .regex(/[@$!%*?&#]/, {
      message: "Password must contain at least one special character.",
    }),
  profile_image: z
    .instanceof(File)
    .optional()
    .refine((file) => file?.size <= 5 * 1024 * 1024, {
      message: "Profile image must be smaller than 5MB.",
    })
    .refine((file) => file?.type.startsWith("image/"), {
      message: "Profile image must be an image file.",
    }),
});

export function ProfileSettingsForm() {
  const user = JSON.parse(localStorage.getItem("user"));
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      first_name: user.first_name,
      last_name: user.last_name,
      email: user.email,
      address: user.address,
      pincode: user.pincode,
      password: "",
    },
  });

  // async function onSubmit(values) {
  //   const { id } = JSON.parse(localStorage.getItem("user"));
  //   console.log(id);
  //   console.log(values);
  //   const { access } = JSON.parse(localStorage.getItem("authTokens"));
  //   try {
  //     const response = await api.patch(`/users/${id}/`, values, {
  //       headers: {
  //         Authorization: `Bearer ${access}`,
  //       },
  //     });
  //     toast.success("Profile successfully updated");
  //   } catch (error) {
  //     console.log(error);
  //     toast.error("Error updating profile!!");
  //   }
  // }

  async function onSubmit(values) {
    const { id } = JSON.parse(localStorage.getItem("user"));
    const { access } = JSON.parse(localStorage.getItem("authTokens"));

    try {
      const formData = new FormData();
      Object.keys(values).forEach((key) => {
        if (key === "profile_image" && values[key]) {
          formData.append(key, values[key]);
        } else {
          formData.append(key, values[key]);
        }
      });

      const response = await api.patch(`/users/${id}/`, formData, {
        headers: {
          Authorization: `Bearer ${access}`,
          "Content-Type": "multipart/form-data",
        },
      });

      toast.success("Profile successfully updated");
    } catch (error) {
      console.error(error);
      toast.error("Error updating profile!");
    }
  }

  return (
    <Card className="p-4">
      <CardTitle className="p-6 text-2xl font-bold">Profile Settings</CardTitle>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="first_name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>First Name</FormLabel>
                  <FormControl>
                    <Input placeholder="First Name" {...field} />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="last_name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Last Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Last Name" {...field} />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="Email" type="email" {...field} />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="address"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Address</FormLabel>
                  <FormControl>
                    <Input placeholder="Address" {...field} />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="pincode"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Pin Code</FormLabel>
                  <FormControl>
                    <Input placeholder="Pin Code" {...field} />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input placeholder="Password" type="password" {...field} />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />

            {/* <FormField
              control={form.control}
              name="profile_image"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Logo/Profile Picture</FormLabel>
                  <FormControl>
                    <Input id="picture" type="file" {...field} />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            /> */}
            <FormField
              control={form.control}
              name="profile_image"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Profile Picture</FormLabel>
                  <FormControl>
                    <input
                      id="profile_image"
                      type="file"
                      accept="image/*"
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) {
                          form.setValue("profile_image", file);
                        }
                      }}
                    />
                  </FormControl>
                  {form.watch("profile_image") && (
                    <div className="mt-2">
                      <img
                        src={URL.createObjectURL(form.watch("profile_image"))}
                        alt="Profile Preview"
                        className="h-20 w-20 object-cover rounded-full"
                      />
                    </div>
                  )}
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type="submit">Submit</Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}

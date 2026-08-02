"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Button,
  DatePicker,
  FieldError,
  Form,
  Input,
  Label,
  TextField,
  TextArea,
} from "@heroui/react";
import { Calendar, Check } from "@gravity-ui/icons";
import toast from "react-hot-toast";

export default function AdoptionForm({ pet, user }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [pickupDate, setPickupDate] = useState(null);

  const onSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries());



    if (!pickupDate) {
      toast.error("Please select a pickup date");
      return;
    }

    // setLoading(true);

    // try {
    //   const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/requests`, {
    //     method: "POST",
    //     headers: { "Content-Type": "application/json" },
    //     body: JSON.stringify({
    //       petId: pet._id,
    //       pickupDate: pickupDate.toISOString().split("T")[0],
    //       message: data.message || "",
    //     }),
    //     credentials: "include",
    //   });

    //   if (!res.ok) {
    //     const error = await res.json();
    //     throw new Error(error.message || "Request failed");
    //   }

    //   toast.success("Adoption request submitted!");
    //   router.push("/my-requests");
    // } catch (error) {
    //   toast.error(error.message || "Something went wrong");
    // } finally {
    //   setLoading(false);
    // }
  };

  // যদি পেট ইতিমধ্যে অ্যাডপ্টেড হয়
  if (pet?.adopted) {
    return (
      <div className="bg-transparent rounded-2xl p-6 border border-muted/20 dark:border-muted/10 text-center">
        <p className="font-body text-muted">This pet is already adopted 🏡</p>
      </div>
    );
  }

  return (
   <div className="bg-transparent rounded-2xl p-6 border border-muted/20 dark:border-muted/10 shadow-md">
      <h2 className="font-heading text-xl font-bold text-foreground mb-6">
        Adopt {pet?.name}
      </h2>

      <Form className="flex flex-col gap-5" onSubmit={onSubmit}>
        {/* Pet Name (Read Only) */}
        <TextField
          isReadOnly
          isRequired
          name="petName"
          defaultValue={pet?.name || ""}
          validate={(value) => {
            if (value?.length < 2) return "Pet name is required";
            return null;
          }}
        >
          <Label className="font-body text-sm font-medium text-foreground">Pet Name</Label>
          <Input
            className="w-full bg-gray-100 dark:bg-gray-800 cursor-not-allowed rounded-xl px-4 py-2.5 text-black dark:text-white"
          />
          <FieldError className="font-body text-xs text-danger mt-1" />
        </TextField>

        {/* User Name (Read Only) */}
        <TextField
          isReadOnly
          isRequired
          name="userName"
          defaultValue={user?.name || "Please login"}
        >
          <Label className="font-body text-sm font-medium text-foreground">Your Name</Label>
          <Input
            className="w-full bg-gray-100 dark:bg-gray-800 cursor-not-allowed rounded-xl px-4 py-2.5 text-black dark:text-white"
          />
        </TextField>

        {/* User Email (Read Only) */}
        <TextField
          isReadOnly
          isRequired
          name="userEmail"
          defaultValue={user?.email || "Please login"}
          type="email"
        >
          <Label className="font-body text-sm font-medium text-foreground">Your Email</Label>
          <Input
            className="w-full bg-gray-100 dark:bg-gray-800 cursor-not-allowed rounded-xl px-4 py-2.5 text-black dark:text-white"
          />
        </TextField>

        {/* Pickup Date — এখনও একই স্টাইল */}
        <div>
          <Label className="font-body text-sm font-medium text-foreground block mb-1">
            Pickup Date
          </Label>
          <input
            type="date"
            name="pickupDate"
            value={pickupDate}
            onChange={(e) => setPickupDate(e.target.value)}
            required
            min={new Date().toISOString().split("T")[0]}
            className="w-full bg-gray-100 dark:bg-gray-800 border border-muted/30 dark:border-muted/20 rounded-xl px-4 py-2.5 text-black dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:border-primary focus:outline-none transition"
          />
          {!pickupDate && (
            <p className="font-body text-xs text-danger mt-1">Please select a date</p>
          )}
        </div>

        {/* Message (optional) */}
        <TextField name="message">
          <Label className="font-body text-sm font-medium text-foreground">
            Message <span className="text-muted font-normal">(optional)</span>
          </Label>
          <TextArea
            placeholder="Write a short message to the pet owner..."
            rows={3}
            className="resize-none"
            classNames={{
              input: "bg-gray-100 dark:bg-gray-800 border border-muted/30 dark:border-muted/20 rounded-xl px-4 py-2.5 text-black dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:border-primary resize-none",
            }}
          />
        </TextField>

        {/* Submit Button */}
        <Button
          type="submit"
          disabled={loading || !user}
          className="w-full bg-primary hover:bg-primary-dark text-white font-heading font-semibold py-2.5 rounded-xl transition disabled:opacity-50"
        >
          {loading ? "Submitting..." : "Adopt Now"}
          {!loading && <Check className="ml-2 size-4" />}
        </Button>

        {!user && (
          <p className="text-center font-body text-xs text-muted">
            Please <a href="/login" className="text-primary hover:underline">login</a> to adopt
          </p>
        )}
      </Form>
    </div>
  );
}
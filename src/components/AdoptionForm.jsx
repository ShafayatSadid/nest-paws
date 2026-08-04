"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Button,
  Form,
  Input,
  Label,
  TextField,
} from "@heroui/react";
import toast from "react-hot-toast";
import { authClient } from "@/lib/auth-client";

export default function AdoptionForm({ pet, user }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const onSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const newRequest = Object.fromEntries(formData.entries());
    setLoading(true);

    newRequest.petId = pet._id;
    

    const { data, error } = await authClient.token();
    const token = data?.token;

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/requests`, {
        method: 'POST',
        headers: {
          'content-type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(newRequest),
      });

      
      const result = await res.json();
      console.log(result);

      
      if (result.insertedId) {
        toast.success("Adoption request submitted successfully!");
        router.push("/dashboard/my-requests");
      } else {
        toast.error(result.message);
      }

    } catch (err) {
      console.log('error:', err);
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-transparent rounded-2xl p-6 border border-muted/20 dark:border-muted/10 shadow-md">
      <h2 className="font-heading text-xl font-bold text-foreground mb-6">
        Adopt {pet?.name}
      </h2>

      {/* HeroUI Form – অপরিবর্তিত */}
      <Form className="flex flex-col gap-5" onSubmit={onSubmit}>
        <TextField
          isReadOnly
          isRequired
          name="petName"
          defaultValue={pet?.name || ""}
        >
          <Label className="font-body text-sm font-medium text-foreground">Pet Name</Label>
          <Input className="w-full bg-gray-100 dark:bg-gray-800 cursor-not-allowed rounded-xl px-4 py-2.5 text-black dark:text-white" />
        </TextField>

        <TextField
          isReadOnly
          isRequired
          name="userName"
          defaultValue={user?.name || "Please login"}
        >
          <Label className="font-body text-sm font-medium text-foreground">Your Name</Label>
          <Input className="w-full bg-gray-100 dark:bg-gray-800 cursor-not-allowed rounded-xl px-4 py-2.5 text-black dark:text-white" />
        </TextField>

        <TextField
          isReadOnly
          isRequired
          name="userEmail"
          defaultValue={user?.email || "Please login"}
          type="email"
        >
          <Label className="font-body text-sm font-medium text-foreground">Your Email</Label>
          <Input className="w-full bg-gray-100 dark:bg-gray-800 cursor-not-allowed rounded-xl px-4 py-2.5 text-black dark:text-white" />
        </TextField>

        {/* Pickup Date */}
        <div>
          <Label className="font-body text-sm font-medium text-foreground block mb-1">
            Pickup Date
          </Label>
          <input
            type="date"
            name="pickupDate"
            required
            min={new Date().toISOString().split("T")[0]}
            className="w-full bg-gray-100 dark:bg-gray-800 border border-muted/30 dark:border-muted/20 rounded-xl px-4 py-2.5 text-black dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:border-primary focus:outline-none transition"
          />
        </div>

        {/* Message – ডিজাইন ঠিক করা হয়েছে */}
        <div>
          <Label className="font-body text-sm font-medium text-foreground">
            Message <span className="text-muted font-normal">(optional)</span>
          </Label>
          <textarea
            name="message"
            placeholder="Write a short message to the pet owner..."
            rows={3}
            className="w-full bg-gray-100 dark:bg-gray-800 border border-muted/30 dark:border-muted/20 rounded-xl px-4 py-2.5 text-black dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:border-primary resize-none focus:outline-none transition"
          />
        </div>

        {/* Submit Button – AddPetPage-এর মতো স্টাইল */}
        <Button
          type="submit"
          disabled={loading}
          className="w-full bg-primary hover:bg-primary-dark text-white font-heading font-semibold px-8 py-2.5 rounded-xl transition duration-200 shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? "Submitting..." : "Adopt Now"}
        </Button>
      </Form>
    </div>
  );
}
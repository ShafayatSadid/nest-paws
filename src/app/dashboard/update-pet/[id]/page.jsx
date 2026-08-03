"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import {
    Button,
    Form,
    Input,
    Label,
    FieldError,
    TextField,
    TextArea,
    Spinner,
} from "@heroui/react";
import { authClient } from "@/lib/auth-client";
import toast from "react-hot-toast";

const UpdatePet = () => {
    const router = useRouter();
    const { data: session } = authClient.useSession();
    const user = session?.user;
    const [loading, setLoading] = useState(false);
    const { id } = useParams();
    const [pet, setPet] = useState(null);

    useEffect(() => {
        const fetchPet = async () => {
            const { data, error } = await authClient.token();
            const token = data?.token;
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/pets/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            const result = await res.json();
            setPet(result);
        };

        if (id) {
            fetchPet();
        }
    }, [id]);

    const onSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const formData = new FormData(e.currentTarget);
            const updatedPet = Object.fromEntries(formData.entries());

            const { data, error } = await authClient.token();
            const token = data?.token;

            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/pets/${id}`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify(updatedPet),
            });

            if (!res.ok) {
                throw new Error("Failed to update pet");
            }

            const result = await res.json();

            if (result.modifiedCount > 0) {
                toast.success("Pet updated successfully!");
                router.push("/dashboard/my-listings");
            } else {
                toast("No changes were made.");
            }
        } catch (err) {
            console.error(err);
            toast.error(err.message);
        } finally {
            setLoading(false);
        }
    };

    if (!pet) {
        return (
            <div className="h-screen flex justify-center items-center">
                <Spinner className="text-muted" size="md" />
            </div>
        );
    }

    return (
        <div className="max-w-4xl mx-auto">
            <div className="mb-6">
                {/* ✅ হেডিং ঠিক করা হয়েছে */}
                <h1 className="text-2xl md:text-3xl font-bold text-foreground">
                    Update Your Pet Information
                </h1>
                {/* ✅ প্যারাগ্রাফ ঠিক করা হয়েছে */}
                <p className="text-sm text-muted mt-1">
                    Update the details of your listed pet.
                </p>
            </div>

            <div className="border border-muted/20 dark:border-muted/10 rounded-2xl p-6 md:p-8 bg-background">
                <Form className="space-y-5" onSubmit={onSubmit}>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <TextField defaultValue={pet?.name} isRequired name="name">
                            <Label className="text-foreground">Pet Name</Label>
                            <Input
                                className="bg-transparent border border-muted/30 dark:border-muted/20 text-foreground dark:text-white placeholder-muted focus:border-primary transition"
                                placeholder="e.g. Max"
                            />
                            <FieldError />
                        </TextField>

                        <div>
                            <Label className="text-foreground">Species</Label>
                            <select
                                name="species"
                                defaultValue={pet?.species}
                                required
                                className="w-full bg-transparent border border-muted/30 dark:border-muted/20 rounded-xl px-4 py-2.5 text-foreground dark:text-white focus:border-primary focus:outline-none transition"
                            >
                                <option value="">Select species</option>
                                <option value="Dog">Dog</option>
                                <option value="Cat">Cat</option>
                                <option value="Bird">Bird</option>
                                <option value="Rabbit">Rabbit</option>
                                <option value="Other">Other</option>
                            </select>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <TextField defaultValue={pet?.breed} isRequired name="breed">
                            <Label className="text-foreground">Breed</Label>
                            <Input
                                className="bg-transparent border border-muted/30 dark:border-muted/20 text-foreground dark:text-white placeholder-muted focus:border-primary transition"
                                placeholder="e.g. Golden Retriever"
                            />
                            <FieldError />
                        </TextField>

                        <TextField defaultValue={pet?.age} isRequired name="age" type="number">
                            <Label className="text-foreground">Age (years)</Label>
                            <Input
                                className="bg-transparent border border-muted/30 dark:border-muted/20 text-foreground dark:text-white placeholder-muted focus:border-primary transition"
                                placeholder="e.g. 2"
                            />
                            <FieldError />
                        </TextField>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <Label className="text-foreground">Gender</Label>
                            <select
                                name="gender"
                                defaultValue={pet?.gender}
                                required
                                className="w-full bg-transparent border border-muted/30 dark:border-muted/20 rounded-xl px-4 py-2.5 text-foreground dark:text-white focus:border-primary focus:outline-none transition"
                            >
                                <option value="">Select gender</option>
                                <option value="Male">Male</option>
                                <option value="Female">Female</option>
                            </select>
                        </div>

                        <TextField defaultValue={pet?.image} isRequired name="image">
                            <Label className="text-foreground">Image URL</Label>
                            <Input
                                className="bg-transparent border border-muted/30 dark:border-muted/20 text-foreground dark:text-white placeholder-muted focus:border-primary transition"
                                placeholder="https://imgbb.com/your-image.jpg"
                            />
                            <FieldError />
                        </TextField>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <TextField defaultValue={pet?.healthStatus} isRequired name="healthStatus">
                            <Label className="text-foreground">Health Status</Label>
                            <Input
                                className="bg-transparent border border-muted/30 dark:border-muted/20 text-foreground dark:text-white placeholder-muted focus:border-primary transition"
                                placeholder="e.g. Healthy, Recovering"
                            />
                            <FieldError />
                        </TextField>

                        <TextField defaultValue={pet?.vaccinationStatus} isRequired name="vaccinationStatus">
                            <Label className="text-foreground">Vaccination Status</Label>
                            <Input
                                className="bg-transparent border border-muted/30 dark:border-muted/20 text-foreground dark:text-white placeholder-muted focus:border-primary transition"
                                placeholder="e.g. Fully Vaccinated, Not Required"
                            />
                            <FieldError />
                        </TextField>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <TextField defaultValue={pet?.location} isRequired name="location">
                            <Label className="text-foreground">Location</Label>
                            <Input
                                className="bg-transparent border border-muted/30 dark:border-muted/20 text-foreground dark:text-white placeholder-muted focus:border-primary transition"
                                placeholder="e.g. Dhaka, Gulshan"
                            />
                            <FieldError />
                        </TextField>

                        <TextField defaultValue={pet?.adoptionFee} isRequired name="adoptionFee" type="number">
                            <Label className="text-foreground">Adoption Fee ($)</Label>
                            <Input
                                className="bg-transparent border border-muted/30 dark:border-muted/20 text-foreground dark:text-white placeholder-muted focus:border-primary transition"
                                placeholder="e.g. 1500"
                            />
                            <FieldError />
                        </TextField>
                    </div>

                    <TextField defaultValue={pet?.description} isRequired name="description">
                        <Label className="text-foreground">Description</Label>
                        <TextArea
                            className="bg-transparent border border-muted/30 dark:border-muted/20 text-foreground dark:text-white placeholder-muted focus:border-primary transition resize-none min-h-[100px]"
                            placeholder="Write a brief description about the pet..."
                        />
                        <FieldError />
                    </TextField>

                    <TextField name="ownerEmail" isReadOnly value={pet?.ownerEmail || ""}>
                        <Label className="text-foreground">Owner Email</Label>
                        <Input className="bg-muted/10 dark:bg-muted/10 cursor-not-allowed text-foreground dark:text-white rounded-xl" />
                        <FieldError />
                    </TextField>

                    <Button
                        type="submit"
                        disabled={loading}
                        className="bg-primary hover:bg-primary-dark text-white font-heading font-semibold px-8 py-2.5 rounded-xl transition duration-200 shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed w-full md:w-auto"
                    >
                        {loading ? "Updating..." : "Update"}
                    </Button>
                </Form>
            </div>
        </div>
    );
};

export default UpdatePet;
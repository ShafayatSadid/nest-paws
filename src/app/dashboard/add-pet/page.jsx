"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
    Button,
    Form,
    Input,
    Label,
    FieldError,
    TextField,
    TextArea,
} from "@heroui/react";
import { authClient } from "@/lib/auth-client";
import toast from "react-hot-toast";

export default function AddPetPage() {

    const router = useRouter();
    const { data: session } = authClient.useSession();
    const user = session?.user;
    const [loading, setLoading] = useState(false);

    const onSubmit = async (e) => {

        setLoading(true)
        e.preventDefault();

        const formData = new FormData(e.currentTarget)
        const pet = Object.fromEntries(formData.entries())

        const { data, error } = await authClient.token();
        const token = data?.token;

        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/pets`, {
                method: 'POST',
                headers: {
                    'content-type': 'application/json',
                    authorization: `bearer: ${token}`
                },
                body: JSON.stringify(pet)
            })

            const data = await res.json();
            if (data.insertedId) {
                toast.success('You successfully added a pet!')
                router.push('/all-pets')
            }
        } catch (err) {
            console.log('error:', err);
            toast.error(err);
        }
        finally {
            setLoading(false)
        }
    }

    return (
        <div className="max-w-4xl mx-auto">
            <div className="mb-6">
                <h1 className="text-2xl md:text-3xl font-bold">Add New Pet</h1>
                <p className="text-sm text-muted mt-1">
                    Fill in the details below to list a pet for adoption
                </p>
            </div>

            <div className="border rounded-2xl p-6 md:p-8">
                <Form className="space-y-5" onSubmit={onSubmit}>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {/* Pet Name */}
                        <TextField isRequired name="name">
                            <Label>Pet Name</Label>
                            <Input className={'bg-transparent border border-white text-white'} placeholder="e.g. Max" />
                            <FieldError />
                        </TextField>

                        {/* Species */}
                        <div>
                            <Label>Species <span className="text-danger">*</span></Label>
                            <select
                                name="species"
                                required
                                className="w-full border rounded-xl px-4 py-2.5 bg-transparent focus:outline-none focus:ring-2 focus:ring-primary"
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
                        {/* Breed */}
                        <TextField isRequired name="breed">
                            <Label>Breed</Label>
                            <Input className={'bg-transparent border border-white text-white'} placeholder="e.g. Golden Retriever" />
                            <FieldError />
                        </TextField>

                        {/* Age */}
                        <TextField isRequired name="age" type="number">
                            <Label>Age (years)</Label>
                            <Input className={'bg-transparent border border-white text-white'} placeholder="e.g. 2" />
                            <FieldError />
                        </TextField>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {/* Gender */}
                        <div>
                            <Label>Gender <span className="text-danger">*</span></Label>
                            <select
                                name="gender"
                                required
                                className="w-full border rounded-xl px-4 py-2.5 bg-transparent focus:outline-none focus:ring-2 focus:ring-primary"
                            >
                                <option value="">Select gender</option>
                                <option value="Male">Male</option>
                                <option value="Female">Female</option>
                            </select>
                        </div>

                        {/* Image URL */}
                        <TextField isRequired name="image">
                            <Label>Image URL</Label>
                            <Input className={'bg-transparent border border-white text-white'} placeholder="https://imgbb.com/your-image.jpg" />
                            <FieldError />
                        </TextField>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {/* Health Status */}
                        <TextField isRequired name="healthStatus">
                            <Label>Health Status</Label>
                            <Input className={'bg-transparent border border-white text-white'} placeholder="e.g. Healthy, Recovering" />
                            <FieldError />
                        </TextField>

                        {/* Vaccination Status */}
                        <TextField isRequired name="vaccinationStatus">
                            <Label>Vaccination Status</Label>
                            <Input className={'bg-transparent border border-white text-white'} placeholder="e.g. Fully Vaccinated, Not Required" />
                            <FieldError />
                        </TextField>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {/* Location */}
                        <TextField isRequired name="location">
                            <Label>Location</Label>
                            <Input className={'bg-transparent border border-white text-white'} placeholder="e.g. Dhaka, Gulshan" />
                            <FieldError />
                        </TextField>

                        {/* Adoption Fee */}
                        <TextField isRequired name="adoptionFee" type="number">
                            <Label>Adoption Fee ($)</Label>
                            <Input className={'bg-transparent border border-white text-white'} placeholder="e.g. 1500" />
                            <FieldError />
                        </TextField>
                    </div>

                    {/* Description */}
                    <TextField isRequired name="description">
                        <Label>Description</Label>
                        <TextArea className={'bg-transparent border border-white text-white'} placeholder="Write a brief description about the pet..." />
                        <FieldError />
                    </TextField>

                    {/* Owner Email (Read-only) */}
                    <TextField name="ownerEmail" isReadOnly value={user?.email || ""}>
                        <Label>Owner Email</Label>
                        <Input className={'bg-transparent border border-white text-white '} />
                        <FieldError />
                    </TextField>

                    {/* Submit */}
                    <Button
                        type="submit"
                        disabled={loading}
                        className="bg-primary hover:bg-primary-dark text-white font-heading font-semibold px-8 py-2.5 rounded-xl transition duration-200 shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed w-full md:w-auto"
                    >
                        {loading ? "Adding..." : "Add Pet"}
                    </Button>
                </Form>
            </div>
        </div>
    );
}
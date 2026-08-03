'use client';

import { AlertDialog, Button } from "@heroui/react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

const DeletePet = ({ petId, token, petName }) => {
    const router = useRouter();

    const handleDelete = async () => {
        try {
            const res = await fetch(
                `${process.env.NEXT_PUBLIC_API_URL}/pets/${petId}`,
                {
                    method: "DELETE",
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            const data = await res.json();

            if (data.deletedCount > 0) {
                toast.success("Pet deleted successfully!");
                router.refresh();
            } else {
                toast.error("Failed to delete pet.");
            }
        } catch (err) {
            toast.error("error:", err);
        }
    };

    return (
        <AlertDialog>
            {/* ট্রিগার বাটন – থিম অনুযায়ী */}
            <Button
                className="bg-danger/10 hover:bg-danger/20 text-danger text-sm font-medium py-2 rounded-xl transition w-full"
            >
                Delete
            </Button>

            <AlertDialog.Backdrop>
                <AlertDialog.Container>
                    <AlertDialog.Dialog className="sm:max-w-[400px] bg-background border border-muted/20 dark:border-muted/10 rounded-2xl shadow-xl p-0 overflow-hidden">
                        {/* ক্লোজ বাটন (ডিফল্ট) */}
                        <AlertDialog.CloseTrigger className="absolute top-4 right-4 text-muted hover:text-foreground transition" />

                        <AlertDialog.Header className="px-6 pt-6 pb-3">
                            <div className="flex items-start gap-3">
                                <AlertDialog.Icon status="danger" className="text-danger text-2xl" />
                                <AlertDialog.Heading className="font-heading text-lg font-bold text-foreground">
                                    Delete pet permanently?
                                </AlertDialog.Heading>
                            </div>
                        </AlertDialog.Header>

                        <AlertDialog.Body className="px-6 pb-4">
                            <p className="font-body text-sm text-muted">
                                This will permanently delete <strong className="text-foreground">{petName || "this pet"}</strong> and all its associated data. This action cannot be undone.
                            </p>
                        </AlertDialog.Body>

                        <AlertDialog.Footer className="px-6 pb-6 pt-3 flex justify-end gap-3 border-t border-muted/10 dark:border-muted/5">
                            <Button
                                slot="close"
                                variant="light"
                                className="bg-muted/10 hover:bg-muted/20 text-foreground font-body font-medium px-5 py-2 rounded-xl transition"
                            >
                                Cancel
                            </Button>
                            <Button
                                onClick={handleDelete}
                                slot="close"
                                variant="danger"
                                className="bg-danger hover:bg-danger/80 text-white font-heading font-semibold px-5 py-2 rounded-xl transition shadow-md"
                            >
                                Delete
                            </Button>
                        </AlertDialog.Footer>
                    </AlertDialog.Dialog>
                </AlertDialog.Container>
            </AlertDialog.Backdrop>
        </AlertDialog>
    );
};

export default DeletePet;
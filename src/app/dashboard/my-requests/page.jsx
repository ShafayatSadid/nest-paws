'use client'

import { authClient } from "@/lib/auth-client";
import Link from "next/link";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { AlertDialog, Button } from "@heroui/react";

const MyRequestsPage = () => {
    const [requests, setRequests] = useState([]);
    const [cancelling, setCancelling] = useState(null);

    const fetchRequests = async () => {
        const { data, error } = await authClient.token();
        const token = data?.token;

        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/my-requests`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            const result = await res.json();
            setRequests(result);
        } catch (err) {
            console.log('error:', err);
        }
    };

    useEffect(() => {
        fetchRequests();
    }, []);

    const handleCancel = async (requestId) => {
        setCancelling(requestId);
        try {
            const { data, error } = await authClient.token();
            const token = data?.token;

            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/requests/${requestId}`, {
                method: "DELETE",
                headers: { Authorization: `Bearer ${token}` },
            });

            if (!res.ok) {
                const errMsg = await res.text();
                throw new Error(errMsg || "Failed to cancel request");
            }

            toast.success("Request cancelled!");
            await fetchRequests();
        } catch (error) {
            console.error("Cancel error:", error);
            toast.error(error.message || "Something went wrong");
        } finally {
            setCancelling(null);
        }
    };

    const getStatusBadge = (status) => {
        const map = {
            pending: { label: "Pending", className: "bg-warning/20 text-warning" },
            approved: { label: "Approved", className: "bg-success/20 text-success" },
            rejected: { label: "Rejected", className: "bg-danger/20 text-danger" },
        };
        return map[status] || map.pending;
    };

    return (
        <div className="max-w-6xl mx-auto">
            <div className="mb-6">
                <h1 className="text-2xl md:text-3xl font-bold text-foreground">My Requests</h1>
                <p className="text-sm text-muted mt-1">Track your adoption requests</p>
            </div>

            {requests.length === 0 ? (
                <div className="text-center py-16 border-2 border-dashed border-muted/30 rounded-3xl">
                    <p className="text-muted text-lg">You haven't made any adoption requests yet.</p>
                    <Link href="/all-pets">
                        <button className="mt-5 bg-primary hover:bg-primary-dark text-white font-heading font-semibold px-8 py-2.5 rounded-xl transition">
                            Browse Pets
                        </button>
                    </Link>
                </div>
            ) : (
                <div className="overflow-x-auto bg-background border border-muted/20 dark:border-muted/10 rounded-2xl shadow-sm">
                    <table className="w-full text-sm text-left">
                        <thead className="bg-muted/10 dark:bg-muted/5 border-b border-muted/20 dark:border-muted/10">
                            <tr>
                                <th className="px-6 py-4 font-heading font-semibold text-foreground">Pet Name</th>
                                <th className="px-6 py-4 font-heading font-semibold text-foreground hidden sm:table-cell">Request Date</th>
                                <th className="px-6 py-4 font-heading font-semibold text-foreground hidden md:table-cell">Pickup Date</th>
                                <th className="px-6 py-4 font-heading font-semibold text-foreground">Status</th>
                                <th className="px-6 py-4 font-heading font-semibold text-foreground text-center">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {requests.map((req) => {
                                const pet = req.pet;
                                const status = getStatusBadge(req.status);

                                return (
                                    <tr key={req._id} className="border-b border-muted/10 dark:border-muted/5 hover:bg-muted/5 transition">
                                        <td className="px-6 py-4 font-medium text-foreground">
                                            {pet?.name || "Unknown Pet"}
                                        </td>
                                        <td className="px-6 py-4 text-muted hidden sm:table-cell">
                                            {new Date(req.createdAt).toLocaleDateString("en-US", {
                                                year: "numeric",
                                                month: "short",
                                                day: "numeric",
                                            })}
                                        </td>
                                        <td className="px-6 py-4 text-muted hidden md:table-cell">
                                            {new Date(req.pickupDate).toLocaleDateString("en-US", {
                                                year: "numeric",
                                                month: "short",
                                                day: "numeric",
                                            })}
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className={`px-3 py-1 rounded-full text-xs font-bold ${status.className}`}>
                                                {status.label}
                                            </span>
                                        </td>

                                       
                                        <td className="px-6 py-4">
                                            <div className="flex items-center justify-center gap-2 flex-wrap">
                                                {pet?._id && (
                                                    <Link href={`/all-pets/pet/${pet._id}`}>
                                                        <button className="bg-primary/10 hover:bg-primary/20 text-primary text-xs font-medium px-3 py-1.5 rounded-xl transition">
                                                            View
                                                        </button>
                                                    </Link>
                                                )}

                                                {req.status === "pending" && (
                                                    <AlertDialog>
                                                        <Button
                                                            disabled={cancelling === req._id}
                                                            className="bg-danger/10 hover:bg-danger/20 text-danger text-xs font-medium px-3 py-1.5 rounded-xl transition disabled:opacity-50"
                                                        >
                                                            {cancelling === req._id ? "Cancelling..." : "Cancel"}
                                                        </Button>

                                                        <AlertDialog.Backdrop>
                                                            <AlertDialog.Container>
                                                                <AlertDialog.Dialog className="sm:max-w-[400px] bg-background border border-muted/20 dark:border-muted/10 rounded-2xl shadow-xl p-0 overflow-hidden">
                                                                    <AlertDialog.CloseTrigger className="absolute top-4 right-4 text-muted hover:text-foreground transition" />

                                                                    <AlertDialog.Header className="px-6 pt-6 pb-3">
                                                                        <div className="flex items-start gap-3">
                                                                            <AlertDialog.Icon status="danger" className="text-danger text-2xl" />
                                                                            <AlertDialog.Heading className="font-heading text-lg font-bold text-foreground">
                                                                                Cancel Request?
                                                                            </AlertDialog.Heading>
                                                                        </div>
                                                                    </AlertDialog.Header>

                                                                    <AlertDialog.Body className="px-6 pb-4">
                                                                        <p className="font-body text-sm text-muted">
                                                                            This will cancel your adoption request for <strong className="text-foreground">{pet?.name || "this pet"}</strong>. This action cannot be undone.
                                                                        </p>
                                                                    </AlertDialog.Body>

                                                                    <AlertDialog.Footer className="px-6 pb-6 pt-3 flex justify-end gap-3 border-t border-muted/10 dark:border-muted/5">
                                                                        <Button
                                                                            slot="close"
                                                                            variant="light"
                                                                            className="bg-muted/10 hover:bg-muted/20 text-foreground font-body font-medium px-5 py-2 rounded-xl transition"
                                                                        >
                                                                            No, Keep It
                                                                        </Button>
                                                                        <Button
                                                                            onClick={() => handleCancel(req._id)}
                                                                            slot="close"
                                                                            variant="danger"
                                                                            className="bg-danger hover:bg-danger/80 text-white font-heading font-semibold px-5 py-2 rounded-xl transition shadow-md"
                                                                        >
                                                                            Yes, Cancel
                                                                        </Button>
                                                                    </AlertDialog.Footer>
                                                                </AlertDialog.Dialog>
                                                            </AlertDialog.Container>
                                                        </AlertDialog.Backdrop>
                                                    </AlertDialog>
                                                )}
                                            </div>
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

export default MyRequestsPage;
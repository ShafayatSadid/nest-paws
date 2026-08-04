"use client";

import { useState, useEffect } from "react";
import { AlertDialog, Button } from "@heroui/react";
import toast from "react-hot-toast";
import { authClient } from "@/lib/auth-client";

export default function RequestButton({ pet }) {
    const [requests, setRequests] = useState([]);
    const [loading, setLoading] = useState(false);
    const [actionLoading, setActionLoading] = useState(false);


    const fetchRequests = async () => {
        if (!pet) return;
        setLoading(true);
        try {
            const { data, error } = await authClient.token();
            const token = data?.token

            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/requests/pet/${pet._id}`, {
                headers: { Authorization: `Bearer ${token}` },
            });

            if (!res.ok) {
                const err = await res.text();
                throw new Error(err || "Failed to fetch requests");
            }

            const result = await res.json();
            setRequests(result);
        } catch (err) {
            toast.error(err.message || "Failed to load requests");
        } finally {
            setLoading(false);
        }
    };

    
    useEffect(() => {
        fetchRequests();
    }, [pet]);

   
    const handleStatusUpdate = async (requestId, status) => {
        setActionLoading(true);
        try {
            const { data, error } = await authClient.token();
            const token = data?.token

            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/requests/${requestId}/status`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({ status }),
            });

            if (!res.ok) {
                const err = await res.text();
                throw new Error(err || "Failed to update status");
            }

            toast.success(`Request ${status} successfully!`);
            await fetchRequests();
        } catch (err) {
            toast.error(err.message || "Something went wrong");
        } finally {
            setActionLoading(false);
        }
    };

    // 
    const getStatusBadge = (status) => {
        const map = {
            pending: { label: "Pending", className: "bg-warning/20 text-warning" },
            approved: { label: "Approved", className: "bg-success/20 text-success" },
            rejected: { label: "Rejected", className: "bg-danger/20 text-danger" },
        };
        return map[status] || map.pending;
    };

    return (
        <AlertDialog>
            <Button className="bg-primary/10 hover:bg-primary/20 text-primary text-sm font-medium py-2 rounded-xl transition w-full">
                Requests
            </Button>

            <AlertDialog.Backdrop>
                <AlertDialog.Container>
                    <AlertDialog.Dialog className="sm:max-w-2xl max-h-[80vh] bg-background border border-muted/20 dark:border-muted/10 rounded-2xl shadow-xl p-0 overflow-hidden flex flex-col">
                        <AlertDialog.CloseTrigger className="absolute top-4 right-4 text-muted hover:text-foreground transition z-10" />

                        <AlertDialog.Header className="px-6 pt-6 pb-3 border-b border-muted/10 dark:border-muted/5">
                            <AlertDialog.Heading className="font-heading text-xl font-bold text-foreground">
                                Requests for <span className="text-primary">{pet?.name}</span>
                            </AlertDialog.Heading>
                        </AlertDialog.Header>

                        <AlertDialog.Body className="px-6 py-4 overflow-y-auto flex-1">
                            {loading ? (
                                <div className="flex justify-center py-8">
                                    <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
                                </div>
                            ) : requests.length === 0 ? (
                                <p className="text-muted text-center py-8">No adoption requests yet.</p>
                            ) : (
                                <div className="space-y-4">
                                    {requests.map((req) => {
                                        const status = getStatusBadge(req.status);
                                        return (
                                            <div
                                                key={req._id}
                                                className="border border-muted/20 dark:border-muted/10 rounded-xl p-4 space-y-2 bg-transparent"
                                            >
                                                <div className="flex justify-between items-start">
                                                    <div>
                                                        <p className="font-semibold text-foreground">{req.userName || req.userEmail}</p>
                                                        <p className="text-sm text-muted">{req.userEmail}</p>
                                                    </div>
                                                    <span className={`text-xs font-bold px-3 py-1 rounded-full ${status.className}`}>
                                                        {status.label}
                                                    </span>
                                                </div>
                                                <p className="text-sm">
                                                    <span className="text-muted">Pickup:</span>{" "}
                                                    {new Date(req.pickupDate).toLocaleDateString("en-US", {
                                                        year: "numeric",
                                                        month: "short",
                                                        day: "numeric",
                                                    })}
                                                </p>
                                                {req.message && (
                                                    <p className="text-sm text-muted italic">"{req.message}"</p>
                                                )}

                                                {req.status === "pending" && (
                                                    <div className="flex gap-3 pt-2">
                                                        <button
                                                            onClick={() => handleStatusUpdate(req._id, "approved")}
                                                            disabled={actionLoading}
                                                            className="bg-success hover:bg-success/80 text-white text-sm font-medium px-4 py-1.5 rounded-xl transition disabled:opacity-50"
                                                        >
                                                            Approve
                                                        </button>
                                                        <button
                                                            onClick={() => handleStatusUpdate(req._id, "rejected")}
                                                            disabled={actionLoading}
                                                            className="bg-danger hover:bg-danger/80 text-white text-sm font-medium px-4 py-1.5 rounded-xl transition disabled:opacity-50"
                                                        >
                                                            Reject
                                                        </button>
                                                    </div>
                                                )}
                                            </div>
                                        );
                                    })}
                                </div>
                            )}
                        </AlertDialog.Body>

                        <AlertDialog.Footer className="px-6 pb-6 pt-3 flex justify-end border-t border-muted/10 dark:border-muted/5">
                            <Button
                                slot="close"
                                variant="light"
                                className="bg-muted/10 hover:bg-muted/20 text-foreground font-body font-medium px-5 py-2 rounded-xl transition"
                            >
                                Close
                            </Button>
                        </AlertDialog.Footer>
                    </AlertDialog.Dialog>
                </AlertDialog.Container>
            </AlertDialog.Backdrop>
        </AlertDialog>
    );
}
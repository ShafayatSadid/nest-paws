import Link from "next/link";
import { FaPaw } from "react-icons/fa";

export default function NotFound() {
    return (
        <div className="mt-20 min-h-[calc(100vh-80px)] flex items-center justify-center px-5 py-12 bg-background">
            <div className="max-w-2xl mx-auto text-center">
                
                <div className="text-7xl sm:text-8xl text-muted/30 dark:text-muted/20 mb-6">
                    <FaPaw className="mx-auto" />
                </div>

                
                <h1 className="font-heading text-8xl sm:text-9xl font-extrabold text-primary/20 dark:text-primary/10 select-none">
                    404
                </h1>

              
                <div className="mt-4 space-y-2">
                    <h2 className="font-heading text-2xl sm:text-3xl lg:text-4xl font-bold text-foreground">
                        Oops! Page went for a walk 🐕
                    </h2>
                    <p className="font-body text-base sm:text-lg text-muted max-w-lg mx-auto">
                        Looks like this page has run away or is hiding under the couch.
                        Don&apos;t worry, we&apos;ll help you get back home.
                    </p>
                </div>

                {/* Back to Home  */}
                <div className="mt-8">
                    <Link href="/">
                        <button className="bg-primary hover:bg-primary-dark text-white font-heading font-semibold px-8 py-3.5 rounded-full shadow-lg hover:shadow-xl transition duration-300 inline-flex items-center gap-2">
                            <span>🏠</span>
                            Back to Home
                        </button>
                    </Link>
                </div>

                
                <p className="font-body text-xs text-muted/60 mt-8">
                    Error 404 · Page Not Found
                </p>
            </div>
        </div>
    );
}
import { ChevronRight } from "lucide-react";
import Link from "next/link";

import { cn } from "@/lib/utils";

interface BreadcrumbProps extends React.HTMLAttributes<HTMLDivElement> {
    items: {
        href: string;
        label: string;
        isCurrent?: boolean;
    }[];
    separator?: React.ReactNode;
}

export function Breadcrumb({
    items,
    separator = <ChevronRight className="h-3 w-3 text-muted-foreground" />,
    className,
    ...props
}: BreadcrumbProps) {
    return (
        <nav
            aria-label="Breadcrumb"
            className={cn("flex items-center text-xs", className)}
            {...props}
        >
            <ol className="flex items-center gap-1">
                {items.map((item, index) => {
                    const isLast = index === items.length - 1;
                    return (
                        <li key={item.href} className="flex items-center gap-1.5">
                            {item.isCurrent ? (
                                <span className="font-semibold text-xs text-primary">{item.label}</span>
                            ) : (
                                <Link
                                    href={item.href}
                                    className="text-muted-foreground hover:text-foreground transition-colors"
                                >
                                    {item.label}
                                </Link>
                            )}
                            {!isLast && separator}
                        </li>
                    );
                })}
            </ol>
        </nav>
    );
} 
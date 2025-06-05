export const PageContainer = ({ children }: { children: React.ReactNode }) => {
    return (
        <div className="space-y-6 p-6 w-full">
            {children}
        </div>
    );
}

export const PageHeader = ({ children }: { children: React.ReactNode }) => {
    return (
        <div className="flex w-full justify-center items-center">
            {children}
        </div>
    );
}

export const PageHeaderContent = ({ children }: { children: React.ReactNode }) => {
    return (
        <div className="space-y-1 w-full">
            {children}
        </div>
    );
}

export const PageTitle = ({ children }: { children: React.ReactNode }) => {
    return (
        <h1 className="text-3xl font-semibold">
            {children}
        </h1>
    );
}

export const PageDescription = ({ children }: { children: React.ReactNode }) => {
    return (
        <p className="text-lg text-muted-foreground">
            {children}
        </p>
    );
}

export const PageContent = ({ children }: { children: React.ReactNode }) => {
    return (
        <div className="space-y-6">
            {children}
        </div>
    );
}

export const PageActions = ({ children }: { children: React.ReactNode }) => {
    return (
        <div className="flex items-center gap-2">
            {children}
        </div>
    );
}
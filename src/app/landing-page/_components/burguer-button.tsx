function HamburgerButton({ open, ...props }: { open: boolean } & React.ButtonHTMLAttributes<HTMLButtonElement>) {
    return (
        <button
            type="button"
            aria-label={open ? "Fechar menu" : "Abrir menu"}
            aria-expanded={open}
            aria-controls="mobile-menu"
            className="md:hidden transition"
            {...props}
        >
            <svg width="30" height="30" viewBox="0 0 24 24" fill="none" className="block" aria-hidden="true">
                <rect
                    x="3"
                    y="6"
                    width="20"
                    height="1.5"
                    rx="1"
                    className={`transition-all duration-300 origin-center ${open ? 'rotate-45 translate-y-[5px]' : ''}`}
                    fill="currentColor"
                />
                <rect
                    x="3"
                    y="12"
                    width="20"
                    height="1.5"
                    rx="1"
                    className={`transition-all duration-300 origin-center ${open ? 'opacity-0' : 'opacity-100'}`}
                    fill="currentColor"
                />
                <rect
                    x="3"
                    y="18"
                    width="20"
                    height="1.5"
                    rx="1"
                    className={`transition-all duration-300 origin-center ${open ? '-rotate-45 translate-y-[-3px]' : ''}`}
                    fill="currentColor"
                />
            </svg>
        </button>
    );
}

export default HamburgerButton;
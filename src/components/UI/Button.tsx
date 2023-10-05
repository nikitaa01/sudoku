export default function Button({ onClick, children }: { onClick?: () => void, children: React.ReactNode | string }) {
    return (
        <button
            onClick={onClick}
            className="px-4 py-2 bg-blue-600 text-white rounded-sm shadow-md hover:bg-blue-700 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2 focus:ring-offset-white/80"
        >
            {children}
        </button>
    )
}
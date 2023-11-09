export default function Button({ onClick, children, style }: { onClick?: () => void, children: React.ReactNode | string, style?: 'primary' | 'secundary' }) {
    const styleClasses = {
        primary: "px-4 py-2 bg-blue-600 text-white rounded-md shadow-md hover:bg-blue-700 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2 focus:ring-offset-white/80",
        secundary: "px-4 py-2 bg-gray-200 text-black/80 rounded-md shadow hover:bg-gray-300 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2 focus:ring-offset-white/80"
    }

    return (
        <button
            onClick={onClick}
            className={`${styleClasses[style ?? 'primary']}`}
        >
            {children}
        </button>
    )
}
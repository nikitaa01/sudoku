'use client'

export default function Message({ id, text }: { id: number, text: string | React.ReactElement }) {
    return (
        <>
            <div className={`animate-message-appear py-2`}>
                <div id={`message-${id}`} className={`rounded-sm px-4 py-1 text-sm text-black/80 shadow-md z-50 bg-white `}>
                    {text}
                </div>
            </div>
        </>
    )
}
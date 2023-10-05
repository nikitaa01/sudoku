export default function Message({ id, text, closing }: { id: number, text: string, closing?: true }) {

    return (
        <>
            <div data-closing id={`message-${id}`} className={`rounded-sm px-4 py-1 text-sm text-black/80 shadow-md z-50 bg-white ${closing ? '' : 'animate-message-appear'}`}>
                {text}
            </div>
            <style jsx>{`
                [data-closing=true] {
                    animation-fill-mode: forwards;
                }
                div { view-transition-name: message-${id}}
                `}
            </style>
        </>
    )
}
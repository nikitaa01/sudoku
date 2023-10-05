"use client"

import { createPortal } from "react-dom"
import { useEffect, useState } from "react"
import useDebounce from "@/hooks/useDebounce"

export default function Modal({ children, open, onCancel }: { children: React.ReactNode | string, open: boolean, onCancel: () => void }) {
    const [mounted, setMounted] = useState(false)
    const modalRoot = globalThis.document && document.getElementById('modal-root')
    const debouncedOpen = useDebounce(open, 200)

    useEffect(() => {
        setMounted(true)
        if (!document.getElementById('modal-root')) {
            const newModalRoot = document.createElement('div')
            newModalRoot.id = 'modal-root'
            document.body.appendChild(newModalRoot)
        }
    }, [modalRoot])

    const escapeClause = !open ? debouncedOpen : open

    if (!mounted || !modalRoot || !escapeClause) return null

    const handleClick = (e: React.MouseEvent) => {
        if (e.target === e.currentTarget) {
            onCancel && onCancel()
        }
    }

    return createPortal(
        <>
            <div id="modal-bg" onClick={handleClick} className={`z-20 bg-black/30 fixed inset-0 w-screen h-screen flex justify-center items-center backdrop-blur-[2px] cursor-pointer ${open ? 'animate-modal-bg-appear' : 'animate-modal-bg-disappear'}`}>
                <div id="modal-content" className={`m-10 lg:w-3/6 bg-white border w-fit py-5 px-8 rounded-sm flex justify-center items-center cursor-default ${open ? 'animate-modal-content-appear' : 'animate-modal-content-disappear'}`}>
                    {children}
                </div>
            </div>
        </>,
        modalRoot
        ,
    )
}
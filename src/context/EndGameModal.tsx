"use client"

import Modal from "@/components/UI/Modal"
import { createContext, useContext, useEffect, useMemo, useState } from "react"
import { useRestartGameContext } from "./RestartGame"

interface EndGameModalContext {
    setModalData: React.Dispatch<
        React.SetStateAction<{
            open: boolean
            onCancel: () => void
            modalChildren: React.ReactNode
        }>
    >
}

const EndGameModalContext = createContext<EndGameModalContext>({
    setModalData: () => {},
})

const useEndGameModalContext = () => {
    const context = useContext(EndGameModalContext)
    if (context === undefined) {
        throw new Error(
            "useEndGameModalContext must be used within a EndGameModalContextProvider"
        )
    }
    return context
}

const EndGameModalContextProvider = ({
    children,
}: {
    children: React.ReactNode
}) => {
    const [{ open, onCancel, modalChildren }, setModalData] = useState<{
        open: boolean
        onCancel: () => void
        modalChildren: React.ReactNode
    }>({
        open: false,
        onCancel: () => {},
        modalChildren: null,
    })
    const { restarting } = useRestartGameContext()

    useEffect(() => {
        if (restarting) {
            setModalData((prev) => ({ ...prev, open: false }))
        }
    }, [restarting, setModalData])

    return (
        <EndGameModalContext.Provider value={{ setModalData }}>
            <Modal open={open} onCancel={onCancel}>
                {modalChildren}
            </Modal>
            {useMemo(() => children, [children])}
        </EndGameModalContext.Provider>
    )
}

export { EndGameModalContextProvider, useEndGameModalContext }

import { useEndGameModalContext } from '@/context/EndGameModal'
import { useEffect } from 'react'

export default function CloseModal() {
    const { setModalData } = useEndGameModalContext()

    useEffect(() => {
        setModalData(({ onCancel, modalChildren }) => ({
            open: false,
            onCancel,
            modalChildren,
        }))
    }, [setModalData])

    return null
}
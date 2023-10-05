import { useEffect } from 'react'
import { useEndGameModalContext } from '@/context/EndGameModal'

export default function CloseModal() {
    const { setModalData } = useEndGameModalContext()

    useEffect(() => {
        setModalData({
            open: false,
            onCancel: () => { },
            modalChildren: null,
        })
    }, [setModalData])

    return null
}
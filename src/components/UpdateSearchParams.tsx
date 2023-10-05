'use client'

import { useEffect } from "react"

export default function UpdateSearchParams({ newSearchParams }: { newSearchParams: { game: string } }) {
    useEffect(() => {
        const searchParams = new URLSearchParams()
        Object.entries(newSearchParams).forEach(([key, value]) => {
            searchParams.set(key, value)
        })

        const newUrl = `${window.location.pathname}?${searchParams.toString()}`
        window.history.replaceState(null, "", newUrl)
    }, [newSearchParams])

    return null
}

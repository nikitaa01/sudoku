'use client'
import { useEffect } from "react"

export default function ClearCookies() {
    useEffect(() => {
        document.cookie = 'regenerateClient='
    }, [])

    return null
}
'use client'
import { useEffect } from "react"

export default function ClearCookies() {
    useEffect(() => {
        document.cookie = 'regenerateClient='
        document.cookie = 'difficulty='
    }, [])

    return null
}
"use client"

import { useRestartGameContext } from "@/context/RestartGame"
import { ReactNode } from "react"
import { GameSkeletonGrid } from "./GameSkeleton"

export function GameGrid({ children }: { children: ReactNode }) {
    const { restarting } = useRestartGameContext()

    if (restarting) return <GameSkeletonGrid />

    return children
}

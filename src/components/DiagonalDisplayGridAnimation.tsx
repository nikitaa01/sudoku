'use client'

import { useEffect } from "react"

export default function DiagonalDisplayGridAnimation() {
    // TODO refractor to useRef 

    useEffect(() => {
        const gridCels = document.querySelectorAll('#grid-cells > div')

        const grid = [
            [1],
            [2, 10],
            [3, 11, 19],
            [4, 12, 20, 28],
            [5, 13, 21, 29, 37],
            [6, 14, 22, 30, 38, 46],
            [7, 15, 23, 31, 39, 47, 55],
            [8, 16, 24, 32, 40, 48, 56, 64],
            [9, 17, 25, 33, 41, 49, 57, 65, 73],
            [18, 26, 34, 42, 50, 58, 66, 74],
            [27, 35, 43, 51, 59, 67, 75],
            [36, 44, 52, 60, 68, 76],
            [45, 53, 61, 69, 77],
            [54, 62, 70, 78],
            [63, 71, 79],
            [72, 80],
            [81]
        ]
        let i = 0
        for (const row of grid) {
            setTimeout(() => {
                for (const num of row) {
                    const gridCel = gridCels[num - 1]
                    gridCel.classList.remove('scale-0')
                    gridCel.classList.remove('opacity-0')
                    gridCel.classList.add('scale-100')
                    gridCel.classList.add('opacity-100')
                }
            }, i++ * 15)
        }
    }, [])

    return null
}

type ApiResponse<T> = {
    ok: true
    data: T
} | {
    ok: false
}

export default ApiResponse
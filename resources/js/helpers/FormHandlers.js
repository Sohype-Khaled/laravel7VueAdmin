export function handle422Error(error) {
    return error.response.data.errors
}

export function formatDate(date: string | Date) {
    return new Intl.DateTimeFormat("en-IN", {
        dateStyle: "medium",
    }).format(new Date(date));
}
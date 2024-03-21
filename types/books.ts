export type Summary = {
    id: number,
    summary: string,
    query_frequency?: number,
    summary_at_index?: number,
}


export type Books = {
    id: number,
    book_id: number,
    title: string,
    summary: string,
    author: string,
    query_frequency?: number,
    summary_at_index?: number,
}


export type BooksReduxData = {
    data: Books[],
    total_books: number,
    remaining_pages?: number
} 

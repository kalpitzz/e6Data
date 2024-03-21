import { Books, BooksReduxData } from '@/types/books'
import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'


export interface appState {
    Books: BooksReduxData | null,
    SearchedBook: Books | null,
}

const initialState: appState = {
    Books: null,
    SearchedBook: null,
}

export const books = createSlice({
    name: 'BookStore',
    initialState,
    reducers: {
        setBooks: (state, action: PayloadAction<BooksReduxData>) => {
            state.Books = action.payload
        },
        setSearchedBook: (state, action: PayloadAction<Books>) => {
            state.SearchedBook = action.payload
        },
    },
})


export const { setBooks, setSearchedBook } = books.actions

export default books.reducer
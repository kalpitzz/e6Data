import { GiCancel } from "react-icons/gi";
import { IoIosSearch } from "react-icons/io";
import React, { ElementRef, LegacyRef, useEffect, useRef, useState } from 'react'
import { Books, BooksReduxData } from '@/types/books'
import { useDispatch } from "react-redux";
import { setSearchedBook } from "@/redux/slices/books";


type propsType = {
    search_url: string,
    inputClassName?: string,
    containerClassName?: string,
} & React.InputHTMLAttributes<HTMLInputElement>;


// AutoSuggest with otimization technique like : 
//      Pagination , 
//      Debouncing to reduce calls , 
//      Auto api cancellation using controller if loose focus from input

function SearchInput({ search_url, inputClassName, containerClassName, ...rest }: propsType) {

    let timer: NodeJS.Timeout

    const searchRef: any = useRef(null)
    const dispatch = useDispatch()

    const [suggestedBooks, setSuggestedBooks] = useState<Books[]>([])
    const [notFound, setNotFound] = useState<Boolean>(false)

    const controller = new AbortController();
    const signal = controller.signal;

    /** This is used as callback function to 
    * @param {string} searchText , search-text to fetch data from server
    */
    const searchApiCall: Function = async (searchText: string): Promise<any> => {

        if (!searchText.length)
            return null

        let url = search_url + `?search=${searchText}`

        const response = await fetch(url, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ search: searchText }),
            signal
        })

        if (response.ok) {
            let responseData: BooksReduxData = await response.json()
            if (responseData.data.length) {
                setNotFound(false)
                setSuggestedBooks(responseData.data)
            } else {
                setNotFound(true)
                setSuggestedBooks([])
            }
        }

    }


    /** This is debouncing technique, to reduce unnecessary search api calls
    * @param {string} searchText The search-text
    * @param {Function} callback The search-url endpoint 
    */
    const debounceSearch = (searchText: string, callback: Function, delay: number = 500) => {
        clearTimeout(timer)
        timer = setTimeout(() => callback(searchText), delay);
    }

    //This will reset textfied , error area , cancell all the api if lost focus from input field

    const resetSearchField = () => {
        try {
            controller.abort("lost focus")
            clearTimeout(timer)
            setNotFound(false)
            searchRef.current.value = ""
            setTimeout(() => setSuggestedBooks([]), 200);
        } catch (err) { }
    }


    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        debounceSearch(e.target.value.trim(), searchApiCall, 1000)
    }

    const handleBookFromList = (book: Books) => {
        dispatch(setSearchedBook(book))
        resetSearchField()
    }






    return (
        <div className={`relative text-black max-w-full overflow-hidden p-1 z-50  ${containerClassName}`}>

            <div className='max-w-full mx-auto'>
                <div className="relative flex items-center pr-2 w-full h-12 rounded-lg focus-within:shadow-lg bg-white overflow-hidden">
                    <div className="grid place-items-center h-full w-12 text-gray-500">
                        <IoIosSearch size={30} />
                    </div>

                    <input
                        ref={searchRef}
                        onChange={handleInputChange}
                        onBlur={resetSearchField}
                        className={`peer h-full w-full outline-none text-lg text-gray-700 px-2 font-bold ${inputClassName}`}
                        type="text"
                        {...rest}
                    />
                    <GiCancel size={30} />
                </div>
            </div>

            {
                suggestedBooks.length > 0 &&
                <div className=" max-h-[20rem] rounded shadow bg-white overflow-x-hidden overflow-y-scroll peer-checked:flex flex-col w-full mt-1 ">
                    <p className=" font-extrabold mb-4 p-2 cursor-default">Results : </p>
                    {suggestedBooks.map((book, index) => (
                        <div
                            key={book.id}
                            onClick={() => handleBookFromList(book)}
                            className={`cursor-pointer group ${(index != 0 || index !== suggestedBooks.length - 1) && "border-b"}`}
                        >
                            <a className="block p-2 border-transparent border-l-4 group-hover:border-blue-600 group-hover:bg-gray-100">{book.title}</a>
                        </div>
                    )
                    )}
                </div>
            }

            {
                notFound &&
                <div className='w-fit m-auto p-2 rounded shadow bg-white mt-2 font-extrabold text-red-800'>
                    Not Found .. Try Something Else
                </div>
            }


        </div >
    )
}

export default SearchInput

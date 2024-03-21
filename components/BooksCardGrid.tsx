import { Books, BooksReduxData } from '@/types/books'
import React, { useEffect, useState } from 'react'
import Card from './Card'
import { useSelector } from 'react-redux'
import { RootState } from '@/redux/store'
import { TbPlayerTrackNextFilled, TbPlayerTrackPrevFilled } from 'react-icons/tb'
import { pages } from 'next/dist/build/templates/app-page'



function BooksCardGrid() {

    const fetchedResult: Books | null = useSelector((state: RootState) => state.BookStore.SearchedBook)
    const controller = new AbortController();
    const signal = controller.signal;
    const [activeTab, setActiveTab] = useState(1);
    const [SearchedBook, setSearchedBook] = useState(fetchedResult);
    const [pagination, setPagination] = useState({ page: 1, limit: 8 })
    const [allBooks, setAllBooks] = useState<BooksReduxData | null>(null)

    const changeTab = (tabIndex: number) => {
        setActiveTab(tabIndex);
    };
    // Fetch all books for "all books" tab
    const fetchAllBooks = async () => {
        let url = `/api/search_data?page=${pagination.page}&limit=${pagination.limit}`
        const response = await fetch(url, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            signal
        })

        if (response.ok) {
            let responseData: BooksReduxData = await response.json()
            setAllBooks(responseData)
        }
    }

    // Pagination Next button
    const handleNextPage = () => {
        if (allBooks?.remaining_pages! > 0) {
            setPagination((prev) => ({ ...prev, page: prev.page++ }))
        }

    }

    //Pagination Previous Button
    const handlePrevPage = () => {
        if (pagination.page > 1) {
            setPagination((prev) => ({ ...prev, page: prev.page-- }))
        }
    }

    // Handeling "Fetch all data" , "Pagination button visibility" , "switching tab when make new search from all books tab section "
    useEffect(() => {
        if (fetchedResult?.id !== SearchedBook?.id) {
            setSearchedBook((prev) => fetchedResult?.id !== prev?.id ? fetchedResult : prev)
            setActiveTab(1)
        }
        if (activeTab == 1) {
            document.getElementById("paginationSection")!.style.display = "none";
        } else {
            document.getElementById("paginationSection")!.style.display = "block";
        }
        if (allBooks?.remaining_pages! < 1) {
            document.getElementById("paginationNext")!.style.display = "none";
            document.getElementById("paginationPrev")!.style.display = "block";
        }
        if (allBooks?.remaining_pages! > 0) {
            document.getElementById("paginationNext")!.style.display = "block";
            document.getElementById("paginationPrev")!.style.display = "block";
        }
        if (pagination.page! == 1) {
            document.getElementById("paginationNext")!.style.display = "block";
            document.getElementById("paginationPrev")!.style.display = "none";
        }

        fetchAllBooks()
    }, [pagination, activeTab, fetchedResult])

    return (

        <div className="relative text-white w-screen font-extrabold  h-[90vh]  " >
            <div id={"paginationSection"}>
                <p className='absolute top-0 right-80 font-extrabold text-lg'>Pages : </p>
                <TbPlayerTrackNextFilled id="paginationNext" size={20} onClick={handleNextPage} className='absolute top-1 right-20 cursor-pointer' />
                <p className='absolute top-0 right-40 font-extrabold text-lg'>{pagination.page}</p>
                <TbPlayerTrackPrevFilled id="paginationPrev" size={20} onClick={handlePrevPage} className='absolute top-1 right-60 cursor-pointer' />
            </div>
            <div className="flex border-b  max-h-[10%]  border-gray-300">
                <button onClick={() => changeTab(1)} className={`${activeTab === 1 ? 'border-b-2 border-blue-500' : ''} py-2 px-4`}>
                    Search Result
                </button>
                <button onClick={() => changeTab(2)} className={`${activeTab === 2 ? 'border-b-2 border-blue-500' : ''} py-2 px-4`} >
                    All Books
                </button>
            </div>
            <div className="mt-4 w-full min-h-[90%] max-h-[90%] overflow-y-scroll">
                {activeTab === 1 && SearchedBook?.id && <Card books={[SearchedBook!]} />}
                {activeTab === 2 && allBooks?.data?.length! > 0 && <Card books={allBooks?.data!} />}
            </div>
        </div >


    )
}

export default BooksCardGrid

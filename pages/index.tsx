import { Inter } from "next/font/google";
import SearchInput from "@/components/SearchInput";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import BooksCardGrid from "@/components/BooksCardGrid";
import { BooksReduxData } from "@/types/books";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {


  return (
    <main className="relative max-h-screen main overflow-hidden">
      <div className="h-[10vh] pt-8">
        <SearchInput data-cy="search-input" search_url="/api/search_data" placeholder="Search Your Book Here ... " containerClassName="w-[50vw] m-auto" />
      </div>
      <div className="min-h-[90vh] max-h-[90vh] overflow-hidden ">
        <BooksCardGrid />
      </div>
    </main >
  );
}




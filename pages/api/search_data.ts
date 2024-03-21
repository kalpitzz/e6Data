import data from "@/constants/data.json"
import type { NextApiRequest, NextApiResponse } from "next";
import { Books, Summary } from "@/types/books";


type ResponseData = {
  data: Books[],
  total_books: number,
  remaining_pages?: number,
} | {}



/** This will return the sorted found summaries based on word count occurance
  * @param {Summary[]} summaries The array of Summaries
  * @param {string} search Text to search in summaries
*/

const findSummaries = async (summaries: Summary[], search: any): Promise<Summary[]> => {

  return new Promise((resolve, reject) => {

    // No Summaries in DB to search from 
    if (summaries.length === 0)
      reject("No Summaries To Search From")



    const temp: Summary[] = []

    // For searching the provided text
    summaries.forEach((item, index) => {


      // Return all Summaries, if searching text not provided
      if (!search) {
        temp.push({ ...item, summary_at_index: index })
        resolve(temp)
      } else {
        const wordCount = item?.summary.toLowerCase().split(search).length - 1
        if (wordCount > 0)
          temp.push({ ...item, query_frequency: wordCount, summary_at_index: index })

        if (index === summaries.length - 1) {
          const sorted_found_summaries = temp.toSorted((a, b) => b?.query_frequency! - a?.query_frequency!)
          resolve(sorted_found_summaries)
        }
      }
    })

  })

}

/** This will return Paginates Slice of Summary array
  * @param {Books[]} summaries The array of Summaries
  * @param {number} page Pagination Page Number
  * @param {number} limit Pagination limit per page
*/

function pagination(summaries: Books[], page: number, limit: number) {
  const startIndex = (page - 1) * limit;
  const endIndex = Math.min(startIndex + limit, summaries.length);
  return summaries.slice(startIndex, endIndex);
}


export default async function handler(req: NextApiRequest, res: NextApiResponse<ResponseData | { error: string }>) {

  let { search, page, limit }: any = req?.query

  let foundSummaries: Summary[]
  let formattedSummaries: Books[]
  let paginatedFormattedSummaries: Books[]

  let remaining_pages: number
  let response: ResponseData

  page = Math.floor(parseFloat(page))
  limit = Math.floor(parseFloat(limit))

  try {

    foundSummaries = await findSummaries(data?.summaries, search ? search.toLowerCase() : null)

    //Formatting raw data by considering that ( summari_id == book_id ) and (every title is correctly placed corersponding to every summary's index) 
    formattedSummaries = foundSummaries.map((sumary) => ({
      ...sumary,
      id: sumary.id!,
      book_id: data.authors.find((book) => book.book_id === sumary.id)?.book_id!,
      title: data.titles[sumary.summary_at_index!],
      summary: sumary.summary,
      author: data.authors.find((book) => book.book_id === sumary.id)?.author!,
    })
    )


    if (page && limit) {
      paginatedFormattedSummaries = pagination(formattedSummaries, page, limit)
      remaining_pages = Math.ceil(formattedSummaries.length / limit) - page

      response = {
        data: paginatedFormattedSummaries,
        total_books: formattedSummaries?.length,
        remaining_pages
      }
    } else {
      response = {
        data: formattedSummaries,
        total_books: formattedSummaries?.length,
      }
    }

    // intentionally delayed the response to check functionality on  UI
    res.status(200).json(response);


  } catch (error: any) {
    res.status(500).json({ error: error || "Something went wrong !" })
  }


}

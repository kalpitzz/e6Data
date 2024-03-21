import { Books } from '@/types/books'
import React from 'react'
import oneBg from "@/public/oneBg.jpg"
import threeBg from "@/public/threeBg.jpg"
import users from "@/public/users.png"
import Image, { StaticImageData } from 'next/image'

type propsType = { books: Books[] }

function getRandomElement(array: StaticImageData[]): StaticImageData {
    const randomIndex = Math.floor(Math.random() * array.length);
    return array[randomIndex];
}

// Individual Card in Grid

function Card(props: propsType) {

    const { books }: propsType = props
    const userImages = [users]
    const backgroundImage = [oneBg, threeBg]

    return (
        <div className="cards w-full px-8">
            {
                books?.map((item) => (
                    <li key={item.id} className='max-w-[25vw] min-h-[20rem] max-h-[35rem] hover:scale-[1.1] translate-y-8'>
                        <a href="" className="card">
                            <Image src={getRandomElement(backgroundImage)} className="card__image" alt="" />
                            <div className="card__overlay">
                                <div className="card__header">
                                    <svg className="card__arc" xmlns="http://www.w3.org/2000/svg"><path /></svg>
                                    <Image className="card__thumb" src={getRandomElement(userImages)} alt="" />
                                    <div className="card__header-text">
                                        <h3 className="card__title">{item.title}</h3>
                                        <span className="card__status">{item.author}</span>
                                    </div>
                                </div>
                                <div className='max-h-fit overflow-y-scroll'>
                                    <p className="card__description">{item.summary}</p>
                                </div>
                            </div>
                        </a>
                    </li>

                ))
            }
        </div>
    )
}

export default Card

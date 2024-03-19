"use client";
import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import Loader from '@/app/_components/Loader';
import InfiniteScroll from 'react-infinite-scroll-component';
import SkeletonLoader from './SkeletonLoader';

const InfiniteScroll2 = () => {
    const [data, setData] = useState<any>([]);

    useEffect(() => {
        async function dataFetch() {
            const resp = await fetch(`https://dummyjson.com/products?limit=2`);
            const result = await resp.json();
            setData(result.products)
        };
        dataFetch();
    }, []);

    const mapData = data.map((items: any, index: number) => (
        <li className='_scroll4' key={index}>
            <div className='_scroll6'>
                <div className='_scroll5'>
                    <Image
                        src={items.thumbnail}
                        width={200}
                        height={200}
                        alt="Picture of the author"
                    />
                    <span className='_scroll7'>{items.id}</span>
                </div>
                <div className='_scroll8'>
                    <h2>{items.brand}</h2>
                    <p>{items.description}</p>
                    <div className='_scroll9'>
                        <span>{items.rating}</span>
                        <span>{items.price}</span>
                    </div>
                </div>
            </div>
        </li>
    ));
    return (
        <>
            <div className='_scroll1'>
                <div className='_scroll2'>
                    <h1>Products listing page</h1>
                    <ul className='_scroll3'>
                        {mapData}
                    </ul>
                    <SkeletonLoader />
                </div>
            </div>
        </>
    );
};

export default InfiniteScroll2;

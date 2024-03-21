"use client";
import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import Loader from '@/app/_components/Loader';
import InfiniteScroll from 'react-infinite-scroll-component';
import SkeletonLoader from './SkeletonLoader';

const InfiniteScroll2 = () => {
    const [data, setData] = useState<any>([]);
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);
    const [loader2,setLoader] = useState(false);
    console.log("data", data);
    console.log("page", page);
    console.log("has", hasMore);

    useEffect(() => {
        fetchData();
    }, []);


    const fetchData = async () => {
        try {
            setLoader(true);
            const response = await fetch(`https://dummyjson.com/products?limit=10&page=${page}`);
            const result = await response.json();
            setData((prevData: any) => [...prevData, ...result.products]);
            if (data.length<30) {
                setHasMore(false);
            }
            else {
                setPage((prevPage) => prevPage + 1); // Increment page number
            }
        } catch (error) {
            console.error('Error fetching data:', error);
        }
        finally{
            setLoader(false);
        }
    };

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
                    {
                        loader2 ? <SkeletonLoader /> : 
                        <InfiniteScroll
                            dataLength={data.length}
                            next={fetchData}
                            hasMore={hasMore}
                            loader={<><SkeletonLoader /> <Loader /></>}
                            endMessage={<p style={{ textAlign: 'center' }}>You have reached the end!</p>}
                        >
                            <ul className='_scroll3'>
                                {mapData}
                            </ul>
                        </InfiniteScroll>
                    }
                </div>
            </div>
        </>
    );
};

export default InfiniteScroll2;

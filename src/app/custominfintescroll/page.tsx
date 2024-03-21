"use client";
import React, { useEffect, useState } from 'react';
import SkeletonLoader from '../_components/SkeletonLoader';

const page = () => {
    const [post, setPost] = useState([]);
    const [page,setPage] = useState(1);
    const [loader,setLoader] = useState(true);
    const [end,setEnd] = useState(false);

    useEffect(() => {
        async function FetchPost() {
            try {
                setLoader(true);
                const post = await fetch(`https://jsonplaceholder.typicode.com/posts?_limit=15&_page=${page}`);
                const resp = await post.json();
                console.log("new data",resp);
                if(resp.length>0){
                    setPost((prev):any=>[...prev,...resp]);
                }else{
                    setEnd(true);
                }
            } catch (error) {
                console.log("unable to fethc data");
            }finally{
                setLoader(false);
            }
        };
        FetchPost();
    }, [page]);

    console.log("page",page);

    function handleInfinteScroll() {
        // scrollHeight return the entire height and width of an element, including what is not viewable (because of overflow)""complete page height
        const scrollHeight = document.documentElement.scrollHeight;
        // The innerHeight property returns the height of a window's content area.
        const innerHeight = window.innerHeight;
        // The scrollTop property sets or returns the number of pixels an element's content is scrolled vertically.
        const scrollTop = document.documentElement.scrollTop;
        // when innerHeight+scrollTop+1>=scrollHeight - it means user ne scrollbar ko bottom m touch kr diya then hame next data load krna hai

        try {
            if (innerHeight + scrollTop >= scrollHeight) {
                setPage((prev)=>prev+1);
            }
        } catch (error) {
            console.log("unable to increase page count")
        }
    }

    useEffect(() => {
        window.addEventListener("scroll", handleInfinteScroll);
        return ()=>window.removeEventListener("scroll",handleInfinteScroll);
    }, [])
    return (
        <>
            <style jsx>{`
            ._alpha1 {
                padding: 20px;
              }
              ._alpha2 {
                display: flex;
                flex-wrap: wrap;
                list-style-type: none;
              }
              ._alpha3 {
                flex: 0 0 18%;
                width: 18%;
                background: #fff;
                box-shadow: 0 0 4px -2px #333;
                padding: 12px;
                border-radius: 6px;
                margin: 15px 10px;
                text-align: center;
                position: relative;
              }
              ._alpha5 {
                position: absolute;
                display: block;
                width: 35px;
                height: 35px;
                background: #44d;
                border-radius: 50%;
                text-align: center;
                line-height: 34px;
                color: #fff;
                top: -19px;
                left: 50%;
                transform: translateX(-50%);
              }
            `}</style>
            <div className='_alpha1'>
                <h1 className='_alpha7'>All My Post</h1>
                <ul className='_alpha2'>
                    { 
                        post.map((items: any,index:number) => (
                            <li className='_alpha3' key={`${items.id}${index}`}>
                                <h2 className='_alpha4'>{items.title.length > 350 ? items.title.slice(0, 35) + "..." : items.title}</h2>
                                <span className='_alpha5'>{items.id}</span>
                                <p className='_alpha6'>{items.body.length > 80 ? items.body.slice(0, 80) + "..." : items.body}</p>
                            </li>
                        ))
                    }
                    {loader && <SkeletonLoader />}
                    {end && <h3>No more products</h3>}
                </ul>
            </div>
        </>
    )
}

export default page
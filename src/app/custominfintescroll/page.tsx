"use client";
import React, { useEffect, useState } from 'react';
import SkeletonLoader from '../_components/SkeletonLoader';
import Loader from "@/app/_components/Loader";

const page = () => {
    const [post, setPost] = useState([]);
    const [page, setPage] = useState(1);
    const [Loading, setLoading] = useState(true);
    const [end, setEnd] = useState(false);
    const [isFirstRender, setIsFirstRender] = useState(true); // Flag for initial render

    useEffect(() => {
        async function FetchPost() {
            try {
                setLoading(true);
                const post = await fetch(`https://jsonplaceholder.typicode.com/posts?_limit=9&_page=${page}`);
                const resp = await post.json();
                console.log("new data", resp);
                if (resp.length > 0 && !isFirstRender) { // Update state only after first render
                    setPost((prevPosts):any => [...prevPosts, ...resp]);
                } else if (resp.length === 0) {
                    setEnd(true);
                }
            } catch (error) {
                console.log("unable to ftech data");
            } finally {
                setLoading(false);
                setIsFirstRender(false); // Set flag to false after first render
            }
        };
        FetchPost();
    }, [page]);

    console.log("post", post)

    function handleInfinteScroll() {
        // scrollHeight return the entire height and width of an element, including what is not viewable (because of overflow)""complete page height
        const scrollHeight = document.documentElement.scrollHeight;
        // The innerHeight property returns the height of a window's content area.
        const innerHeight = window.innerHeight;
        // The scrollTop property sets or returns the number of pixels an element's content is scrolled vertically.
        const scrollTop = document.documentElement.scrollTop;
        // when innerHeight+scrollTop+1>=scrollHeight - it means user ne scrollbar ko bottom m touch kr diya then hame next data load krna hai
        try {
            if (scrollTop + innerHeight + 1 >= scrollHeight) {
                setPage((prev) => prev + 1);
            }

        } catch (error) {
            console.log("unable to increase page count")
        }
    }

    useEffect(() => {
        window.addEventListener("scroll", handleInfinteScroll);
        return () => window.removeEventListener("scroll", handleInfinteScroll);
    }, [])

    useEffect(() => {
        console.log("page inside", page); // Log the updated page value
    }, [page]); // Run this effect whenever page changes


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
                flex: 0 0 25%;
                width: 25%;
                background: #fff;
                box-shadow: 0 0 4px -2px #333;
                padding: 12px;
                border-radius: 6px;
                margin: 20px 10px;
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
                        post.map((items: any, index: number) => (
                            <li className='_alpha3' key={`${items.id}${index}`}>
                                <h2 className='_alpha4'>{items.title.length > 350 ? items.title.slice(0, 35) + "..." : items.title}</h2>
                                <span className='_alpha5'>{items.id}</span>
                                <p className='_alpha6'>{items.body.length > 80 ? items.body.slice(0, 80) + "..." : items.body}</p>
                            </li>
                        ))
                    }
                </ul>
                {Loading && <><SkeletonLoader /> <Loader /></>}
                {end && <h3>No more products</h3>}
            </div>
        </>
    )
}

export default page
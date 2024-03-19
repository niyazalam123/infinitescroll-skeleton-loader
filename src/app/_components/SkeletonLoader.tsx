"use client";
import React from 'react'

const SkeletonLoader = () => {
    return (
        <>
            <style jsx>{`
            ._scroll401{
                display:flex;
                flex-wrap:wrap;
                align-items:center;
                justify-content:center;
            }
            ._scroll40 {
                border: 1px solid #ccc;
                list-style-type: none;
                border-radius: 4px;
                flex:0 0 19%;
                width:19%;
                margin:15px 8px;
                padding:10px;
            }
            ._scroll60 {
                width: 100%;
            }
            ._scroll50 {
                width: 100%;
                height: 130px;
                background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
                border-radius: 2px;
                animation: loading 1.5s infinite;
                background-size: 200% 100%;
            }
            ._scroll80 {
                margin: 10px 0px;
            }
            ._scroll80 h2 {
                height: 20px;
                background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
                border-radius: 2px;
                animation: loading 1.5s infinite;
                background-size: 200% 100%;
            }
            ._scroll80 p {
                background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
                height: 15px;
                margin-top: 10px;
                animation: loading 1.5s infinite;
                background-size: 200% 100%;
            }
            ._scroll90 {
                display: flex;
                align-items: center;
                justify-content: space-between;
            }
            ._scroll90 span {
                background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
                display: block;
                height: 12px;
                flex: 0 0 30%;
                margin-top: 10px;
                width: 30%;
                animation: loading 1.5s infinite;
                background-size: 200% 100%;
            }
            @keyframes loading {
                0% {
                background-position: 200% 0;
                }
                100% {
                background-position: -200% 0;
                }
            }
        `}</style>
            <ul className='_scroll401'>
                {Array.from({ length: 10 }, (_, index) => (
                    <li className='_scroll40' key={index}>
                        <div className='_scroll60'>
                            <div className='_scroll50'>
                                <div className='_scroll100'>
                                </div>
                            </div>
                            <div className='_scroll80'>
                                <h2></h2>
                                <p></p>
                                <div className='_scroll90'>
                                    <span></span>
                                    <span></span>
                                </div>
                            </div>
                        </div>
                    </li>

                ))}
            </ul>
        </>
    )
}

export default SkeletonLoader
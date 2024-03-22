"use client";
import React, { useEffect, useRef, useState } from 'react';
import { BiSolidPhoneOutgoing } from "react-icons/bi";
import { FaRegUserCircle } from "react-icons/fa";
import { BiSolidPhoneIncoming } from "react-icons/bi";
import SkeletonLoader from '../_components/SkeletonLoader';

const page = () => {
  const [tab, setTab] = useState<number>(1);
  const [data, setData] = useState([]);
  const [endMessage, setEndMessage] = useState(false);
  const [loading, setLoading] = useState(true);
  const [commentLength, setCommentLength] = useState<number>(10);
  const parentElement = useRef<HTMLDivElement>(null);
  const [lastItemVisible, setLastItemVisible] = useState(false);
  const scrollTimeout = useRef<number | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const resp = await fetch("https://jsonplaceholder.typicode.com/comments");
        if (!resp.ok) {
          throw new Error("Failed to fetch data");
        }
        const result = await resp.json();
        setData(result);
      } catch (error: any) {
        console.error("Error fetching data:", error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  console.log("commentLength", commentLength);
  console.log("loading", loading);

  const handleScroll = () => {
    clearTimeout(scrollTimeout.current!);
    scrollTimeout.current = window.setTimeout(() => {
      const container = parentElement.current!;
      const { scrollTop, clientHeight, scrollHeight } = container;

      // Calculate a threshold value to determine if the user is near the bottom of the container
      const threshold = 50; // Adjust this value as needed

      // Check if the user is within the threshold of the bottom
      if (scrollHeight - scrollTop - clientHeight < threshold && !loading && !lastItemVisible) {
        setLoading(true);
        setTimeout(() => {
          setLoading(false);
          setCommentLength((prevLength) => {
            if (prevLength + 10 >= data.length) {
              setLastItemVisible(true);
              setEndMessage(true);
              return data.length;
            }
            return prevLength + 10;
          });
        }, 500);
      }
    }, 100);
  };

  useEffect(() => {
    const container = parentElement.current!;
    container.addEventListener('scroll', handleScroll);
    return () => {
      container.removeEventListener('scroll', handleScroll);
    };
  }, [commentLength, data, loading, lastItemVisible]);

  return (
    <>
      <style jsx>{`
      li{
        list-style-type:none;
      }
        ._Cl_A_sml1 {
            padding: 10px;
          }
          ._Cl_A_sml2 {
            background: #fff;
            border-radius: 6px;
            width: 100%;
            height: calc(100vh - 100px);
          }
          ._Cl_A_sml3 {
            display: flex;
            align-items: flex-start;
            height: 100%;
          }
          ._Cl_A_sml4 {
            flex: 0 0 380px;
            height: 100%;
          }
          ._Cl_A_sml5 {
            border-right: 1px solid #f0f0f0;
            box-shadow: 3px 0px 3px 0 rgba(0,0,0,.1);
            height: 100%;
            padding: 15px 20px 0px;
          }
          ._Cl_A_sml6 {
            margin-bottom: 12px;
            display: flex;
            justify-content: space-between;
            align-items: stretch;
            position: relative;
            border: 1px solid #ddd;
            padding: 5px 12px;
            border-radius: 6px;
          }
          ._Cl_A_sml6 input {
            border: none;
            background: transparent;
            width: 100%;
            height: 36px;
            outline: none;
          }
          ._Cl_A_sml6 button {
            background: #142b64;
            min-width: 85px;
            border: none;
            color: #fff;
            font-size: 17px;
            height: 36px;
            display: block;
            border-radius: 4px;
            margin-left: 6px;
            font-weight: 500;
            cursor: pointer;
            padding: 3px 3px 6px;
            letter-spacing: 1px;
          }
          ._Cl_A_sml7 {
            background: #ddd;
            display: flex;
            align-items: center;
            justify-content: space-between;
            height: 44px;
            border-radius: 6px;
            padding: 6px;
          }
          ._Cl_A_sml7 li {
            flex: 0 0 48%;
            height: 100%;
            text-align: center;
            border-radius: 6px;
            line-height: 32px;
            cursor: pointer;
            font-size: 17px;
            font-weight: 500;
          }
          ._Cl_A_sml7 li:hover{
            background: #fff;
          }
          ._Cl_A_sml7 li.active{
            background: #fff;
          }
          ._Cl_A_sml50 {
            position: sticky;
            top: 0;
            background: #fff;
            z-index: 99999;
            border-bottom: 1px solid #ddd;
            padding-bottom: 12px;
          }
          ._Cl_A_sml80{
            height: calc(100% - 120px);
            overflow-y: scroll;
            padding: 12px 0px 15px;
          }
          ._Cl_A_sml9 {
            margin-bottom: 4px;
            margin-right: 5px;
          }
          ._Cl_A_sm1 {
            display: flex;
            align-items: center;
            padding: 8px;
            border-radius: 6px;
            cursor: pointer;
            border: 1px solid #eee;
          }
          ._Cl_A_sm1:hover{
            background: #4444dd14;
          }
          ._Cl_A_sm1.active{
            background: #4444dd14;
          }
          ._Cl_A_sm2 {
            display: block;
            width: 35px;
            height: 35px;
            text-align: center;
            line-height: 40px;
            border-radius: 50%;
            background: #00800080;
            color: #fff;
            font-size: 18px;
            margin-right: 11px;
            border: 1px solid #fff;
          }
          ._Cl_A_sm3 {
            margin-right: 8px;
            flex-grow: 1;
            text-align: center;
          }
          ._Cl_A_sm4 {
            font-size: 17px;
            font-weight: 500;
            display: inline-block;
          }
          ._Cl_A_sm5 {
            display: flex;
            align-items: center;
            justify-content: center;
          }
          ._Cl_A_sm5 span:first-child {
            font-size: 12px;
            display: block;
            padding-right: 4px;
            font-weight: 600;
          }
          ._Cl_A_sm5 span:nth-child(2) {
            color: gray;
            font-size: 12px;
          }
          ._Cl_A_sm5 span:last-child {
            border-left: 1px solid #333;
            margin-left: 6px;
            padding: 2px 3px 0px;
            font-size: 12px;
            color: gray;
            display: block;
            font-weight: 600;
          }
          ._Cl_A_sm6 {
            display: flex;
            flex-direction: column;
            text-align: center;
            font-size: 12px;
          }
          ._Cl_A_sm5._Cl_A_sm05 span {
            color: red !important;
            margin-left: 0px;
          }
          ._Cl_A_sm5._Cl_A_sm05 span:last-child {
            border-left: none;
          }
          ._Cl_A_sm2._Cl_A_sm21 {
            background: #ff0000bd;
          }
          ._Msg1_on2 {
            margin-bottom: 4px;
          }
          ._Msg1_on3 {
            padding: 6px;
            border-radius: 6px;
            margin-right: 4px;
            display: flex;
            align-items: flex-start;
            cursor:pointer;
          }
          ._Msg1_on3:hover{
            background: #4444dd14;
          }
          ._Msg1_on3.active{
            background: #4444dd14;
          }
          ._Msg1_on4 {
            width: 40px !important;
            height: 40px;
            display: block;
            margin-right: 15px;
            border: 1px solid #fff;
            background: #142b64;
            border-radius: 50%;
            text-align: center;
            line-height: 46px;
            font-size: 30px;
            color:#fff;
          }
          ._Msg1_oN5 {
            flex: 0 0 calc(100% - 70px);
          }
          ._Msg1_oN5 h3 {
            font-size: 16px;
            font-weight: 600;
            padding-bottom: 2px;
          }
          ._Msg1_oN5 p {
            font-size: 14px;
            overflow: hidden;
            text-overflow: ellipsis;
            display: -webkit-box;
            -webkit-box-orient: vertical;
            -webkit-line-clamp: 3;
          }
          ._Msg1_oN8 {
            font-size: 12px;
            color: gray;
            font-weight: 600;
          }
          ._Dt_cl_sm2 {
            flex-grow: 1;
            height: 100%;
          }
          ._Dt_cl_sm4 {
            height: 100%;
          }
          @media only screen  and (max-width:1130px){
            ._Cl_A_sml4{
              flex: 0 0 300px;
            }
          }
        `}</style>
      <div className='_Cl_A_sml1'>
        <div className='_Cl_A_sml2'>
          <ul className='_Cl_A_sml3'>
            <li className='_Cl_A_sml4'>
              <div className='_Cl_A_sml5'>
                <div className='_Cl_A_sml50'>
                  <div className='_Cl_A_sml6'>
                    <input type="text" placeholder='Search by number...' />
                    <button>Search</button>
                  </div>
                  <ul className='_Cl_A_sml7'>
                    <li className={tab === 1 ? "active" : ""} onClick={() => setTab(1)}>Call log</li>
                    <li onClick={() => setTab(2)} className={tab === 2 ? "active" : ""}>Message</li>
                  </ul>
                </div>
                <div className='_Cl_A_sml80' ref={parentElement}>
                  {tab === 1 ? (
                    <>
                      <ul className='_Cl_A_sml8'>
                        {
                          data.slice(0, commentLength).map((items: any, index: number) => (
                            <li className='_Cl_A_sml9' key={`${items.id}${index}`}>
                              <span>{items.id}</span>
                              <div className='_Cl_A_sm1 active'>
                                <span className='_Cl_A_sm2 _Cl_A_sm20'>
                                  <BiSolidPhoneOutgoing />
                                </span>
                                <div className='_Cl_A_sm3'>
                                  <span className='_Cl_A_sm4'>+16789948498</span>
                                  <div className='_Cl_A_sm5'>
                                    <span>Call ended</span>
                                    <span>12s</span>
                                  </div>
                                  {/* <div className='_Cl_A_sm5 _Cl_A_sm05'>
                                <span>No answer</span>
                              </div> */}
                                </div>
                                <span className='_Cl_A_sm6'><span>10:30AM</span><span>13/03/2024</span></span>
                              </div>
                            </li>
                          ))
                        }
                        {/* <Skeleton /> */}
                      </ul>
                      {loading && <><SkeletonLoader /></>}
                      {endMessage && <p style={{ textAlign: "center", margin: "12px 6px", color: "red" }}>No More Data</p>}
                    </>
                  ) :
                    (
                      <ul className='_Msg1_on1'>
                        <li className='_Msg1_on2'>
                          <div className='_Msg1_on3 active'>
                            <span className='_Msg1_on4'><FaRegUserCircle /></span>
                            <div className='_Msg1_oN5'>
                              <h3>+16789948498</h3>
                              <p>I want you to crack at least 1 sale everyday to recover the kind of amount we are spending on leads spending on leads.</p>
                              <span className='_Msg1_oN8'>14/03/2024 10:45 AM</span>
                            </div>
                          </div>
                        </li>
                        <li className='_Msg1_on2'>
                          <div className='_Msg1_on3'>
                            <span className='_Msg1_on4'><FaRegUserCircle /></span>
                            <div className='_Msg1_oN5'>
                              <h3>+16789948498</h3>
                              <p>I want you to crack at least 1 sale everyday to recover the kind of amount we are spending on leads spending on leads.</p>
                              <span className='_Msg1_oN8'>14/03/2024 10:45 AM</span>
                            </div>
                          </div>
                        </li>
                        <SkeletonLoader />
                      </ul>
                    )
                  }
                </div>
              </div>
            </li>
            <li className='_Dt_cl_sm2'>
              <div className='_Dt_cl_sm4'>
                {/* {
                  tab === 1 ? <CallLog /> : <SmsLog />
                } */}
              </div>
            </li>
          </ul>
        </div>
      </div>
    </>
  )
}

export default page
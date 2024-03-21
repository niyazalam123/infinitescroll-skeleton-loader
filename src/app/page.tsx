import Image from "next/image";
import styles from "./page.module.css";
import InfiniteScroll from "./_components/InfiniteScrollPlugin";
import Link from "next/link";

export default function Home() {
  return (
    <>
    <InfiniteScroll />
    <Link href="/custominfintescroll" style={{margin:"60px 50px",display:"block"}}>custom Infinte Scroll</Link>
    </>
  );
}

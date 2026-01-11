import Link from "next/link";
import { BsGithub } from "react-icons/bs";
import { FaGithub } from "react-icons/fa";

export default function Footer(){
  return (
    <div className="h-30 w-full bg-foreground3/30 flex justify-start sm:text-2xl text-xl px-10 relative">
      <div className="h-full content-end pb-8">
        <Link href={'https://github.com/KimNattanan'} target="_blank">
          @KimNattanan
        </Link>
      </div>
    </div>
  )
}
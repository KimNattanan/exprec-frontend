import Image from "next/image";
import { useEffect, useRef, useState } from "react";

export default function AboutPage() {

  const scrollerRef = useRef<HTMLDivElement>(null);
  const [scrollerLeftArrow, setScrollerLeftArrow] = useState(false);
  const [scrollerRightArrow, setScrollerRightArrow] = useState(true);

  const handleScroll = () => {
    const container = scrollerRef.current;
    if (!container) return;

    setScrollerLeftArrow(container.scrollLeft > 0);
    setScrollerRightArrow(container.scrollLeft + container.clientWidth + 1 < container.scrollWidth);
  };

  useEffect(()=>{
    const container = scrollerRef.current;
    if(container){
      container.addEventListener('scroll', handleScroll);
      handleScroll();
    }
    return () => {
      if(container){
        container.removeEventListener('scroll', handleScroll);
      }
    }
  },[]);

  return (
    <div id="about" className="
      sm:h-dvh font-medium relative
      lg:text-xl
      md:text-base
      xs:text-sm
      text-xs
    ">
      <div className="
        w-full font-semibold content-center text-center
        md:text-6xl md:h-[140px]
        sm:text-5xl sm:pt-0
        text-4xl h-[100px] pt-4 border-t-1
      ">
        {`What's Exprec?`}
      </div>
      <div className="
        sm:flex relative
      ">
        <div className="
          flex-3 min-w-0 h-[calc(100dvh-140px)] flex flex-col relative px-4
        ">
          <div className="
            w-full 
            lg:mb-10
            md:mb-6
            sm:mx-4 xs:first-letter:ml-8
            mb-4 first-letter:ml-4
          ">
            Exprec serves you a simple way to track your expenses with customizable tags.
          </div>
          <div className="w-full xs:first-letter:ml-8 first-letter:ml-4 sm:mx-4">
            Create your own price and category tags with custom colors.
            When logging an expense, tap your tags, add a note, and submit.
          </div>
          <div className="
            mt-4 flex h-full relative
            lg:mx-10
            md:mx-6 md:mb-10
            sm:mx-4
             
          ">
              <div
                id="left-arrow"
                className="content-center text-xl transition-all duration-400 text-start absolute z-10 h-full w-6 bg-gradient-to-r from-white to-transparent"
                style={{ opacity: scrollerLeftArrow ? 1 : 0 }}
              >
                <div className="mb-4 h-fit">《</div>
                <div className="mt-4 h-fit">《</div>
              </div>
            
              <div
                id="right-arrow"
                className="content-center text-xl transition-all duration-400 text-end absolute right-0 z-10 h-full w-6 bg-gradient-to-r from-transparent to-white"
                style={{ opacity: scrollerRightArrow ? 1 : 0 }}
              >
                <div className="mb-4 h-fit">》</div>
                <div className="mt-4 h-fit">》</div>
              </div>
            <div
              className="
                overflow-x-scroll grow w-full flex flex-row
                border-y-1 bg-bad/3
              "
              ref={scrollerRef}
            >
              <div className="
                w-[300px] relative flex-shrink-0 mx-10 border-x-1 bg-white
              ">
                <Image
                  alt="page1"
                  src={'/about/page1.png'}
                  className="object-contain"
                  fill
                />
              </div>
              <div className="my-auto lg:mx-6">
                ➜
              </div>
              <div className="
                w-[300px] relative flex-shrink-0 mx-10 border-x-1 bg-white
              ">
                <Image
                  alt="page2"
                  src={'/about/page2.png'}
                  className="object-contain"
                  fill
                />
              </div>
              <div className="my-auto lg:mx-6">
                ➜
              </div>
              <div className="
                w-[300px] relative flex-shrink-0 mx-10 border-x-1 bg-white
              ">
                <Image
                  alt="page3"
                  src={'/about/page3.png'}
                  className="object-contain"
                  fill
                />
              </div>
            </div>
          </div>
        </div>
        <div className="
          flex-2 h-[calc(100dvh-140px)] content-end relative flex
          md:p-10 md:pb-10
          sm:flex-col-reverse sm:border-b-0 sm:mb-0 sm:pb-4
          flex-col p-4 mb-10 pb-10 border-b-1
        ">
          <div className="w-full my-4 sm:text-center first-letter:ml-4 xs:first-letter:ml-8 sm:first-letter:ml-0">
            View your expense history, filter by date, and explore your dashboard charts to see where your money goes.
          </div>
          <div className="w-full grow relative">
            <div className="w-full h-1/2 relative">
              <Image
                alt="dashboard"
                src={'/about/dashboard1.png'}
                className="object-contain"
                fill
              />
            </div>
            <div className="w-full h-1/2 relative">
              <Image
                alt="dashboard"
                src={'/about/dashboard2.png'}
                className="object-contain"
                fill
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
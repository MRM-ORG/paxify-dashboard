import React, { useRef } from 'react'
import { CaretUpOutlined, LeftOutlined, RightOutlined } from '@ant-design/icons'
import { Button, Select, Statistic } from "antd";
import { NextPage } from 'next';
import Image from 'next/image';

type Props = {
    stories: any
    analytics: any
}

const { Countdown } = Statistic;
const Stories: NextPage<Props> = ({ stories, analytics }) => {
    console.log({analytics})
    const impressions = analytics.filter((obj: { name: string; }) => obj.name === "reels_init")
    const scrollContainerRef = useRef<any>(null);
    const scrollToLeft = () => {
        if (scrollContainerRef.current) {
            const scrollAmount = 100;
            const currentScroll = scrollContainerRef.current.scrollLeft;
            scrollContainerRef.current.scrollTo({
                left: currentScroll - scrollAmount,
                behavior: 'smooth',
            });
        }
    };

    const scrollToRight = () => {
        if (scrollContainerRef.current) {
            const scrollAmount = 100;
            const currentScroll = scrollContainerRef.current.scrollLeft;
            scrollContainerRef.current.scrollTo({
                left: currentScroll + scrollAmount,
                behavior: 'smooth',
            });
        }
    };

    function countTitleMatches(impressions: any[], titleToMatch: any) {
        return impressions.reduce((totalMatches, impression) => {
          const story = impression.story;
          if (story && story.player && story.player[0] && story.player[0].layout) {
            const storyTitle = story.player[0].layout.title;
            if (storyTitle === titleToMatch) {
              return totalMatches + 1;
            }
          }
          return totalMatches;
        }, 0);
      }

      function calculateTotalMillisecondsFromTime(time: any) {
        // Split the time into hours, minutes, and seconds
        const [hours, minutes, seconds] = time.split(':').map(Number);
      
        // Calculate the total milliseconds for each component
        const hoursMs = hours * 60 * 60 * 1000;
        const minutesMs = minutes * 60 * 1000;
        const secondsMs = seconds * 1000;
      
        // Calculate the total milliseconds
        const totalMs = hoursMs + minutesMs + secondsMs;
      
        return totalMs;
      }

    return (
        <div className='mt-10 relative bg-white rounded-lg py-4 md:px-5'>

            <div className='flex md:flex-row flex-col justify-center md:justify-between items-center flex-wrap'>
                <h1 className='font-bold text-lg'>Stories</h1>
                <div className='space-x-2'>
                    <Select className='md:w-auto w-[140px]' defaultValue={"Your stories"} />
                    <Select className='md:w-auto w-[140px]' defaultValue={"Impressioin"} />
                </div>
            </div>

            <div
                ref={scrollContainerRef}
                className='overflow-hidden  flex flex-nowrap items-center transition-all'
                style={{ marginLeft: '0', marginRight: '0' }}
            >
                {
                    Array.from(stories).map((_: any, index) => (
                        <div key={index} style={{ flex: '0 0 auto' }} className='mt-10 mx-2'>
                            {_?.player[0]?.layout?.timer &&
                            <Countdown className='ml-2' value={Date.now() + calculateTotalMillisecondsFromTime(_?.player[0]?.layout?.timer)}/>
                            }
                            {/* <div className='w-[296px] mt-3 flex flex-col justify-end items-center h-[526px] rounded-md relative' style={{ background: `url(${_.player[0]?.content?.source}), lightgray 0px 0px / 100% 100% no-repeat`, backgroundSize: "cover" }}>
                                <div className='w-[250px] p-4 mb-2  rounded-[15px] bg-[#fff]' style={{ boxShadow: "4px 4px 20px 0px rgba(36, 36, 80, 0.10)" }}>
                                    <div className='flex gap-4'>
                                        <div className='border p-2 flex justify-center'>
                                            <div className='w-[60px]  h-[60px]' style={{ background: `url(${_?.container?.background?.src}), lightgray 0px 0px / 100% 100% no-repeat`, backgroundSize: "cover" }}></div>

                                        </div>
                                        <div className='flex-1 ml-5'>
                                            <h1>{_.player[0]?.layout?.title}</h1>
                                            <button className='px-1 mt-2 py-2 text-white rounded-md' style={{backgroundColor: _?.player[0]?.layout?.cta?.backgroundColor}}>{(_?.player[0]?.layout?.cta?.text).toUpperCase()}</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <p className='text-center mt-1 text-lg w-[296px]'>{_.player[0]?.layout?.title}</p> */}
                            <div style={{ flex: '0 0 auto' }} key={index} className='pb-[19px] mt-5 mx-2 w-[210px] h-[465px] border'>
                        <div className="flex flex-col items-center space-y-2 cursor-pointer ease-in transition">
                            <div className='relative'>
                            <img
                              src={_.player[0]?.content?.source}
                              alt={"img"}
                              className="w-full h-[338px] object-cover"
                            />
                            <div className="absolute top-3 right-3">
        <Image
          src="/logo/storyIcon.png"
          alt="edit"
          width={25}
          height={25}
          style={{ borderRadius: "2px" }}
          className="h-6 w-6 cursor-pointer"
        />
      </div>
                            </div>
                            <div className='flex flex-row justify-between ml-[5px] mr-[5px]'>
                            <div className='border p-2 flex justify-center'>
                                <div className='w-[52px] h-[52px]' style={{ background: `url(${_?.container?.background?.src}), lightgray 0px 0px / 100% 100% no-repeat`, backgroundSize: "cover" }}></div>
                                </div>
                                <div className='flex-1 w-[105px] ml-5'>
                                  <h1>{_.player[0]?.layout?.title}</h1>
                                            <button className='px-2 mt-2 py-1 text-white rounded-[16px]' style={{backgroundColor: _?.player[0]?.layout?.cta?.backgroundColor, fontSize: '12px'}}>{_?.player[0]?.layout?.cta?.text}</button>
                                        </div>
                            </div>
                        </div>
                        <div className='flex mt-3 justify-between items-center ml-3 mr-3'>
                            <h1 className='font-medium'>Impression</h1>
                            {/* <p className='font-bold'>18</p> */}
                            <div style={{backgroundColor: 'rgba(1, 234, 133, 0.10)',padding: '5px 8px 4.5px 8px', borderRadius: '100px'}}>
                              <CaretUpOutlined size={2} style={{ color: "#01EA85" }} /> {countTitleMatches(impressions, _.player[0]?.layout?.title)}
                            </div>
                        </div>

                    </div>
                        </div>
                    ))
                }
            </div>

            <div className='bg-white left-4  md:left-5 absolute bottom-[42%] transform -translate-y-1/2 rounded-full text-black border py-2 px-3 cursor-pointer'>
                <LeftOutlined onClick={scrollToLeft} className='text-xl' />
            </div>
            <div className='bg-white right-4  md:right-5 absolute bottom-[42%] transform -translate-y-1/2 rounded-full text-black border py-2 px-3 cursor-pointer'>
                <RightOutlined onClick={scrollToRight} className='text-xl' />
            </div>

        </div>
    )
}

export default Stories
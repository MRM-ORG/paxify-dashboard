import React, { useRef } from 'react'
import { LeftOutlined, RightOutlined } from '@ant-design/icons'
import { Button, Select } from "antd";
import { NextPage } from 'next';

type Props = {
    stories: any
    analytics: any
}

const Stories: NextPage<Props> = ({ stories, analytics }) => {
    console.log({stories})
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
                        <div key={index} style={{ flex: '0 0 auto' }} className='mt-10 mx-5'>
                            <h1 className='text-lg'>Impression <span className='font-bold text-lg'>{analytics.filter((obj: { name: string; }) => obj.name === "reels_init").length}</span></h1>
                            <div className='w-[296px] mt-3 flex flex-col justify-end items-center h-[526px] rounded-md relative' style={{ background: `url(${_.player[0]?.content?.source}), lightgray 0px 0px / 100% 100% no-repeat`, backgroundSize: "cover" }}>
                                <div className='w-[250px] p-4 mb-2  rounded-[15px] bg-[#fff]' style={{ boxShadow: "4px 4px 20px 0px rgba(36, 36, 80, 0.10)" }}>
                                    <div className='flex gap-4'>
                                        <div className='border p-2 flex justify-center'>
                                            <div className='w-[60px]  h-[60px]' style={{ background: `url(${_?.container?.background?.src}), lightgray 0px 0px / 100% 100% no-repeat`, backgroundSize: "cover" }}></div>

                                        </div>
                                        <div className='flex-1 ml-5'>
                                            <h1>{_.player[0]?.layout?.title}</h1>
                                            <button className='px-1 mt-2 py-2 text-white rounded-md' style={{backgroundColor: _?.player[0]?.layout?.cta?.backgroundColor}}>{_?.player[0]?.layout?.cta?.text}</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <p className='text-center mt-1 text-lg w-[296px]'>{_.player[0]?.layout?.title}</p>
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
import React from 'react'
import { Alert, DatePicker, Card } from 'antd'
import { CloseOutlined, CloseSquareFilled, InfoCircleOutlined } from '@ant-design/icons'
import { NextPage } from 'next'

const svgIcon = <svg xmlns="http://www.w3.org/2000/svg" width="28" height="26" viewBox="0 0 28 26" fill="none">
    <g clipPath="url(#clip0_0_169)">
        <path d="M6.16931 7.65473C6.41081 6.62616 7.87488 6.62616 8.11637 7.65473L8.81505 10.6306C8.89991 10.992 9.178 11.2767 9.53734 11.3699L12.5568 12.1537C13.5551 12.4128 13.5551 13.8304 12.5568 14.0895L9.53734 14.8733C9.178 14.9666 8.89991 15.2512 8.81505 15.6127L8.11637 18.5885C7.87487 19.6171 6.41081 19.6171 6.16931 18.5885L5.47063 15.6127C5.38577 15.2512 5.10768 14.9666 4.74834 14.8733L1.72892 14.0895C0.730577 13.8304 0.73058 12.4128 1.72892 12.1537L4.74834 11.3699C5.10768 11.2767 5.38577 10.992 5.47063 10.6306L6.16931 7.65473Z" fill="black" />
        <path d="M18.1693 1.64643C18.4108 0.617857 19.8749 0.617856 20.1164 1.64643L20.1362 1.73103C20.2211 2.09245 20.4992 2.37711 20.8585 2.47039L21.1282 2.54039C22.1265 2.79953 22.1265 4.21709 21.1282 4.47623L20.8585 4.54623C20.4992 4.63951 20.2211 4.92417 20.1362 5.28559L20.1164 5.37019C19.8749 6.39876 18.4108 6.39876 18.1693 5.37019L18.1495 5.28559C18.0646 4.92417 17.7865 4.63951 17.4272 4.54623L17.1575 4.47623C16.1592 4.21709 16.1592 2.79953 17.1575 2.54039L17.4272 2.47039C17.7865 2.37711 18.0646 2.09245 18.1495 1.73103L18.1693 1.64643Z" fill="black" />
        <path d="M21.3989 15.0296C21.6067 13.9478 23.1552 13.9478 23.363 15.0296L23.7772 17.1856C23.8464 17.5458 24.1072 17.8392 24.4568 17.9502L26.9955 18.7556C27.9257 19.0507 27.9257 20.3668 26.9955 20.6619L24.4568 21.4673C24.1072 21.5783 23.8464 21.8717 23.7772 22.2319L23.363 24.3879C23.1552 25.4697 21.6067 25.4697 21.3989 24.3879L20.9847 22.2319C20.9156 21.8717 20.6547 21.5783 20.3051 21.4673L17.7664 20.6619C16.8363 20.3668 16.8363 19.0507 17.7664 18.7556L20.3051 17.9502C20.6547 17.8392 20.9156 17.5458 20.9847 17.1856L21.3989 15.0296Z" fill="black" />
    </g>
    <defs>
        <clipPath id="clip0_0_169">
            <rect width="28" height="25" fill="white" transform="translate(0 0.5)" />
        </clipPath>
    </defs>
</svg>

type Props = {
    analytics: any
}

const Overview:NextPage<Props> = ({analytics}) => {
    return (
        <div className='mt-10'>

            <div className='flex justify-between flex-wrap'>
                <h1 className="font-bold text-lg lg:text-start lg:w-auto text-center w-full">Overview</h1>
                <DatePicker.RangePicker className=' lg:w-auto w-full' />
            </div>

            <Alert closeIcon={<CloseOutlined />} showIcon={true} icon={svgIcon} style={{ background: "#B4F4Ed", borderRadius: "6px", marginTop: "24px" }} message="Total impression is 11% higher than the previous period. Most viewed story group is Beef Empanadas with Chimichurri Sauce" />

            <div className='mt-7 grid grid-cols-1 lg:gap-0 gap-5 lg:grid-cols-3'>
                <Card>
                    <div className='flex flex-col items-center space-y-3'>
                        <h1 className='text-[#3a3a62] text-lg font-medium'>Avg. Engagement Rate <InfoCircleOutlined className="text-[0.8rem] ml-1 cursor-pointer relative bottom-[1.5px] " /></h1>
                        <h1 className='text-[#3a3a62] text-xl font-extrabold'>{((analytics.filter((obj: { name: string; }) => obj.name === "reels_init").length) / (analytics.filter((obj: { name: string; }) => obj.name === "reels_story_viewed").length)).toFixed(2)}%</h1>
                    </div>
                </Card>
                <Card>
                    <div className='flex flex-col items-center space-y-3'>
                        <h1 className='text-[#3a3a62] text-lg font-medium'>Avg. CTR <InfoCircleOutlined className="text-[0.8rem] ml-2 cursor-pointer relative bottom-[1.5px]" /></h1>
                        <h1 className='text-[#3a3a62] text-xl font-extrabold'>{((analytics.filter((obj: { name: string; }) => obj.name === "reels_init").length) / (analytics.filter((obj: { name: string; }) => obj.name === "reels_story_viewed").length)).toFixed(2)}%</h1>
                    </div>
                </Card>
                <Card>
                    <div className='flex flex-col items-center space-y-3'>
                        <h1 className='text-[#3a3a62]  text-lg font-medium'>Avg. Response Rate <InfoCircleOutlined className="text-[0.8rem] ml-1 cursor-pointer relative bottom-[1.5px]" /></h1>
                        <h1 className='text-[#3a3a62] text-xl font-extrabold'>{((analytics.filter((obj: { name: string; }) => obj.name === "reels_init").length) / (analytics.filter((obj: { name: string; }) => obj.name === "reels_story_viewed").length)).toFixed(2)}%</h1>
                    </div>
                </Card>
            </div>

        </div>
    )
}

export default Overview
import React from 'react'
import { Select, Button, DatePicker } from 'antd';
import { FileAddOutlined } from '@ant-design/icons';
import InteractionCard from './InteractionCard';
const { Option } = Select;

const InteractionPage = () => {
    return (
        <>
            <div className='grid grid-cols-1 lg:grid-cols-2 place-items-center space-y-4 lg:space-y-0 lg:place-items-start'>
                <div className='space-x-2 lg:space-y-0 space-y-4 '>

                    <Select defaultValue={"1"} placeholder="Story Group Status">
                        <Option value="1">Story Group Status</Option>
                        <Option value="2">Story Group Status</Option>
                    </Select>
                    <Select defaultValue={"option1"} placeholder="Select an option">
                        <Option value="option1">Story Status</Option>
                        <Option value="option2">Story Status</Option>
                    </Select>
                    <Select defaultValue={"option1"} placeholder="Select an option">
                        <Option value="option1">Interactives</Option>
                        <Option value="option2">Interactives</Option>
                    </Select>
                    <Select defaultValue={"option1"} placeholder="Select an option">
                        <Option value="option1">
                            <div className='flex  space-x-2'>
                                <div style={{ background: "url(https://cdn.britannica.com/36/123536-050-95CB0C6E/Variety-fruits-vegetables.jpg), lightgray 0px 0px / 100% 100% no-repeat", backgroundSize:"cover" }} className='h-[24px] w-[24px] relative top-2  rounded-[12px]'>
                                </div>
                                <p>Story Groups</p>
                            </div>
                        </Option>

                    </Select>
                </div>

                <div className='lg:ml-auto md:block flex justify-center items-center flex-col space-y-2 space-x-3'>
                    <Button className='bg-white' icon={<FileAddOutlined />}>Create report</Button>
                    <DatePicker.RangePicker className=' lg:w-auto w-full' />
                </div>
            </div>
            <div className='mt-5 flex justify-center lg:justify-end'>
                <Select defaultValue={"option1"} placeholder="Select an option">
                    <Option value="option1">
                        <div className='flex items-center  space-x-2'>
                            <svg xmlns="http://www.w3.org/2000/svg" width="17" height="16" viewBox="0 0 17 16" fill="none">
                                <path d="M4.80005 2V13" stroke="#666685" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                                <path d="M7.80005 11L4.80005 14L1.80005 11" stroke="#666685" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                                <path d="M7.80005 2H14.8" stroke="#666685" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                                <path d="M9.80005 6H14.8" stroke="#666685" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                                <path d="M11.8 10H14.8" stroke="#666685" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                            </svg>
                            <p>Newest to Oldest</p>
                        </div>
                    </Option>
                </Select>
            </div>
            <InteractionCard/>
        </>
    )
}

export default InteractionPage
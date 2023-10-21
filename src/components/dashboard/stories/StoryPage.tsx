import React from 'react';
import { Select, Badge, Button, Radio } from 'antd';
import { EyeOutlined, PicCenterOutlined, PlusOutlined, SearchOutlined, UnorderedListOutlined, WindowsOutlined } from '@ant-design/icons';
import Stories from './Stories';
import { NextPage } from 'next';
const { Option } = Select;

type Props = {
    stories: any
}

const StoryPage: NextPage<Props> = ({ stories }) => {

    return (
        <>
        <div className='grid grid-cols-1 lg:grid-cols-3 place-items-center space-y-4 lg:space-y-0 lg:place-items-start'>
            <div className='space-x-3 lg:space-y-0 space-y-4  col-span-2'>
                <Select defaultValue={"option1"} placeholder="Select an option">
                    <Option value="option1">Option 1 <Badge style={{ backgroundColor: "#8b62ff", marginLeft: "7px" }} count={1} /></Option>
                    <Option value="option2">Option 2 <Badge style={{ backgroundColor: "#8b62ff", marginLeft: "7px" }} count={1} /></Option>
                    <Option value="option3">Option 3 <Badge style={{ backgroundColor: "#8b62ff", marginLeft: "7px" }} count={1} /></Option>
                </Select>
                <Select defaultValue={"option1"} placeholder="Select an option">
                    <Option value="option1">Labels</Option>
                    <Option value="option2">Labels</Option>
                </Select>
                <Select defaultValue={"option1"} placeholder="Select an option">
                    <Option value="option1">Audiences</Option>
                    <Option value="option2">Audiences</Option>
                </Select>
                <Button className='bg-white' type='default' shape='default' icon={<svg xmlns="http://www.w3.org/2000/svg" width="17" height="16" viewBox="0 0 17 16" fill="none">
                    <path d="M8.08998 8.66668C8.45817 8.66668 8.75664 8.3682 8.75664 8.00001C8.75664 7.63182 8.45817 7.33334 8.08998 7.33334C7.72179 7.33334 7.42331 7.63182 7.42331 8.00001C7.42331 8.3682 7.72179 8.66668 8.08998 8.66668Z" stroke="#7C7C96" stroke-width="1.33333" stroke-linecap="round" stroke-linejoin="round" />
                    <path d="M12.7566 8.66668C13.1248 8.66668 13.4233 8.3682 13.4233 8.00001C13.4233 7.63182 13.1248 7.33334 12.7566 7.33334C12.3884 7.33334 12.09 7.63182 12.09 8.00001C12.09 8.3682 12.3884 8.66668 12.7566 8.66668Z" stroke="#7C7C96" stroke-width="1.33333" stroke-linecap="round" stroke-linejoin="round" />
                    <path d="M3.42329 8.66668C3.79148 8.66668 4.08996 8.3682 4.08996 8.00001C4.08996 7.63182 3.79148 7.33334 3.42329 7.33334C3.0551 7.33334 2.75662 7.63182 2.75662 8.00001C2.75662 8.3682 3.0551 8.66668 3.42329 8.66668Z" stroke="#7C7C96" stroke-width="1.33333" stroke-linecap="round" stroke-linejoin="round" />
                </svg>} />
                <Button className='bg-white' shape="default" type="default" icon={<SearchOutlined />} />
                <Button className='bg-white' shape="default" type="default" icon={<EyeOutlined />} />
                <Radio.Group>
                    <Radio.Button value="large"><WindowsOutlined /></Radio.Button>
                    <Radio.Button value="middle"><PicCenterOutlined /></Radio.Button>
                    <Radio.Button value="small"><UnorderedListOutlined /></Radio.Button>
                </Radio.Group>
            </div>
            <div className='lg:ml-auto'>
            <Button className='bg-[#8b62ff]' type="primary" icon={<PlusOutlined />}>
               New Story Group
            </Button>
            </div>
        </div>
        <Stories stories={stories}/>
        </>
    )

}

export default StoryPage
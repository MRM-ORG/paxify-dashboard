import React from 'react';
import { Select, Badge, Button, DatePicker} from 'antd';
import { FileAddOutlined, UngroupOutlined } from '@ant-design/icons';
import AnalyticsTable from './AnalyticsTable';
import { NextPage } from 'next';
const { Option } = Select;

type Props = {
  stories: any,
  analytics: any,
}
const AnalyticsHeader: NextPage<Props> = ({ stories, analytics}) => {
  return (
    <>
    <div className='grid grid-cols-1 lg:grid-cols-2 sm:place-items-center space-y-4 lg:space-y-0 place-items-start'>
            <div className='space-x-3 lg:space-y-0 space-y-4 '>
                <Select defaultValue={"status1"} placeholder="Select an option">
                    <Option value="status1">Status <Badge style={{ backgroundColor: "#8b62ff", marginLeft: "7px" }} count={1} /></Option>
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
                <Select defaultValue={"option1"} placeholder={"Column"}>
                    <Option value="option1"><UngroupOutlined/> Column</Option>
                </Select>
                
            </div>
            <div className='mx-auto lg:space-y-0 space-y-2 lg:block flex justify-center flex-col items-center space-x-3'>
              <Button className='bg-white' icon={<FileAddOutlined />}>Create report</Button>
              <DatePicker.RangePicker className=' lg:w-auto w-full' />
            </div>
        </div>
        <AnalyticsTable stories={stories} analytics={analytics}/>
    </>
  )
}

export default AnalyticsHeader
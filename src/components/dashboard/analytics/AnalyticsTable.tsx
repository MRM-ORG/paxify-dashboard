import React from 'react'
import { Table, Badge, Button } from 'antd';
import Link from 'next/link';
import type { ColumnsType, TableProps } from 'antd/es/table';
import { InfoCircleOutlined } from '@ant-design/icons';
import { NextPage } from 'next';


interface TableRow {
    key: string;
    storyGroup: React.ReactNode;
    status: React.ReactNode;
    labels: React.ReactNode;
    reach: number;
    impression: number;
    click:number
    skip:number,
    open:number
    share:number,
    complete:number,
    activeUsers:number
}

type Props = {
  stories: any,
  analytics: any,
}

const data: TableRow[] = [
    {
        key: '1',
        storyGroup:"",
        status:"Active",
        labels:"hi",
        reach:100,
        impression:100,
        click:19,
        skip:289,
        open:38,
        share:2,
        complete:3,
        activeUsers:20
    },
    {
        key: '2',
        storyGroup:"",
        status:"Disabled",
        labels:"hi",
        reach:49,
        impression:392,
        click:29,
        skip:202,
        open:219,
        share:2,
        complete:29,
        activeUsers:202
    },
    // Add more data rows as needed
];

const AnalyticsTable:NextPage<Props> = ({ stories, analytics }) => {
  const storyAnalytics = analytics?.filter((obj: { name: string; }) => obj.name === "reels_story_viewed");
  console.log({analytics})
  const analyticsCount: { [storyTitle: string]: number } = {};
  storyAnalytics?.forEach((analytic: any) => {
    const storyTitle = analytic?.story?.player[0]?.layout?.title;
    if (storyTitle) {
      analyticsCount[storyTitle] = (analyticsCount[storyTitle] || 0) + 1;
    }
  });

  const ctaAnalytics = analytics?.filter((obj: { name: string; }) => obj.name === "cta_clicked");
  console.log({ctaAnalytics})
  const ctaCount: { [storyTitle: string]: number } = {};
  ctaAnalytics?.forEach((analytic: any) => {
    console.log({analytic})
    const storyTitle = analytic?.story?.layout?.title;
    if (storyTitle) {
      ctaCount[storyTitle] = (ctaCount[storyTitle] || 0) + 1;
    }
  });
  const impressions = analytics?.filter((obj: { name: string; }) => obj.name === "reels_init")

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
  // Update the stories with the analytics count
  stories.forEach((story: any) => {
    const storyTitle = story.player[0]?.layout?.title;
    if (storyTitle) {
      story.analyticsCount = analyticsCount[storyTitle] || 0;
      story.ctaCount = ctaCount[storyTitle] || 0;
      story.reach = countTitleMatches(impressions, storyTitle);
      story.impression = countTitleMatches(impressions, storyTitle);
      story.skip = 0;
      story.share = 0;
      story.complete = 0;
    }
  });
  
  console.log(stories);

  const columns: any = [
    {
      title: 'Story',
      className:"text-[12px]",
      dataIndex: 'player',
      key: 'player',
      render: (_text: any, story: any) => (
        <Link href="interaction" className="flex items-center space-x-3 w-fit cursor-pointer">
        <div className='flex items-center'>
            <div className="relative rounded-full overflow-hidden w-16 h-16">
                <div className="absolute inset-0 border-2 border-[#bdbdca] rounded-full"></div>
                <div className="absolute inset-1 rounded-full bg-white">
                    <img
                        style={{ borderRadius: "50%" }}
                        src={story?.player[0]?.content?.source}
                        alt={"https://cdn.britannica.com/36/123536-050-95CB0C6E/Variety-fruits-vegetables.jpg"}
                        className="w-full h-full object-cover"
                    />
                </div>
            </div>
        </div>
        <p className="text-sm text-center max-w-[130px] break-words font-medium text-primary">{story?.player[0]?.layout?.title}</p>
    </Link>
      )
    },
    {
      title: 'Status',
      className:"text-[12px]",
      width:"100px",
      dataIndex: 'status',
      key: 'status',
      render: (_text: any, { status }: any) => {
        return <Badge status={status === true ? "success" : "error"} text={status} />
      }
    },
    {
      title: 'Labels',
      className:"text-[12px]",
      dataIndex: 'labels',
      key: 'labels',
      render:(_text: any, { labels }: any) => {
          return <Button type="default">See Labels</Button>
      }
    },
    {
      title:()=>{return <div className="flex space-x-2"><p>Reach</p><InfoCircleOutlined /> </div>},
      className:"text-[12px]",
      dataIndex: 'reach',
      key: 'reach',
      sorter: (a: any, b: any) => a.reach - b.reach,
    },
    {
      title: ()=>{return <div className="flex space-x-2"><p>Impression</p><InfoCircleOutlined /> </div>},
      className:"text-[12px]",
      dataIndex: 'impression',
      key: 'impression',
      sorter: (a: any, b: any) => a.impression - b.impression,
    },
    {
      title: ()=>{return <div className="flex space-x-2"><p>Click</p><InfoCircleOutlined /> </div>},
      className:"text-[12px]",
      dataIndex: 'ctaCount',
      key: 'ctaCount',
      sorter: (a: any, b: any) => a.ctaCount - b.ctaCount,
    },
    {
      title: ()=>{return <div className="flex space-x-2"><p>Skip</p><InfoCircleOutlined /> </div>},
      className:"text-[12px]",
      dataIndex: 'skip',
      key: 'skip',
      sorter: (a: any, b: any) => a.skip - b.skip,
    },
    {
      title: ()=>{return <div className="flex space-x-2"><p>Open</p><InfoCircleOutlined /> </div>},
      className:"text-[12px]",
      dataIndex: 'analyticsCount',
      key: 'analyticsCount',
      sorter: (a: any, b: any) => a.analyticsCount - b.analyticsCount,
    },
    {
      title: ()=>{return <div className="flex space-x-2"><p>Share</p><InfoCircleOutlined /> </div>},
      className:"text-[12px]",
      dataIndex: 'share',
      key: 'share',
      sorter: (a: TableRow, b: TableRow) => a.share - b.share,
    },
    {
      title: ()=>{return <div className="flex space-x-2"><p>Complete</p><InfoCircleOutlined /> </div>},
      className:"text-[12px]",
      dataIndex: 'complete',
      key: 'complete',
      sorter: (a: any, b: any) => a.complete - b.complete,
    },
    {
      title: ()=>{return <div className="flex space-x-2"><p>Active Users</p><InfoCircleOutlined /> </div>},
      className:"text-[12px]",
      dataIndex: 'activeUsers',
      key: 0,
    },
  ];
    return (
        <div className='mt-20 max-w-full overflow-x-auto'>
            <Table scroll={{x:true}} columns={columns} dataSource={stories} size='small'/>
        </div>
    )
}

export default AnalyticsTable
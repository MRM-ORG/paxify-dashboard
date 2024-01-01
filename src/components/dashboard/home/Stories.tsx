import Reels from "../../pages/Reels";
import { Space, Statistic } from "antd";
import { NextPage } from "next";
import { useRef } from "react";

type Props = {
  // analytics: any;
};

const { Countdown } = Statistic;
const Stories: NextPage<Props> = () =>
  // { analytics }
  {
    // const impressions = analytics.filter(
    //   (obj: { name: string }) => obj.name === "reels_init"
    // );
    const scrollContainerRef = useRef<any>(null);
    const scrollToLeft = () => {
      if (scrollContainerRef.current) {
        const scrollAmount = 250;
        const currentScroll = scrollContainerRef.current.scrollLeft;
        scrollContainerRef.current.scrollTo({
          left: currentScroll - scrollAmount,
          behavior: "smooth",
        });
      }
    };

    const scrollToRight = () => {
      if (scrollContainerRef.current) {
        const scrollAmount = 250;
        const currentScroll = scrollContainerRef.current.scrollLeft;
        scrollContainerRef.current.scrollTo({
          left: currentScroll + scrollAmount,
          behavior: "smooth",
        });
      }
    };

    // function countTitleMatches(impressions: any[], titleToMatch: any) {
    //   return impressions.reduce((totalMatches, impression) => {
    //     const story = impression.story;
    //     if (story && story.player && story.player[0] && story.player[0].layout) {
    //       const storyTitle = story.player[0].layout.title;
    //       if (storyTitle === titleToMatch) {
    //         return totalMatches + 1;
    //       }
    //     }
    //     console.log({totalMatches})
    //     return totalMatches;
    //   }, 0);
    // }
    function countTitleMatches(impressions: any[], titleToMatch: any): number {
      return impressions.reduce((totalMatches, impression) => {
        const storyTitle = impression?.story?.player?.[0]?.layout?.title;

        if (storyTitle === titleToMatch) {
          return totalMatches + 1;
        }
        // console.log({totalMatches})
        return totalMatches;
      }, 0);
    }

    function calculateTotalMillisecondsFromTime(time: any) {
      // Split the time into hours, minutes, and seconds
      const [hours, minutes, seconds] = time.split(":").map(Number);

      // Calculate the total milliseconds for each component
      const hoursMs = hours * 60 * 60 * 1000;
      const minutesMs = minutes * 60 * 1000;
      const secondsMs = seconds * 1000;

      // Calculate the total milliseconds
      const totalMs = hoursMs + minutesMs + secondsMs;

      return totalMs;
    }

    return (
      <div className="mt-10 relative bg-white rounded-lg py-4 md:px-5">
        <div className="flex md:flex-row flex-col justify-center md:justify-between items-center flex-wrap">
          <h1 className="font-bold text-lg">Stories Preview</h1>
        </div>
        <Reels />
        <div className="mt-5" />
      </div>
    );
  };

export default Stories;

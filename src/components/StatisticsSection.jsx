import React from "react";
import StatisticItem from "./StatisticsItem";
import { motion } from "framer-motion";
import { fadeInFramer, slideInLeft } from "../helper/fadeInFramer.js";
import { Persons } from "../assets/index.js";

const statisticsData = [
  {
    icon: Persons,
    value: 2000,
    label: "Chưa có nội dung",
  },
  {
    icon: Persons,
    value: 500,
    label: "Chưa có nội dung",
  },
  {
    icon: Persons,
    value: 1950000,
    label: "Chưa có nội dung",
  },
  {
    icon: Persons,
    value: 5000000,
    label: "Chưa có nội dung",
  },
];

function StatisticsSection() {
  return (
    <section
      className="flex flex-wrap gap-10 justify-between items-center px-28 py-16 bg-slate-100 max-md:px-5"
      id="rating"
    >
      <motion.div
        className="flex overflow-hidden flex-col self-stretch my-auto min-w-[240px] w-[540px] max-md:max-w-full"
        variants={slideInLeft(0)}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.5 }}
      >
        <h2 className="overflow-hidden max-w-full text-4xl font-semibold leading-10 text-neutralDGrey w-[408px]">
          Tiêu đề{" "}
          <span className="text-brandSecondary">Chưa có nội dung ở đây</span>
        </h2>
        <p className="mt-2 text-base text-zinc-900 max-md:max-w-full">
          Chưa có nội dung ở đây Chưa có nội dung ở đây Chưa có nội dung ở đây
          Chưa có nội dung ở đây
        </p>
      </motion.div>

      <motion.div
        className="flex overflow-hidden flex-col items-center self-stretch my-auto min-w-[240px] max-md:max-w-full"
        variants={fadeInFramer("up", 0.2)}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.5 }}
      >
        <div className="flex overflow-hidden flex-wrap gap-8 items-center whitespace-nowrap max-md:max-w-full">
          {statisticsData.slice(0, 2).map((item, index) => (
            <StatisticItem key={index} {...item} />
          ))}
        </div>
        <div className="flex overflow-hidden flex-wrap gap-8 items-center mt-10 max-md:max-w-full">
          {statisticsData.slice(2).map((item, index) => (
            <StatisticItem key={index} {...item} />
          ))}
        </div>
      </motion.div>
    </section>
  );
}

export default StatisticsSection;

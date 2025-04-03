import CountUp from "react-countup";

function StatisticItem({ icon, value, label }) {
  return (
    <div className="flex gap-4 items-center self-stretch my-auto min-w-[240px]">
      <img
        loading="lazy"
        src={icon}
        alt=""
        className="object-contain shrink-0 self-stretch my-auto w-12 aspect-square"
      />
      <div className="flex overflow-hidden flex-col self-stretch my-auto w-[191px]">
        <div className="text-3xl font-bold leading-none text-neutral-600">
          {<CountUp start={0} duration={3} end={value} separator="," />}
        </div>
        <div className="text-base text-neutral-500">{label}</div>
      </div>
    </div>
  );
}

export default StatisticItem;

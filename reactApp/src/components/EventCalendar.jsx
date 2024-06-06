import React from "react";
import { Badge, Calendar } from "antd";
const serverData = [
  {
    date: "24.06.2024",
    title: "test content on calendar",
  },
  {
    date: "14.06.2024",
    title: "second work",
  },
];
const getListData = (value) => {
  //   console.log(value.$d.toLocaleDateString());
  let listData = [];
  serverData.forEach((item) => {
    // console.log(value.$d.toLocaleDateString() === item.date);
    if (value.$d.toLocaleDateString() === item.date) {
      listData.push({ type: "warning", content: item.title });
    }
  });
  //   switch (value.date()) {
  //     case 8:
  //       listData = [
  //         {
  //             type: "warning",
  //           content: "This is warning event.",
  //         },
  //         {
  //           type: "success",
  //           content: "This is usual event.",
  //         },
  //       ];
  //       break;
  // case 10:
  //   listData = [
  //     {
  //       type: "warning",
  //       content: "This is warning event.",
  //     },
  //     {
  //       type: "success",
  //       content: "This is usual event.",
  //     },
  //     {
  //       type: "error",
  //       content: "This is error event.",
  //     },
  //   ];
  //   break;
  // case 15:
  //   listData = [
  //     {
  //       type: "warning",
  //       content: "This is warning event",
  //     },
  //     {
  //       type: "success",
  //       content: "This is very long usual event......",
  //     },
  //     {
  //       type: "error",
  //       content: "This is error event 1.",
  //     },
  //     {
  //       type: "error",
  //       content: "This is error event 2.",
  //     },
  //     {
  //       type: "error",
  //       content: "This is error event 3.",
  //     },
  //     {
  //       type: "error",
  //       content: "This is error event 4.",
  //     },
  //   ];
  //   break;
  // default:
  //   }
  //   console.log(listData);
  //   length > 0 ? listData : [];
  return listData;
};
const getMonthData = (value) => {
  if (value.month() === 8) {
    return 1394;
  }
};

function EventCalendar({ events, user }) {
  const monthCellRender = (value) => {
    const num = getMonthData(value);
    return num ? (
      <div className="notes-month">
        <section>{num}</section>
        <span>Backlog number</span>
      </div>
    ) : null;
  };
  const dateCellRender = (value) => {
    const formatedDate = value.$d.toLocaleDateString();
    const listData = events.filter((event) => {
      const dateFilter = event.date === formatedDate;
      const userFilter = event.author === user || event.guest === user;
      return dateFilter && userFilter;
    });
    // const listData = getListData(value);
    return (
      <ul className="events">
        {listData.map((item) => (
          <li key={item.title}>
            <Badge status="warning" text={item.title} />
          </li>
        ))}
        {/* {listData.map((item) => (
          <li key={item.content}>
            <Badge status={item.type} text={item.content} />
          </li>
        ))} */}
      </ul>
    );
  };
  const cellRender = (current, info) => {
    if (info.type === "date") return dateCellRender(current);
    if (info.type === "month") return monthCellRender(current);
    return info.originNode;
  };
  return (
    <Calendar
      onSelect={(date, { source }) => {
        // console.log(date);
        // console.log(source);
        // if (source === "date") {
        //   console.log("Panel Select:", source);
        // }
      }}
      cellRender={cellRender}
    />
  );
}

export { EventCalendar };

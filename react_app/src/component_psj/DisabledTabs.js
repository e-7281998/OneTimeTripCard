import * as React from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";

export default function DisabledTabs() {
  const [value, setValue] = React.useState(2);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Tabs
      value={value}
      onChange={handleChange}
      aria-label="disabled tabs example"
    >
      <Tab label="OTT CARD란?" />
      <Tab label="카드 혜택" />
      <Tab label="등급제" />
      <Tab label="카드 컬렉션" />
      <Tab label="여행 카드 서비스" />
      <Tab label="여행 추천 서비스" />
      <Tab label="배송 서비스" />
      <Tab label="이벤트" />
      <Tab label="공지사항" />
      <Tab label="Disabled" disabled />
    </Tabs>
  );
}

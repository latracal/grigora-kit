import { Tab, Tabs as TabsComponent, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";

const TabBlock = ({ data }) => (
  <TabsComponent>
    <TabList className="tabs-header">
      {data.map(({ heading }, i) => (
        <Tab key={i} className="general">{heading}</Tab>
      ))}
    </TabList>
    {data.map(({ body }, i) => (
      <TabPanel key={i}>{body}</TabPanel>
    ))}
  </TabsComponent>
);

export default TabBlock;
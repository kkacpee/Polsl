import React from 'react';
import { makeStyles, Theme } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Box from '@material-ui/core/Box';
import AccommodationList from './Accommodation/AccommodationList';
import OrganizerList from './Organizer/OrganizerList';
import EmergencyNumberList from './EmergencyNumber/EmergencyNumberList';
import SponsorList from './Sponsor/SponsorList';
import PointOfInterestList from './PointOfInterest/PointOfInterestList';
import PointOfInterestTypeList from './PointOfInterest/PointOfInterestTypeList';
import BuildingPlanList from './BuildingPlan/BuildingPlan';
import ParticipantList from './Participant/ParticipantList';
import PresentationTypeList from './Presentation/PresentatonTypeList';
import RateList from './Rate/RateList';
import RateCriterionList from './Rate/RateCriterionList';
import RateCriterionTypeList from './Rate/RateCriterionTypeList';

interface TabPanelProps {
  children?: React.ReactNode;
  index: any;
  value: any;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`wrapped-tabpanel-${index}`}
      aria-labelledby={`wrapped-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          {children}
        </Box>
      )}
    </div>
  );
}

function a11yProps(index: any) {
  return {
    id: `wrapped-tab-${index}`,
    'aria-controls': `wrapped-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
  },
}));

export default function Misc() {
  const classes = useStyles();
  const [value, setValue] = React.useState('one');

  const handleChange = (event: React.ChangeEvent<{}>, newValue: string) => {
    setValue(newValue);
  };

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Tabs value={value} 
        onChange={handleChange} 
        variant="scrollable"
        scrollButtons="auto"
        aria-label="tables" > 
          <Tab value="one" label="Accommodations" {...a11yProps('one')} />
          <Tab value="two" label="Sponsors" {...a11yProps('two')} />
          <Tab value="three" label="Emergency Numbers" {...a11yProps('three')} />
          <Tab value="four" label="Organizers" {...a11yProps('four')} />
          <Tab value="five" label="Building Plans" {...a11yProps('five')} />
          <Tab value="six" label="Points of Interest" {...a11yProps('six')} />
          <Tab value="seven" label="Point of Interest Types" {...a11yProps('seven')} />
          <Tab value="eight" label="Participants" {...a11yProps('eight')} />
          <Tab value="nine" label="Presentation Types" {...a11yProps('nine')} />
          <Tab value="ten" label="Rates" {...a11yProps('ten')} />
          <Tab value="eleven" label="Rate Criteria" {...a11yProps('eleven')} />
          <Tab value="twelve" label="Rate Criterion Types" {...a11yProps('twelve')} />
        </Tabs>
      </AppBar>
      <TabPanel value={value} index="one">
        {AccommodationList}
      </TabPanel>
      <TabPanel value={value} index="two">
        {SponsorList}
      </TabPanel>
      <TabPanel value={value} index="three">
        {EmergencyNumberList}
      </TabPanel>
      <TabPanel value={value} index="four">
        {OrganizerList}
      </TabPanel>
      <TabPanel value={value} index="five">
        {BuildingPlanList}
      </TabPanel>
      <TabPanel value={value} index="six">
        {PointOfInterestList}
      </TabPanel>
      <TabPanel value={value} index="seven">
        {PointOfInterestTypeList}
      </TabPanel>
      <TabPanel value={value} index="eight">
        {ParticipantList}
      </TabPanel>
      <TabPanel value={value} index="nine">
        {PresentationTypeList}
      </TabPanel>
      <TabPanel value={value} index="ten">
        {RateList}
      </TabPanel>
      <TabPanel value={value} index="eleven">
        {RateCriterionList}
      </TabPanel>
      <TabPanel value={value} index="twelve">
        {RateCriterionTypeList}
      </TabPanel>
    </div>
  );
}
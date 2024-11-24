import { useState } from "react";
import styled from "styled-components";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";

import Experience, { IExperience } from "@/components/Experience";

import { education, jobs, personalProjects } from "@/data/index";
import { injectUnrerenderableSoundEffect } from "@/utils/soundUtils";

import { solidWhite, grayDark1 } from "@/styles/abstracts/_variables";

const Categories = styled(Tabs)`
  border-bottom: 1px solid ${grayDark1};

  button {
    text-transform: none;
    cursor: none;
  }

  .MuiTabs-indicator {
    background-color: ${solidWhite};
  }

  @media screen and (max-width: 1024px) {
    .MuiTab-root {
      font-size: 1rem;
    }
  }
`;

const experiencesMap = new Map([
  ["Education", education],
  ["Jobs", jobs],
  ["Personal", personalProjects],
]);

const CategorySelector: React.FC = () => {
  const [disposableSoundPlayer, setDisposableSoundPlayer] = useState(<></>);
  const [selectedCategory, setSelectedCategory] = useState("Jobs");

  const renderExperiences = (selectedTab) => {
    return experiencesMap.get(selectedTab).map((data: IExperience) => {
      return (
        <Experience
          key={Math.random()}
          title={data.title}
          where={data.where}
          format={data.format}
          timespan={data.timespan}
          link={data.link}
          extraLink={data.extraLink}
          description={data.description}
        />
      );
    });
  };

  return (
    <>
      <Categories
        indicatorColor="secondary"
        textColor="inherit"
        value={selectedCategory}
        variant="fullWidth"
        aria-label="Experience categories tabs"
        aria-controls="tabpanel-experiences"
        aria-owns=""
        onChange={(_, newValue) => {
          injectUnrerenderableSoundEffect(
            setDisposableSoundPlayer,
            "tabChange"
          );
          setSelectedCategory(newValue);
        }}
      >
        <Tab
          id="tab-education"
          aria-controls="tabpanel-experiences"
          tabIndex={0}
          role="tab"
          aria-label="Select education category"
          value="Education"
          label="Education"
        />
        <Tab
          id="tab-jobs"
          aria-controls="tabpanel-experiences"
          tabIndex={0}
          role="tab"
          aria-label="Select jobs category"
          value="Jobs"
          label="Jobs"
        />
        <Tab
          id="tab-personal"
          aria-controls="tabpanel-experiences"
          tabIndex={0}
          role="tab"
          aria-label="Select personal category"
          value="Personal"
          label="Personal"
        />
      </Categories>
      {renderExperiences(selectedCategory)}
      {disposableSoundPlayer}
    </>
  );
};

export default CategorySelector;

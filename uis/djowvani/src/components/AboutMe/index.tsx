import React from "react";
import styled from "styled-components";
import Image from "next/image";

import {
  professionalBio_1,
  professionalBio_2,
  personalBio_1,
  personalBio_2,
} from "@/data/index";

export const About = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  width: 100%;
  height: 100%;

  @media screen and (min-width: 1024px) {
    div:nth-child(1) {
      text-align: right;
    }
  }

  @media screen and (max-width: 1024px) {
    padding: 0 0 15rem 0;

    flex-direction: column;
    div {
      padding: 2rem 1rem;
    }
  }
`;

export const ProfilePictureContainer = styled.div`
  height: 15rem;
  width: 15rem;
  border-radius: 20%;
  filter: grayscale(1);
  pointer-events: none;
  user-select: none;

  * {
    border-radius: 20%;
  }

  /* FIX FOR SAFARI */
  img {
    position: static !important;
  }
`;

export const ProfilePicture = styled.img`
  height: 15rem;
  width: 15rem;
  border-radius: 20%;
  background-position: center;
  background-size: cover;
  filter: grayscale(1);
  pointer-events: none;
  user-select: none;
`;

export const Yoe = styled.span`
  font-size: 0.85rem;

  @media screen and (max-width: 1024px) {
    font-size: 1rem;
  }
`;

export const Infos = styled.div`
  width: 30rem;
  white-space: pre-line;

  & > * {
    margin: 1rem 0;
  }

  @media screen and (max-width: 1024px) {
    text-align: center;
    padding: 2rem 0;
  }
`;

const AboutMe = () => {
  const firstJobEpochTimestamp = 1514764800;
  const epochMilliseconds = firstJobEpochTimestamp * 1000;
  const epochDate = new Date(epochMilliseconds);
  const currentDate = new Date();
  const timeDifference = currentDate.getTime() - epochDate.getTime();
  const yoe = Math.floor(timeDifference / (1000 * 60 * 60 * 24 * 365.25));

  const getProfilePicture = () => {
    var chance = Math.random();
    if (chance < 0.01) {
      return "/img/old.webp";
    }
    return "/img/profile.webp";
  };

  return (
    <About tabIndex={0} role="group">
      <Infos>
        <p>{professionalBio_1}</p>
        <p>{professionalBio_2}</p>
      </Infos>
      <ProfilePictureContainer>
        <Image
          src={getProfilePicture()}
          fill={true}
          alt="Picture of the author"
        />
      </ProfilePictureContainer>
      <Infos>
        <p>{personalBio_1}</p>
        <Yoe>{yoe} years of experience.</Yoe>
        <p>{personalBio_2}</p>
      </Infos>
    </About>
  );
};

export default AboutMe;

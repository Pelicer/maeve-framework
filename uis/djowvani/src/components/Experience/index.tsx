import { useEffect, useRef } from "react";
import styled from "styled-components";

import { experienceAnimation } from "@/styles/abstracts/_animations";
import { solidWhite } from "@/styles/abstracts/_variables";

const Container = styled.div`
  display: flex;
  flex-direction: column;

  ${experienceAnimation}
`;

const Title = styled.label`
  font-size: 1.2rem;
  font-style: italic;
  text-shadow: 0px 0px 15px white;
`;

const Where = styled.a`
  font-size: 0.8rem;
  width: fit-content;
  margin-top: 10px;
  text-decoration: underline;

  &:focus-visible {
    outline: 1px solid ${solidWhite};
  }

  @media screen and (max-width: 1024px) {
    font-size: 1rem;
  }
`;

const Timespan = styled.label`
  font-style: italic;
  font-size: 0.7rem;

  @media screen and (max-width: 1024px) {
    font-size: 1rem;
  }
`;

const Description = styled.p`
  font-size: 0.9rem;
  margin-top: 0.5rem;

  @media screen and (max-width: 1024px) {
    font-size: 1rem;
  }
`;

type TExtraLink = {
  content: string;
  source: string;
  aria?: string;
};

export interface IExperience {
  title: string;
  where?: string;
  format?: string;
  timespan: string;
  description: string;
  link?: string;
  extraLink?: TExtraLink;
  aria?: string;
}

const Experience: React.FC<IExperience> = ({
  title,
  where,
  format,
  timespan,
  description,
  link,
  extraLink,
}) => {
  const descriptionRef = useRef(null);

  useEffect(() => {
    if (descriptionRef.current && extraLink) {
      var extraLinkElement = document.createElement("a");
      extraLinkElement.tabIndex = 0;
      extraLinkElement.className = "extraLink";
      extraLinkElement.target = "_blank";
      extraLinkElement.innerHTML = extraLink.content;
      extraLinkElement.href = extraLink.source;

      descriptionRef.current.getAttribute("data-has-extra-link") === "true" &&
        descriptionRef.current.appendChild(extraLinkElement);
    }
  }, [descriptionRef]);

  return (
    <Container id="knowledge-experiences">
      {title && (
        <Title
          id={`experience-on-${title}`}
          aria-label={title}
          aria-describedby={`experience-on-${title}-at-${where}-description`}
        >
          {title}
        </Title>
      )}
      {where && (
        <Where
          tabIndex={0}
          role="link"
          id={`experience-at-${where}`}
          onClick={() => link && window.open(link, "_blank")}
          onKeyDown={(event) => {
            if (event.key === "Enter") link && window.open(link, "_blank");
          }}
        >
          {where}
        </Where>
      )}
      {format && <Timespan>{format}</Timespan>}
      {timespan && (
        <Timespan
          id={`experience-in-${timespan}`}
          aria-label={`${title} at ${where} in ${timespan}`}
        >
          {timespan}
        </Timespan>
      )}
      {description && (
        <Description
          id={`experience-on-${title}-at-${where}-description`}
          ref={descriptionRef}
          data-has-extra-link={`${Boolean(extraLink)}`}
          aria-label={`${title} at ${where} description`}
          aria-labelledby={`experience-on-${title}`}
        >
          {description}
        </Description>
      )}
    </Container>
  );
};

export default Experience;

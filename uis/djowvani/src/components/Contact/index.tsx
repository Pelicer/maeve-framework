import styled from "styled-components";
import Image from "next/image";

import MailMe from "@/components/MailMe";

import { whereToFindMe } from "@/data/index";
import { getScrollYLimit } from "@/utils/scrollUtils";

import { socialMediasAnimation } from "@/styles/abstracts/_animations";
import { solidWhite } from "@/styles/abstracts/_variables";

const ContactContainer = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;

  & h2 {
    user-select: none;
    pointer-events: none;
  }
`;

const SocialMediasContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  position: relative;
`;

const ImageContainer = styled.div`
  margin: 15px;
  transition: all 0.5s;

  ${socialMediasAnimation}

  &:hover {
    filter: drop-shadow(0px 0px 10px black) invert(1);
  }
`;

const StyledImage = styled(Image)`
  filter: brightness(0) invert(1);

  &:focus-visible {
    outline: 1px solid ${solidWhite};
    filter: drop-shadow(0px 0px 10px black) invert(1);
  }
`;

const renderContacts = () => {
  return whereToFindMe.map((contact) => {
    return (
      <ImageContainer key={contact.altText}>
        <StyledImage
          tabIndex={0}
          role="button"
          src={contact.srcPath}
          alt={contact.altText}
          onClick={() => window.open(contact.link, "_blank")}
          onKeyDown={(event) => {
            if (event.key === "Enter") window.open(contact.link, "_blank");
          }}
          aria-label={contact.aria}
          width={30}
          height={30}
        />
      </ImageContainer>
    );
  });
};

const Contact: React.FC = () => {
  const handleFocus = (event) => {
    if (event.type === "Tab") {
      window.scrollTo(0, getScrollYLimit());
    }
  };

  return (
    <ContactContainer tabIndex={0} onFocus={handleFocus} role="group">
      <h2>Where else to find me</h2>
      <SocialMediasContainer>
        <>
          {renderContacts()}
          {/* <ImageContainer>
            <StyledImage
              tabIndex={0}
              role="button"
              src={"/img/email-icon.png"}
              alt={"contact.altText"}
              onClick={() =>
                (window.location.href = "mailto:gioanhesini@gmail.com")
              }
              onKeyDown={(event) => {
                if (event.key === "Enter")
                  window.location.href = "mailto:gioanhesini@gmail.com";
              }}
              aria-label={"Send Giovani an email"}
              width={30}
              height={30}
            />
          </ImageContainer> */}
        </>
      </SocialMediasContainer>
      <MailMe />
    </ContactContainer>
  );
};

export default Contact;

import { useContext } from "react";
import Image from "next/image";
import styled, { css } from "styled-components";
import Typewriter from "typewriter-effect";

import { SettingsContext } from "@/context/settingsContext";
import { useMailMe } from "@/hooks/useMailMe";
import TextInput from "@/components/TextInput";

import {
  formErrorColor,
  grayDark2,
  greenLight,
  modalZIndex,
  solidWhite,
} from "@/styles/abstracts/_variables";
import { isMobile } from "@/utils/windowUtils";

interface IButton {
  isLoadingSendEmail: boolean;
  tabNavigationUnlock: boolean;
}

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 80rem;
  height: 40rem;
  background: ${grayDark2};
  flex-direction: column;
  align-items: center;

  img {
    opacity: 0.25;
    scale: 0.85;
    height: inherit !important;
    width: inherit !important;
    inset: auto !important;
  }

  @media screen and (max-width: 1024px) {
    width: 25rem;
    height: 50rem;
    background-position: right;

    img {
      position: absolute;
      opacity: 0.3;
      scale: 2;
    }
  }
`;

const Instructions = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 20px;
  align-items: center;
  justify-content: center;

  @media screen and (max-width: 1024px) {
    width: 80%;
  }

  & > p:last-child {
    margin-top: 5px;
  }
`;

const MailBox = styled.form`
  width: 30rem;
  margin-top: 1rem;
  z-index: ${modalZIndex};

  @media screen and (max-width: 1024px) {
    width: 80%;
  }
`;

const MailBoxHeader = styled.div`
  display: flex;
  justify-content: space-between;

  @media screen and (max-width: 1024px) {
    flex-direction: column;
  }

  & > * {
    width: 14rem;

    @media screen and (max-width: 1024px) {
      width: 100%;
    }
  }
`;

const MailBoxBody = styled.div`
  margin-top: 2rem;
`;

const MailBoxFooter = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 1rem;
`;

const Button = styled.button<IButton>`
  opacity: ${({ isLoadingSendEmail }) => (isLoadingSendEmail ? "0" : "1")};
  height: 3rem;
  width: 5rem;
  border-radius: 2rem;
  background: transparent;
  outline: 1px solid ${solidWhite};
  color: ${solidWhite};
  transition: opacity 1s;
  transition: outline 0s;
  transition: font-weight 0s;

  ${({ tabNavigationUnlock }) =>
    tabNavigationUnlock &&
    css`
      transition: 1s all;
    `};

  &:focus-visible {
    font-weight: bold;
    outline: 2px solid ${solidWhite};
  }
`;

const LoadingSendEmail = styled.div<{ isLoadingSendEmail: boolean }>`
  position: absolute;
  height: 2rem;
  width: 2rem;
  background-size: contain;
  background-repeat: no-repeat;
  opacity: ${({ isLoadingSendEmail }) => (isLoadingSendEmail ? "1" : "0")};
  background-image: url("/img/loading.gif");
  transition: 1s all;
`;

const SuccessTypewriterContainer = styled.div<{ isEmailSent: boolean }>`
  display: flex;
  flex-direction: row;
  text-align: center;

  .Typewriter__wrapper,
  .Typewriter__cursor {
    display: ${({ isEmailSent }) => (isEmailSent ? "inline" : "none")};
    opacity: ${({ isEmailSent }) => (isEmailSent ? "1" : "0")};
    color: ${({ isEmailSent }) => isEmailSent && greenLight};
    background: transparent;
    transition: 1s opacity;
  }
`;

const FailTypewriterContainer = styled.div<{ isEmailSent: boolean }>`
  display: flex;
  flex-direction: row;
  max-width: 16rem;
  text-align: center;

  .Typewriter__wrapper,
  .Typewriter__cursor {
    display: ${({ isEmailSent }) => (isEmailSent ? "inline" : "none")};
    opacity: ${({ isEmailSent }) => (isEmailSent ? "1" : "0")};
    color: ${({ isEmailSent }) => isEmailSent && formErrorColor};
    background: transparent;
    transition: 1s opacity;
  }
`;

const EmailSent = styled.div`
  display: flex;
  width: 100%;
  align-items: center;
  justify-content: center;
`;

const WebsiteRequestForm = () => {
  const { tabNavigationUnlock } = useContext(SettingsContext);
  const [
    isLoadingSendEmail,
    isEmailSent,
    isEmailFail,
    control,
    errors,
    handleSubmit,
    onSubmit,
    setIsEmailFail,
    setIsEmailSent,
  ] = useMailMe({ type: "contactFormWebsiteRequest" });

  return (
    <Container id="website-request-form">
      {isMobile() ? (
        <Image
          priority
          src="/img/arm-mobile.webp"
          width={252}
          height={603}
          alt="Background image of a robotic arm schematics"
          loading="eager"
        />
      ) : (
        <Image
          priority
          src="/img/arm.webp"
          fill={true}
          alt="Background image of a robotic arm schematics"
          loading="eager"
        />
      )}

      <h1>Then let us cook</h1>

      <Instructions>
        <p>
          Please describe me your idea for website, indicating whether you
          envision it as something exotic or simple.
        </p>
        <p>I will get back to you for further discussions about the project.</p>
      </Instructions>

      <MailBox id="contactFormWebsiteRequest" onSubmit={handleSubmit(onSubmit)}>
        <MailBoxHeader>
          <TextInput
            control={control}
            id="website request name"
            label="name"
            helperText={errors?.name?.message}
            aria="website request name"
          />
          <TextInput
            control={control}
            id="website request email"
            label="email"
            aria="website request email"
            helperText={
              errors?.email?.message && "email must be a valid address"
            }
          />
        </MailBoxHeader>

        <MailBoxBody>
          <TextInput
            control={control}
            id="website request message"
            label="tell me what you have in mind"
            fullWidth
            multiline
            rows={4}
            helperText={errors?.message?.message}
            aria="website request message"
          />
        </MailBoxBody>

        <MailBoxFooter>
          <EmailSent>
            <LoadingSendEmail isLoadingSendEmail={isLoadingSendEmail} />
            {isEmailSent && (
              <SuccessTypewriterContainer isEmailSent={isEmailSent}>
                <Typewriter
                  options={{
                    delay: 75,
                    cursor: "_",
                  }}
                  onInit={(typewriter) => {
                    typewriter
                      .typeString("Thanks! I'll get back to you ASAP.")
                      .pauseFor(2500)
                      .deleteAll()
                      .callFunction(() => setIsEmailSent(false))
                      .start();
                  }}
                />
              </SuccessTypewriterContainer>
            )}
            {isEmailFail && (
              <FailTypewriterContainer isEmailSent={!isEmailSent}>
                <Typewriter
                  options={{
                    delay: 50,
                    cursor: "_",
                  }}
                  onInit={(typewriter) => {
                    typewriter
                      .typeString(
                        "Something went wrong, an alert was sent for me to fix this!"
                      )
                      .pauseFor(2500)
                      .deleteAll()
                      .callFunction(() => setIsEmailFail(false))
                      .start();
                  }}
                />
              </FailTypewriterContainer>
            )}
          </EmailSent>
          <Button
            type="submit"
            disabled={isLoadingSendEmail}
            isLoadingSendEmail={isLoadingSendEmail}
            aria-label="Send email"
            tabNavigationUnlock={tabNavigationUnlock}
          >
            send
          </Button>
        </MailBoxFooter>
      </MailBox>
    </Container>
  );
};

export default WebsiteRequestForm;

import React, { useContext } from "react";
import styled, { css } from "styled-components";
import Typewriter from "typewriter-effect";

import { SettingsContext } from "@/context/settingsContext";
import { useMailMe } from "@/hooks/useMailMe";

import TextInput from "@/components/TextInput";

import {
  backgroundMailMeVideoZIndex,
  formErrorColor,
  grayDark2,
  greenLight,
  solidWhite,
} from "@/styles/abstracts/_variables";

const Container = styled.div`
  height: 0;
  padding: 2rem 5rem 35rem 5rem;

  background-color: ${grayDark2};
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 2rem;
  clip-path: polygon(
    0% 0%,
    100% 0%,
    100% 75%,
    75% 75%,
    75% 100%,
    50% 75%,
    0% 75%
  );

  @media screen and (max-width: 1024px) {
    padding-bottom: 37rem;
  }
`;

const StyledVideo = styled.video`
  position: absolute;
  z-index: ${backgroundMailMeVideoZIndex};
  mix-blend-mode: multiply;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;

  @media screen and (max-width: 1024px) {
    left: auto;
    width: auto;
  }
`;

const MailBox = styled.form`
  width: 30rem;
  margin-top: 1rem;

  @media screen and (max-width: 1024px) {
    padding: 0 0.5rem;
  }
`;

const MailBoxHeader = styled.div`
  display: flex;
  justify-content: space-between;

  & > * {
    width: 14rem;
  }
`;

const MailBoxBody = styled.div`
  margin-top: 2rem;
  min-height: 8.75rem;
`;

const MailBoxFooter = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 1rem;
`;

const Button = styled.button<{
  isLoadingSendEmail: boolean;
  tabNavigationUnlock: boolean;
}>`
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
    !tabNavigationUnlock &&
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

const MailMe: React.FC = () => {
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
  ] = useMailMe({ type: "contactFormMail" });

  return (
    <Container>
      <StyledVideo width="1280" height="720" autoPlay loop muted playsInline>
        <source src="img/mail.webm" type="video/webm" />
        <source src="img/mail.mp4" type="video/mp4" />
      </StyledVideo>

      <h1>Get in touch!</h1>

      <MailBox id="contactFormMail" onSubmit={handleSubmit(onSubmit)}>
        <MailBoxHeader>
          <TextInput
            control={control}
            id="name"
            label="name"
            helperText={errors?.name?.message}
            aria="name"
          />
          <TextInput
            control={control}
            id="email"
            label="email"
            aria="email"
            helperText={
              errors?.email?.message && "email must be a valid address"
            }
          />
        </MailBoxHeader>

        <MailBoxBody>
          <TextInput
            control={control}
            id="message"
            label="message"
            fullWidth
            multiline
            rows={4}
            helperText={errors?.message?.message}
            aria="message"
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
            tabIndex={0}
            role="button"
            type="submit"
            aria-label="Send email"
            disabled={isLoadingSendEmail}
            isLoadingSendEmail={isLoadingSendEmail}
            tabNavigationUnlock={tabNavigationUnlock}
          >
            send
          </Button>
        </MailBoxFooter>
      </MailBox>
    </Container>
  );
};

export default MailMe;

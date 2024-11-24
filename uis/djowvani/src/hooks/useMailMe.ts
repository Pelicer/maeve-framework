import { useState } from "react";
import { useForm } from "react-hook-form";
import { object as yupObject, string as yupString } from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import emailjs from "emailjs-com";

type TMailType =
  | "contactFormMail"
  | "contactFormWebsiteRequest"
  | "ending"
  | "trigger";

interface IMail {
  type: TMailType;
}

export const useMailMe = ({ type }: IMail) => {
  emailjs.init(process.env.NEXT_PUBLIC_EMAIL_INIT);

  const [isLoadingSendEmail, setIsLoadingSendEmail] = useState(false);
  const [isEmailSent, setIsEmailSent] = useState(false);
  const [isEmailFail, setIsEmailFail] = useState(false);

  const mailFormSchema = yupObject()
    .shape({
      name: yupString().required(),
      email: yupString().email().required(),
      message: yupString().required(),
    })
    .required();

  const {
    handleSubmit,
    reset,
    control,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(mailFormSchema),
    defaultValues: {
      name: "",
      email: "",
      message: "",
    },
  });

  const handleMailType = (type: string, formValues) => {
    if (type !== "contactFormMail") {
      if (type === "contactFormWebsiteRequest") {
        return `[REQUEST] ${formValues.name}`;
      } else if (type === "trigger") {
        return `[TRIGGER]`;
      } else if (type === "ending") {
        return `[ELIGIBLE] ${formValues.name}`;
      }
    } else {
      return formValues.name;
    }
  };

  const onSubmit = (formValues) => {
    const errorAlertMessage = "!!! PORTFOLIO EMAIL IS DOWN !!!";
    const templateParams = {
      from_name: handleMailType(type, formValues),
      from_email: formValues.email,
      message: formValues.message,
    };
    const contactForm = document.getElementById(type) as HTMLFormElement;

    setIsLoadingSendEmail(true);

    emailjs
      .send(
        process.env.NEXT_PUBLIC_EMAIL_SERVICE,
        process.env.NEXT_PUBLIC_EMAIL_TEMPLATE,
        templateParams
      )
      .then(
        (response) => {
          setIsLoadingSendEmail(false);
          setIsEmailSent(true);
          reset();
          contactForm?.reset();
        },
        (error) => {
          setIsLoadingSendEmail(false);
          setIsEmailFail(true);
          setIsEmailSent(false);
          emailjs.send(
            process.env.NEXT_PUBLIC_EMAIL_SERVICE,
            process.env.NEXT_PUBLIC_EMAIL_TEMPLATE,
            {
              from_name: errorAlertMessage,
              from_email: errorAlertMessage,
              message: errorAlertMessage,
            }
          );
        }
      );
  };

  return [
    isLoadingSendEmail,
    isEmailSent,
    isEmailFail,
    control,
    errors,
    handleSubmit,
    onSubmit,
    setIsEmailFail,
    setIsEmailSent,
  ] as const;
};

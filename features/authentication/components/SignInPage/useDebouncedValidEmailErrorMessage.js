import { useState, useEffect, useRef } from 'react';
import emailValidator from 'email-validator';
export const INVALID_EMAIL_MESSAGE = "Please provide a valid email"

const useDebouncedValidEmailErrorMessage = (email) => {
  const [errorMessage, setErrorMessage] = useState("");
  const debounceTimeout = useRef();
  useEffect(
    () => {
      setErrorMessage("");
      clearTimeout(debounceTimeout.current);
      debounceTimeout.current = setTimeout(
        () => {
          const emailIsValid = emailValidator.validate(email);
          const error = email && !emailIsValid ? INVALID_EMAIL_MESSAGE : "";
          if (error !== errorMessage) {
            setErrorMessage(error);
          }
        },
        [500]
      );
    },
    [email]
  );
  return errorMessage;
};

export default useDebouncedValidEmailErrorMessage
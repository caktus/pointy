import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import {
  InputWrapper,
  InputStyled,
  IconStyled,
  LabelStyled,
  ErrorsStyled,
  ErrorStyled,
  ErrorIcon,
} from "./Input.styled";
import { AnimatePresence } from "framer-motion";
import { faExclamationCircle } from "@fortawesome/free-solid-svg-icons";

const Input = ({ label, icon, errors, className, onEnterKey, ...props }) => {
  const [labelTranslated, setLabelTranslated] = useState(false);
  const [hasErrors, setHasErrors] = useState(false);

  useEffect(() => {
    setLabelTranslated(props.value)
  }, [props.value]);

  useEffect(() => {
    const isBaseError = typeof errors === 'string';
    if (isBaseError || (props.value && errors && errors.length > 0)) {
      setHasErrors(true);
    }
    else setHasErrors(false);
  }, [errors, props.value]);

  const handleBlur = (e) => {
    if (e.target.value === "") setLabelTranslated(false);
  };

  const handleFocus = () => {
    setLabelTranslated(true);
  };

  const handleKeyUp = e => {
    e.stopPropagation();
    if (e.key === 'Enter') {
      if (onEnterKey) onEnterKey();
    }
  };

  return (
    <>
      <InputWrapper className={className}>
        {icon && <IconStyled icon={icon} />}
        <InputStyled
          {...props}
          hasErrors={hasErrors}
          labelTranslated={labelTranslated}
          onFocus={handleFocus}
          onBlur={handleBlur}
          onKeyUp={handleKeyUp}
        />
        {label && (
          <LabelStyled hasErrors={hasErrors} labelTranslated={labelTranslated}>
            {label}
          </LabelStyled>
        )}
      </InputWrapper>
      <AnimatePresence>
        {hasErrors && (
          <ErrorsStyled
            key="inputErrors"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ delayChildren: 0.5 }}
          >
            {errors && typeof errors === "string" ? (
              <ErrorStyled key={errors}>
                <ErrorIcon icon={faExclamationCircle} />
                {errors}
              </ErrorStyled>
            ) : (
              errors.map((error) => (
                <ErrorStyled key={error}>
                  <ErrorIcon icon={faExclamationCircle} />
                  {error}
                </ErrorStyled>
              ))
            )}
          </ErrorsStyled>
        )}
      </AnimatePresence>
    </>
  );
};

export const INPUT_TYPES = {
  TEXT: "text",
  URL: "url",
  PASSWORD: "password",
  EMAIL: "email",
};

Input.propTypes = {
  /** \<Input\> is for basic text-type inputs */
  type: PropTypes.oneOf(Object.values(INPUT_TYPES)),
  /** Inputs are fully controlled, so `value` is required */
  value: PropTypes.string.isRequired,
  /** Inputs are fully controlled, so `onChange` is required */
  onChange: PropTypes.func.isRequired,
};

Input.defaultProps = {
  type: INPUT_TYPES.TEXT,
};

export default Input;

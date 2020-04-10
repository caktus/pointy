import React from 'react';
import {
  SelectWrapper,
  SelectStyled,
  OptionStyled,
  ErrorsStyled,
  ErrorStyled,
  ErrorIcon,
} from "./Select.styled";
import { AnimatePresence } from 'framer-motion';
import { faExclamationCircle } from "@fortawesome/free-solid-svg-icons";

const Select = ({ options, value, onChange, error }) => {
  return (
    <SelectWrapper>
      <SelectStyled value={value} onChange={onChange}>
        {options.map((option) => (
          <OptionStyled key={option.id} value={option.id}>
            {option.name}
          </OptionStyled>
        ))}
      </SelectStyled>
      <AnimatePresence>
        {error && (
          <ErrorsStyled
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ delayChildren: 0.5 }}
          >
            <ErrorStyled>
              <ErrorIcon icon={faExclamationCircle} />
              {error}
            </ErrorStyled>
          </ErrorsStyled>
        )}
      </AnimatePresence>
    </SelectWrapper>
  );
}

export default Select;

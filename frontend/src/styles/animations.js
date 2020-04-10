import { keyframes } from "styled-components";

export const SPRING = {
  type: "spring",
  damping: 20,
  stiffness: 300,
};


export const spin = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;

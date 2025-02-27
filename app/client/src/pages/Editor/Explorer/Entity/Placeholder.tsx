import type { ReactNode } from "react";
import React from "react";
import styled from "styled-components";
const Wrapper = styled.div<{ step: number }>`
  margin-left: ${(props) => props.step * props.theme.spaces[2]}px;
  width: calc(100% - ${(props) => props.step * props.theme.spaces[2]}px);
  font-size: ${(props) => props.theme.fontSizes[2]}px;
  padding: 5px 20px;
  border-radius: ${(props) => props.theme.borderRadius};
  text-align: left;
  display: flex;
  justify-content: flex-start;
  align-items: center;

  & p {
    margin-bottom: 0;
  }
  word-wrap: break-word;
  width: 100%;
`;

export function EntityPlaceholder(props: {
  step: number;
  children: ReactNode;
}) {
  return (
    <Wrapper step={props.step}>
      <p>{props.children}</p>
    </Wrapper>
  );
}

export default EntityPlaceholder;

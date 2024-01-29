import { FC } from 'react'

// eslint-disable-next-line import/no-named-as-default
import styled from 'styled-components'

export const TaskLoader: FC = () => {
  return (
    <Loader>
      <Wrap>
        <Circle></Circle>
        <Line1></Line1>
        <Line2></Line2>
        <Line3></Line3>
        <Line4></Line4>
      </Wrap>
    </Loader>
  )
}

const Loader = styled.div`
  position: relative;
  width: 100%;
  height: 120px;
  border: 1px solid rgba(211, 211, 211, 0.5);
  padding: 15px;
  background-color: rgba(227, 227, 227, 0.5);
  overflow: hidden;
  border-radius: 10px;
  margin-bottom: 20px;

  :after {
    content: '';
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    background: linear-gradient(
      110deg,
      rgba(227, 227, 227, 0) 0%,
      rgba(227, 227, 227, 0) 40%,
      rgba(227, 227, 227, 0.5) 50%,
      rgba(227, 227, 227, 0) 60%,
      rgba(227, 227, 227, 0) 100%
    );
    animation: gradient-animation_2 1.2s linear infinite;
  }

  @keyframes gradient-animation_2 {
    0% {
      transform: translateX(-100%);
    }

    100% {
      transform: translateX(100%);
    }
  }
`
const Wrap = styled.div`
  width: 100%;
  height: 100%;
  position: relative;

  div {
    background-color: #cacaca;
  }
`
const Circle = styled.div`
  width: 50px;
  height: 50px;
  border-radius: 50%;
`
const Line1 = styled.div`
  position: absolute;
  top: 11px;
  left: 58px;
  height: 10px;
  width: 100px;
`
const Line2 = styled.div`
  position: absolute;
  top: 34px;
  left: 58px;
  height: 10px;
  width: 150px;
`
const Line3 = styled.div`
  position: absolute;
  top: 57px;
  left: 0;
  height: 10px;
  width: 100%;
`
const Line4 = styled.div`
  position: absolute;
  top: 80px;
  left: 0;
  height: 10px;
  width: 92%;
`

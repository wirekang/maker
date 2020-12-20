import React from 'react';
import styled from 'styled-components';

export default function ShareView({ getResult }:{
    getResult:()=>string,
  }):JSX.Element {
  const onCopy = () => {
    navigator.clipboard.writeText(getResult()).then(() => {
      alert('복사 완료');
    });
  };

  const onShare = () => {
    navigator.share({
      text: getResult(),
    });
  };

  return (
    <Container>
      <Share type="button" value="공유" onClick={onShare} />
      <Copy type="button" value="복사" onClick={onCopy} />
    </Container>
  );
}

const Container = styled.div`
  display:inline-block;
`;

const Share = styled.input`
  margin-right:10px;
`;

const Copy = styled.input``;

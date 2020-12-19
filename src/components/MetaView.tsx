import React from 'react';
import styled from 'styled-components';

export default function MetaView({
  head, setHead, date, setDate, preview,
}:{
  head: string,
  setHead: (arg0:string)=>void,
  date: string,
  setDate: (arg0:string)=>void,
  preview: string,
}):JSX.Element {
  return (
    <Container>
      <Date
        type="date"
        value={date}
        onChange={(e:React.ChangeEvent<HTMLInputElement>) => {
          setDate(e.target.value);
        }}
      />

      <Head
        type="text"
        value={head}
        onChange={(e:React.ChangeEvent<HTMLInputElement>) => {
          setHead(e.target.value);
        }}
      />
      <Preview>
        {preview}
      </Preview>

    </Container>
  );
}

const Container = styled.div`
  align-self:flex-start;
`;

const Head = styled.input`
  width:100px;
`;

const Date = styled.input`
  width:40px;
`;

const Preview = styled.div`
  display:inline-block;
`;

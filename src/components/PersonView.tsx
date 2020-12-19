import React from 'react';
import styled from 'styled-components';
import { Person } from '~/interfaces';
import PersonRow from './PersonRow';

export default function PersonView(
  {
    persons, removePerson, showRemove, onCheck,
  }:{
    persons:Person[],
    removePerson: (id:number)=>void,
    showRemove: boolean,
    onCheck: (id:number, n:number)=>void,
  },
):JSX.Element {
  return (
    <Container>
      <Description>
        <Name>이름</Name>
        <Column>아침</Column>
        <Column>점심</Column>
        <Column>저녁</Column>
      </Description>
      { persons.map((person) => (
        <PersonRow
          person={person}
          key={person.id}
          showRemove={showRemove}
          removePerson={removePerson}
          onCheck={onCheck}
        />
      ))}
    </Container>
  );
}

const Container = styled.div`
  background-color: #f3f3f3;
  max-height:700px;
  overflow-y:auto;
`;

const Description = styled.div`
  display:flex;
  flex-direction:row;
  height:30px;
`;

const Name = styled.div`
  width:100px;
  text-align:center;
`;

const Column = styled.div`
  width: 60px;
  text-align:center;
`;

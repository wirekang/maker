import React from 'react';
import styled from 'styled-components';
import { Person } from '~/interfaces';

export default function PersonRow(
  {
    person, showRemove, removePerson, onCheck,
  }:{
      person:Person,
      showRemove:boolean,
      removePerson: (id:number)=>void,
      onCheck:(id:number, n:number)=>void,
    },
):JSX.Element {
  const onRemove = () => {
    removePerson(person.id);
  };

  return (
    <Container>
      {showRemove
        ? <Remove type="button" value="X" onClick={onRemove} />
        : <Blank />}
      <ID>
        {person.id}
      </ID>
      <Name>
        {person.name}
      </Name>
      { [0, 1, 2].map((n) => (
        <Check
          key={n}
          onClick={() => { onCheck(person.id, n); }}
          color={person.checks[n] ? 'red' : 'white'}
        />
      ))}
    </Container>
  );
}

const Container = styled.div`
  height: 30px;
  display:flex;
  flex-direction: row;
  align-items:center;
`;

const Remove = styled.input`
  width:20px
`;

const Blank = styled.div`
  width:20px
`;

const ID = styled.div`
  width: 20px;
  font-size:11px;
  text-align:center;
`;

const Name = styled.div`
  width: 60px;
`;

const Check = styled.div`
  width: 60px;
  height: 100%;
  background-color: ${(props) => props.color || 'white'};
  border: 1px solid #ccc;
`;

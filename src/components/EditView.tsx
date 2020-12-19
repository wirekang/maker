import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Person } from '~/interfaces';

export default function EditView(
  { addPerson, persons }:{
    addPerson: (arg0:Person)=>void,
    persons:Person[],
  },
):JSX.Element {
  const [nam, setNam] = useState('');
  const [id, setID] = useState(`${persons.length}`);

  useEffect(() => {
    setID(`${persons.length}`);
  }, [persons]);

  const onChange = (e:React.ChangeEvent<HTMLInputElement>) => {
    const { value, name } = e.target;
    if (name === 'nam') {
      setNam(value);
    }
    if (name === 'id') {
      setID(value);
    }
  };

  const onAdd = () => {
    if (nam.trim() === '') { return; }
    addPerson({
      id: Number(id), name: nam.trim(), checks: [],
    });
    setNam('');
  };

  return (
    <Container>
      <ID name="id" placeholder="순번" onChange={onChange} value={id} />
      <Nam name="nam" placeholder="이름" onChange={onChange} value={nam} />
      <Add name="add" type="button" onClick={onAdd} value="추가" />
    </Container>
  );
}

const Container = styled.div`
  background-color: #e0e0e0;
  width:100%;
`;

const ID = styled.input`
  width:35px;
  font-size: 20px;
`;

const Nam = styled.input`
  width: 90px;
  font-size: 20px;
`;

const Add = styled.input``;

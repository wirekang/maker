import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import PersonView from '~/components/PersonView';
import EditView from './components/EditView';
import { Person } from '~/interfaces';
import MetaView from './components/MetaView';
import ShareView from './components/ShareView';

export default function App():JSX.Element {
  const localPersons = localStorage.getItem('persons');
  const localHead = localStorage.getItem('head');

  const [persons, setPersons] = useState<Person[]>(
    localPersons ? JSON.parse(localPersons) : [],
  );

  const [date, setDate] = useState(formatDate(getTomorrow()));

  const [head, setHead] = useState(
    localHead ? JSON.parse(localHead) : '식청',
  );

  const [preview, setPreview] = useState('');

  const [result, setResult] = useState('error');

  const [showEditView, setShowEditView] = useState(false);

  useEffect(() => {
    setPreview(`${genDate(new Date(date))} ${head}`);
  }, [head, date]);

  useEffect(() => {
    const checks = ['', '', ''];
    persons.forEach((person) => {
      [0, 1, 2].forEach((i) => {
        if (person.checks[i]) {
          checks[i] += `${person.name} `;
        }
      });
    });
    setResult(`${preview}\n\n아침:${checks[0]}\n\n점심:${checks[1]}\n\n저녁:${checks[2]}`);
  }, [persons]);

  const savePersons = (ps: Person[]) => {
    localStorage.setItem('persons', JSON.stringify(ps));
    setPersons(ps);
  };

  const addPerson = (p:Person) => {
    const person = p;
    let sameKey = true;
    while (sameKey) {
      let same = false;
      persons.forEach((v) => {
        if (v.id === person.id) {
          person.id += 1;
          same = true;
        }
      });
      sameKey = same;
    }
    const newPersons = persons.slice();
    newPersons.push(person);
    newPersons.sort((a, b) => a.id - b.id);
    savePersons(newPersons);
  };

  const removePerson = (id:number) => {
    savePersons(persons.filter((person) => person.id !== id));
  };

  const onCheck = (id:number, n:number) => {
    savePersons(persons.map((person) => {
      const p = person;
      if (p.id === id) { p.checks[n] = !p.checks[n]; }
      return p;
    }));
  };

  const onReset = () => {
    savePersons(persons.map((person) => ({
      id: person.id, name: person.name, checks: [false, false, false],
    }
    )));
  };

  const onLoad = () => {
    const value = prompt('불러올 값 입력');
    try {
      const obj = JSON.parse(value as string) as Person[];
      savePersons(obj);
      alert('성공');
    } catch (e) {
      alert('실패');
    }
  };

  return (
    <Container>
      <MetaView
        head={head}
        setHead={(h:string) => { setHead(h); }}
        date={date}
        setDate={(d:string) => { setDate(d); }}
        preview={preview}
      />
      <PersonView
        removePerson={removePerson}
        persons={persons}
        showRemove={showEditView}
        onCheck={onCheck}
      />
      <Bottom>
        <Reset
          type="button"
          value="선택 해제"
          onClick={onReset}
        />

        <ShareView result={result} />

        <ToggleEdit
          type="button"
          value="편집 토글"
          onClick={() => { setShowEditView(!showEditView); }}
        />

        <Load
          type="button"
          value="불러오기"
          onClick={onLoad}
        />

      </Bottom>
      { showEditView
      && (
      <EditView
        addPerson={addPerson}
        persons={persons}
      />
      )}
    </Container>
  );
}

const Container = styled.div`
  background-color:#eee;
  width: 100%;
  height: 100%;
  max-width: 400px;
  max-height: 900px;
  display:flex;
  flex-direction:column;
  align-items:center;
`;

const Bottom = styled.div`
  width:100%;
  margin-top:30px;
  display:flex;
  flex-direction:row;
  justify-content:space-between;
`;

const Load = styled.input``;
const Reset = styled.input``;

const ToggleEdit = styled.input`
`;

function getTomorrow():Date {
  const d = new Date();
  d.setDate(d.getDate() + 1);
  return d;
}

function formatDay(d: number): string {
  return ['일', '월', '화', '수', '목', '금', '토'][d];
}

function formatDate(d: Date): string {
  return `${d.getFullYear()}-${d.getMonth() + 1}-${d.getDate()}`;
}

function genDate(d: Date): string {
  return `${d.getMonth() + 1}/${d.getDate()}(${formatDay(d.getDay())})`;
}

// 결과값 미리보기, 복사, 공유,초기화

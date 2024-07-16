import { useEffect } from 'react';
import { Panel, PanelHeader, Div, Group, Button, PanelHeaderBack } from '@vkontakte/vkui';
import { useRouteNavigator } from '@vkontakte/vk-mini-apps-router';

import { DEFAULT_VIEW_PANELS } from '../routes';

export const StepThree = ({ id, greetings, selectedGreeting, setGreetings, setSelectedGreeting }) => {
    const routeNavigator = useRouteNavigator();
  
    useEffect(() => {
        const fakeGreetings = ['Тебе желаю море счастья,\nУлыбок, солнца и тепла.\nЧтоб жизнь была еще прекрасней,\nУдача за руку вела!\n\nПусть в доме будет только радость,\nУют, достаток и покой.\nДрузья, родные будут рядом,\nБеда обходит стороной!\n\nЗдоровья крепкого желаю\nИ легких жизненных дорог.\nИ пусть всегда, благословляя,\nТебя хранит твой ангелок!',
            'С днем рождения поздравляю\nИ желаю день за днем\nБыть счастливее и ярче,\nСловно солнце за окном.\n\nПожелаю я здоровья,\nМного смеха и тепла,\nЧтоб родные были рядом\nИ, конечно же, добра!\n\nПусть деньжат будет побольше,\nПутешествий и любви.\nЧашу полную заботы,\nМира, света, красоты!\n',
            'Пусть в жизни будет все, что нужно:\nЗдоровье, мир, любовь и дружба.\nНе отвернется пусть успех,\nУдача любит больше всех.\n\nПусть счастье будет настоящим,\nК мечте и радости манящим.\nЖелаю много светлых лет\nБез боли, горестей и бед!\n',
            'Желаю много-много счастья,\nПобольше мира, доброты,\nПускай обходят все ненастья,\nИ пусть сбываются мечты.\n\nУдача пусть сопровождает,\nЗдоровья, радости − мешок,\nУлыбок, смеха я желаю,\nИ пусть всё в жизни будет ок!\n'
        ];

        setGreetings(fakeGreetings);
    }, []);

    return (
      <Panel id={id}>
        <PanelHeader before={<PanelHeaderBack onClick={() => routeNavigator.back()} />}>
          Шаг 3
        </PanelHeader>

        <Div>
            <label>Выберите поздравление</label>
            <select
              value={selectedGreeting}
              onChange={(e) => setSelectedGreeting(e.target.value)}
            >
              <option value="" disabled>
                Выберите поздравление
              </option>
              {greetings.map((greeting, index) => (
                <option key={index} value={greeting}>{greeting}</option>
              ))}
            </select>
            <div>
              <label>Отредактируйте поздравление</label><br/>
              <textarea
                value={selectedGreeting}
                onChange={(e) => setSelectedGreeting(e.target.value)}
                rows="10"
                cols="50"
              />
            </div>
            <Group>
                <Div>
                    <Button stretched size="l" mode="secondary" onClick={() => routeNavigator.push(`/${DEFAULT_VIEW_PANELS.STEP_FOUR}`)}>
                        Далее
                    </Button>
                </Div>
            </Group> 
        </Div>

      </Panel>
    );
  };
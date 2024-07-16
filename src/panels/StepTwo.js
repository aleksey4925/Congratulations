import { Panel, PanelHeader, Div, Group, Button, PanelHeaderBack } from '@vkontakte/vkui';
import { useRouteNavigator } from '@vkontakte/vk-mini-apps-router';

import { DEFAULT_VIEW_PANELS } from '../routes';

export const StepTwo = ({ id, date, hours, minutes, setDate, setHours, setMinutes }) => {
    const routeNavigator = useRouteNavigator();
  
    return (
      <Panel id={id}>
        <PanelHeader before={<PanelHeaderBack onClick={() => routeNavigator.back()} />}>
          Шаг 2
        </PanelHeader>

        <Div>
            <div>
                <label>Дата публикации</label>
                <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                />
            </div>
            <div>
                <label>Время публикации</label>
                <select
                value={hours}
                onChange={(e) => setHours(e.target.value)}
                >
                {[...Array(24).keys()].map(hour => (
                    <option key={hour} value={hour}>{hour < 10 ? `0${hour}` : hour}</option>
                ))}
                </select>
                <select
                id="select_minutes"
                value={minutes}
                onChange={(e) => setMinutes(e.target.value)}
                >
                {[0, 15, 30, 45].map(minute => (
                    <option key={minute} value={minute}>{minute < 10 ? `0${minute}` : minute}</option>
                ))}
                </select>
            </div>
            <Group>
                <Div>
                    <Button stretched size="l" mode="secondary" onClick={() => routeNavigator.push(`/${DEFAULT_VIEW_PANELS.STEP_THREE}`)}>
                        Далее
                    </Button>
                </Div>
            </Group> 
        </Div>
      </Panel>
    );
  };
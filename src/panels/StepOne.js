import { Panel, PanelHeader, Div, Group, Button, PanelHeaderBack } from '@vkontakte/vkui';
import { useRouteNavigator } from '@vkontakte/vk-mini-apps-router';

import { DEFAULT_VIEW_PANELS } from '../routes';

export const StepOne = ({ id, mode, communities, communityId, setMode, setCommunityId }) => {
    const routeNavigator = useRouteNavigator();
  
    return (
      <Panel id={id}>
        <PanelHeader before={<PanelHeaderBack onClick={() => routeNavigator.back()} />}>
          Шаг 1
        </PanelHeader>

        <Div>
            <div>
              <label>
                <input
                  type="radio"
                  checked={mode === 'input'}
                  onChange={() => setMode('input')}
                />
                Ввести ID сообщества
              </label>
              <label>
                <input
                  type="radio"
                  checked={mode === 'select'}
                  onChange={() => setMode('select')}
                />
                Выбрать из списка
              </label>
            </div>
            {mode === 'input' ? (
              <div>
                <input
                  type="text"
                  placeholder="Введите ID сообщества"
                  value={communityId}
                  onChange={(e) => setCommunityId(e.target.value)}
                />
              </div>
            ) : (
              <div>
                <select
                  value={communityId}
                  onChange={(e) => setCommunityId(e.target.value)}
                >
                  <option value="" disabled>
                    Выберите сообщество
                  </option>
                  {communities.map((community) => (
                    <option key={community.id} value={community.id}>{community.name}</option>
                  ))}
                </select>
              </div>
            )}
            <Group>
                <Div>
                    <Button stretched size="l" mode="secondary" onClick={() => routeNavigator.push(`/${DEFAULT_VIEW_PANELS.STEP_TWO}`)}>
                        Далее
                    </Button>
                </Div>
            </Group>  
        </Div>

      </Panel>
    );
  };
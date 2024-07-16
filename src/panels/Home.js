import { Panel, PanelHeader, Button, Group, Div } from '@vkontakte/vkui';
import { useRouteNavigator } from '@vkontakte/vk-mini-apps-router';

import { DEFAULT_VIEW_PANELS } from '../routes';

export const Home = ({ id }) => {
  const routeNavigator = useRouteNavigator();

  return (
    <Panel id={id}>
      <PanelHeader>Главная</PanelHeader>

      <Group>
        <Div>
          <Button stretched size="l" mode="secondary" onClick={() => routeNavigator.push(`/${DEFAULT_VIEW_PANELS.STEP_ONE}`)}>
            Перейти к созданию поздравительного поста
          </Button>
        </Div>
      </Group>
    </Panel>
  );
};

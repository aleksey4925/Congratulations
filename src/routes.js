import {
  createHashRouter,
  createPanel,
  createRoot,
  createView,
  RoutesConfig,
} from '@vkontakte/vk-mini-apps-router';

export const DEFAULT_ROOT = 'default_root';

export const DEFAULT_VIEW = 'default_view';

export const DEFAULT_VIEW_PANELS = {
  HOME: 'home',
  STEP_ONE: 'step_one',
  STEP_TWO: 'step_two',
  STEP_THREE: 'step_three',
  STEP_FOUR: 'step_four',
};

export const routes = RoutesConfig.create([
  createRoot(DEFAULT_ROOT, [
    createView(DEFAULT_VIEW, [
      createPanel(DEFAULT_VIEW_PANELS.HOME, '/', []),
      createPanel(DEFAULT_VIEW_PANELS.STEP_ONE, '/step_one', []),
      createPanel(DEFAULT_VIEW_PANELS.STEP_TWO, '/step_two', []),
      createPanel(DEFAULT_VIEW_PANELS.STEP_THREE, '/step_three', []),
      createPanel(DEFAULT_VIEW_PANELS.STEP_FOUR, '/step_four', []),
    ]),
  ]),
]);

export const router = createHashRouter(routes.getRoutes());

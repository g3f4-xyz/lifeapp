import { MODULES_IDS } from '../../constans';
import Component from './TaskListQuery';

export default Component;

export const handler = ({ moduleId }, data, state, update) => ({
  moduleId,
  onAdd: () => {
    console.log(['moduleHandlers:taskList:onAdd']);

    update({
      $merge: {
        appOpenedModuleIds: state.appOpenedModuleIds.includes(MODULES_IDS.TASK_TYPE_LIST)
          ? state.appOpenedModuleIds
          : [...state.appOpenedModuleIds, MODULES_IDS.TASK_TYPE_LIST],
        activeModuleId: MODULES_IDS.TASK_TYPE_LIST,
        activeModulesHistory: [...state.activeModulesHistory, MODULES_IDS.TASK_TYPE_LIST],
      }
    })
  },
  onDetails: taskId => {
    console.log(['moduleHandlers:taskList:onDetails:taskId'], taskId);
    const moduleId = `${taskId}:details`;
    const { gridView, gridViewLocked, openedTasksModulesProps } = state;

    update({
      $merge: {
        activeModuleId: moduleId,
        activeModulesHistory: [...state.activeModulesHistory, moduleId],
        gridView: gridView ? gridView : gridViewLocked,
        openedTasksModulesProps: [...openedTasksModulesProps, {
          editMode: false,
          isNew: false,
          moduleId,
          taskId,
        }],
      },
    });
  },
  onEdit: taskId => {
    console.log(['moduleHandlers:task:onEdit'], taskId);
    const { gridView, gridViewLocked, openedTasksModulesProps } = state;
    const moduleId = `${taskId}:edit`;

    update({
      $merge: {
        activeModuleId: moduleId,
        activeModulesHistory: [...state.activeModulesHistory, moduleId],
        gridView: gridView ? gridView : gridViewLocked,
        openedTasksModulesProps: [...openedTasksModulesProps, {
          editMode: true,
          isNew: false,
          moduleId,
          taskId,
        }]
      }
    });
  },
});

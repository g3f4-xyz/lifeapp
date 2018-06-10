import Component from './TaskQuery';
import { MODULES_IDS } from '../../constans';

export default Component;

export const handler = (moduleProps, data, state, update) => ({
  ...moduleProps,
  taskListId: data.app.taskList.id,
  onSaveDone: taskId => {
    console.log(['moduleHandlers:task:onSaveDone'], taskId);

    update({
      $merge: {
        activeModuleId: MODULES_IDS.TASK_LIST,
        activeModulesHistory: [MODULES_IDS.TASK_LIST],
        openedTasksModulesProps: state.openedTasksModulesProps.filter(props => props.taskId === taskId),
      }
    })
  },
});

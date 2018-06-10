import Component from './TaskTypeListQuery';

export default Component;

export const handler = ({ moduleId }, data, state, update) => ({
  moduleId,
  onSelect: type => {
    console.log(['moduleHandlers:taskList:onSelect'], type);
    const { gridView, gridViewLocked, openedTasksModulesProps } = state;
    const temporaryId = `${Date.now()}:temporaryId`;

    update({
      $merge: {
        activeModuleId: temporaryId,
        activeModulesHistory: [...state.activeModulesHistory, temporaryId],
        gridView: gridView ? gridView : gridViewLocked,
        openedTasksModulesProps: [...openedTasksModulesProps, {
          editMode: true,
          isNew: true,
          moduleId: temporaryId,
          taskId: temporaryId,
          type,
        }],
      },
    });
  },
});

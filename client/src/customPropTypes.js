import PropTypes from 'prop-types';

export const taskDataType = PropTypes.shape({
  id: PropTypes.string,
  taskType: PropTypes.string,
  fields: PropTypes.arrayOf(PropTypes.shape({
    fieldId: PropTypes.string,
    format: PropTypes.string,
    order: PropTypes.number,
    type: PropTypes.string,
    label: PropTypes.string,
    helperText: PropTypes.string,
    meta: PropTypes.shape({
      min: PropTypes.number,
      minLen: PropTypes.number,
      max: PropTypes.number,
      maxLen: PropTypes.number,
      required: PropTypes.bool,
    }),
    value: PropTypes.shape({
      id: PropTypes.string,
      number: PropTypes.number,
      text: PropTypes.string,
    }),
  })),
});

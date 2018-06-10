import React from 'react';
import PropTypes from 'prop-types';
import { taskDataType } from '../customPropTypes';
import { Input, Select } from './form/index';

export default class Field extends React.Component {
  static propTypes = {
    ...taskDataType.fields,
    fieldId: PropTypes.string,
    onChange: PropTypes.func,
  };

  render() {
    const { fieldId, format, meta: { options }, value: { id, text }, ...props } = this.props;

    console.log(['Field:render'], this.props);

    if (!options && format === 'CHOICE') {
      debugger
    }

    const component = ({
      CHOICE: (
        <Select
          id={fieldId}
          options={options || []}
          value={id}
          {...props}
        />
      ),
      TEXT: (
        <Input
          id={fieldId}
          value={text}
          {...props}
        />
      ),
    })[format];

    if (!component) {
      console.error(`No component for field format "${format}"`);
      return null;
    }

    return component;
  }
}

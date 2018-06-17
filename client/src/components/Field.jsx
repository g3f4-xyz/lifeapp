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

  static handler(props) {
    const { fieldId, format, meta: { options }, value: { id, text }, ...rest } = props;
    const Component = ({
      CHOICE: Select,
      TEXT: Input,
    })[format];

    return {
      Component,
      getProps: () => Object.assign(
        {
          id: fieldId,
          ...rest,
        },
        format === 'CHOICE' && {
          options,
          value: id,
        },
        format === 'TEXT' && {
          value: text,
        }
      ),
    }

  }

  render() {
    const { Component, getProps } = Field.handler(this.props);

    return (
      <Component {...getProps()} />
    );
  }
}

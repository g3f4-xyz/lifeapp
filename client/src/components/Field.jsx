import React from 'react';
import PropTypes from 'prop-types';
import { taskDataType } from '../customPropTypes';
import { Input, Select, Switch } from './form/index';

export default class Field extends React.Component {
  static propTypes = {
    ...taskDataType.fields,
    fieldId: PropTypes.string,
    onChange: PropTypes.func,
  };

  static handler(props) {
    const { fieldId, format, meta: { options }, value: { bool, id, text }, ...rest } = props;
    const Component = ({
      BOOL: Switch,
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
        format === 'BOOL' && {
          checked: bool,
          value: fieldId,
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

import React from 'react';
import PropTypes from 'prop-types';
import update from 'immutability-helper';
import CircularProgress from 'material-ui/CircularProgress';
import DatePicker from 'material-ui/DatePicker';
import Paper from 'material-ui/Paper';
import AddButton from 'material-ui/svg-icons/navigation/check';
import { Label, Input, Select } from '../components';
import Create from 'material-ui/svg-icons/content/create';
import editTaskMutation from "../mutations/editTask";

const styles = {
  row: {
    display: 'flex',
    justifyContent: 'space-between',
    margin: 10,
  },
};

export default class TaskCreate extends React.Component {
  static propTypes = {
    onEdited: PropTypes.func,
    data: PropTypes.object,
    parentId: PropTypes.string,
    environment: PropTypes.object,
  };

  state = {
    task: this.props.data,
  };

  updateTask(update) {
    this.setState({
      task: {
        ...this.state.task,
        ...update,
      }
    })
  }

  onSave = () => {
    const { id, fields } = this.state.task;
    console.log(['TaskCreate:onSave'], this.state.task);
    editTaskMutation(this.props.environment, { id, fields }, this.props.parentId, (...args) => {
      console.log(['TaskCreate:onSave:success.args'], args);
      this.props.onEdited();

    }, (...args) => {
      console.log(['TaskCreate:onSave:fail.args'], args)
    })
  };

  render() {
    if (!this.state.task) {
      return (
        <CircularProgress
          style={{
            margin: 'auto',
            position: 'absolute',
            top: 0,
            left: 0,
            bottom: 0,
            right: 0,
          }}
          size={180}
          thickness={15}
        />
      );
    }
    const { fields } = this.state.task;
    const updateFieldValue = (fieldId, value) => {
      const fieldIndex = this.state.task.fields.findIndex(field => field.fieldId === fieldId);

      this.setState(update(this.state, {
        task: {
          fields: {
            [fieldIndex]: {
              value: {
                $set: value
              }
            }
          }
        }
      }));
    };

    return (
      <div style={styles.root}>
        {this.state.pending ? (
          <CircularProgress
            style={{
              position: 'absolute',
              bottom: 0,
              right: 0,
              zoom: 2,
              margin: 20,
            }}
            size={60} thickness={6}
          />
        ) : (
          <AddButton
            style={{
              position: 'absolute',
              bottom: 0,
              color: '#8BC34A',
              right: 0,
              margin: 20,
              width: '20%',
              height: '20%',
            }}
            onClick={this.onSave}
          />
        )}
        {fields
          .map(item => item) // propsy są immutable, sortowanie modyfikuje oryginalną tablicę
          .sort((a, b) => a.order - b.order)
          .map(({ fieldId, label, type, meta: { options }, value, info }) => console.log(['options'], options) || (
            <div key={fieldId}>
              <Paper style={styles.row}>
                <div style={{ padding: 10, width: 200, textAlign: 'left' }}>
                  <Create />
                  <Label style={{ padding: 10 }}>{label}</Label>
                </div>
                <div style={{ paddingRight: 20, width: '80%' }}>
                  {({
                    CHOICE: (
                      <Select
                        style={{ width: '80%' }}
                        value={value.id}
                        info={info}
                        options={options || []}
                        onChange={(e, id) => {
                          console.log(['onChange.value'], { id });
                          updateFieldValue(fieldId, { id });
                        }}
                      />
                    ),
                    DATE: (
                      <DatePicker
                        textFieldStyle={{ width: '80%' }}
                        autoOk
                        value={value.id}
                        hintText={info}
                        options={options || []}
                        onChange={(e, id) => {
                          console.log(['onChange.value'], { id });
                          updateFieldValue(fieldId, { id });
                        }}
                      />
                    ),
                  })[type] || (
                    <Input
                      style={{ width: '80%' }}
                      multiLine
                      hintText={info}
                      value={value.text || value.number}
                      onChange={(e, value) => {
                        console.log(['onChange.value'], value);
                        updateFieldValue(fieldId, { text: value });
                      }}
                    />
                  )}
                </div>
              </Paper>
            </div>
          ))}
      </div>
    );
  }
}

/**
 * @flow
 */

/* eslint-disable */

'use strict';

/*::
import type {ConcreteFragment} from 'relay-runtime';
export type TaskDetails = {|
  +detailsList: ?$ReadOnlyArray<?{|
    +id: string;
    +title: ?string;
    +status: ?string;
    +priority: ?number;
    +additionalFields: ?$ReadOnlyArray<?{|
      +fieldId: ?string;
      +format: ?string;
      +type: ?string;
      +label: ?string;
      +value: ?{|
        +number?: ?number;
        +text?: ?string;
      |};
      +info: ?string;
      +meta: ?{|
        +required?: ?boolean;
        +min?: ?number;
        +max?: ?number;
        +minLen?: ?number;
        +maxLen?: ?number;
      |};
    |}>;
  |}>;
|};
*/


const fragment /*: ConcreteFragment*/ = {
  "argumentDefinitions": [
    {
      "kind": "LocalArgument",
      "name": "ids",
      "type": "[ID]",
      "defaultValue": []
    }
  ],
  "kind": "Fragment",
  "metadata": null,
  "name": "TaskDetails",
  "selections": [
    {
      "kind": "LinkedField",
      "alias": null,
      "args": [
        {
          "kind": "Variable",
          "name": "ids",
          "variableName": "ids",
          "type": "[ID]"
        }
      ],
      "concreteType": "TaskType",
      "name": "detailsList",
      "plural": true,
      "selections": [
        {
          "kind": "ScalarField",
          "alias": null,
          "args": null,
          "name": "id",
          "storageKey": null
        },
        {
          "kind": "ScalarField",
          "alias": null,
          "args": null,
          "name": "title",
          "storageKey": null
        },
        {
          "kind": "ScalarField",
          "alias": null,
          "args": null,
          "name": "status",
          "storageKey": null
        },
        {
          "kind": "ScalarField",
          "alias": null,
          "args": null,
          "name": "priority",
          "storageKey": null
        },
        {
          "kind": "LinkedField",
          "alias": null,
          "args": null,
          "concreteType": "FieldType",
          "name": "additionalFields",
          "plural": true,
          "selections": [
            {
              "kind": "ScalarField",
              "alias": null,
              "args": null,
              "name": "fieldId",
              "storageKey": null
            },
            {
              "kind": "ScalarField",
              "alias": null,
              "args": null,
              "name": "format",
              "storageKey": null
            },
            {
              "kind": "ScalarField",
              "alias": null,
              "args": null,
              "name": "type",
              "storageKey": null
            },
            {
              "kind": "ScalarField",
              "alias": null,
              "args": null,
              "name": "label",
              "storageKey": null
            },
            {
              "kind": "LinkedField",
              "alias": null,
              "args": null,
              "concreteType": null,
              "name": "value",
              "plural": false,
              "selections": [
                {
                  "kind": "InlineFragment",
                  "type": "TextNumberType",
                  "selections": [
                    {
                      "kind": "ScalarField",
                      "alias": null,
                      "args": null,
                      "name": "text",
                      "storageKey": null
                    }
                  ]
                },
                {
                  "kind": "InlineFragment",
                  "type": "NumberValueType",
                  "selections": [
                    {
                      "kind": "ScalarField",
                      "alias": null,
                      "args": null,
                      "name": "number",
                      "storageKey": null
                    }
                  ]
                }
              ],
              "storageKey": null
            },
            {
              "kind": "ScalarField",
              "alias": null,
              "args": null,
              "name": "info",
              "storageKey": null
            },
            {
              "kind": "LinkedField",
              "alias": null,
              "args": null,
              "concreteType": null,
              "name": "meta",
              "plural": false,
              "selections": [
                {
                  "kind": "InlineFragment",
                  "type": "TextMetaType",
                  "selections": [
                    {
                      "kind": "ScalarField",
                      "alias": null,
                      "args": null,
                      "name": "required",
                      "storageKey": null
                    },
                    {
                      "kind": "ScalarField",
                      "alias": null,
                      "args": null,
                      "name": "minLen",
                      "storageKey": null
                    },
                    {
                      "kind": "ScalarField",
                      "alias": null,
                      "args": null,
                      "name": "maxLen",
                      "storageKey": null
                    }
                  ]
                },
                {
                  "kind": "InlineFragment",
                  "type": "NumberMetaType",
                  "selections": [
                    {
                      "kind": "ScalarField",
                      "alias": null,
                      "args": null,
                      "name": "required",
                      "storageKey": null
                    },
                    {
                      "kind": "ScalarField",
                      "alias": null,
                      "args": null,
                      "name": "min",
                      "storageKey": null
                    },
                    {
                      "kind": "ScalarField",
                      "alias": null,
                      "args": null,
                      "name": "max",
                      "storageKey": null
                    }
                  ]
                }
              ],
              "storageKey": null
            }
          ],
          "storageKey": null
        }
      ],
      "storageKey": null
    }
  ],
  "type": "AppType"
};

module.exports = fragment;

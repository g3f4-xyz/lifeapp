/* eslint no-undef: 0 */
const dbHook = db.getSiblingDB('lifeapp');

if (dbHook.tasks) {
  dbHook.tasks.drop();
} else {
  dbHook.createCollection('tasks');
}

dbHook.tasks.insert([
  {
    id: '123',
    title: 'title test 1',
    status: 'IN_PROGRESS',
    priority: 1,
    additionalFields: [
      {
        fieldId: 'testText1',
        format: 'text',
        type: 'text',
        label: 'Testotowe pole tekstowe',
        info: 'Informacje o testowym polu tekstowym',
        meta: {
          required: true,
          minLen: 0,
          maxLen: 400,
        },
        value: {
          text: 'Wartość testowa pola tekstowego',
        },
      }, {
        fieldId: 'testNumber1',
        format: 'number',
        type: 'number',
        label: 'Testotowe pole liczbowe',
        info: 'Informacje o testowym polu liczbowym',
        meta: {
          required: true,
          min: 3,
          max: 100,
        },
        value: {
          number: 12.34,
        },
      },
      {
        fieldId: 'testText2',
        format: 'text',
        type: 'text',
        label: 'Testotowe pole tekstowe',
        info: 'Informacje o testowym polu tekstowym',
        meta: {
          required: true,
          minLen: 1,
          maxLen: 200,
        },
        value: {
          text: 'Wartość testowa pola tekstowego',
        },
      }, {
        fieldId: 'testNumber2',
        format: 'number',
        type: 'number',
        label: 'Testotowe pole liczbowe',
        info: 'Informacje o testowym polu liczbowym',
        meta: {
          required: true,
          min: 3,
          max: 100,
        },
        value: {
          number: 0,
        },
      },
    ],
  }, 
  {
    id: '1234',
    title: 'title test 2',
    status: 'TODO',
    priority: 2,
    additionalFields: [
      {
        fieldId: 'testText1',
        format: 'text',
        type: 'text',
        label: 'Testotowe pole tekstowe',
        info: 'Informacje o testowym polu tekstowym',
        meta: {
          required: true,
          minLen: 1,
          maxLen: 400,
        },
        value: {
          text: 'Wartość testowa pola tekstowego',
        },
      }, {
        fieldId: 'testNumber1',
        format: 'number',
        type: 'number',
        label: 'Testotowe pole liczbowe',
        info: 'Informacje o testowym polu liczbowym',
        meta: {
          required: true,
          min: 0,
          max: 100,
        },
        value: {
          number: 12.34,
        },
      },
      {
        fieldId: 'testText2',
        format: 'text',
        type: 'text',
        label: 'Testotowe pole tekstowe',
        info: 'Informacje o testowym polu tekstowym',
        meta: {
          required: true,
          minLen: 0,
          maxLen: 400,
        },
        value: {
          text: 'Wartość testowa pola tekstowego',
        },
      }, {
        fieldId: 'testNumber2',
        format: 'number',
        type: 'number',
        label: 'Testotowe pole liczbowe',
        info: 'Informacje o testowym polu liczbowym',
        meta: {
          required: true,
          min: 3,
          max: 100,
        },
        value: {
          number: 12.34,
        },
      },
    ],
  },
  {
    id: '1235',
    title: 'title test 3',
    status: 'IN_PROGRESS',
    priority: 1,
    additionalFields: [
      {
        fieldId: 'testText1',
        format: 'text',
        type: 'text',
        label: 'Testotowe pole tekstowe',
        info: 'Informacje o testowym polu tekstowym',
        meta: {
          required: true,
          minLen: 0,
          maxLen: 400,
        },
        value: {
          text: 'Wartość testowa pola tekstowego',
        },
      }, {
        fieldId: 'testNumber1',
        format: 'number',
        type: 'number',
        label: 'Testotowe pole liczbowe',
        info: 'Informacje o testowym polu liczbowym',
        meta: {
          required: true,
          min: 3,
          max: 100,
        },
        value: {
          number: 12.34,
        },
      },
      {
        fieldId: 'testText2',
        format: 'text',
        type: 'text',
        label: 'Testotowe pole tekstowe',
        info: 'Informacje o testowym polu tekstowym',
        meta: {
          required: true,
          minLen: 1,
          maxLen: 200,
        },
        value: {
          text: 'Wartość testowa pola tekstowego',
        },
      }, {
        fieldId: 'testNumber2',
        format: 'number',
        type: 'number',
        label: 'Testotowe pole liczbowe',
        info: 'Informacje o testowym polu liczbowym',
        meta: {
          required: true,
          min: 3,
          max: 100,
        },
        value: {
          number: 0,
        },
      },
    ],
  }, 
  {
    id: '12347',
    title: 'title test 4',
    status: 'TODO',
    priority: 3,
    additionalFields: [
      {
        fieldId: 'testText1',
        format: 'text',
        type: 'text',
        label: 'Testotowe pole tekstowe',
        info: 'Informacje o testowym polu tekstowym',
        meta: {
          required: true,
          minLen: 1,
          maxLen: 400,
        },
        value: {
          text: 'Wartość testowa pola tekstowego',
        },
      }, {
        fieldId: 'testNumber1',
        format: 'number',
        type: 'number',
        label: 'Testotowe pole liczbowe',
        info: 'Informacje o testowym polu liczbowym',
        meta: {
          required: true,
          min: 0,
          max: 100,
        },
        value: {
          number: 12.34,
        },
      },
      {
        fieldId: 'testText2',
        format: 'text',
        type: 'text',
        label: 'Testotowe pole tekstowe',
        info: 'Informacje o testowym polu tekstowym',
        meta: {
          required: true,
          minLen: 0,
          maxLen: 400,
        },
        value: {
          text: 'Wartość testowa pola tekstowego',
        },
      }, {
        fieldId: 'testNumber2',
        format: 'number',
        type: 'number',
        label: 'Testotowe pole liczbowe',
        info: 'Informacje o testowym polu liczbowym',
        meta: {
          required: true,
          min: 3,
          max: 100,
        },
        value: {
          number: 12.34,
        },
      },
    ],
  },
]);

print(dbHook.tasks.find());

dbHook.getCollectionNames().forEach((name) => {
  print(`name: ${name} | length: ${dbHook[name].count()}`);
});

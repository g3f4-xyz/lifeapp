/* eslint no-undef: 0 */
/* eslint quotes: [0, "double"] */
const dbHook = db.getSiblingDB(DB_NAME);

print(`Initializing db with name: ${DB_NAME}`);

if (dbHook.tasks) {
  dbHook.tasks.drop();
  dbHook.tasktypes.drop();
} else {
  dbHook.createCollection("tasks");
  dbHook.createCollection("tasktypes");
}

// DANE TESTOWE
dbHook.tasks.insert([
  {
    id: "123",
    taskType: "TODO",
    ownerId: "1234567890",
    fields: [
      {
        fieldId: "TITLE",
        format: "TEXT",
        type: "TEXT",
        order: -1,
        label: "Title",
        info: "Informacje o testowym polu Title",
        meta: {
          required: true,
          minLen: 0,
          maxLen: 400,
        },
        value: {
          text: "Wartość testowa pola Title",
        },
      }, {
        fieldId: "PRIORITY",
        format: "NUMBER",
        type: "NUMBER",
        order: 0,
        label: "Priority",
        info: "Informacje o testowym polu Priority",
        meta: {
          required: true,
          options: [{
            text: "Low",
            value: "LOW",
          }, {
            text: "Normal",
            value: "NORMAL",
          }, {
            text: "High",
            value: "HIGH",
          }],
        },
        value: {
          id: "HIGH",
        },
      },
      {
        fieldId: "STATUS",
        format: "CHOICE",
        order: 0,
        type: "CHOICE",
        label: "Status",
        info: "Informacje o testowym polu Status",
        meta: {
          required: true,
          options: [{
            text: "To do",
            value: "TODO",
          }, {
            text: "Done",
            value: "DONE",
          }, {
            text: "In progress",
            value: "IN_PROGRESS",
          }],
        },
        value: {
          id: "IN_PROGRESS",
        },
      },
      {
        fieldId: "DESCRIPTION",
        format: "TEXT",
        type: "TEXT",
        order: 2,
        label: "Description",
        info: "Informacje o testowym polu Description",
        meta: {
          required: false,
          minLen: 3,
          maxLen: 100,
        },
        value: {
          text: "Wartość testowa pola Description",
        },
      },
    ],
  },
  {
    id: "1234",
    taskType: "TODO",
    ownerId: "1234567890",
    fields: [
      {
        fieldId: "TITLE",
        format: "TEXT",
        type: "TEXT",
        order: -1,
        label: "Title",
        info: "Informacje o testowym polu Title",
        meta: {
          required: true,
          minLen: 0,
          maxLen: 400,
        },
        value: {
          text: "Wartość testowa pola Title",
        },
      }, {
        fieldId: "PRIORITY",
        format: "CHOICE",
        type: "CHOICE",
        order: 0,
        label: "Priority",
        info: "Informacje o testowym polu Priority",
        meta: {
          required: true,
          options: [{
            text: "Low",
            value: "LOW",
          }, {
            text: "Normal",
            value: "NORMAL",
          }, {
            text: "High",
            value: "HIGH",
          }],
        },
        value: {
          id: "HIGH",
        },
      },
      {
        fieldId: "STATUS",
        format: "CHOICE",
        order: 0,
        type: "CHOICE",
        label: "Status",
        info: "Informacje o testowym polu Status",
        meta: {
          required: true,
          options: [{
            text: "To do",
            value: "TODO",
          }, {
            text: "Done",
            value: "DONE",
          }, {
            text: "In progress",
            value: "IN_PROGRESS",
          }],
        },
        value: {
          id: "DONE",
        },
      },
      {
        fieldId: "DESCRIPTION",
        format: "TEXT",
        type: "TEXT",
        order: 2,
        label: "Description",
        info: "Informacje o testowym polu Description",
        meta: {
          required: false,
          minLen: 3,
          maxMax: 100,
        },
        value: {
          text: "Wartość testowa pola Description",
        },
      },
      {
        fieldId: "LOCATION",
        format: "TEXT",
        type: "TEXT",
        order: 3,
        label: "Location",
        info: "Informacje o testowym polu Location",
        meta: {
          required: false,
          minLen: 3,
          maxMax: 100,
        },
        value: {
          text: "Wartość testowa pola Location",
        },
      },
      {
        fieldId: "DATE",
        format: "DATE",
        type: "DATE",
        order: 4,
        label: "Date",
        info: "Informacje o testowym polu Date",
        meta: {
          required: false,
        },
        value: {
          text: "Wartość testowa pola Date",
        },
      },
    ],
  },
]);

// KONFIGURACJA
// TYPY ZADAŃ
dbHook.tasktypes.insert([{
  typeId: "TASK",
  name: "Task",
  description: "Bazowe zadanie. Pozwala na ustawienie tytułu, priorytetu oraz sterowanie statusem.",
  order: null,
  isCustom: false,
  parentId: null,
  fieldsConfig: [{
    fieldId: "TITLE",
    format: "ELIXIR",
    order: -1,
    type: "TITLE",
    label: "Title",
    info: "Title info",
    meta: {
      required: true,
      min: 0,
      max: 100,
    },
    value: {
      text: "",
    },
  }, {
    fieldId: "STATUS",
    format: "CHOICE",
    order: 0,
    type: "CHOICE",
    label: "Status",
    info: "Status info",
    meta: {
      required: true,
      options: [{
        text: "To do",
        value: "TODO",
      }, {
        text: "Done",
        value: "DONE",
      }, {
        text: "In progress",
        value: "IN_PROGRESS",
      }],
    },
    value: {
      id: "",
    },
  }, {
    fieldId: "PRIORITY",
    format: "CHOICE",
    order: 1,
    type: "CHOICE",
    label: "Priority",
    info: "Priority info",
    meta: {
      required: true,
      options: [{
        text: "Low",
        value: "LOW",
      }, {
        text: "Normal",
        value: "NORMAL",
      }, {
        text: "High",
        value: "HIGH",
      }],
    },
    value: {
      id: "",
    },
  }],
}, {
  typeId: "TODO",
  name: "ToDo",
  description: "Klasyczy TODO. Od zwykłego zadania różni się tym, że możemy dodać szczegółowy opis.",
  order: 0,
  isCustom: false,
  parentId: "TASK",
  fieldsConfig: [{
    fieldId: "DESC",
    format: "ELIXIR",
    order: 2,
    type: "ELIXIR",
    label: "Description",
    info: "Description info",
    meta: {
      required: false,
      min: 0,
      max: 400,
    },
    value: {
      text: "",
    },
  }],
}, {
  typeId: "EVENT",
  name: "Event",
  description: "Wydarzenie pozwala na ustawienie zadania, które posiada możliwość zdefiniowania miejsca i czasu.",
  order: 1,
  isCustom: false,
  parentId: "TODO",
  fieldsConfig: [{
    fieldId: "LOCATION",
    format: "LOCATION",
    order: 3,
    type: "LOCATION",
    label: "Location",
    info: "Location info",
    meta: {
      required: false,
    },
    value: {
      text: "",
    },
  }, {
    fieldId: "DATE",
    format: "DATE",
    order: 4,
    type: "DATE",
    label: "Date",
    info: "Date info",
    meta: {
      required: false,
    },
    value: {
      text: "",
    },
  }],
}, {
  typeId: "MEETING",
  name: "Meeting",
  description: "Zadanie typu spotkanie pozwala na zapisanie spotkania. Ustal osobę oraz czas i miejsce spotkania.",
  order: 2,
  isCustom: false,
  parentId: "EVENT",
  fieldsConfig: [{
    fieldId: "PERSON",
    format: "TEXT",
    order:5,
    type: "PERSON",
    label: "Person",
    info: "Person info",
    meta: {
      required: true,
    },
    value: {
      text: "",
    },
  }],
}, {
  typeId: "CHECK_LIST",
  name: "Check list",
  description: "Zbiór pozwiązanych zadań do wykonania. Aby wykonać takie, należy wykonać wszystkie zadania powiązane.",
  order: 3,
  isCustom: false,
  parentId: "TODO",
  fieldsConfig: [{
    fieldId: "RELATED_TASKS",
    format: "LINKS",
    order: 6,
    type: "RELATION",
    label: "Related tasks",
    info: "Related tasks info",
    meta: {
      required: true,
      min: 1,
      max: 100,
    },
    value: {
      text: "",
    },
  }],
}]);

print('Collections:');
dbHook.getCollectionNames().forEach((name, index) => {
  print(`  ${index + 1}: name: ${name} | length: ${dbHook[name].count()}`);
});

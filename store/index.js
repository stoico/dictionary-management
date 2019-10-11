import { uuid } from 'vue-uuid';

export const state = () => ({
  dictionaries: [
    {
      name: 'Colors',
      content: [
        {
          domain: 'Stonegrey',
          range: 'Dark Grey',
          validity: { status: true, reason: '' },
          key: uuid.v4(),
        },
        {
          domain: 'Midnight Black',
          range: 'Black',
          validity: { status: true, reason: '' },
          key: uuid.v4(),
        },
        {
          domain: 'Mystic Silver',
          range: 'Silver',
          validity: { status: true, reason: '' },
          key: uuid.v4(),
        },
      ],
    },
    {
      name: 'Materials',
      content: [
        {
          domain: 'Stonegrey',
          range: 'Dark Grey',
          validity: { status: true, reason: '' },
          key: uuid.v4(),
        },
        {
          domain: 'Stonegrey',
          range: 'Anthracite',
          validity: { status: true, reason: '' },
          key: uuid.v4(),
        },
        {
          domain: 'Dark Grey',
          range: 'Stonegrey',
          validity: { status: true, reason: '' },
          key: uuid.v4(),
        },
      ],
    },
    {
      name: 'Texture',
      content: [
        {
          domain: 'Stonegrey',
          range: 'Dark Grey',
          validity: { status: true, reason: '' },
          key: uuid.v4(),
        },
        {
          domain: 'Stonegrey',
          range: 'Anthracite',
          validity: { status: true, reason: '' },
          key: uuid.v4(),
        },
        {
          domain: 'Dark Grey',
          range: 'Stonegrey',
          validity: { status: true, reason: '' },
          key: uuid.v4(),
        },
      ],
    },
  ],

});

export const mutations = {
  addDictionary(state, dictionaryName) {
    const newDictionary = {
      name: dictionaryName,
      content: [],
    };
    state.dictionaries.push(newDictionary);
  },
  deleteDictionary(state, dictionary) {
    if (state.dictionaries.length > 1) {
      state.dictionaries = state.dictionaries.filter((element) => dictionary !== element);
    }
  },
  addNewPairToDictionary(state, { dictionary, domain, range }) {
    // Create new pair (Object)
    const newPair = {
      key: uuid.v4(),
      domain: domain,
      range: range,
      validity: { status: true, reason: '' },
    };
    // Retrive index of the desired dictionary
    const index = state.dictionaries.indexOf(dictionary);

    // Add new object into the array with ES6's spread syntax
    state.dictionaries[index].content = [...state.dictionaries[index].content, newPair];
  },
};

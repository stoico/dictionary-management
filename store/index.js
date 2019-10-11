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
};

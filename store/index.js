import { uuid } from 'vue-uuid';

// Define strings for the warning messages in case of an inconsistency
const reasonNotValid = {
  duplicate: 'Duplicate',
  fork: 'Fork',
  cycle: 'Cycle',
  chain: 'Chain',
};

// Create state (Vuex)
// and store some initial data to test the app
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
          key: 0,
        },
        {
          domain: 'Dark Grey',
          range: 'Black',
          validity: { status: true, reason: '' },
          key: 1,
        },
        {
          domain: 'Mystic Silver',
          range: 'Silver',
          validity: { status: true, reason: '' },
          key: 2,
        },
        {
          domain: 'Acquamarine',
          range: 'Blue',
          validity: { status: true, reason: '' },
          key: 3,
        },
      ],
    },
    {
      name: 'More materials',
      content: [
        {
          domain: 'Stonegrey',
          range: 'Dark Grey',
          validity: { status: true, reason: '' },
          key: 0,
        },
        {
          domain: 'Midnight Black',
          range: 'Black',
          validity: { status: true, reason: '' },
          key: 1,
        },
        {
          domain: 'Mystic Silver',
          range: 'Silver',
          validity: { status: true, reason: '' },
          key: 2,
        },
        {
          domain: 'Stonegrey',
          range: 'Dark Grey',
          validity: { status: true, reason: '' },
          key: 3,
        },
        {
          domain: 'Stonegrey',
          range: 'Anthracite',
          validity: { status: true, reason: '' },
          key: 4,
        },
        {
          domain: 'Dark Grey',
          range: 'Stonegrey',
          validity: { status: true, reason: '' },
          key: 5,
        },
      ],
    },
    {
      name: 'Letters',
      content: [
        {
          domain: 'A',
          range: 'B',
          validity: { status: true, reason: '' },
          key: uuid.v4(),
        },
        {
          domain: 'A',
          range: 'B',
          validity: { status: true, reason: '' },
          key: uuid.v4(),
        },
        {
          domain: 'C',
          range: 'D',
          validity: { status: true, reason: '' },
          key: uuid.v4(),
        },
        {
          domain: 'E',
          range: 'F',
          validity: { status: true, reason: '' },
          key: uuid.v4(),
        },
        {
          domain: 'F',
          range: 'E',
          validity: { status: true, reason: '' },
          key: uuid.v4(),
        },
        {
          domain: 'F',
          range: 'E',
          validity: { status: true, reason: '' },
          key: uuid.v4(),
        },
        {
          domain: 'G',
          range: 'H',
          validity: { status: true, reason: '' },
          key: uuid.v4(),
        },
        {
          domain: 'Y',
          range: 'Z',
          validity: { status: true, reason: '' },
          key: uuid.v4(),
        },
        {
          domain: 'Y',
          range: 'W',
          validity: { status: true, reason: '' },
          key: uuid.v4(),
        },
      ],
    },
  ],
  indexOfSelected: 0,
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
      domain,
      range,
      validity: { status: true, reason: '' },
    };
    // Retrive index of the desired dictionary
    const index = state.dictionaries.indexOf(dictionary);

    // Add new object into the array with ES6's spread syntax
    state.dictionaries[index].content = [...state.dictionaries[index].content, newPair];
  },
  deletePairFromDictionary(state, { index, key }) {
    const data = [...state.dictionaries[index].content];
    state.dictionaries[index].content = data.filter((item) => item.key !== key);
  },
  editPair(state, {
    index, key, column, value,
  }) {
    const dictionary = state.dictionaries[index].content;

    state.dictionaries[index].content = dictionary.map((pair) => {
      if (pair.key === key) {
        pair[column] = value;
      }
      return pair;
    });
  },
  setIndexSelected(state, index) {
    if (state.dictionaries[index]) {
      state.indexOfSelected = index;
    } else {
      state.indexOfSelected = 0;
    }
  },
  // Validity checks
  //
  // Duplicate inconsistency
  checkForDuplicates(state, indexDictionary) {
    const data = state.dictionaries[indexDictionary].content;

    data.forEach((value) => {
      state.dictionaries[indexDictionary].content = data.map((pair, index) => {
        // Make sure the object is not itself
        if (data.indexOf(pair) !== data.indexOf(value)) {
          if (pair.domain === value.domain && pair.range === value.range) {
            if (
              data[index].validity.status
              && data[index].validity.reason === ''
            ) {
              // Change validity of the pair to false and assign the reason why
              data[index].validity.status = false;
              data[index].validity.reason = reasonNotValid.duplicate;
            }
          }
        }
        return pair;
      });
    });
  },
  // Fork inconsistency
  checkForForks(state, indexDictionary) {
    const data = state.dictionaries[indexDictionary].content;

    data.forEach((value) => {
      state.dictionaries[indexDictionary].content = data.map((pair, index) => {
      // Make sure the object is not being compared to itself
        if (data.indexOf(pair) !== data.indexOf(value)) {
          if (pair.domain === value.domain && pair.range !== !value.range) {
            if (
              data[index].validity.status
              && data[index].validity.reason === ''
            ) {
              data[index].validity.status = false;
              data[index].validity.reason = reasonNotValid.fork;
            }
          }
        }
        return pair;
      });
    });
  },
  // Cycle inconsistency
  checkForCycles(state, indexDictionary) {
    const data = state.dictionaries[indexDictionary].content;

    data.forEach((value) => {
      state.dictionaries[indexDictionary].content = data.map((pair, index) => {
        if (data.indexOf(pair) !== data.indexOf(value)) {
        if (value.domain === pair.range && value.range === pair.domain) {
          if (
            data[index].validity.status
              && data[index].validity.reason === ''
          ) {
            data[index].validity.status = false;
            data[index].validity.reason = reasonNotValid.cycle;
          }
        }
        }
        return pair;
      });
    });
  },
  // Chain inconsistency
  checkForChains(state, indexDictionary) {
    const data = state.dictionaries[indexDictionary].content;

    data.forEach((value) => {
      state.dictionaries[indexDictionary].content = data.map((pair, index) => {
        if (value.range === pair.domain && value.domain !== pair.range) {
          if (
            data[index].validity.status
          && data[index].validity.reason === ''
          ) {
            data[index].validity.status = false;
            data[index].validity.reason = reasonNotValid.chain;
          }
        }
        return pair;
      });
    });
  },
  // Set all the pairs to valid and remove warning messages
  resetValidity(state, indexDictionary) {
    const data = state.dictionaries[indexDictionary].content;

    data.forEach((value, index) => {
      data[index].validity.status = true;
      data[index].validity.reason = '';
    });

    return data;
  },
};

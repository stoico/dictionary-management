import { uuid } from 'vue-uuid';

// Define strings for the warning messages in case of an inconsistency
const reasonNotValid = {
  duplicate: 'Duplicate',
  fork: 'Fork',
  cycle: 'Cycle',
  chain: 'Chain',
};

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
        if (value.domain === pair.range && value.range === pair.domain) {
          if (
            data[index].validity.status
              && data[index].validity.reason === ''
          ) {
            data[index].validity.status = false;
            data[index].validity.reason = reasonNotValid.cycle;
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

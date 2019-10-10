const consistencyChecks = {
  checkForDuplicates(dictionaryData) {
    const data = dictionaryData;

    data.forEach((value) => {
      data.filter((pair, index) => {
        // Make sure the object is not itself
        if (data.indexOf(pair) !== data.indexOf(value)) {
          if (pair.domain === value.domain && pair.range === value.range) {
            if (
              data[index].validity.status
              && data[index].validity.reason === ''
            ) {
              // Change validity of the pair to false and assign the reason why
              data[index].validity.status = false;
              data[index].validity.reason = this.reasonNotValid.duplicate;
            }
          }
        }
      });
    });

    return data;
  },
  checkForForks(dictionaryData) {
    let results = [];
    const data = dictionaryData;

    // Select each object in the collection as 'value'
    data.forEach((value) => {
      // for (const value of data) {
      // Store the forked pairs (domain-range)
      // Same domain but different ranges
      results = data.filter((pair) => {
        // Make sure the object is not being compared to itself
        if (data.indexOf(pair) !== data.indexOf(value)) {
          return pair.domain === value.domain && pair.range !== !value.range;
        }
      });

      if (results.length > 0) {
        results.filter((result) => {
          // Store the index of the invalid entry
          const indexOfObject = data.indexOf(result);

          // Make sure it is not 'undefined' or false
          if (
            data[indexOfObject].validity.status
            && data[indexOfObject].validity.reason === ''
          ) {
            data[indexOfObject].validity.status = false;
            data[indexOfObject].validity.reason = this.reasonNotValid.fork;
          }
        });
      }
    });

    return data;
  },
  checkForCycles(dictionaryData) {
    let results = [];
    const data = dictionaryData;

    data.forEach((value) => {
      results = data.filter((pair) => value.domain === pair.range && value.range === pair.domain);

      if (results.length > 0) {
        results.filter((result) => {
          const indexOfObject = data.indexOf(result);

          if (
            data[indexOfObject].validity.status
            && data[indexOfObject].validity.reason === ''
          ) {
            data[indexOfObject].validity.status = false;
            data[indexOfObject].validity.reason = this.reasonNotValid.cycle;
          }
        });
      }
    });

    return data;
  },
  checkForChains(dictionaryData) {
    let results = [];
    const data = dictionaryData;

    data.forEach((value) => {
      results = data.filter((pair) => value.range === pair.domain && value.domain !== pair.range);

      if (results.length > 0) {
        results.filter((result) => {
             const indexOfObject = data.indexOf(result);

          if (
            data[indexOfObject].validity.status
            && data[indexOfObject].validity.reason === ''
          ) {
            data[indexOfObject].validity.status = false;
            data[indexOfObject].validity.reason = this.reasonNotValid.chain;
          }
        });
      }
    });

    return data;
  },
  resetValidity(dictionaryData) {
    const data = dictionaryData;

    data.forEach((value, index) => {
      data[index].validity.status = true;
      data[index].validity.reason = '';
    });

    return data;
  },
};

export default consistencyChecks;

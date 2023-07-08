export const valuesToInt = (values: string[]) => {
    return values.map((value) => {
      if (value === '') {
        return Infinity;
      }
      return parseInt(value);
    });
  };

export const valuesMaybeToInt = (values: string[]) => {
    return values.map((value) => {
        //parseInt(value)
        if (value === '1' || value === '2' || value === '3' || value === '4' || value === '5' || value === '6' || value === '7' || value === '8') {
            return parseInt(value);
        }
        return value;
    });
};
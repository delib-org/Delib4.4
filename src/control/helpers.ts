export function updateArray(
    currentArray: Array<any>,
    newItem: any,
    updateByProperty:string
  ): Array<any> {
    try {
      const arrayTemp = [...currentArray];
  
      if (!newItem[updateByProperty]) {
        arrayTemp.push(newItem);
      } else {
        //find arry;
        const index = arrayTemp.findIndex((item) => item[updateByProperty] === newItem[updateByProperty]);
        if (index === -1) arrayTemp.push(newItem);
        else arrayTemp[index] = newItem;
      }
  
      return arrayTemp;
    } catch (error) {
      console.error(error);
      return currentArray;
    }
  }
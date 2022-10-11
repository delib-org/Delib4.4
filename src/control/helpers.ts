export function updateArray(
  currentArray: Array<any>,
  newItem: any,
  updateByProperty: string
): Array<any> {
  try {
    const arrayTemp = [...currentArray];

    if (!newItem[updateByProperty]) {
      throw new Error(`Item dont have property ${updateByProperty}`);
    }
    //find arry;
    const index = arrayTemp.findIndex(
      (item) => item[updateByProperty] === newItem[updateByProperty]
    );
    if (index === -1) arrayTemp.push(newItem);
    else {
      arrayTemp[index] = {...arrayTemp[index],...newItem};
    
    }

    return arrayTemp;
  } catch (error) {
    console.error(error);
    return currentArray;
  }
}

export function fromTextToParagraph(text:string):string[]{
  try {
    const paragraph = text.split("\n");
    return paragraph;
  } catch (error) {
    console.error(error);
    return [text]
  }
}

export function randomizeArray(array:Array<any>):Array<any> {
 
  const newArray = [...array];
  console.log(newArray)
  let currentIndex = newArray.length,  randomIndex;

  // While there remain elements to shuffle.
  while (currentIndex !== 0) {

    // Pick a remaining element.
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [newArray[currentIndex], newArray[randomIndex]] = [
      newArray[randomIndex], newArray[currentIndex]];
  }

  return newArray;
}

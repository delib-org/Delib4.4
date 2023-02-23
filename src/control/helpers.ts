
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
      arrayTemp[index] = { ...arrayTemp[index], ...newItem };
    }

    return arrayTemp;
  } catch (error) {
    console.error(error);
    return currentArray;
  }
}

export function fromTextToParagraph(text: string): string[] {
  try {
    const paragraph = text.split("\n");
    return paragraph;
  } catch (error) {
    console.error(error);
    return [text];
  }
}

export function randomizeArray(array: Array<any>): Array<any> {
  const newArray = [...array];
  let currentIndex = newArray.length,
    randomIndex;

  // While there remain elements to shuffle.
  while (currentIndex !== 0) {
    // Pick a remaining element.
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [newArray[currentIndex], newArray[randomIndex]] = [
      newArray[randomIndex],
      newArray[currentIndex],
    ];
  }

  return newArray;
}

export function getColor() {
  return (
    "hsl(" +
    360 * Math.random() +
    "," +
    (25 + 70 * Math.random()) +
    "%," +
    (85 + 10 * Math.random()) +
    "%)"
  );
}

export function fromTextToArray(text: string): Array<string> {
  try {
   
    return  text.split("\n");
  } catch (error) {
    console.error(error);
    return [text];
  }
}



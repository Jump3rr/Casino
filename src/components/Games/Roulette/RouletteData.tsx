type RouletteNumber = {
  option: string;
  style: {
    backgroundColor: string;
    textColor: string;
  };
};
export const rouletteData = (): RouletteNumber[] => {
  let data: RouletteNumber[] = [];

  data.push({
    option: '0',
    style: { backgroundColor: 'green', textColor: 'white' },
  });

  for (let i = 1; i < 37; i++) {
    let backgroundColor: string = i % 2 === 0 ? 'black' : 'red';
    data.push({
      option: `${i}`,
      style: { backgroundColor: `${backgroundColor}`, textColor: 'white' },
    });
  }

  return data;
};

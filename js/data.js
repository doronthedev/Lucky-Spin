const Data = {
  changes: [],
  names: ['Hello', 'two'],
  numberOfSpin: 0,
};

function saveData(Data) {
  const number = Data.numberOfSpin;

  localStorage.setItem('spinNumber', number);
}

function getData(Data) {
  const number = localStorage.getItem('spinNumber') || 0;

  Data.numberOfSpin = number;
}

export default Data;
export { saveData, getData };

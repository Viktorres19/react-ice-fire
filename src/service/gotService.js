export default class GotService {

  constructor() {
    this._apiBase = 'https://www.anapioficeandfire.com/api';
  }

  getResourse = async (url) => {
    // url приходить при виклику, а перша частина береться з конструктора
    const res = await fetch(`${this._apiBase}${url}`);

    if (!res.ok) {
      throw new Error(`Could not fetch ${url}, status: ${res.status}`);
    }

    return await res.json();
  }
  getAllCharacters = async () => {
    // отримувати п'яту сторінку з 10 персонажами
    const res = await this.getResourse(`/characters?page=5&pageSize=10`);
    return res.map(this._transformCharacter)
  }
  // щоб викликати одного якогось персонажа
  getCharacter = async (id) => {
    const character = await this.getResourse(`/characters/${id}`);
    return this._transformCharacter(character);
  }

  getAllBooks = async () => {
    return this.getResourse('/books/');
  }
  getBook = async (id) => {
    return this.getResourse(`/books/${id}`);
  }

  getAllHouses = async () => {
    const res = await this.getResourse('/houses/');
    return res.map(this._transformHouse);
  }
  getHouse = async (id) => {
    const house = await this.getResourse(`/houses/${id}`);
    return this._transformHouse(house);
  }

  _transformCharacter(char) {
    return {
      name: char.name,
      gender: char.gender,
      born: char.born,
      died: char.died,
      culture: char.culture
    }
  }
  // трансформація домів
  _transformHouse(house) {
    return {
      name: house.name,
      region: house.region,
      words: house.words,
      titles: house.titles,
      overlord: house.overlord,
      ancestralWeapons: house.ancestralWeapons
    }
  }
  // трансформація книг
  _transformBoook(book) {
    return {
      name: book.name,
      numberOfPages: book.numberOfPages,
      publisher: book.publisher,
      released: book.released
    }
  }
}
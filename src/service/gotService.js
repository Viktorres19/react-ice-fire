export default class GotService {

  constructor() {
    this._apiBase = 'https://www.anapioficeandfire.com/api';
  }

  async getResourse(url) {
    // url приходить при виклику, а перша частина береться з конструктора
    const res = await fetch(`${this._apiBase}${url}`);

    if (!res.ok) {
      throw new Error(`Could not fetch ${url}, status: ${res.status}`);
    }

    return await res.json();
  }
  async getAllCharacters() {
    // отримувати п'яту сторінку з 10 персонажами
    const res = await this.getResourse(`/characters?page=5&pageSize=10`);
    return res.map(this._transformCharacter)
  }
  // щоб викликати одного якогось персонажа
  async getCharacter(id) {
    const character = await this.getResourse(`/characters/${id}`);
    return this._transformCharacter(character);
  }

  getAllBooks() {
    return this.getResourse('/books/');
  }
  getBook(id) {
    return this.getResourse(`/books/${id}`);
  }

  getAllHouses() {
    return this.getResourse('/houses/');
  }
  getHouse(id) {
    return this.getResourse(`/houses/${id}`);
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
      ancestralWeapons: house.ancestralWeapons()
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
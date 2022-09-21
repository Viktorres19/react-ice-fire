import React, {Component} from 'react';
import './randomChar.css';
import gotService from './../../service/gotService';
import Spinner from '../spinner';
import ErrorMessage from '../errorMessage';

export default class RandomChar extends Component {

    gotService = new gotService();
    state = {
      char: {},
      loading: true
    }

    componentDidMount() {
      this.updateChar();
      this.timerId = setInterval(this.updateChar, 5000);
    }

    componentWillUnmount() {
      clearInterval(this.timerId);
    }

  onCharLoaded = (char) => {
      this.setState({
        char,
        loading: false,
        error: false
      })
    }

    onError = (err) => {
      this.setState({
        error: true,
        loading: false
      })
    }

    updateChar = () => {
      const id = Math.floor(Math.random()*140 + 25); //25-140
      this.gotService.getCharacter(id)
        .then(this.onCharLoaded)
        .catch(this.onError);
    }

    render() {
        console.log('render');
        const { char: {name, gender, born, died, culture}, loading, error } = this.state;

        if (loading) {
          return (
            <div className="random-block rounded">
              <Spinner />
            </div>
          )
        }

        else if (error) {
          return (
            <div className="random-block rounded">
              <ErrorMessage/>
            </div>
          )
        }

        return (
            <div className="random-block rounded">
                <h4>Random Character: {name}</h4>
                <ul className="list-group list-group-flush">
                    <li className="list-group-item d-flex justify-content-between">
                        <span className="term">Gender </span>
                        <span>{gender}</span>
                    </li>
                    <li className="list-group-item d-flex justify-content-between">
                        <span className="term">Born </span>
                        <span>{born}</span>
                    </li>
                    <li className="list-group-item d-flex justify-content-between">
                        <span className="term">Died </span>
                        <span>{died}</span>
                    </li>
                    <li className="list-group-item d-flex justify-content-between">
                        <span className="term">Culture </span>
                        <span>{culture}</span>
                    </li>
                </ul>
            </div>
        );
    }
}

import React, {Component} from 'react';
import {Col, Row, Container} from 'reactstrap';
import Header from '../header';
import RandomChar from '../randomChar';
import ErrorMessage from '../errorMessage';
import CharacterPage from "../characterPage";


export default class App extends Component {

    state = {
      showRandomChar: true,
      error: false
    };

    componentDidCatch() {
      console.log('error');
      this.setState({
        error: true
      })
    }

    render() {

      if (this.state.error) {
        return <ErrorMessage />
      }

      return (
        <>
          <Container>
            <Header />
          </Container>
          <Container>
            <Row>
              <Col lg={{size: 5, offset: 0}}>
                <RandomChar/>
              </Col>
            </Row>
            <CharacterPage />
          </Container>
        </>
      );
    }
};
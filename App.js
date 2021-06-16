import React, { Component } from 'react';
import {  Button, Container, Row, Col, Input, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import './App.css';



class App extends Component {
      constructor(props){
            super(props)    
            this.state = {
                  data: [],
                  status: false,
                  modal: false,
            }
      }

      componentDidMount(){
            this.getData();
      }
      getData(){
            //data = [] user-> author
            //user =
            let user = {
                  id: '1',
                  name: 'Le Tuan'
              }

            let data = 
                  [
                    {
                        author: 'Le Tuan',
                        content: 'We have made th inredhemselves. ',
                        text : '',
                        comments: [
                              {
                                    user: 'Hoang Long',
                                    content: 'You can now view training in the browser.',
                                    like: false,
                              },
                              {
                                    user: 'Ngoc Huyen',
                                    content: 'Note that the development build is not optimized.',
                                    like: false,
                              },
                            

                            ]
                          },
                          {
                            author: 'Trong Duc',
                            content: 'We have found some problems.',
                            text : '',
                            comments: [
                                  {
                                        user: 'Hoang Long',
                                        content: 'Local:            http://localhost:3000.',
                                        like: false,
                                  },
                                  {
                                        user: 'Ngoc Huyen',
                                        content: 'To create a production build, use npm run build.',
                                        like: false,
                                  },
                                
    
                                ]
                              }
                      ]
                  
            this.setState({
                  data,
                  user
            });

      }
      likeComment = (ev, i, r) => {
            let data = this.state.data;
            data[i].comments[r].like = !data[i].comments[r].like; 
           
            this.setState({
                  data
            });
            
            
      }
      
      onChangeText = (ev, i) => {
            let data = this.state.data;
            data[i].text = ev.target.value;
            
            this.setState({
                  data
            });
           
      }
      onSubmit = (e, i) => {
            let { data, user } = this.state;
            let obj = {
                  user: user.name,
                  content: data[i].text,
            }
           
            data[i].comments.push(obj);
            data[i].text = '';
            this.setState({
                  data,
            });
            

      }
      clickToggle = (ev, i) => {
            let {data, modal} = this.state;
            console.log(data[i]);
            modal = !modal;
            console.log(modal, 'modal');
            this.setState({
                  data,
                  modal
            
            });
              
      }
      

      render() {
            let { data, user } = this.state;
            let arr = data ? data: [];
            
            let item = arr.map((c, i) => {
              let arrComments = c.comments ? c.comments : [];
              let itemComments = arrComments.map((d, r) => {
                return (
                  <div className="comment">
                                    <div className="user"> 
                                      {d.user}
                                    </div>
                                    <div className="content">          
                                          {d.content}
                                    </div>
                                    <div className={d.like ? 'like' : 'liked'} onClick={ ev => this.likeComment(ev, i ,r)}> <span class="material-icons">thumb_up</span>
                                    </div>
                                    <div className="edit"><span class="material-icons">edit_note</span>
                                    </div>
                              </div>
                )
                
              })
              return (
                  <div>
                      <Row >
                    <Col xs="2">
                          
                    </Col>
                    <Col className="box-shadow" xs="6">
                          <div>
                                <h3 style={{  'color' : '#1e8c97', 'textAlign': 'left', 'paddingLeft' : '30px' }}> {c.author} </h3>
                          </div>
                          <p> {c.content}  </p>
                          <Button style = {{'display': c.author === user.name ? 'block' : 'none', 'float' : 'right'}} onClick={ev => this.clickToggle(ev, i)}>Edit Post</Button>
                    </Col>
                    
              </Row>
              <Row>
              <Col xs={{ 'size' : '6', 'offset' : '2' }} >
                  {itemComments}
              </Col>
              </Row>
              <Row>
                    <Col xs={{ 'size' : '6' , 'offset' : '2' }} style={{ 'display' : 'flex', 'paddingTop' : '20px' }}>
                          <Input value = {c.text} onChange={ev => this.onChangeText(ev, i)}  name="text" className="text" type="text" placeholder="Write something......." />
                          <Button onClick={e => this.onSubmit(e, i)}>Comment</Button>
                    </Col>
              </Row>
                  <div>
                        <Modal isOpen={false} toggle={this.clickToggle}>
                              <ModalHeader toggle={this.clickToggle}>Content of {data[i].author}</ModalHeader>
                              <ModalBody>
                                    {data[i].content}
                                    <Input type="text" name = 'textContent' className="text" placeholder="Write content you want to change..."/>
                              </ModalBody>
                              <ModalFooter>
                              <Button color="primary" onClick={this.clickToggle}>Update</Button>{' '}
                              <Button color="secondary" onClick={this.clickToggle}>Cancel</Button>
                              </ModalFooter>
                        </Modal>
                  </div>
             </div>
             
                  )
            })

            return (
                  <div className="App" style={{ 'paddingTop': '40px' }}>
                        <Container>
                          {item}
                        </Container>
                        
                  </div>
                  
            );
      }
}

export default App;

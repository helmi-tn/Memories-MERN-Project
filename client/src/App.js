import React, { useEffect, useState } from 'react';
import { Container, AppBar ,Typography, Grow, Grid } from '@material-ui/core';
import { useDispatch } from 'react-redux';

import { getPosts } from './actions/posts' 

import memories2 from './images/memories2.png';
import Posts from './components/Posts/Posts';
import Form from './components/Form/Form';

import useStyles from './styles';
import { mergeClasses } from '@material-ui/styles';
import  styles from './index.css';


function App() {
  const dispatch = useDispatch();
  const classes = useStyles();
  const [currentId,setCurrentId] = useState(null);

  useEffect(() => {
      dispatch(getPosts());
  }, [currentId,dispatch])
  return (
    <Container  maxwidth="lg">
      <AppBar className={classes.appBar} position="static" color="inherit" >
        <Typography className={classes.heading} variant="h3" align="center">Memories</Typography>
        <img className={classes.image} src={memories2} alt="memories" height="110"/>
      </AppBar>
      <Grow in>
        <Container>
          <Grid className={classes.mainContainer} container justify="space-between" alignItems="stretch" spacing={3}>
            <Grid item xs={12} sm={7}>
              <Posts setCurrentId={setCurrentId}/>
            </Grid>
            <Grid item xs={12} sm={4}> 
              <Form  currentId={currentId} setCurrentId={setCurrentId}/>
            </Grid>
          </Grid>
        </Container>
      </Grow>
    </Container>
  );
}

export default App;

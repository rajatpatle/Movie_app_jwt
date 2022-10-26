// import { Button, CssBaseline, Grid, Typography } from '@mui/material';
// import { useDispatch } from 'react-redux';
// import { useNavigate } from 'react-router-dom';
// import { unSetUserToken } from '../../features/authSlice';
// import { removeToken } from '../../services/LocalStorageService';
// import ChangePassword from './auth/ChangePassword';

// const Dashboard = () => {
//   const navigate = useNavigate()
//   const dispatch = useDispatch()
//   const handleLogout = () => {
//     dispatch(unSetUserToken({ access_token : null }))
//     removeToken()
//     navigate('/login')
//   }
//   return <>
//     <CssBaseline />
//     <Grid container>
//       <Grid item sm={4} sx={{ backgroundColor: 'gray', p: 5, color: 'white' }}>
//         <h1>Dashboard</h1>
//         <Typography variant='h5'>Email: sonam@gmail.com</Typography>
//         <Typography variant='h6'>Name: Sonam</Typography>
//         <Button variant='contained' color='warning' size='large' onClick={handleLogout} sx={{ mt: 8 }}>Logout</Button>
//       </Grid>
//       <Grid item sm={8}>
//         <ChangePassword />
//       </Grid>
//     </Grid>

//   </>;
// };

// export default Dashboard;

import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { unSetUserToken } from "../../features/authSlice";
import { removeToken } from "../../services/LocalStorageService";
import ChangePassword from "./auth/ChangePassword";
import { Button, CssBaseline, Grid, Typography } from "@mui/material";
import React, { useState } from "react";
import Axios from "axios";
import styled from "styled-components";
import MovieComponent from "../MovieComponent";
import MovieInfoComponent from "../MovieInfoComponent";

export const API_KEY = "a9118a3a";

const Container = styled.div`
  display: flex;
  flex-direction: column;
`;
const AppName = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;
const Header = styled.div`
  background-color: black;
  color: white;
  display: flex;
  justify-content: space-between;
  flex-direction: row;
  align-items: center;
  padding: 10px;
  font-size: 25px;
  font-weight: bold;
  box-shadow: 0 3px 6px 0 #555;
`;
const SearchBox = styled.div`
  display: flex;
  flex-direction: row;
  padding: 10px 10px;
  border-radius: 6px;
  margin-left: 20px;
  width: 50%;
  background-color: white;
`;
const SearchIcon = styled.img`
  width: 32px;
  height: 32px;
`;
const MovieImage = styled.img`
  width: 48px;
  height: 48px;
  margin: 15px;
`;
const SearchInput = styled.input`
  color: black;
  font-size: 16px;
  font-weight: bold;
  border: none;
  outline: none;
  margin-left: 15px;
`;
const MovieListContainer = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  padding: 30px;
  gap: 25px;
  justify-content: space-evenly;
`;
const Placeholder = styled.img`
  width: 120px;
  height: 120px;
  margin: 150px;
  opacity: 50%;
`;

function Dashboard() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleLogout = () => {
    dispatch(unSetUserToken({ access_token: null }));
    removeToken();
    navigate("/login");
  };

  const [searchQuery, updateSearchQuery] = useState("");

  const [movieList, updateMovieList] = useState([]);
  const [selectedMovie, onMovieSelect] = useState();

  const [timeoutId, updateTimeoutId] = useState();

  const fetchData = async (searchString) => {
    const response = await Axios.get(
      `https://www.omdbapi.com/?s=${searchString}&apikey=${API_KEY}`
    );
    updateMovieList(response.data.Search);
  };

  const onTextChange = (e) => {
    onMovieSelect("");
    clearTimeout(timeoutId);
    updateSearchQuery(e.target.value);
    const timeout = setTimeout(() => fetchData(e.target.value), 500);
    updateTimeoutId(timeout);
  };
  return (
    <>
      <Container>
        <Header>
          <AppName>React Movie App</AppName>
          <SearchBox>
            <SearchInput
              placeholder="Search Movie"
              value={searchQuery}
              onChange={onTextChange}
            />
          </SearchBox>
        </Header>
        {selectedMovie && (
          <MovieInfoComponent
            selectedMovie={selectedMovie}
            onMovieSelect={onMovieSelect}
          />
        )}
        <MovieListContainer>
          {movieList?.length
            ? movieList.map((movie, index) => (
                <MovieComponent
                  key={index}
                  movie={movie}
                  onMovieSelect={onMovieSelect}
                />
              ))
            : ""}
        </MovieListContainer>
      </Container>

      <Grid container>
        <Grid
          item
          sm={4}
          sx={{ backgroundColor: "gray", p: 5, color: "white" }}
        >
          <h1>Dashboard</h1>
          <Typography variant="h5">Email: rajat@gmail.com</Typography>
          <Typography variant="h6">Name: Rajat</Typography>
          <Button
            variant="contained"
            color="warning"
            size="large"
            onClick={handleLogout}
            sx={{ mt: 8 }}
          >
            Logout
          </Button>
        </Grid>
        <Grid item sm={8}>
          <ChangePassword />
        </Grid>
      </Grid>
    </>
  );
}

export default Dashboard;

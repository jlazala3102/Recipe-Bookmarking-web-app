import React from 'react';
import './Cards.css';
import CardItem from './CardItem';
import { useNavigate } from 'react-router-dom';
import { searchRecipesByCuisine } from '../utils/api';

function Cards() {
  const navigate = useNavigate();

  const handleCuisineSearch = async (cuisine) => {
    try {
      const recipes = await searchRecipesByCuisine(cuisine); // Pass the cuisine directly
      navigate("/recipe-page", { state: { recipes, query: cuisine } }); // Navigate with cuisine results
    } catch (error) {
      console.error('Error fetching recipes:', error);
    }
  };

  return (
    <div className='cards'>
      <h1>Check out these EPIC Cuisines!</h1>
      <div className='cards__container'>
        <div className='cards__wrapper'>
          <ul className='cards__items'>
            <CardItem
              src='images/mex.jpg'
              text='Explore the flavors of Mexican cuisine'
              label='Mexican'
              onClick={() => handleCuisineSearch('Mexican')}
            />
            <CardItem
              src='images/italian.png'
              text='Indulge in the richness of Italian dishes'
              label='Italian'
              onClick={() => handleCuisineSearch('Italian')}
            />
          </ul>
          <ul className='cards__items'>
            <CardItem
              src='images/indian.jpeg'
              text='Discover the spices of Indian cuisine'
              label='Indian'
              onClick={() => handleCuisineSearch('Indian')}
            />
            <CardItem
              src='images/mediterranian.jpg'
              text='Savor the freshness of Mediterranean flavors'
              label='Mediterranean'
              onClick={() => handleCuisineSearch('Mediterranean')}
            />
            <CardItem
              src='images/thai.jpg'
              text='Experience the unique tastes of Thai cuisine'
              label='Thai'
              onClick={() => handleCuisineSearch('Thai')}
            />
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Cards;
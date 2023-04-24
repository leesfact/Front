/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import React, { useEffect } from 'react';
import Sidebar from '../../components/Sidebar/Sidebar';
import BookCard from '../../components/UI/BookCard/BookCard';
import axios from 'axios';


const mainContainer = css`
    padding: 10px;

`;

const header = css`
    display: flex;
    justify-content: space-between;
    height: 100px;
`;

const main = css`
    display: flex;
    flex-wrap: wrap;
    height: 750px;
    overflow-y: auto;
`;

const Main = () => {

    useEffect(() => {
        searchBooks();
    },[]);

    const searchBooks = async () => {
        const searchParam ={
            page: 1
            
        }

        const option = {

        }
        const response = await axios.get("http://localhost:8080/books", {params:{...searchParam}});
        console.log(response);
    }

    return (
        <div css ={mainContainer}>
            <Sidebar></Sidebar>
            <header css={header}>
                <div>도서검색</div>
                <div>
                    <input type="search" />
                </div>
            </header>
            <main css ={main}>
                <BookCard></BookCard>
                <BookCard></BookCard>
                <BookCard></BookCard>
                <BookCard></BookCard>
                <BookCard></BookCard>
                <BookCard></BookCard>
            </main>
        </div>
    );
};

export default Main;
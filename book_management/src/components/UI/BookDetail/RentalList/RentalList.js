/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import axios from 'axios';
import React from 'react';
import { useQuery, useQueryClient } from 'react-query';


const table = css`
    border: 1px solid #dbdbdb;

`;

const thAndTd = css`
    border: 1px solid #dbdbdb;
    padding: 5px 10px;
    text-align: center;
`;

const RentalList = ( { bookId }) => {
    const queryClient = useQueryClient();
    const userId = queryClient.getQueryData("principal").data.userId;
    const getRentalList = useQuery(["getRentalList"], async()=> {
        const option = {
            headers: {
                Authorization: localStorage.getItem("accessToken")
            }
        }
        return await axios.get(`http://localhost:8080/book/${bookId}/rental/list`,option);
    });


    const rentalBook = //postMapping 

    const returnBook = //deleteMapping



    if(getRentalList.isLoading) {
        return <div>불러오는 중...</div>
    }


    return (
        <>
          <table css={table}>
            <thead>
                <tr>
                    <th css={thAndTd}>도서번호</th>
                    <th css={thAndTd}>도서명</th>
                    <th css={thAndTd}>상태</th>
                </tr>
            </thead>
            <tbody>
                {getRentalList.data.data.map(rentalData => {
                    // Compare key values ​​and Rerendering
                    return (<tr key={rentalData.bookListId}> 
                        <td css={thAndTd}>{rentalData.bookListId}</td>
                        <td css={thAndTd}>{rentalData.bookName}</td>
                        {rentalData.rentalStatus 
                            ? (<td css={thAndTd}>대여가능 <button>대여</button></td>) 
                            : (<td css={thAndTd}>대여중 {rentalData.userId === userId
                                ? (<button>반납</button>): ""}</td>)}
                    </tr>)
                })}
            </tbody>
          </table>  
        </>
    );
};

export default RentalList;
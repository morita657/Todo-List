import React, { Component } from 'react';
import ListContainer from '../Container/ListContainer';
import ChartContainer from '../Container/ChartContainer';


const TodoComponent =()=> (<div>
            <div style={{float: 'left',width:'29%'}}>
                <form method="post" action="http://localhost:5000/">
                    <input type='text' name="task" placeholder="Do something new"></input>
                    <input type='text' name="name" placeholder="Input user name"></input>
                    <button>Button</button>
                </form>
                <ul>
                    <ListContainer />
                </ul>
            </div>
            <ChartContainer/>
        </div>);
export default TodoComponent 
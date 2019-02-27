import React from 'react';
import {
  Link,
} from 'react-router-dom';

const arr=[
  {index:1, name:'tom'},
  {index:2, name:'lee'},
  {index:3, name:'zhang'},
  {index:4, name:'jersey'},
  {index:5, name:'ma'},
]

const Topics = () => (
    <div>
        <h2>Topics</h2>
        {
          arr.map((item)=> {
            const target = `/topics/detail/${item.index}`
            return(
                <li key={item.index}><Link to={target}>{item.name}</Link></li>
            )
          })
        }
    </div>
  )

export default Topics;

import React, {useState} from 'react';
import todo from "../images/todo.png";
import "../App.css";

const Todo = () => {
    const [inputData, setInputData] = useState('');
    const [items, setItems] = useState([]);
    const [toggleSubmit, setToggleSubmit] = useState(true);
    const [isEditItem, setIsEditItem] = useState(null);

   //Add Items
    const addItems = () => {
        if(!inputData){

        }else if(inputData && !toggleSubmit){
           setItems(
               items.map((elem)=>{
                   if (elem.id == isEditItem){
                   return{...elem,name:inputData}
                   }
                   return elem
               })
           )
           setToggleSubmit(true);
           setInputData();
           setIsEditItem(null);
        }
        else{
    const allInputData = {id: new Date().getTime().toString(), name:inputData}

   setItems([...items, allInputData]);
   setInputData('');
    }
}

//Delete Items: we get the ind no. by id
const deleteItem= (index)=>{
    const updatedItems = items.filter((elem)=> {
    return index != elem.id;
});
setItems(updatedItems);
}

//Edit Items
const editItem = (id) => {
  let newEditItem = items.find((elem) =>{
        return elem.id == id
  });
  setToggleSubmit(false);
  setInputData(newEditItem.name);
  setIsEditItem(id);
}


//Remove All
const RemoveAll = () =>{
    setItems([]);
}


    return(
     <>
    <div className = "main-div">
    <div className = "child-div">
<figure>
    <img src={todo} alt="todo-logo"/>
    <figcaption>Add Your List Here! </figcaption>
</figure>

{/* 
//using Hooks input value*/}
<div className="addItems">
<input type="text" placeholder="Add Items..."
value={inputData} onChange={(e)=> {
    setInputData(e.target.value);
}}
/>
{
toggleSubmit ? <i className="fa fa-plus add-btn" title="Add Item" onClick={addItems}></i> :
<i className="fas fa-edit" title="Edit Item" onClick={addItems}></i>

}
</div>


<div className="showItems">
{//looping the values
    items.map((elem)=> {
    return(
        <div className="eachItem" key={elem.id}>
        <h3>{elem.name}</h3>
        <div className="todo-btn">
        <i className="fa fa-edit" title="Delete Item" onClick={() => editItem(elem.id)}></i>
        <i className="far fa-trash-alt add-btn" title="Delete Item" onClick={() => deleteItem(elem.id)}></i>
    </div>
    </div>
    )
    })
}
   
</div>
<div className="showItems">
    <button className="btn-effect04" data-sm-link-text="Remove All" onClick={RemoveAll}><span>CHECK LIST</span></button>
</div>

</div>
</div>
     </>
    );
}

export default Todo;
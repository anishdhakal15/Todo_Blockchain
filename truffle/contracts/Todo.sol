// SPDX-License-Identifier: MIT
pragma solidity ^0.8.3;

contract TodoList{
    struct Todo{
        string text;
        bool compleated;
    }
    
    Todo[] public todos;

    function create(string calldata _text) external {
        todos.push(Todo({
            text:_text,
            compleated:false
        }));
    }
    function updateText(uint _index, string calldata _text) external {
        todos[_index].text = _text;
    }
    function get(uint _index) external view returns(string memory,bool){
        Todo storage todo = todos[_index];
        return (todo.text,todo.compleated);
    }
    function toggleComplete(uint _index) external {
        Todo storage todo = todos[_index];
        if (todo.compleated==false){
            todo.compleated=true;
        }else{
            todo.compleated = false;
        }
    }

}

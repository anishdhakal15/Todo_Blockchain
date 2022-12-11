import { useState, useEffect } from "react";
import ToggleButton from "react-toggle-button";
import { Routes, Route, useNavigate } from "react-router-dom";
import useEth from "../../contexts/EthContext/useEth";
import NoticeNoArtifact from "./NoticeNoArtifact";
import NoticeWrongNetwork from "./NoticeWrongNetwork";

function Todo() {
  // const navigate = useNavigate();
  const {
    state: { contract, accounts, artifact },
  } = useEth();
  const [todos, setTodos] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [edittodos, setEditTodos] = useState("");
  const [newTodo, setNewTodo] = useState({ todo: "" });

  // useEffect( ()=> {

  //   },[])async   { from: accounts[0] }

  const checkUpdate = async () => {
    const a = [];
    if (contract) {
      const lengthOfTodos = await contract.methods.readLength().call();
      for (let i = 0; i < lengthOfTodos; i++) {
        const value = await contract.methods.get(i).call();
        await a.push(value);
      }
      await setTodos(a);
    }
  };

  useEffect(() => {
    checkUpdate();
  }, [contract]);

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const createTodo = async () => {
    await contract.methods
      .create(inputValue)
      .send({ from: accounts[0] })
      .then((event) => {
        console.log(event);
      })
      .catch((err) => {
        console.log("The post has not been completed.");
      });
  };

  const edittodo = async (index) => {
    await contract.methods
      .updateText(index, newTodo.todo)
      .send({ from: accounts[0] })
      .then((event) => {
        console.log(event);
      })
      .catch((err) => {
        console.log("The post has not been completed.");
      });
    newTodo["todo"] = "";
  };

  // search items in javascript

  const toggledState = async (e, i) => {
    todos[i][1] = !todos[i][1];
    await contract.methods
      .toggleComplete(i)
      .send({ from: accounts[0] })
      .then((event) => {
        console.log(event);
      })
      .catch((err) => {
        console.log("The post has not been completed.");
      });
  };

  const handelChange = (e) => {
    newTodo["todo"] = e.target.value;
  };

  const content = (
    <>
      <div className="container todo" style={{ marginTop: "100px" }}>
        <div className="row">
          <div className="col">
            <label>Create New Todo: </label>
            <hr />
            <form style={{ width: "22rem" }}>
              <div className="form-outline mb-4">
                <input
                  type="text"
                  onChange={(e) => {
                    handleInputChange(e);
                  }}
                  id="createtodo"
                  placeholder="Name"
                  style={{ height: "30px", width: "300px" }}
                  className="form-control"
                />
              </div>
              {/* <div className="form-outline mb-4">
  <input type="email" id="form5Example2" placeholder="email" style={{height:"30px",width:"300px"}} className="form-control" />
  </div> */}
              <button
                type="button"
                onClick={createTodo}
                className="btn btn-primary btn-block mb-4"
                style={{ marginTop: "5px", width: "150px", height: "30px" }}
              >
                Submit
              </button>
            </form>
          </div>
          <div className="col-4 float-sm-end todos" style={{ float: "right" }}>
            <label htmlFor="todos">Todo Lists </label>
            <hr />
            {edittodos}
            {todos &&
              todos.map((data, index) => (
                <div
                  key={index}
                  style={{
                    display: "inline-block",
                    width: "180px",
                    height: "20px",
                    border: "2px solid #bbb2b2",
                    marginBottom: "10px",
                    padding: "3px 10px",
                    borderRadius: "10%",
                    background: "linear-gradient(#c9baba, #a9cb97)",
                  }}
                >
                  <a href="#!" id={"todo" + index}>
                    {data[0]}
                  </a>
                  <span>
                    <img
                      src="https://cdn-icons-png.flaticon.com/512/1827/1827933.png"
                      width={"22px"}
                      height={"16px"}
                      alt="img"
                      style={{
                        zIndex: "-1",
                        marginLeft: "4px",
                        marginBottom: "4px",
                      }}
                      onClick={(event) => {
                        const a = (
                          <>
                            <div
                              className="edittodos"
                              style={{
                                display: "block",
                                width: "200px",
                                height: "50px",
                                padding: "10px 10px",
                                marginBottom: "10px",
                                border: "2px solid #af9a9a",
                                borderRadius: "3%",
                              }}
                            >
                              <label>
                                Enter New Name for {todos[index][0]}
                              </label>
                              <input
                                type="text"
                                onChange={handelChange}
                                style={{ height: "18px", width: "95px" }}
                              />
                              <button
                                style={{
                                  display: "inline",
                                  width: "65px",
                                  height: "20px",
                                  margin: "6px",
                                  background: "#bfd3d2",
                                  border: "1px solid #8f7e7e",
                                  borderRadius: "20%",
                                }}
                                onClick={(value) => {
                                  edittodo(index);
                                }}
                              >
                                Update
                              </button>
                            </div>
                          </>
                        );
                        setEditTodos(a);
                      }}
                    />
                  </span>
                  <span
                    className="todoStatus"
                    style={{ dispaly: "inline", float: "right" }}
                  >
                    {/* <label htmlFor=" ">Stopped </label> */}
                    <ToggleButton
                      inactiveLabel={"Start"}
                      activeLabel={"Stop"}
                      value={todos[index][1] || false}
                      onToggle={(value) => {
                        toggledState(value, index);
                      }}
                    />
                  </span>
                </div>
              ))}
          </div>
        </div>
      </div>
    </>
  );
  return (
    <>
      {!artifact ? (
        <NoticeNoArtifact />
      ) : !contract ? (
        <NoticeWrongNetwork />
      ) : (
        content
      )}
    </>
  );
}

export default Todo;

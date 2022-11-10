import React from "react";

const Board = () => {
  function handleSendPost(ev: any) {
    ev.preventDefault();
    try {
      const text = ev.target.elements.board_input.value;

      console.log(text);
      ev.target.reset();
    } catch (error) {}
  }
  return (
    <div className="board">
      <div className="board__posts">test</div>
      <form className="textInput" onSubmit={handleSendPost}>
        <textarea name="board_input"></textarea>
        <button type="submit">
          <span className="material-symbols-outlined">send</span>
        </button>
      </form>
    </div>
  );
};

export default Board;

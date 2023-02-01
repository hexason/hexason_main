import { Chessboard } from "react-chessboard"
import { Chess, Move, Square } from "chess.js";
import { useContext, useEffect, useReducer, useState } from "react";
import { SocketContext } from "../../context/socket";

export default function Board() {
  const socket = useContext(SocketContext);

  const [side, setSide] = useState<"b" | "w" | "s">("s");
  const [game, _setGame] = useState(new Chess());
  const [moveFrom, setMoveFrom] = useState<string | Square>("");
  const [optionSquares, setOptionSquares] = useState<{
    [square: string]: { background: string; borderRadius?: string };
  }>({});
  const [rightClickedSquares, setRightClickedSquares] = useState<{
    [square: string]: { backgroundColor: string } | undefined;
  }>({});
  const [_, forceUpdate] = useReducer((x) => x + 1, 0);


  useEffect(() => {
    if (!socket) return;

    let auth = localStorage.getItem("auth");
    if (!auth) {
      localStorage.setItem("auth", new Date().getTime().toString());
    }
    socket.auth = { token: localStorage.getItem("auth") };
    
    socket.on("connect", () => {
      socket.emit("game:join", {key:"test"});
    })
    socket.emit("game:join", {
      key: "test"
    })

    socket.on("game:ongoing", (data) => {
      console.log("game:ongoing")
      console.log(data)
      game.loadPgn(data.pgn);
      forceUpdate();
    });

    socket.on("game:side", (data) => {
      setSide(data.side);
      console.log(data.side)
    })

    return () => {
      socket.off("game:ongoing");
      socket.off("game:side");
    }
  }, [])

  function onPieceDragBegin(_piece: string, sourceSquare: Square) {
    if (side !== game.turn()) return;
    getMoveOptions(sourceSquare);
  }

  function makeMove(m: { from: string; to: string; promotion?: string }) {
    try {
      const result = game.move(m);
      if (result) {
        setOptionSquares({
          [m.from]: { background: "rgba(255, 255, 0, 0.4)" },
          [m.to]: { background: "rgba(255, 255, 0, 0.4)" }
        });
        return result;
      } else {
        throw new Error("invalid move");
      }
    } catch (e) {
      setOptionSquares({});
      return false;
    }
  }

  function onDrop(sourceSquare: Square, targetSquare: Square) {
    if (side !== game.turn()) return false;

    const moveDetails = {
      from: sourceSquare,
      to: targetSquare,
      promotion: "q"
    };

    console.log(moveDetails)
    const move = makeMove(moveDetails);
    if (!move) return false; // illegal move
    socket?.emit("game:ongoing", { m: moveDetails, pgn: game.pgn(), key: "test" });
    return true;
  }

  function getMoveOptions(square: Square) {
    const moves = game.moves({
      square,
      verbose: true
    }) as Move[];
    if (moves.length === 0) {
      return;
    }

    const newSquares: {
      [square: string]: { background: string; borderRadius?: string };
    } = {};
    moves.map((move) => {
      newSquares[move.to] = {
        background:
          game.get(move.to as Square) &&
            game.get(move.to as Square)?.color !== game.get(square)?.color
            ? "radial-gradient(circle, rgba(0,0,0,.1) 85%, transparent 85%)"
            : "radial-gradient(circle, rgba(0,0,0,.1) 25%, transparent 25%)",
        borderRadius: "50%"
      };
      return move;
    });
    newSquares[square] = {
      background: "rgba(255, 255, 0, 0.4)"
    };
    setOptionSquares(newSquares);
  }
  function onPieceDragEnd() {
    setOptionSquares({});
  }

  function onSquareClick(square: Square) {
    setRightClickedSquares({});
    // if (side !== game.turn()) return;

    function resetFirstMove(square: Square) {
      setMoveFrom(square);
      getMoveOptions(square);
    }

    // from square
    if (!moveFrom) {
      resetFirstMove(square);
      return;
    }

    const moveDetails = {
      from: moveFrom as Square,
      to: square,
      promotion: "q"
    };
    console.log(moveDetails)

    const move = makeMove(moveDetails);
    if (!move) {
      resetFirstMove(square);
    } else {
      setMoveFrom("");
      socket?.emit("game:ongoing", { m: moveDetails, pgn: game.pgn(), key: "test" });
    }
  }

  function onSquareRightClick(square: Square) {
    const colour = "rgba(0, 0, 255, 0.4)";
    setRightClickedSquares({
      ...rightClickedSquares,
      [square]:
        rightClickedSquares[square] && rightClickedSquares[square]?.backgroundColor === colour
          ? undefined
          : { backgroundColor: colour }
    });
  }

  return (
    <Chessboard
      position={game.fen()}
      onPieceDragBegin={onPieceDragBegin}
      onPieceDragEnd={onPieceDragEnd}
      onPieceDrop={onDrop}
      onSquareClick={onSquareClick}
      onSquareRightClick={onSquareRightClick}
      customSquareStyles={{
        ...optionSquares,
        ...rightClickedSquares
      }}
    />
  )
}
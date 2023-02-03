import { Chessboard } from "react-chessboard"
import { Chess, Move, Square } from "chess.js";
import { useContext, useEffect, useReducer, useState } from "react";
import { SocketContext } from "../../context/socket";
import { Box } from "@chakra-ui/react";

export default function Board({ gameId }: { gameId: string }) {
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
  const [timer, setTimer] = useState(300);

  useEffect(() => {
    if (!socket) return;

    socket.on("game:ongoing", (data) => {
      console.log(data)
      game.loadPgn(data.pgn);
      forceUpdate();
    });

    socket.on("game:joined", (data) => {
      setSide(data.side);
      forceUpdate();
    })
    socket.on("game:timer", (data) => {
      setTimer(data.time);
    })
    socket.emit("game:join", { key: gameId });

    return () => {
      socket.off("game:ongoing");
      socket.off("game:joined");
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
    socket?.emit("game:ongoing", { m: moveDetails, pgn: game.pgn(), key: gameId });
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
      socket?.emit("game:ongoing", { m: moveDetails, pgn: game.pgn(), key: gameId });
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
    <Box w="100%">
      <Box color={"black"}>Time: {timer}</Box>
      <Chessboard
        position={game.fen()}
        animationDuration={200}
        onPieceDragBegin={onPieceDragBegin}
        onPieceDragEnd={onPieceDragEnd}
        onPieceDrop={onDrop}
        onSquareClick={onSquareClick}
        onSquareRightClick={onSquareRightClick}
        boardOrientation={side === "b" ? "black" : "white"}
        customSquareStyles={{
          ...optionSquares,
          ...rightClickedSquares
        }}
      />
    </Box>
  )
}
import { Position } from "./Position.js";

export interface Movable {
    moveSpeed: number;
    moveVector: Position;
    destination: Position;
    moveTo: (destination: Position) => void;
    move: () => void;
    isReachedDestination: () => boolean;
}
import { makeAutoObservable } from "mobx";
import PositionShelf from "../../Shelves/PositionShelf";

export default class Store {
	public positionShelf = new PositionShelf();

	constructor() {
		makeAutoObservable(this);
	}
}

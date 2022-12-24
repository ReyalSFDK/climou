import { makeAutoObservable } from "mobx";
import AttributeShelf from "./AttributeShelf";

export default class LoaderShelf {
	public loading = new AttributeShelf(false);

	constructor() {
		makeAutoObservable(this);
	}

	public tryStart(errorMessage = "Still Loading") {
		if (this.isLoading) {
			throw Error(errorMessage);
		}

		this.start();
	}

	public start() {
		this.loading.setValue(true);
	}

	public end() {
		this.loading.setValue(false);
	}

	public get isLoading() {
		return this.loading.value;
	}
}

import { makeAutoObservable } from "mobx";
export default class AttributeShelf<AttributeType> {
	public value: AttributeType;

	constructor(initialValue: AttributeType) {
		this.value = initialValue;
		makeAutoObservable(this);
	}

	public setValue = (newValue: AttributeType) => {
		this.value = newValue;
	};
}

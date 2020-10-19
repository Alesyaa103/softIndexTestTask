export default class CustomValidator {
	value: string | number;
	errors: Array<string>;

	constructor(valueToCheck: string | number) {
		this.value = valueToCheck;
		this.errors = [];
	}

	checkMinLength() {
		if ((this.value as string).length >= 3) {
			return this;
		} else {
			this.errors.push(`Field must be longer.`);
			return this;
		}
	}

	checkMaxLength() {
		if ((this.value as string).length <= 40) {
			return this;
		} else {
			this.errors.push(`Field must be shorter.`);
			return this;
		}
	}

	checkCharacters() {
		if ((this.value as string).match(/^[a-zа-яёї][a-zа-яёї ]{0,}$/i) || (this.value as string) === '') {
			return this;
		} else {
			this.errors.push(
				`Field should contain only alphabetic characters.`,
			);
			return this;
		}
	}

  checkAge() {
    if (Number(this.value) <= 100 && Number(this.value) >=0) {
      return this
    } else {
      this.errors.push('Incorrect age');
			return this;
    }
	}

	checkPhone() {
		if ((this.value as string).match(/^(?!\b(0)\1+\b)(\+?\d{1,3}[. -]?)?\(?\d{3}\)?([. -]?)\d{3}\3\d{4}$/gm)) {
      return this;
    } else {
      this.errors.push('Incorrect phone number');
			return this;
    }
	}
	
	validate() {
		return this.errors.join(' ');
	}
}

class Transaction 
{
    #id;
    #userId; 
    #categoryId; 
    #amount;
    #description;
    #type;
    #transactionDate;

    constructor(id, userId, categoryId, amount, description, type, transactionDate) 
    {
        this.#id = id
        this.#userId = userId;
        this.#categoryId = categoryId;
        this.#amount = amount;
        this.#description = description;
        this.#type = type;
        this.#transactionDate = transactionDate;
    }

    get id() {
        return this.#id;
    }

    set id(id) {
        this.#id = id;
    }

    set userId(userId) {
        this.#userId = userId;
    }

    get userId() {
        return this.#userId;
    }

    set categoryId(categoryId) {
        this.#categoryId = categoryId;
    }

    get categoryId() {
        return this.#categoryId;
    }

    set amount(amount) {
        this.#amount = amount;
    }
    get amount() {
        return this.#amount;
    }

    get description() {
        return this.#description;
    }

    set description(description) {
        this.#description = description;
    }

    get type() {
        return this.#type;
    }

    set type(type) {
        this.#type = type;
    }

    get transactionDate() {
        return this.#transactionDate;
    }

    set transactionDate(transactionDate) {
        this.#transactionDate = transactionDate;
    }

    
}
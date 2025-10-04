class SavingGoal 
{
    #id;
    #title; 
    #description; 
    #userId ; 
    #goalAmount;
    #currentAmount;


    constructor(id, title, description, userId, goalAmount, currentAmount) {
        this.#id = id;
        this.#title = title;
        this.#description = description;
        this.#userId = userId;
        this.#goalAmount = goalAmount;
        this.#currentAmount = currentAmount;
    }


    get id() {
        return this.#id;
    }
    set id(id) {
        this.#id = id;
    }

    get title() {
        return this.#title;
    }

    set title(title) {
        this.#title = title;
    }

    get description() {
        return this.#description;
    }

    set description(description) {
        this.#description = description;
    }

    get userId() {
        return this.#userId;
    }

    set userId(userId) {
        this.#userId = userId;
    }

    get goalAmount() {
        return this.#goalAmount;
    }

    set goalAmount(goalAmount) {
        this.#goalAmount = goalAmount;
    }

    get currentAmount() {
        return this.#currentAmount;
    }

    set currentAmount(currentAmount) {
        this.#currentAmount = currentAmount;
    }

    get goalAmount() {
        return this.#goalAmount;
    }

    set goalAmount(goalAmount) {
        this.#goalAmount = goalAmount;
    }

    get currentAmount() {
        return this.#currentAmount;
    }

    set currentAmount(currentAmount) {
        this.#currentAmount = currentAmount;
    }

}
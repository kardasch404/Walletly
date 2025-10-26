class SavingGoal 
{
    #id;
    #title; 
    #description; 
    #userId ; 
    #goalAmount;
    #currentAmount;
    #targetDate;
    #icon;
    #status;


    constructor(id, title, description, userId, goalAmount, currentAmount, targetDate, icon, status) {
        this.#id = id;
        this.#title = title;
        this.#description = description;
        this.#userId = userId;
        this.#goalAmount = goalAmount;
        this.#currentAmount = currentAmount;
        this.#targetDate = targetDate;
        this.#icon = icon;
        this.#status = status;
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

    get targetDate() {
        return this.#targetDate;
    }

    set targetDate(targetDate) {
        this.#targetDate = targetDate;
    }

    get icon() {
        return this.#icon;
    }

    set icon(icon) {
        this.#icon = icon;
    }

    get status() {
        return this.#status;
    }

    set status(status) {
        this.#status = status;
    }

    getProgress() {
        if (this.#goalAmount === 0) return 0;
        return Math.min(100, (this.#currentAmount / this.#goalAmount) * 100);
    }

    getRemainingAmount() {
        return Math.max(0, this.#goalAmount - this.#currentAmount);
    }

    isCompleted() {
        return this.#currentAmount >= this.#goalAmount || this.#status === 'completed';
    }
}

module.exports = SavingGoal;
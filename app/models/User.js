class User {
    #id;
    #fname; 
    #lname; 
    #email; 
    #password;
    #image; 

    constructor(id, fname, lname, email, password, image) {
        this.#id = id;
        this.#fname = fname;
        this.#lname = lname;
        this.#email = email;
        this.#password = password;
        this.#image = image;
    }

    get id() {
        return this.#id;
    }
    set id(id) {
        this.#id = id;
    }

    get fname() {
        return this.#fname;
    }
    set fname(fname) {
        this.#fname = fname;
    }
    
    get lname() {
        return this.#lname;
    }
    set lname(lname) {
        this.#lname = lname;
    }
    
    get email() {
        return this.#email;
    }
    set email(email) {
        this.#email = email;
    }
    
    get password() {
        return this.#password;
    }
    set password(password) {
        this.#password = password;
    }
    
    get image() {
        return this.#image;
    }
    set image(image) {
        this.#image = image;
    }
}

module.exports = User;
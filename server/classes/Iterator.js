class Iterator {

    cursor = 0

    constructor(objects){
        this.objects = objects
    }

    hasNext() {
        return this.cursor < this.objects.length && this.objects[this.cursor] != null
    }

    next() {
        return this.objects[this.cursor++]
    }
}

module.exports = Iterator
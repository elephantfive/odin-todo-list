//Create to-do list item object
export const createList = function (title, desc, due, prio) {
    return { title, desc, due, prio }
}

//Create one part of a to-do list (title, desc, due date, prio)
export const editList = function (list, itemType, textVal) {
    list[itemType] = textVal;
}
export const masterProjectList = {};

export const createProject = function createProjectObject(title) {
    if (title in masterProjectList) {
        console.log("Name already in use.");
        return false;
    }
    masterProjectList[title] = []
    return true;
}